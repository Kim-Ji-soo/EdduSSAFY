package com.ssafy.api.service;

import com.ssafy.api.request.UserQuizbookReq;

public interface UserQuizbookService {
    public Boolean register(UserQuizbookReq userQuizbookReq);

    public boolean delete(UserQuizbookReq userQuizbookReq);
}
