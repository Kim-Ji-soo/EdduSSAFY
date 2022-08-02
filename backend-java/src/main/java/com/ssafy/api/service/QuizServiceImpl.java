package com.ssafy.api.service;

import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.repository.QuizRepository;
import com.ssafy.db.repository.QuizbookRepository;
import com.ssafy.db.repository.UserQuizbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImpl implements  QuizService{
    @Autowired
    QuizbookRepository quizBookRepository;

    @Autowired
    UserQuizbookRepository userQuizBookRepository;

    @Autowired
    QuizRepository quizRepository;

    @Override
    public Quiz createQuiz(QuizCreateReq quizCreateReq) {
        Quiz quiz = quizCreateReq.toEntity();
        try {
            quizRepository.save(quiz);
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return quiz;
    }

    @Override
    public boolean alterQuiz(Quiz quiz) {
        try{
            quizRepository.save(quiz);
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteQuiz(Long quizId) {
        try{
            quizRepository.deleteById(quizId);
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
