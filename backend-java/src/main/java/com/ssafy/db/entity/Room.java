package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Room {

    @Id @GeneratedValue
    private long roomId;

    private String title;

    private String password;

    private String description;

    @CreatedDate
    private LocalDateTime roomStartTime;

    private LocalDateTime roomEndTime;

    private boolean isActive;

}
