package com.example.healthtracker.auth;

import com.example.healthtracker.model.User;
import com.example.healthtracker.repository.UserRepository;
import com.example.healthtracker.security.JwtService;
import com.example.healthtracker.auth.TokenService;
import com.example.healthtracker.auth.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final EmailService emailService;

    public AuthController(UserRepository userRepository, JwtService jwtService, TokenService tokenService, EmailService emailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Validated @RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String name = body.getOrDefault("name", "");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required."));
        }

        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            return ResponseEntity.status(409).body(Map.of("error", "Email already in use."));
        }

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setName(name);
        user.setVerified(false);
        userRepository.save(user);

    // create verification token and send email (placeholder)
    var et = tokenService.createToken(user.getEmail(), "verification", 60 * 60 * 24);
    emailService.sendVerification(user.getEmail(), et.getToken());

    String token = jwtService.generateToken(user.getEmail());
    // set HttpOnly cookie with token
    ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", token)
        .httpOnly(true)
        .secure(false) // set true for HTTPS in production
    .sameSite("Lax")
        .path("/")
        .maxAge(60 * 60 * 24)
        .build();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(Map.of("message", "A verification email has been sent (simulated)."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

    if (email == null || password == null) return ResponseEntity.badRequest().build();

        Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password."));

        User user = userOpt.get();
        if (!user.isVerified())
            return ResponseEntity.status(401).body(Map.of("error", "Account is not verified."));
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password."));
        }

    String token = jwtService.generateToken(user.getEmail());
    ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", token)
        .httpOnly(true)
        .secure(false)
    .sameSite("Lax")
        .path("/")
        .maxAge(60 * 60 * 24)
        .build();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(Map.of("message", "Logged in successfully."));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
    ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", "")
        .httpOnly(true)
        .secure(false)
        .sameSite("Lax")
        .path("/")
        .maxAge(0)
        .build();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(Map.of("message", "Logged out successfully."));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null) return ResponseEntity.badRequest().build();
        var et = tokenService.createToken(email, "reset", 60 * 30);
        emailService.sendReset(email, et.getToken());
        return ResponseEntity.ok(Map.of("message", "If an account with that email exists, a password reset link has been sent."));
    }

        @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String newPassword = body.get("newPassword");
        if (token == null || newPassword == null) return ResponseEntity.badRequest().build();
        var et = tokenService.findByToken(token);
        if (et == null || et.getExpiresAt().isBefore(java.time.Instant.now())) {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid or expired token."));
        }
        var userOpt = userRepository.findByEmail(et.getEmail());
    if (userOpt.isEmpty()) return ResponseEntity.status(404).body(Map.of("error", "User not found."));

        User user = userOpt.get();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenService.delete(et);
    return ResponseEntity.ok(Map.of("message", "Password has been reset."));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAccount(@RequestParam("token") String token) {
        var et = tokenService.findByToken(token);
        if (et == null || et.getExpiresAt().isBefore(java.time.Instant.now())) {
            return ResponseEntity.status(400).body(Map.of("error", "Invalid or expired token."));
        }
        var userOpt = userRepository.findByEmail(et.getEmail());
        if (userOpt.isPresent()) {
            var user = userOpt.get();
            user.setVerified(true);
            userRepository.save(user);
            tokenService.delete(et);
            return ResponseEntity.ok(Map.of("message", "Account verified successfully."));
        }
        return ResponseEntity.status(404).body(Map.of("error", "User not found."));
    }

        @GetMapping("/me")
        public ResponseEntity<?> me(java.security.Principal principal) {
            if (principal == null) return ResponseEntity.status(401).build();
            String email = principal.getName();
            var userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) return ResponseEntity.status(404).build();
            var user = userOpt.get();
            return ResponseEntity.ok(user);
        }

        @PostMapping("/oauth/callback")
        public ResponseEntity<?> oauthCallback(@RequestBody Map<String, String> body) {
            String token = body.get("token");
            if (token == null) return ResponseEntity.badRequest().body(Map.of("error", "token required"));
            ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(Map.of("message", "OAuth cookie set."));
        }
        @PutMapping("/update")
        public ResponseEntity<?> updateUser(java.security.Principal principal, @RequestBody Map<String,
            String> body) {
            if (principal == null) return ResponseEntity.status(401).build();
            String email = principal.getName();
            log.info(email);
            var userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) return ResponseEntity.status(404).build();
            User user = userOpt.get();
            String name = body.get("name");
            if (name != null) user.setName(name);
            String dob = body.get("dateOfBirth");
            if (dob != null) user.setDateOfBirth(LocalDate.parse(dob));
            String heightStr = body.get("height");
            if (heightStr != null) {
                try {
                    double height = Double.parseDouble(heightStr);
                    user.setHeight(String.valueOf(height));
                } catch (NumberFormatException e) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Invalid height format."));
                }
            }
            String gender = body.get("gender");
            if (gender != null) user.setGender(gender);
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "User updated successfully."));
        }
}
