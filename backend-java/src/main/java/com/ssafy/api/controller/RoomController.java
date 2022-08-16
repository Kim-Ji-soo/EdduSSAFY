package com.ssafy.api.controller;

import com.ssafy.api.request.RoomAlterReq;
import com.ssafy.api.request.RoomCreateReq;
import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value ="방 API", tags = {"Room"})
@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<RoomRes> createRoom(@RequestBody RoomCreateReq roomCreateReq){
        Room room = roomService.createRoom(roomCreateReq);
        if(room == null){
           return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(new RoomRes(room));
    };

    @PutMapping("/alterRoom")
    public ResponseEntity<Boolean> alterRoom(@RequestBody RoomAlterReq roomAlterReq){

        if(roomService.alterRoom(roomAlterReq)){
            return ResponseEntity.status(400).body(false);
        }
        return ResponseEntity.status(200).body(true);
    };


    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<Boolean> deleteRoom(@PathVariable("roomId") long roomId){

        if(!roomService.deleteRoom(roomId)){
            return ResponseEntity.status(400).body(false);
        }

        return ResponseEntity.status(200).body(true);
    }

    @PutMapping("/start")
    public ResponseEntity<Boolean> startRoom(@RequestBody UserRoomReq userRoomReq){
        if(!roomService.startRoom(userRoomReq)){
            return ResponseEntity.status(400).body(false);
        }

        return ResponseEntity.status(200).body(true);
    }

    @PutMapping("/end")
    public ResponseEntity<Boolean> endRoom(@RequestBody UserRoomReq userRoomReq){
        if(!roomService.endRoom(userRoomReq)){
            return ResponseEntity.status(400).body(false);
        }

        return ResponseEntity.status(200).body(true);
    }

    @GetMapping("/allrooms")
    public ResponseEntity<List<RoomRes>> allRooms(){
        List<RoomRes> allRooms = roomService.getAllRooms();
        if(allRooms == null){
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.status(200).body(allRooms);
    }

    @GetMapping("/activeRooms")
    public ResponseEntity<List<RoomRes>> getActiveRooms(){
        List<RoomRes> allRooms = roomService.getActiveRooms();
        if(allRooms == null){
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.status(200).body(allRooms);
    }

//   @PostMapping("/enter")
//    public ResponseEntity<Boolean> enterRoom(@RequestBody RoomEnterReq roomEnterReq){
//        if(!roomService.enterRoom(roomEnterReq)){
//            return ResponseEntity.status(400).body(false);
//        }
//
//       return ResponseEntity.status(200).body(true);
//   }

    //제목이나 방 생성자 아이디로 검색.
    @GetMapping("/search/{word}")
    public ResponseEntity<List<RoomRes>> searchRooms(@PathVariable("word") String word){
        List<RoomRes> rooms = roomService.searchRooms(word);
        if(rooms == null){
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.status(200).body(rooms);
    }



}
