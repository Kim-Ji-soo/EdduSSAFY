package com.ssafy.api.service;

import com.ssafy.api.request.RoomAlterReq;
import com.ssafy.api.request.RoomCreateReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserRoom;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements  RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRoomRepository userRoomRepository;

    @Override
    public Room createRoom(RoomCreateReq roomCreateReq) {

        Room room;
        try {
            room = roomRepository.save(roomCreateReq.toEntity());
            UserRoom userRoom = UserRoom.builder()
                    .user(User.builder().userId(roomCreateReq.getUserId()).build())
                    .room(Room.builder().roomId(room.getRoomId()).build())
                    .build();
            userRoomRepository.save(userRoom);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return room;
    }

    @Override
    public boolean alterRoom(RoomAlterReq roomAlterReq) {
        try{
            Room room = roomAlterReq.toEntity();
            roomRepository.save(room);
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteRoom(Long roomId) {
        try{
            roomRepository.deleteById(roomId);
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
