package com.example.healthtracker.auth;

import com.example.healthtracker.model.EmailToken;
import com.example.healthtracker.repository.EmailTokenRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class TokenService {

    private final EmailTokenRepository tokenRepository;

    public TokenService(EmailTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public EmailToken createToken(String email, String type, long ttlSeconds) {
        EmailToken t = new EmailToken();
        t.setEmail(email);
        t.setType(type);
        t.setToken(UUID.randomUUID().toString());
        t.setExpiresAt(Instant.now().plusSeconds(ttlSeconds));
        return tokenRepository.save(t);
    }

    public EmailToken findByToken(String token) {
        return tokenRepository.findByToken(token).orElse(null);
    }

    public void delete(EmailToken token) {
        tokenRepository.delete(token);
    }
}
