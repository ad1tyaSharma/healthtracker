package com.example.healthtracker.controller;

import com.example.healthtracker.auth.TokenService;
import com.example.healthtracker.dto.EmailRequest;
import com.example.healthtracker.model.EmailToken;
import com.example.healthtracker.model.Member;
import com.example.healthtracker.repository.MemberRepository;
import com.example.healthtracker.repository.UserRepository;
import com.example.healthtracker.model.User;
import com.example.healthtracker.service.impl.GmailEmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
@Slf4j
@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = {"*"})
public class MemberController {
    @Value("${client.baseUrl}")
    private String clientUrl;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    @Autowired
    TokenService tokenService;
    @Autowired
    GmailEmailService gmailEmailService;
    public MemberController(MemberRepository memberRepository, UserRepository userRepository) {
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Member>> list(Principal principal) {
        // Only return members owned by the authenticated user. If unauthenticated, return empty list.
        if (principal == null) return ResponseEntity.ok(List.of());
        String email = principal.getName();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.ok(List.of());
        var user = userOpt.get();
        return ResponseEntity.ok(memberRepository.findByOwnerIdAndAcceptedTrue(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> get(@PathVariable String id) {
        var m = memberRepository.findById(id);
        return m.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(Principal principal, @Validated @RequestBody Member member) {
        // Associate new member with the authenticated user
        if (principal == null) return ResponseEntity.status(401).build();
        String email = principal.getName();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).build();
        var user = userOpt.get();
        Member member1 = memberRepository.findByEmail(member.getEmail());
        if (member1 != null) {
            return ResponseEntity.status(409).body(Map.of("error","Member already exists")); // Conflict, member with email already exists
        }
        Optional<User> user1 = userRepository.findByEmail(member.getEmail());
        if (user1.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error","User not found with this email")); // Not Found, no user with the email
        }
        User tmpUser = user1.get();
        member.setId(tmpUser.getId());
        member.setName(tmpUser.getName());
        String avatarUrl = !Objects.isNull(tmpUser.getProfilePictureUrl()) && !tmpUser.getProfilePictureUrl().isEmpty() ?  tmpUser.getProfilePictureUrl() : "https://ui-avatars.com/api/?name=" + tmpUser.getName().replaceAll(" ", "+") + "&background=random";
        member.setAvatar( avatarUrl);
        member.setOwnerId(user.getId());
        var saved = memberRepository.save(member);
        EmailToken token = tokenService.createToken(member.getEmail(),"invite",60*60*24);
        String emailBody = "You've been invited to join as member by " + user.getName() + ".\n Please accept the invitation : " + clientUrl + "/invitations?token="+ token.getToken() ;
        try
        {
            EmailRequest emailRequest = new EmailRequest(member.getEmail(), "HealthTracker - New Invitation",emailBody);
            gmailEmailService.sendEmail(emailRequest);
            log.info("Invitation email sent to {}", member.getEmail());
        }
        catch (Exception e)
        {
            System.out.println("Failed to send email: " + e.getMessage());
        }
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    @PostMapping("/accept-invite")
    public ResponseEntity<?> acceptInvite(@RequestBody Map<String, String> request) {
        log.info("acccpet");
        String token = request.get("token");
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token is required"));
        }

        EmailToken emailToken;
        try {
            emailToken = tokenService.findByToken(token);
            if (emailToken == null)
                return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired token"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired token"));
        }
        var member = memberRepository.findByEmail(emailToken.getEmail());
        if (member == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Member not found"));
        }
        member.setAccepted(true);
        memberRepository.save(member);
        tokenService.delete(emailToken);
        return ResponseEntity.ok(Map.of("message", "Invitation accepted"));
    }
    @PostMapping("/reject-invite")
    public ResponseEntity<?> rejectInvite(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token is required"));
        }
        EmailToken emailToken;
        try {
            emailToken = tokenService.findByToken(token);
            if (emailToken == null)
                return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired token"));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired token"));
        }
        var member = memberRepository.findByEmail(emailToken.getEmail());
        if (member == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Member not found"));
        }
        memberRepository.deleteById(member.getId());
        tokenService.delete(emailToken);
        return ResponseEntity.ok(Map.of("message", "Invitation rejected and member removed"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Principal principal, @PathVariable String id) {
        if (principal == null) return ResponseEntity.status(401).build();
        String email = principal.getName();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).build();
        var user = userOpt.get();
        var mOpt = memberRepository.findById(id);
        if (mOpt.isEmpty()) return ResponseEntity.notFound().build();
        var m = mOpt.get();
        if (!user.getId().equals(m.getOwnerId())) return ResponseEntity.status(403).build();
        memberRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
