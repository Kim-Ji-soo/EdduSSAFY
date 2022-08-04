package com.ssafy.api.service;

import com.ssafy.api.request.UserQuizbookReq;
import com.ssafy.api.response.QuizbooksOfUserRes;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import com.ssafy.db.entity.UserQuizbook;
import com.ssafy.db.repository.UserQuizbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserQuizbookServiceImpl implements UserQuizbookService {

    @Autowired
    UserQuizbookRepository userQuizbookRepository;

    @Autowired
    QuizService quizService;

    @Override
    public Boolean register(UserQuizbookReq userQuizbookReq) {
        UserQuizbook uqb = userQuizbookReq.toEntity();

        try {
            userQuizbookRepository.save(uqb);
        }
        catch(Exception e){
            return false;
        }
        return true;
    }

    @Override
    public boolean delete(UserQuizbookReq userQuizbookReq) {
        try {
            userQuizbookRepository
                    .deleteByUser_UserIdAndQuizbook_QuizbookId(userQuizbookReq.getUserId(), userQuizbookReq.getQuizbookId());
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public QuizbooksOfUserRes getQuizbookCombsByUserId(String userId) {
        List<UserQuizbook> uqs;
        List<Quizbook> quizbooks;
        List<List<Quiz>> quizsList;
        try{
            uqs = userQuizbookRepository.findAllByUser_UserId(userId);
            //System.out.println("피카츄 " + uqs.toString());
            quizsList = new ArrayList<>();
            quizbooks = new ArrayList<>();
            for(UserQuizbook uqb : uqs){
                Quizbook qb= uqb.getQuizbook();
                System.out.println("피카 " + qb);
                quizbooks.add(qb);
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
}
