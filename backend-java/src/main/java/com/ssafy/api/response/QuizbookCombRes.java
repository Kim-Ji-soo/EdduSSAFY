package com.ssafy.api.response;

import com.ssafy.db.entity.Quiz;
import lombok.Data;

import java.util.List;

@Data
public class QuizbookCombRes {
    private long quizbookId;

    private List<Quiz> quizs;
}
