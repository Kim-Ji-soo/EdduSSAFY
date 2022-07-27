package com.ssafy.db.repository;

import com.ssafy.db.entity.QuizBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizBookRepository extends JpaRepository<QuizBook, Long> {

}
