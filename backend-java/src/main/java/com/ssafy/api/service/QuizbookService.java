package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.db.entity.Quizbook;

import java.util.Optional;

public interface QuizbookService {
    Quizbook createQuizBook (QuizBookCreateGetReq quizBookCreateGetReq);
    Optional<Quizbook> getQuizBookById(long quizbookId);

    boolean checkQuizBookId(long quizbookId);

    boolean deleteQuizBookById(long quizbookId);
}
