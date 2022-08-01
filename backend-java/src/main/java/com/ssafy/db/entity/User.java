package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.ssafy.api.request.UserRegisterPostReq;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 유저 모델 정의.
 */
@Entity(name="user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id @Column(name="user_id")
    private String userId;

    private String position;

<<<<<<< HEAD
    String email;

    String tel;
=======
    private String name;
>>>>>>> origin/0731backend

    private String password;

    private Boolean isActive;

    private String nickname;

    private String email;

    private String tel;

}
