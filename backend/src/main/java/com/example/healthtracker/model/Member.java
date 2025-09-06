package com.example.healthtracker.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "members")
public class Member {
    @Id
    private String id;
    private String name;
    @Past
    private LocalDate dateOfBirth;
    // link to owning user (user id from users collection)
    private String ownerId;
    // optional relationship alias (e.g. Dad, Mom)
    @NotBlank(message = "Relationship cannot be blank")
    private String relationshipAlias;
    // optional avatar URL

    private String avatar;
    // optional vitals map (bp, weight, bmi, sugar, cholesterol)
    private Map<String, String> vitals;
    private Boolean accepted = false;
    @DBRef
    private User userId;
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;
    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant lastUpdated;  

}
