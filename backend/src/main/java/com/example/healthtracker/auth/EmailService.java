package com.example.healthtracker.auth;

import com.example.healthtracker.service.impl.GmailEmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {
    @Value("${application.baseurl}")
    private String baseUrl;
    @Value("${client.baseurl}")
    private String clientBaseUrl;
    @Autowired
    GmailEmailService gmailEmailService;
    // Placeholder - wire a real email provider (SendGrid, SES, SMTP) in production
    public void sendVerification(String email, String token) {
        if (email.isEmpty() || token.isEmpty())
        {
            log.error("[EmailService] sendVerification: email or token is empty");
        }
        try {
            gmailEmailService.sendEmail(new com.example.healthtracker.dto.EmailRequest(
                    email,
                    "HealthTracker - Verify your account",
                    "Please verify your email using this url: " + baseUrl + "/api/auth/verify?token=" + token
            ));
            log.info("[EmailService] sendVerification: sent verification email to {}", email);
        } catch (Exception e) {
            log.error("[EmailService] sendVerification: failed to send email to {}", email, e);
        }
    }

    public void sendReset(String email, String token) {
     if (email.isEmpty() || token.isEmpty())
        {
            log.error("[EmailService] sendReset: email or token is empty");
        }
        try {
            gmailEmailService.sendEmail(new com.example.healthtracker.dto.EmailRequest(
                    email,
                    "HealthTracker - Password Reset",
                    "Please reset your password using this url: " + clientBaseUrl + "/reset-password?token=" + token
            ));
            log.info("[EmailService] sendVerification: sent verification email to {}", email);
        } catch (Exception e) {
            log.error("[EmailService] sendVerification: failed to send email to {}", email, e);
        }
    }
}
