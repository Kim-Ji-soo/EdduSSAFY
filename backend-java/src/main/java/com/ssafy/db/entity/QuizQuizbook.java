package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity(name="quiz_quizbook")
@Getter
@Setter
public class QuizQuizbook {
    @Id @GeneratedValue
    private long pk;

    @ManyToOne
    @JoinColumn(name="quiz_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name="quizbook_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Quizbook quizbook;

//    @JoinColumn(name="quiz_id")
//    private long quizId;
//
//    @JoinColumn(name="quizbook_id")
//    private long quizbookId;
}
