package com.ssafy.api.response;

import com.ssafy.db.entity.Quizbook;
import lombok.Data;

@Data
public class QuizbookRes {
    public QuizbookRes(Quizbook quizbook){
        setQuizbookId(quizbook.getQuizbookId());
        setTitle(quizbook.getTitle());
        setUserId(quizbook.getUser().getUserId());
    }
    private long quizbookId;
    private String title;
    private String userId;
}
