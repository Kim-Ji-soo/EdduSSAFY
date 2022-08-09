package com.ssafy.db.repository;

import com.ssafy.db.entity.UserRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoomRepository extends JpaRepository<UserRoom, Long> {

    long deleteByRoomRoomIdAndUserUserId(long roomId, String userId);

    List<UserRoom> findByUserUserId(String userId);
}
