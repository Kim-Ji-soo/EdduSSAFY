package com.seveneleven.c111.api.requset;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LoginRegRequest")
public class LoginReq {
	@ApiModelProperty
	String email;
	@ApiModelProperty
	String password;

}
