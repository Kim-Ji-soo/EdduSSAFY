package com.ssafy.api.service;

import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;

import java.util.List;

public interface UserRoomService {
    boolean register(UserRoomReq userRoomReq);

    boolean delete(UserRoomReq userRoomReq);

    List<RoomRes> getRoomsByUserId(String userId);
}
