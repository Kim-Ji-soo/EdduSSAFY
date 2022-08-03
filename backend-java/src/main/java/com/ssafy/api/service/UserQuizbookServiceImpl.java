package com.ssafy.api.service;

import com.ssafy.api.request.UserQuizbookReq;
import com.ssafy.db.entity.UserQuizbook;
import com.ssafy.db.repository.UserQuizbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserQuizbookServiceImpl implements UserQuizbookService {

    @Autowired
    UserQuizbookRepository userQuizbookRepository;

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
}
