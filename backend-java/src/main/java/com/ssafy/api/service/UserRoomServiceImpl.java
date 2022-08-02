package com.ssafy.api.service;

import com.ssafy.api.request.UserRoomReq;
import com.ssafy.db.repository.UserRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
