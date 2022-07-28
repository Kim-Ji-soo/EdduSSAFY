package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.db.entity.QuizBook;
import com.ssafy.db.entity.User_QuizBook;
import com.ssafy.db.repository.QuizBookRepository;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.User_QuizBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImpl implements  QuizService{
    @Autowired
    QuizBookRepository quizBookRepository;

    @Autowired
    User_QuizBookRepository user_quizBookRepository;

    @Override
    public QuizBook createQuizBook(QuizBookCreateGetReq quizBookCreateGetReq) {
        QuizBook quizBook = new QuizBook();
        quizBook.setQuizbookSize(0);

        //
        quizBookRepository.save(quizBook) ;
        User_QuizBook user_quizBook = new User_QuizBook();
        user_quizBook.setUserId(quizBookCreateGetReq.getUserId());
        user_quizBook.setQuizbookId(quizBook.getQuizbookId());
        user_quizBookRepository.save(user_quizBook);
        return quizBook;
    }

    @Override
    public QuizBook getQuizBookById(long quizbookId) {
        return null;
    }

    @Override
    public boolean checkQuizBookId(long quizbookId) {
        return false;
    }

    @Override
    public boolean deleteQuizBookById(long quizbookId) {
        return false;
    }
}
