package com.ssafy.api.service;

import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.db.entity.UserRoom;
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
    @Override
    public boolean register(UserRoomReq userRoomReq) {

        try{
            userRoomRepository.save(userRoomReq.toEntity());
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean delete(UserRoomReq userRoomReq) {
        try{
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
}
