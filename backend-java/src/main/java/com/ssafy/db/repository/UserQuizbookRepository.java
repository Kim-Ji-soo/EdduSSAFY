package com.ssafy.db.repository;

import com.ssafy.db.entity.Quizbook;
import com.ssafy.db.entity.UserQuizbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface UserQuizbookRepository extends JpaRepository<UserQuizbook, Long> {

    public void deleteByUser_UserIdAndQuizbook_QuizbookId(String userId, long quizbookId);
//    @Query(value="delete from user_quizbook where user_id = :user_id and quizbook_id = :quizbook_id", nativeQuery = true)
//    void deleteByIds(@Param("user_id") String userId,@Param("quizbook_id") long quizbookId);

    public List<UserQuizbook> findAllByUser_UserId(String userId);
}
