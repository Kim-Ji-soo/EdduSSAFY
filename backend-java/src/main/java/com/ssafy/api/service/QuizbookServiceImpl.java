package com.ssafy.api.service;

import com.ssafy.api.request.QuizbookCreateReq;
import com.ssafy.api.response.QuizbooksOfUserRes;
import com.ssafy.api.response.RoomRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.QuizRepository;
import com.ssafy.db.repository.QuizbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class QuizbookServiceImpl implements QuizbookService {

    @Autowired
    QuizbookRepository quizbookRepository;

    @Autowired
    QuizService quizService;

    @Override
    public Quizbook createQuizBook(QuizbookCreateReq quizbookCreateReq) {
        Quizbook quizBook = new Quizbook();
        quizBook.setUser(User.builder().userId(quizbookCreateReq.getUserId()).build());
        quizBook.setTitle(quizbookCreateReq.getTitle());
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

    @Override
    public QuizbooksOfUserRes getQuizbookCombsByUserId(String userId) {

        List<Quizbook> quizbooks;
        List<List<Quiz>> quizsList;
        try{
            quizsList = new ArrayList<>();
            quizbooks = quizbookRepository.findAllByUserUserId(userId);
            for(Quizbook qb : quizbooks){
                quizsList.add(quizService.searchByQuizbookId(qb.getQuizbookId()));
            }

        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        QuizbooksOfUserRes res = new QuizbooksOfUserRes();
        res.setUserID(userId);
        res.setQuizbooks(quizbooks);
        res.setQuizsInQuizbooks(quizsList);
        return res;
    }
//    @Override
//    public List<Quiz> getQuizList(long quizbookId) {
//        return quizbookRepository.findByQuizbookId(quizbookId);
//    }
}
