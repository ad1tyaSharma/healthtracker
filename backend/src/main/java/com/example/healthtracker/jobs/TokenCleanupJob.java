package com.example.healthtracker.jobs;
import com.example.healthtracker.repository.EmailTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
@Slf4j
@Service
public class TokenCleanupJob {
    @Autowired
    private EmailTokenRepository tokenRepository;
    @Scheduled(cron = "0 */1 * * * *")
    public void cleanupExpiredTokens() {
        Instant now = Instant.now();
        long count = tokenRepository.countByExpiresAtBefore(now);
        log.info("🔎 Found {} expired tokens that should be deleted at {}", count, now);
        long deleted = tokenRepository.deleteByExpiresAtBefore(now);
        log.info("✅ Deleted {} expired tokens at {}", deleted, now);
    }
}

