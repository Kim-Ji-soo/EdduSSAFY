package com.seveneleven.c111.api.controller;

import com.seveneleven.c111.api.requset.UserLoginPostReq;
import com.seveneleven.c111.api.requset.UserRegisterPostReq;
import com.seveneleven.c111.api.requset.UserUpdateDto;
import com.seveneleven.c111.api.response.BaseResponseBody;
import com.seveneleven.c111.api.response.UserLoginDtoRes;
import com.seveneleven.c111.api.service.UserService;
import com.seveneleven.c111.common.JwtTokenUtil;
import com.seveneleven.c111.common.SsafyUserDetails;
import com.seveneleven.c111.db.entity.User;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.NoSuchElementException;



@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/users")
public class UserController {
    public static Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

        // 임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        User user = userService.createUser(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/login")
    @ApiOperation(value = "login.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserLoginDtoRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
        String userId = loginInfo.getId();
        String password = loginInfo.getPassword();

        User user = userService.getUserByUserId(userId);
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if(passwordEncoder.matches(password, user.getUserPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(UserLoginDtoRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(UserLoginDtoRes.of(401, "Invalid Password", null));
    }

    @GetMapping("/idcheck/{user_id}")
    @ApiOperation(value = "회원 아이디 중복 체크", notes = "회원가입 시 회원 아이디 중복 체크 검사")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> idCheck(@PathVariable("user_id") String userId) {
        boolean temp = userService.checkUserId(userId);
        System.out.println(temp);
        if (temp == true) {
            System.out.println("id 중복이 없다");
            return ResponseEntity.status(200).body(userService.checkUserId(userId));
        } else
            System.out.println("id 중복이 있다.");
        return ResponseEntity.status(401).body(userService.checkUserId(userId));
    }

    // 회원 정보 수정 (비밀번호 수정)
    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보 수정")
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody UserUpdateDto updateUserDto) throws Exception {
        User user;
        try {
            user = userService.getUserByUserId(updateUserDto.getUser_id());
        }catch(NoSuchElementException E) {
            System.out.println("회원 수정 실패");
            return  ResponseEntity.status(500).body("해당 회원 없어서 회원 수정 실패");
        }
        userService.updateUser(updateUserDto);
        System.out.println("업데이트 됨");
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }


    // 회원탈퇴.
    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "해당 회원 없음")})
    @DeleteMapping("/remove/{user_id}")
    public ResponseEntity<String> userdelete(@PathVariable("user_id") String id) throws Exception {
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

    // 회원 비밀번호 변경을 위한 비밀번호 체크
    @PutMapping("/update/password")
    @ApiOperation(value = "비밀번호 변경")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
                    @ApiResponse(code = 401, message = "인증 실패"),
                    @ApiResponse(code = 404, message = "사용자 없음"),
                    @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<String> checkUserPassword(@RequestParam String user_password, @ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저
         * 식별. 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access
         * Denied"}) 발생.
         */
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        if(passwordEncoder.matches(user_password, user.getUserPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.status(200).body("Success");
        }
        return ResponseEntity.status(401).body("Invalid Password");
    }
}