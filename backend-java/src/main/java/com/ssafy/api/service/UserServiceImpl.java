package com.ssafy.api.service;

import com.ssafy.api.request.UserUpdateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
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
		if(checkUserId(userRegisterInfo.getId())){
			return null;
		}

		User user = new User();
		user.setUserId(userRegisterInfo.getId());
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
		userRepository.delete(user);
		return true;
	}

	@Override
	public void updateUser(UserUpdateDto updateUserDto) {

	}
}
