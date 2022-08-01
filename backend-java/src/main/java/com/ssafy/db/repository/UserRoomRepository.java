package com.ssafy.db.repository;

import com.ssafy.db.entity.UserRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoomRepository extends JpaRepository<UserRoom, Long> {

}
