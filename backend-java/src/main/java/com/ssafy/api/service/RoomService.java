package com.ssafy.api.service;

import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.api.request.RoomAlterReq;
import com.ssafy.api.request.RoomCreateReq;
import com.ssafy.db.entity.Room;

public interface RoomService {
    public Room createRoom(RoomCreateReq roomCreateReq);

    boolean deleteRoomById(Long roomId);

    boolean alterRoom(RoomAlterReq roomAlterReq);
}
