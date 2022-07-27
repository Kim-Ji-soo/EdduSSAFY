package com.ssafy.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Setter
public class Quiz_QuizBook {
    @Id @GeneratedValue
    private long pk;

    @JoinColumn(name="quiz_id")
    private long quizId;

    @JoinColumn(name="quizbook_id")
    private long quizbookId;
}
