package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.db.entity.QuizBook;
import com.ssafy.db.repository.QuizBookRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImpl implements  QuizService{
    @Autowired
    QuizBookRepository quizBookRepository;

    @Override
    public QuizBook createQuizBook(QuizBookCreateGetReq quizBookCreateGetReq) {
        QuizBook quizBook = new QuizBook();
        quizBook.setQuizbookSize(0);

        return quizBookRepository.save(quizBook) ;
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
