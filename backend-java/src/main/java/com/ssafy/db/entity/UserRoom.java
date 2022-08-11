package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name="user_room",
        uniqueConstraints={
                @UniqueConstraint(
                        name= "constraint_one_user_in_one_room",
                        columnNames={"user_id", "room_id"}
                )
        }
)
public class UserRoom {
    @Id @GeneratedValue
    private long pk;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name="room_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Room room;

    private int score;
}
