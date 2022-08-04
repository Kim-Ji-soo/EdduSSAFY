package com.ssafy.api.request;

import com.ssafy.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor /** Cannot construct instance of~ error를 해결해주었다.  파라미터가 없는 생성자 만들어줌* */ 
public class UserUpdateReq {
	private String userId;

	private String position;

	private String name;

	private String password;

	private String nickname;

	private String tel;


//    public User toEntity(){
//        return User.builder()
//                .userId(getUserId())
//                .password(getPassword())
//				.name(getName())
//				.nickname((getNickname()))
//				.tel(getTel())
//                .build();
//    }
}
