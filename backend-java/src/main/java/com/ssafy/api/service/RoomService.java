package com.ssafy.api.service;

import com.ssafy.api.request.RoomAlterReq;
import com.ssafy.api.request.RoomCreateReq;
import com.ssafy.db.entity.Room;

public interface RoomService {
    Room createRoom(RoomCreateReq roomCreateReq);

    boolean deleteRoom(Long roomId);

    boolean alterRoom(RoomAlterReq roomAlterReq);
}
