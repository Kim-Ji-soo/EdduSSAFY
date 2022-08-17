package com.ssafy.api.service;

import com.ssafy.api.request.RoomAlterReq;
import com.ssafy.api.request.RoomCreateReq;
import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.db.entity.Room;

import java.util.List;

public interface RoomService {
    Room createRoom(RoomCreateReq roomCreateReq);

    boolean deleteRoom(Long roomId);

    boolean alterRoom(RoomAlterReq roomAlterReq);


    boolean startRoom(UserRoomReq userRoomReq);

    boolean endRoom(UserRoomReq userRoomReq);

    RoomRes getRoomById(long roomId);

    boolean isRoomActive(long roomId);

    List<RoomRes> getAllRooms();

    List<RoomRes> searchRooms(String word);

    boolean checkRoomPassword(long roomId, String password);

    List<RoomRes> getActiveRooms();
}
