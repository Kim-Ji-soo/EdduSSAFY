package com.ssafy.api.service;

import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.db.entity.Quiz;

import java.util.List;

public interface QuizService {
    Quiz createQuiz (QuizCreateReq quizCreateReq);

    boolean alterQuiz(Quiz quiz);

    boolean deleteQuiz(Long quizId);

    List<Quiz> searchByQuizbookId(Long quizbookId);
}
