package com.ssafy.api.request;

import com.ssafy.db.entity.Quizbook;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserQuizbook;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserQuizbookReq {

    @ApiModelProperty(name="유저 ID", example="ssafy_web")
    private String userId;

    @ApiModelProperty(name="quizbook ID", example="1")
    private long quizbookId;

    public UserQuizbook toEntity(){
        return UserQuizbook.builder()
                .user(User.builder().userId(getUserId()).build())
                .quizbook(Quizbook.builder().quizbookId(getQuizbookId()).build())
                .build();
    }

}
