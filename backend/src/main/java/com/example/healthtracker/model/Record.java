package com.example.healthtracker.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "record")
public class Record {
    private String bp;
    private String weight;
    private String sugar;
    private String cholesterol;
    @DBRef
    private Member memberId;
    @CreatedDate
    private Date  createdAt;

    @LastModifiedDate
    private Date lastUpdated;

}
