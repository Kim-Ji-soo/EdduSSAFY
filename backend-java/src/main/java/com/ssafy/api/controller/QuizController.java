package com.ssafy.api.controller;

import com.ssafy.api.request.QuizAlterReq;
import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.api.response.QuizRes;
import com.ssafy.api.service.QuizService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value ="문제 API", tags = {"Quiz"})
@RestController
@RequestMapping("/api/v1/quiz")
public class QuizController {
    public static final Logger logger = LoggerFactory.getLogger(QuizController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    QuizService quizService;

    //임시로 문제집 등록 + 유저랑 연결까지 여기서.


    //나중에 response 만들자.
    @PostMapping("/createQuiz")
    public ResponseEntity<QuizRes> createQuiz(@ModelAttribute QuizCreateReq quizCreateReq){
////
        System.out.println("고우스트 : " + quizCreateReq);
        ///
        QuizRes quiz = quizService.createQuiz(quizCreateReq);
       if( quiz == null){
           return ResponseEntity.status(400).body(null);
       }
        return ResponseEntity.status(200).body(quiz);
    };

    //굳이 필요할까 리퀘스트가?
    @PutMapping("/alterQuiz")
    public ResponseEntity<Boolean> alterQuiz(@ModelAttribute QuizAlterReq quizAlterReq){

        if(!quizService.alterQuiz(quizAlterReq)){
            return ResponseEntity.status(400).body(false);
        }
        return ResponseEntity.status(200).body(true);
    };

    @DeleteMapping("/delete/{quizId}")
    public ResponseEntity<Boolean> deleteQuizBook(@PathVariable("quizId") Long quizId){

        if(!quizService.deleteQuiz(quizId)){
            return ResponseEntity.status(400).body(false);
        }
        return ResponseEntity.status(200).body(true);
    }
    
    @GetMapping("/searchByQuizbook/{quizbookId}")
    public ResponseEntity<List<QuizRes>> searchByQuizbookId (@PathVariable("quizbookId") Long quizbookId){
        List<QuizRes> quizs = quizService.searchByQuizbookId(quizbookId);
        if(quizs == null ){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(quizs);
    }






}
