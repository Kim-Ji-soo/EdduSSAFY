package com.ssafy.api.request;

import lombok.Data;

@Data
public class ScoreReq {
    private String userId;
    private long roomId;
    private int score;

}
