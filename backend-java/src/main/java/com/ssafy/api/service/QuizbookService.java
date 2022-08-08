package com.ssafy.api.service;

import com.ssafy.api.request.QuizbookCreateReq;
import com.ssafy.api.response.QuizbooksOfUserRes;
import com.ssafy.db.entity.Quizbook;

import java.util.Optional;

public interface QuizbookService {
    Quizbook createQuizBook (QuizbookCreateReq quizbookCreateReq);
    Optional<Quizbook> getQuizBookById(long quizbookId);

    boolean checkQuizBookId(long quizbookId);

    boolean deleteQuizBookById(long quizbookId);

    QuizbooksOfUserRes getQuizbookCombsByUserId(String userId);
//    List<Quiz> getQuizList(long quizbookId);
}
