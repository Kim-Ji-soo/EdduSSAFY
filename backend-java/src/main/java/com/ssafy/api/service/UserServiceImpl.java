package com.ssafy.api.service;

import com.ssafy.api.request.UserChangePasswordReq;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserUpdateReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		//아이디 중복이면 null 리턴
		if(checkUserId(userRegisterInfo.getUserId())){
			return null;
		}

		User user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setEmail(userRegisterInfo.getEmail());
		user.setIsActive(false);
		user.setTel(userRegisterInfo.getTel());
		user.setNickname(userRegisterInfo.getNickname());
		user.setName(userRegisterInfo.getName());
		user.setPosition(userRegisterInfo.getPosition());

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserId(userId).get();
		return user;
	}

	@Override
	public boolean checkUserId(String userid) {
		if(userRepository.countUsersByUserId(userid) == 0) {
			//
			System.out.println("안겹침");
			//
			return false;
		}
		//
		System.out.println("겹침");
		//
		return true;
	}

	@Override
	public boolean deleteByUserId(User user) {
		try {
			userRepository.delete(user);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean updateUser(UserUpdateReq updateUserDto, User user) {
		user.setName(updateUserDto.getName());
		user.setNickname(updateUserDto.getNickname());
		//user.setPosition(updateUserDto.getPosition());
		user.setTel(updateUserDto.getTel());
		//user.setPassword(passwordEncoder.encode(updateUserDto.getPassword()));


		try{
			userRepository.save(user);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean changePassword(UserChangePasswordReq userInfo) {
		try{
			User user = userRepository.findById(userInfo.getUserId()).get();
			if(!passwordEncoder.matches(userInfo.getOldPassword(), user.getPassword())){
				throw new Exception("비밀번호 틀림");
			}
			user.setPassword(passwordEncoder.encode(userInfo.getNewPassword()));
			userRepository.save(user);
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
