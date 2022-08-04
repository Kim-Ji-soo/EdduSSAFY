package com.ssafy.api.service;

import com.ssafy.api.request.UserQuizbookReq;
import com.ssafy.api.response.QuizbooksOfUserRes;

public interface UserQuizbookService {
    public Boolean register(UserQuizbookReq userQuizbookReq);

    public boolean delete(UserQuizbookReq userQuizbookReq);

    QuizbooksOfUserRes getQuizbookCombsByUserId(String userId);
}
