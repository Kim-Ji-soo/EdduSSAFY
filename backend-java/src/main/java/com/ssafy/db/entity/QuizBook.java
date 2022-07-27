package com.ssafy.db.entity;


import lombok.*;

import javax.persistence.*;

@Entity(name="quizbook")
@Getter
@Setter
public class QuizBook {

    @Id
    @GeneratedValue
    @Column(name="quizbook_id")
    private long quizbookId;

    @Column(name="quizbook_size")
    private int quizbookSize;


}
