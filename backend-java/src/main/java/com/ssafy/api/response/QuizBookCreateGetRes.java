package com.ssafy.api.response;

import com.ssafy.db.entity.Quizbook;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("QuizBookCreateGetRes")
public class QuizBookCreateGetRes {
    private long quizbookId;

    public static QuizBookCreateGetRes of(Quizbook quizBook){
        QuizBookCreateGetRes res = new QuizBookCreateGetRes();
        res.setQuizbookId(quizBook.getQuizbookId());
        return res;
    }
}
