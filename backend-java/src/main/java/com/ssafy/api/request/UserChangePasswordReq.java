package com.ssafy.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserChangePasswordReq {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String userId;
	@ApiModelProperty(name="옛날 Password", example="your_password")
	String oldPassword;
	@ApiModelProperty(name="새로운 Password", example="newPwd")
	String newPassword;
}
