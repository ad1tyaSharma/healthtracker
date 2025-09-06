package com.example.healthtracker.repository;

import com.example.healthtracker.model.Record;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends MongoRepository<Record, String> {
    List<Record> findByMemberIdOrderByLastUpdatedDesc(String memberId);
    Record save(Record record);
}
