package com.example.healthtracker.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Setter
@Getter
@NoArgsConstructor
@Document(collection = "email_tokens")
public class EmailToken {
    @Id
    private String id;

    private String token;
    private String email;
    private Instant expiresAt;
    private String type;

}
