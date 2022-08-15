package com.ssafy.api.request;

import lombok.Data;

@Data
public class ResetPwdReq {
    private String email;

    private String authKey;

    private String userId;

    private String password;
}
