package com.example.healthtracker.repository;

import com.example.healthtracker.model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
	List<Member> findByOwnerIdAndAcceptedTrue(String ownerId);
	Member findByEmail(String email);
	long deleteByAcceptedFalseAndCreatedAtBefore(Instant cutoff);
	long countByAcceptedFalseAndCreatedAtBefore(Instant cutoff);
}
