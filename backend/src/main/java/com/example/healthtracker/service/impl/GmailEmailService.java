package com.example.healthtracker.service.impl;

import com.example.healthtracker.dto.EmailRequest;
import com.example.healthtracker.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service("gmailEmailService")
public class GmailEmailService implements EmailService {
    @Value("${mail.username}")
    private String fromEmail;
    private final JavaMailSender mailSender;

    @Autowired
    public GmailEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(EmailRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(request.getTo());
        message.setSubject(request.getSubject());
        message.setText(request.getBody());

        mailSender.send(message);
    }
}
