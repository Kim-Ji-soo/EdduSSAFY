package com.ssafy.api.service;

import com.ssafy.api.request.EmailReq;

public interface EmailService {
    Boolean sendSimpleMessage(EmailReq emailReq);
    public Boolean confirmCode(EmailReq emailReq);
}