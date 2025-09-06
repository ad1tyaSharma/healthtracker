package com.example.healthtracker.auth;

import com.example.healthtracker.model.User;
import com.example.healthtracker.repository.UserRepository;
import com.example.healthtracker.security.JwtService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Map;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    @Value("${client.baseUrl}")
    private String clientUrl;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public OAuth2SuccessHandler(UserRepository userRepository, JwtService jwtService, OAuth2AuthorizedClientService authorizedClientService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authorizedClientService = authorizedClientService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attrs = oauthUser.getAttributes();
        String email = (String) attrs.get("email");
        String name = (String) attrs.getOrDefault("name", "");

        // attempt to fetch access token for calling People API
        String accessToken = null;
        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                    oauthToken.getAuthorizedClientRegistrationId(), oauthToken.getName());
            if (client != null && client.getAccessToken() != null) {
                accessToken = client.getAccessToken().getTokenValue();
            }
        }

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.setEmail(email);
            u.setName(name);
            u.setVerified(true);
            u.setProvider("google");
            return userRepository.save(u);
        });

        // If we have an access token, call People API to fetch photos and birthdays
        if (accessToken != null) {
            try {
                var rest = new org.springframework.web.client.RestTemplate();
                var headers = new org.springframework.http.HttpHeaders();
                headers.setBearerAuth(accessToken);
                var entity = new org.springframework.http.HttpEntity<>(headers);
                var url = "https://people.googleapis.com/v1/people/me?personFields=birthdays,photos";
                var resp = rest.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);
                if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                    JsonNode json = objectMapper.readTree(resp.getBody());
                    // photos
                    if (json.has("photos") && json.get("photos").isArray() && json.get("photos").size() > 0) {
                        String photoUrl = json.get("photos").get(0).path("url").asText(null);
                        if (photoUrl != null) user.setProfilePictureUrl(photoUrl);
                    }
                    // birthdays (may be partial)
                    if (json.has("birthdays") && json.get("birthdays").isArray() && json.get("birthdays").size() > 0) {
                        JsonNode b = json.get("birthdays").get(0).path("date");
                        if (b.has("year") && b.has("month") && b.has("day")) {
                            int y = b.get("year").asInt();
                            int m = b.get("month").asInt();
                            int d = b.get("day").asInt();
                            user.setDateOfBirth(LocalDate.of(y, m, d));
                        }
                    }
                    userRepository.save(user);
                }
            } catch (Exception e) {
                // ignore People API failures for now
            }
        }

        String token = jwtService.generateToken(user.getEmail());

        // set HttpOnly cookie with token so browser sends it on subsequent requests
        jakarta.servlet.http.Cookie cookie = new jakarta.servlet.http.Cookie("AUTH_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // set true for HTTPS in production
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);
        String cookieHeader = String.format("AUTH_TOKEN=%s; Path=/; Max-Age=%d; HttpOnly; SameSite=Lax", token, 60 * 60 * 24);
        response.setHeader("Set-Cookie", cookieHeader);

        // redirect to frontend callback (frontend will also receive token in query for backward compatibility)
        response.sendRedirect(clientUrl + "/auth/callback?token=" + token);
    }
}
