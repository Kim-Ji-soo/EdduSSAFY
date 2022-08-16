package com.ssafy.api.response;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RoomRes {

    public RoomRes(Room room){
        setRoomId(room.getRoomId());
        setTitle(room.getTitle());
        setDescription(room.getDescription());
        setRoomStartTime(room.getRoomStartTime());
        setActive(room.isActive());
        setHostId(room.getHost().getUserId());

        if(room.getPassword() == null || room.getPassword().length() == 0){
            setHasPassword(false);
        }
        else{
            setHasPassword(true);
        }

    }

    private long roomId;

    private String title;

    private String description;

    private LocalDateTime roomStartTime;

    private boolean isActive;

    private String hostId;

    private Boolean hasPassword;


}
