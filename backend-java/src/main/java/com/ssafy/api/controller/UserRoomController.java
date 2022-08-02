package com.ssafy.api.controller;

import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.service.UserRoomService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value ="유저-방 API", tags = {"UserRoom"})
@RestController
@RequestMapping("/api/v1/user_room")
public class UserRoomController {

    @Autowired
    UserRoomService userRoomService;

    @PostMapping("/register")
    public ResponseEntity<? extends BaseResponseBody> register (@RequestBody UserRoomReq userRoomReq){
        if(!userRoomService.register(userRoomReq)){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "유저-방 등록 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저-방 등록 성공"));
    }

    @DeleteMapping("/delete/{userRoomId}")
    public ResponseEntity<? extends BaseResponseBody> delete (@RequestBody UserRoomReq userRoomReq){
        if(!userRoomService.delete(userRoomReq)){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "유저-방 등록해제 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저-방 등록해제 성공"));
    }
}
