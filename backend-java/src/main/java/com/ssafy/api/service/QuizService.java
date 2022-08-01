package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;

public interface QuizService {
    Quiz createQuiz (QuizCreateReq quizCreateReq);

    Boolean alterQuiz(Quiz quiz);

    boolean deleteQuiz(Long quizId);
}
