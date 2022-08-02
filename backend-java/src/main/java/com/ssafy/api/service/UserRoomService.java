package com.ssafy.api.service;

import com.ssafy.api.request.UserRoomReq;

public interface UserRoomService {
    boolean register(UserRoomReq userRoomReq);

    boolean delete(UserRoomReq userRoomReq);
}
