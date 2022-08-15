package com.ssafy.db.entity;


import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="quizbook")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Quizbook {

    @Id
    @GeneratedValue
    private long quizbookId;

    private String title;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
//
//    @OneToMany(mappedBy = "quizbook")
//    List<Quiz> quizs = new ArrayList<>();


}
