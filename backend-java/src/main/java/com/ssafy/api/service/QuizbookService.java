package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;

import java.util.List;
import java.util.Optional;

public interface QuizbookService {
    Quizbook createQuizBook (QuizBookCreateGetReq quizBookCreateGetReq);
    Optional<Quizbook> getQuizBookById(long quizbookId);

    boolean checkQuizBookId(long quizbookId);

    boolean deleteQuizBookById(long quizbookId);

//    List<Quiz> getQuizList(long quizbookId);
}
