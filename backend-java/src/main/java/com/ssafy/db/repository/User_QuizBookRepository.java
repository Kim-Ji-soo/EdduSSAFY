package com.ssafy.db.repository;

import com.ssafy.db.entity.User_QuizBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User_QuizBookRepository extends JpaRepository<User_QuizBook, Long> {
    
}
