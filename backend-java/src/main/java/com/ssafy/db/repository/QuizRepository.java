package com.ssafy.db.repository;

import com.ssafy.db.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository <Quiz, Long> {
    List<Quiz> findByQuizbookQuizbookId(Long quizbookId);
}
