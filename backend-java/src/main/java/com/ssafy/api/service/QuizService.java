package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.db.entity.QuizBook;

public interface QuizService {

    QuizBook createQuizBook (QuizBookCreateGetReq quizBookCreateGetReq);

    QuizBook getQuizBookById(long quizbookId);

    boolean checkQuizBookId(long quizbookId);

    boolean deleteQuizBookById(long quizbookId);

}
