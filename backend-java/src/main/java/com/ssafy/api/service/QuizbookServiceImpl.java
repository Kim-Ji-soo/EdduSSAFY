package com.ssafy.api.service;

import com.ssafy.api.request.QuizbookCreateReq;
import com.ssafy.api.request.QuizbookUpdateReq;
import com.ssafy.api.response.QuizRes;
import com.ssafy.api.response.QuizbookRes;
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
        List<QuizbookRes>quizbookResList = new ArrayList<>();
        List<List<QuizRes>> quizResListList = new ArrayList<>();
        try{
            quizbooks = quizbookRepository.findAllByUserUserId(userId);
            for(Quizbook qb : quizbooks){
                quizbookResList.add(new QuizbookRes(qb));
                quizResListList.add( quizService.searchByQuizbookId(qb.getQuizbookId()));
            }

        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        if(quizbookResList.size() != quizResListList.size()){
            System.out.println("뭔가 오류");
            return null;
        }
        QuizbooksOfUserRes res = new QuizbooksOfUserRes();
        res.setQuizbooks(quizbookResList);
        res.setQuizsInQuizbooks(quizResListList);

        return res;
    }

    @Override
    public boolean alterQuizbook(QuizbookUpdateReq quizbookUpdateReq) {
        try{
            Quizbook qb = quizbookUpdateReq.toEntity();
            qb.setUser (quizbookRepository.findById(quizbookUpdateReq.getQuizbookId()).get().getUser());
            quizbookRepository.save(qb);
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
//    @Override
//    public List<Quiz> getQuizList(long quizbookId) {
//        return quizbookRepository.findByQuizbookId(quizbookId);
//    }
}
