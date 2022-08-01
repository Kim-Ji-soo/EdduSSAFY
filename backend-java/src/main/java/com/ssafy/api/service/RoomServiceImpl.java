package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserRoom;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements  RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRoomRepository userRoomRepository;

    @Override
    public Room createRoom(String userId) {

        Room room;
        try {
            room = roomRepository.save(new Room());
            UserRoom userRoom = UserRoom.builder()
                    .user(User.builder().userId(userId).build())
                    .room(Room.builder().roomId(room.getRoomId()).build())
                    .build();
            userRoomRepository.save(userRoom);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return room;
    }
}
