package com.ssafy.api.response;

import com.ssafy.db.entity.User;
import lombok.Data;

@Data
public class UserInRoomRes extends UserRes{
    private int score;

    public static UserInRoomRes of(User user) {
        UserInRoomRes res = new UserInRoomRes();
        res.setUserId(user.getUserId());
        res.setName(user.getName());
        res.setNickName(user.getNickname());
        res.setTel(user.getTel());
        res.setEmail(user.getEmail());
        res.setPosition(user.getPosition());
        return res;
    }
}
