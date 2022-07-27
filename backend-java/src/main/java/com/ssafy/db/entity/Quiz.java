package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name="quiz")
@Getter @Setter
public class Quiz {
    @Id @GeneratedValue
    @Column(name="quiz_id")
    private long quizId;

    private String content;
    private int type;

    @Column(name="quiz_pic")
    private int quizPic;

    @Column(name="optionSize")
    private int optionSize;

    private String options;

    private String answer;
}
