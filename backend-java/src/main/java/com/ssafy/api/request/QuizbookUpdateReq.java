package com.ssafy.api.request;

import com.ssafy.db.entity.Quizbook;
import com.ssafy.db.entity.User;
import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class QuizbookUpdateReq {
    private long quizbookId;

    private String title;

    public Quizbook toEntity() {
        return Quizbook.builder()
                .quizbookId(getQuizbookId())
                .title(getTitle())
                .build();
    }
}
