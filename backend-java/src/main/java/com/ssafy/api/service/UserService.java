package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);

	boolean checkUserId(String userid);
	boolean checkEmail(String email);

	boolean deleteByUserId(User user);
	boolean updateUser(UserUpdateReq updateUserDto, User user);


    boolean changePassword(UserChangePasswordReq userInfo);

	boolean resetPassword(ResetPwdReq resetPwdReq);
}
