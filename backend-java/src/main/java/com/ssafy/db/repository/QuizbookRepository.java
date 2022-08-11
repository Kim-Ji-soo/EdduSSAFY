package com.ssafy.db.repository;

import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizbookRepository extends JpaRepository<Quizbook, Long> {
    List<Quizbook> findAllByUserUserId(String userId);
//    List<Quiz> findByQuizbookId(long quizbookId);
}
