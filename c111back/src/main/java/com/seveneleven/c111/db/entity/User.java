package com.seveneleven.c111.db.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "user_id", length = 20, nullable = false)
    String userId;

    @Column(name = "user_name", length = 20, nullable = false)
    String userName;

    @Column(name = "user_password", length = 200, nullable = false)
    String userPassword;

    @Email
    @Column(length = 200, nullable = false)
    String userEmail;


    public String getUserId() {return userId;}

    @Builder
    public void updateUser(String user_name, String user_Password) {
        this.userName = user_name;
        this.userPassword = user_Password;
    }
}
