package com.example.healthtracker.repository;

import com.example.healthtracker.model.EmailToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface EmailTokenRepository extends MongoRepository<EmailToken, String> {
    Optional<EmailToken> findByToken(String token);
    long deleteByExpiresAtBefore(Instant now);
    long countByExpiresAtBefore(Instant now);
}
