package com.ssafy.db.repository;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByHostUserId(String userId);

    List<Room> findByHostUserIdContainingOrTitleContaining(String word1, String word2 );
//    @Query(value= "select r from Room r where CAST(r.roomId as text) like %:word% ",
//    nativeQuery = true)
//    List<Room> searchWord(String word);
}
