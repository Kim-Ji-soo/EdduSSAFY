package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import java.util.NoSuchElementException;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping("/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		User user = userService.createUser(registerInfo);
		if(user == null){
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "failed"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		
		return ResponseEntity.status(200).body(UserRes.of(user));
	}

	@GetMapping("/idcheck/{userId}")
	@ApiOperation(value = "회원 아이디 중복 체크", notes = "회원가입 시 회원 아이디 중복 체크 검사")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> idCheck(@PathVariable("userId") String userId) {
		boolean temp = userService.checkUserId(userId);
		System.out.println(temp);
		if (temp == false ) {
			System.out.println("id 중복이 없다");
			return ResponseEntity.status(200).body(temp);
		} else
			System.out.println("id 중복이 있다.");
		return ResponseEntity.status(200).body(temp);
	}

	// 회원 정보 수정 (비밀번호 수정)
	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보 수정")
	@PutMapping("/update")
	public ResponseEntity<String> updateUser(@RequestBody UserUpdateReq updateUserReq) throws Exception {
		User user;
		try {
			user = userService.getUserByUserId(updateUserReq.getUserId());
		}catch(NoSuchElementException E) {
			System.out.println("회원 수정 실패");
			return  ResponseEntity.status(500).body("해당 회원 없어서 회원 수정 실패");
		}
		if(!userService.updateUser(updateUserReq, user)){
			return ResponseEntity.status(400).body("업데이트 실패");
		}
		System.out.println("업데이트 됨");
		return ResponseEntity.status(200).body("업데이트 성공");
	}


	// 회원탈퇴.
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "해당 회원 없음")})
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable("userId") String id) throws Exception {
		boolean result;
		try {
			User user = userService.getUserByUserId(id);
			result = userService.deleteByUserId(user);
			System.out.println(result);
		}catch(NoSuchElementException E) {
			System.out.println("회원 탈퇴 실패");
			return  ResponseEntity.status(500).body("해당 회원 없어서 회원 탈퇴 실패");
		}
		logger.debug("회원 탈퇴 성공");
		return ResponseEntity.status(200).body("회원 탈퇴 성공");
	}

	@PutMapping("/changePassword")
	public ResponseEntity<Boolean> changePassword(@RequestBody UserChangePasswordReq userInfo){

		if(!userService.changePassword(userInfo)){
			return  ResponseEntity.status(400).body(false);
		}
		return ResponseEntity.status(200).body(true);
	}

	@PutMapping("/resetPassword")
	public ResponseEntity<Boolean> resetPassword(@RequestBody ResetPwdReq resetPwdReq){
		if(!userService.resetPassword(resetPwdReq)){
			return  ResponseEntity.status(400).body(false);
		}
		return ResponseEntity.status(200).body(true);
	}

}

