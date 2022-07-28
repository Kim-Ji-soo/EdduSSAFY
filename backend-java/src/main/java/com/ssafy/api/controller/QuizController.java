package com.ssafy.api.controller;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.api.response.QuizBookCreateGetRes;
import com.ssafy.api.service.QuizService;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value ="문제 +문제집 API", tags = {"Quiz"})
@RestController
@RequestMapping("/api/v1/quiz")
public class QuizController {
    public static final Logger logger = LoggerFactory.getLogger(QuizController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    QuizService quizService;

    //임시로 문제집 등록 + 유저랑 연결까지 여기서.
    @PostMapping("/createQuizBook")
    public ResponseEntity<QuizBookCreateGetRes> createQuizBook(@RequestBody QuizBookCreateGetReq quizBookCreateGetReq){
        Quizbook quizBook = new Quizbook();
        quizBook = quizService.createQuizBook(quizBookCreateGetReq);

        QuizBookCreateGetRes  quizBookCreateGetRes= new QuizBookCreateGetRes();
        return ResponseEntity.status(200).body(quizBookCreateGetRes.of(quizBook));
    };

    //나중에 response 만들자.
    @PostMapping("/createQuiz")
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizCreateReq quizCreateReq){

        Quiz quiz = quizService.createQuiz(quizCreateReq);
       if( quiz == null){
           return ResponseEntity.status(400).body(null);
       }
        return ResponseEntity.status(200).body(quiz);
    };



    @GetMapping("/search/{quizbook_id}")
    public ResponseEntity<Quizbook> searchQuizBookById(@PathVariable("quizbook_id") Long quizbookId){
        Quizbook quizBook = quizService.getQuizBookById(quizbookId);

        return ResponseEntity.status(200).body(quizBook);
    }

    @DeleteMapping("/delete/{quizbook_id}")
    public ResponseEntity<Boolean> deleteQuizBook(@PathVariable("quizbook_id") Long quizbookId){

        if(!quizService.deleteQuizBookById(quizbookId)){
            return ResponseEntity.status(400).body(false);
        }

        return ResponseEntity.status(200).body(true);
    }

}
