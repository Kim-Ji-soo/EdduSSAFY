package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserQuizbook;
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
    public Quizbook createQuizBook(QuizBookCreateGetReq quizBookCreateGetReq) {
        Quizbook quizBook = new Quizbook();
        quizBook.setQuizbookSize(0);

        quizBookRepository.save(quizBook) ;
        UserQuizbook userQuizbook = new UserQuizbook();
        User user = new User();
        user.setUserId(quizBookCreateGetReq.getUserId());
        userQuizbook.setUser(user);
        userQuizbook.setQuizbook(quizBook);
        userQuizBookRepository.save(userQuizbook);
        return quizBook;
    }

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
    public Quizbook getQuizBookById(long quizbookId) {
        return null;
    }

    @Override
    public boolean checkQuizBookId(long quizbookId) {
        return false;
    }

    @Override
    public boolean deleteQuizBookById(long quizbookId) {
        try {
            quizBookRepository.deleteById(quizbookId);
            return true;
        }
        catch(Exception e){
            return false;
        }

    }
}
