package com.ssafy.api.request;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserRoom;
import lombok.Data;

@Data
public class UserRoomReq {
    private String userId;
    private long roomId;
    private String password;


    public UserRoom toEntity(){
        return UserRoom.builder()
                .user(User.builder().userId(getUserId()).build())
                .room(Room.builder().roomId(getRoomId()).build())
                .build();
    }
}
