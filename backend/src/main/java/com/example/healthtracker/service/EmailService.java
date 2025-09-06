package com.example.healthtracker.service;

import com.example.healthtracker.dto.EmailRequest;

public interface EmailService {
    void sendEmail(EmailRequest request);
}
