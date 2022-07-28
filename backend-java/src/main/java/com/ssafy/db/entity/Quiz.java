package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name="quiz")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Quiz {
    @Id @GeneratedValue
    @Column(name="quiz_id")
    private long quizId;

    private String content;
    private int type;

    private String quizPic;

    private int optionSize;

    private String options;

    //복수 정답을 위해선 나중에 따로 처리해줘야 됨.
    private String answer;
}
