package com.ssafy.api.response;

import com.ssafy.db.entity.Quizbook;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QuizBookCreateGetRes")
public class QuizbookCreateRes {
    private long quizbookId;

    public static QuizbookCreateRes of(Quizbook quizBook){
        QuizbookCreateRes res = new QuizbookCreateRes();
        res.setQuizbookId(quizBook.getQuizbookId());
        return res;
    }
}
