package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.ssafy.api.request.UserRegisterPostReq;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * 유저 모델 정의.
 */
@Entity(name="user")
@Getter
@Setter
public class User {

    @Id @Column(name="user_id")
    private String userId;

    private String position;

    private String name;

    private String password;

    private Boolean isActive;

    private String nickname;

    private String email;

    private String tel;

}
