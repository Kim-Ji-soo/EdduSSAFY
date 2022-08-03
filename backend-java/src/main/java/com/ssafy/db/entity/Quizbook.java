package com.ssafy.db.entity;


import lombok.*;

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
    @Column(name="quizbook_id")
    private long quizbookId;

    @Column(name="quizbook_size")
    private int quizbookSize;

    private String title;
//
//    @OneToMany(mappedBy = "quizbook")
//    List<Quiz> quizs = new ArrayList<>();


}
