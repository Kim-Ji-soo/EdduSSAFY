package com.ssafy.api.service;

import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.UserRoom;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserRoomServiceImpl implements UserRoomService{

    @Autowired
    UserRoomRepository userRoomRepository;

    @Autowired
    RoomService roomService;

    @Override
    public boolean enterRoom(UserRoomReq userRoomReq) {

        try{ //입장하는 유저가 호스트라면 방 start.
            String hostId = roomService.getRoomById(userRoomReq.getRoomId()).getHostId();
            if(hostId.equals(userRoomReq.getUserId())){
                roomService.startRoom(userRoomReq);
            }
            userRoomRepository.save(userRoomReq.toEntity());
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean quitRoom(UserRoomReq userRoomReq) {
        try{ //퇴장하는 유저가 호스트라면 방 end.
            String hostId = roomService.getRoomById(userRoomReq.getRoomId()).getHostId();
            if(hostId.equals(userRoomReq.getUserId())){
                System.out.println("꼬북이");
                roomService.endRoom(userRoomReq);
            }
            System.out.println("버터풀");
            userRoomRepository.deleteByRoomRoomIdAndUserUserId(userRoomReq.getRoomId(), userRoomReq.getUserId());
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<RoomRes> getRoomsByUserId(String userId) {
        List<RoomRes> rooms = new ArrayList<>();
        try{
            List<UserRoom> userRooms = userRoomRepository.findByUserUserId(userId);
            for(UserRoom ur : userRooms){
                rooms.add(new RoomRes(ur.getRoom()));
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return rooms;
    }

    @Override
    public List<UserRes> getUsersByRoomId(long roomId) {
        List<UserRes> users = new ArrayList<>();
        try{
            List<UserRoom> userRooms = userRoomRepository.findByRoomRoomId(roomId);
            for(UserRoom ur : userRooms){
                users.add(UserRes.of(ur.getUser()));
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return users;
    }
}
