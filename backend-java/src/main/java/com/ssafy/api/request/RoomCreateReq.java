package com.ssafy.api.request;

import com.ssafy.db.entity.Room;
import lombok.Data;

@Data
public class RoomCreateReq {
    String userId;

    private String title;

    private String password;

    private String description;

    public Room toEntity(){
        return Room.builder()
                .description(getDescription())
                .title(getTitle())
                .password(getPassword())
                .build();
    }
}
