package com.example.healthtracker.controller;

import com.example.healthtracker.model.Record;
import com.example.healthtracker.model.Member;
import com.example.healthtracker.repository.RecordRepository;
import com.example.healthtracker.repository.MemberRepository;
import com.example.healthtracker.utils.EntityMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Slf4j
@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = {"*"})
public class RecordController {

    private final RecordRepository recordRepository;
    private final MemberRepository memberRepository;

    public RecordController(RecordRepository recordRepository, MemberRepository memberRepository) {
        this.recordRepository = recordRepository;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/{memberId}/records")
    public ResponseEntity<List<Record>> list(@PathVariable String memberId) {
        // Check if member exists
        Optional<Member> memberOpt = memberRepository.findById(memberId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        List<Record> records = recordRepository.findByMemberIdOrderByLastUpdatedDesc(memberId);
        return ResponseEntity.ok(records);
    }
    @PostMapping("/{memberId}/records")
    public ResponseEntity<Record> create(@PathVariable String memberId, @RequestBody Record record) {
        // Check if member exists
        Optional<Member> memberOpt = memberRepository.findById(memberId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Member member = memberOpt.get();
        record.setMemberId(member);
        Record savedRecord = recordRepository.save(record);
        Map<String, String> map = EntityMapper.toNonNullStringMap(savedRecord);
        member.setVitals(map);
        return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
    }
    @DeleteMapping("/{memberId}/records/{recordId}")
    public ResponseEntity<Void> delete(@PathVariable String memberId, @PathVariable String recordId) {
        // Check if member exists
        Optional<Member> memberOpt = memberRepository.findById(memberId);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        // Check if record exists
        Optional<Record> recordOpt = recordRepository.findById(recordId);
        if (recordOpt.isEmpty() || !recordOpt.get().getMemberId().equals(memberId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        recordRepository.deleteById(recordId);
        return ResponseEntity.noContent().build();
    }
}