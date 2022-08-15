package com.ssafy.api.request;

import lombok.Data;

@Data
public class EmailReq {
    private String email;

    private String authKey;

    //register = 회원가입 이메일 인증, reset = 비밀번호 재발급 이메일 인증.
    private String reqType;
}
