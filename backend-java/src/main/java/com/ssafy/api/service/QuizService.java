package com.ssafy.api.service;

import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.api.response.QuizRes;
import com.ssafy.db.entity.Quiz;

import java.util.List;

public interface QuizService {
    QuizRes createQuiz (QuizCreateReq quizCreateReq);

    boolean alterQuiz(Quiz quiz);

    boolean deleteQuiz(Long quizId);

    List<QuizRes> searchByQuizbookId(Long quizbookId);
}
