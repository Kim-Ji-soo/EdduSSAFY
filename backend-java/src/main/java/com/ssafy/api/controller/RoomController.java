package com.ssafy.api.controller;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.api.response.QuizBookCreateGetRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Quizbook;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.UserRoom;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value ="방 API", tags = {"Room"})
@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<Room> createQuizBook(@RequestBody String userId){
        Room room = roomService.createRoom(userId);
        if(room == null){
           return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(room);
    };
}
