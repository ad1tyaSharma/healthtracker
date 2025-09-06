package com.example.healthtracker.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;
    private String passwordHash;
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 2, max = 50, message = "Name must be between 2–50 characters")
    private String name;
    private boolean verified = false;
    private String provider;
    // optional profile picture URL (from OAuth provider)
    private String profilePictureUrl;
    // optional date of birth
    @Past
    private LocalDate dateOfBirth;
    @Min(value = 0, message = "Height must be at least 0")
    private String height;
    @NotBlank(message = "Gender cannot be blank")
    private String gender;
    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant lastUpdated;  

}
