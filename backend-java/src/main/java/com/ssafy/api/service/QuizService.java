package com.ssafy.api.service;

import com.ssafy.api.request.QuizAlterReq;
import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.api.response.QuizRes;
import com.ssafy.db.entity.Quiz;

import java.util.List;

public interface QuizService {
    QuizRes createQuiz (QuizCreateReq quizCreateReq);

    boolean alterQuiz(QuizAlterReq quizAlterReq);

    boolean deleteQuiz(Long quizId);

    List<QuizRes> searchByQuizbookId(Long quizbookId);

    Quiz findQuiz(long quizId);
}
