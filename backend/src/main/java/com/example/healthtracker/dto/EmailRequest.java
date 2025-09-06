package com.example.healthtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EmailRequest {
    private String to;
    private String subject;
    private String body;
}
