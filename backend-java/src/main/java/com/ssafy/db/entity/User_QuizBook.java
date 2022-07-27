package com.ssafy.db.entity;

import lombok.*;
import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class User_QuizBook {
    @Id @GeneratedValue
    private long pk;

    @JoinColumn(name="user_id")
    private String userId;

    @JoinColumn(name="quizbook_id")
    private long quizbookId;


}
