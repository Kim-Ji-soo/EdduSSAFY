package com.ssafy.api.response;

import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import lombok.Data;

import java.util.List;

@Data
public class QuizbooksOfUserRes {
    String userID;
    List<Quizbook> quizbooks;
    List<List<Quiz>> quizsInQuizbooks;
}
