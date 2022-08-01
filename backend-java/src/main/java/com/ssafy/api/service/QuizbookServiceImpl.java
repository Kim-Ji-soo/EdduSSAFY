package com.ssafy.api.service;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.db.entity.Quizbook;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserQuizbook;
import com.ssafy.db.repository.QuizbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizbookServiceImpl implements QuizbookService {

    @Autowired
    QuizbookRepository quizbookRepository;

    @Override
    public Quizbook createQuizBook(QuizBookCreateGetReq quizBookCreateGetReq) {
        Quizbook quizBook = new Quizbook();
        quizBook.setQuizbookSize(0);

        quizbookRepository.save(quizBook);
        return quizBook;
    }

    @Override
    public Optional<Quizbook> getQuizBookById(long quizbookId) {

        return quizbookRepository.findById(quizbookId);

    }

    @Override
    public boolean checkQuizBookId(long quizbookId) {

        return quizbookRepository.findById(quizbookId).isPresent();
    }

    @Override
    public boolean deleteQuizBookById(long quizbookId) {
        try {
            quizbookRepository.deleteById(quizbookId);
            return true;
        }
        catch(Exception e){
            return false;
        }

    }
}
