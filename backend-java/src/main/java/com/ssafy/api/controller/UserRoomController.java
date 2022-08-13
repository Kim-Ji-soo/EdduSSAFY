package com.ssafy.api.controller;

import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.response.UserInRoomRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserRoomService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="유저-방 API", tags = {"UserRoom"})
@RestController
@RequestMapping("/api/v1/user_room")
public class UserRoomController {

    @Autowired
    UserRoomService userRoomService;

    @PostMapping("/enter")
    public ResponseEntity<? extends BaseResponseBody> enterRoom(@RequestBody UserRoomReq userRoomReq){
        if(!userRoomService.enterRoom(userRoomReq)){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "유저-방 등록 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저-방 등록 성공"));
    }

    @DeleteMapping("/quit")
    public ResponseEntity<? extends BaseResponseBody> quitRoom(@RequestBody UserRoomReq userRoomReq){
        if(!userRoomService.quitRoom(userRoomReq)){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "유저-방 등록해제 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저-방 등록해제 성공"));
    }

    @GetMapping("/roomList/{userId}")
    public ResponseEntity<List<RoomRes>> getRoomsByUserId(@PathVariable("userId") String userId) {
        List<RoomRes> rooms = userRoomService.getRoomsByUserId(userId);

        if (rooms == null) {
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(rooms);
    }

    @GetMapping("/userList/{roomId}")
    public ResponseEntity<List<UserRes>> getUsersByRoomId(@PathVariable("roomId") long roomId) {
        List<UserRes> infos = userRoomService.getUsersByRoomId(roomId);
        if (infos == null) {
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(infos);
    }


}
