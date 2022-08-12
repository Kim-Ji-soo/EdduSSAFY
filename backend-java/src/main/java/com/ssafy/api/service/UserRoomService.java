package com.ssafy.api.service;

import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.response.UserInRoomRes;
import com.ssafy.api.response.UserRes;

import java.util.List;

public interface UserRoomService {
    boolean enterRoom(UserRoomReq userRoomReq);

    boolean quitRoom(UserRoomReq userRoomReq);

    List<RoomRes> getRoomsByUserId(String userId);

    List<UserRes> getUsersByRoomId(long roomId);
}
