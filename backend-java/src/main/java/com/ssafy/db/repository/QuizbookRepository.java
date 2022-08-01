package com.ssafy.db.repository;

import com.ssafy.db.entity.Quizbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizbookRepository extends JpaRepository<Quizbook, Long> {

}
