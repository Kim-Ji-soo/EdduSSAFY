package com.ssafy.api.controller;

import com.ssafy.api.request.RoomAlterReq;
import com.ssafy.api.request.RoomCreateReq;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Room;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value ="방 API", tags = {"Room"})
@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<Room> createRoom(@RequestBody RoomCreateReq roomCreateReq){
        Room room = roomService.createRoom(roomCreateReq);
        if(room == null){
           return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(room);
    };

    @PutMapping("/alterRoom")
    public ResponseEntity<Boolean> alterRoom(@RequestBody RoomAlterReq roomAlterReq){

        if(roomService.alterRoom(roomAlterReq)){
            return ResponseEntity.status(400).body(false);
        }
        return ResponseEntity.status(200).body(true);
    };

    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<Boolean> deleteRoom(@PathVariable("roomId") Long roomId){

        if(!roomService.deleteRoom(roomId)){
            return ResponseEntity.status(400).body(false);
        }

        return ResponseEntity.status(200).body(true);
    }


}
