package com.example.healthtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HealthTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(HealthTrackerApplication.class, args);
    }
}
