package com.ssafy.api.service;

import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.db.entity.Quiz;

public interface QuizService {
    Quiz createQuiz (QuizCreateReq quizCreateReq);

    boolean alterQuiz(Quiz quiz);

    boolean deleteQuiz(Long quizId);
}
