package com.ssafy.api.controller;

import com.ssafy.api.request.UserQuizbookReq;
import com.ssafy.api.response.QuizbooksOfUserRes;
import com.ssafy.api.service.UserQuizbookService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value ="유저-문제집 API", tags = {"UserQuizbook"})
@RestController
@RequestMapping("/api/v1/user_quizbook")
public class UserQuizbookController {

    @Autowired
    UserQuizbookService userQuizbookService;

    @PostMapping("/register")
    public ResponseEntity<? extends BaseResponseBody> register (@RequestBody UserQuizbookReq userQuizbookReq){
        if(!userQuizbookService.register(userQuizbookReq)){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "문제집 등록 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "문제집 등록 성공"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<? extends BaseResponseBody> delete (@RequestBody UserQuizbookReq userQuizbookReq){
        if(!userQuizbookService.delete(userQuizbookReq)){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "문제집 등록해제 실패"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "문제집 등록해제 성공"));
    }

    @GetMapping("/getQuizbookCombs/{userId}")
    public ResponseEntity<QuizbooksOfUserRes> getQuizbookCombs(@PathVariable("userId") String userId){
        QuizbooksOfUserRes res = userQuizbookService.getQuizbookCombsByUserId(userId);
        if(res == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(res);
    }
}
