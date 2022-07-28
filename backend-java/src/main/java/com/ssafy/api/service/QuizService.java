package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;

public interface QuizService {

    Quizbook createQuizBook (QuizBookCreateGetReq quizBookCreateGetReq);
    Quiz createQuiz (QuizCreateReq quizCreateReq);

    Quizbook getQuizBookById(long quizbookId);

    boolean checkQuizBookId(long quizbookId);

    boolean deleteQuizBookById(long quizbookId);

}
