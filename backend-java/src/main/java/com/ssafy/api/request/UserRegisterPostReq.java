package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String id;
	@ApiModelProperty(name="유저 Password", example="123123")
	String password;
<<<<<<< HEAD
	@ApiModelProperty(name="유저 Password", example="your_password")
	String email;

=======
	@ApiModelProperty(name="유저 name", example="피카츄")
	String name;
	@ApiModelProperty(name="유저 nickname", example="라이츄")
	String nickname;
	@ApiModelProperty(name="유저 email", example="pika@naver.com")
	String email;
	@ApiModelProperty(name="유저 position", example="student")
	String position;
	@ApiModelProperty(name="유저 tel", example="010-1234-1234")
	String tel;
>>>>>>> origin/0731backend
}
