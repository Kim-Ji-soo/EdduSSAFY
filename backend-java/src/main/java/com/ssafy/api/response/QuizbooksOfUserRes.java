package com.ssafy.api.response;

import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import lombok.Data;

import java.util.List;

@Data
public class QuizbooksOfUserRes {
    List<QuizbookRes> quizbooks;
    List<List<QuizRes>> quizsInQuizbooks;
}
