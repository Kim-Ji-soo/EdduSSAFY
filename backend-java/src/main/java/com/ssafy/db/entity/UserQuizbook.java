package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity(name="user_quizbook")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table( uniqueConstraints={
        @UniqueConstraint(
                columnNames={"user_id", "quizbook_id"}
        )
})
public class UserQuizbook {
    @Id @GeneratedValue
    private long pk;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name="quizbook_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Quizbook quizbook;
//    @JoinColumn(name="user_id")
//    private String userId;
//
//    @JoinColumn(name="quizbook_id")
//    private long quizbookId;


}
