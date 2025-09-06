package com.example.healthtracker.jobs;
import com.example.healthtracker.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
@Slf4j
@Service
public class MemberCleanupJob {
    @Autowired
    private MemberRepository memberRepository;

    // Run every day at midnight
    @Scheduled(cron = "0 0 0 * * *")
    public void cleanupUnacceptedMembers() {
        Instant cutoff = Instant.now().minus(1, ChronoUnit.DAYS);

        long count = memberRepository.countByAcceptedFalseAndCreatedAtBefore(cutoff);
        log.info("🔎 Found {} unaccepted members created before {} that should be deleted", count, cutoff);

        if (count > 0) {
            long deleted = memberRepository.deleteByAcceptedFalseAndCreatedAtBefore(cutoff);
            log.info("✅ Deleted {} unaccepted members at {}", deleted, Instant.now());
        } else {
            log.debug("ℹ️ No expired unaccepted members found at {}", Instant.now());
        }
    }
}

