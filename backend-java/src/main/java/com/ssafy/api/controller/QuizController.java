package com.ssafy.api.controller;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.api.response.QuizBookCreateGetRes;
import com.ssafy.api.service.QuizService;
import com.ssafy.db.entity.QuizBook;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value ="퀴즈 API", tags = {"Quiz"})
@RestController
@RequestMapping("/api/v1/quiz")
public class QuizController {
    public static final Logger logger = LoggerFactory.getLogger(QuizController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    QuizService quizService;

    @PostMapping("/createQuizBook")
    public ResponseEntity<QuizBookCreateGetRes> createQuizBook(@RequestBody QuizBookCreateGetReq quizBookCreateGetReq){
        QuizBook quizBook = new QuizBook();
        quizBook = quizService.createQuizBook(quizBookCreateGetReq);

        QuizBookCreateGetRes  quizBookCreateGetRes= new QuizBookCreateGetRes();
        return ResponseEntity.status(200).body(quizBookCreateGetRes.of(quizBook));
    };

    @GetMapping("/search/{quizbook_id}")
    public ResponseEntity<QuizBook> search(@PathVariable("quizbook_id") Long quizbookId){
        QuizBook quizBook = quizService.getQuizBookById(quizbookId);

        return ResponseEntity.status(200).body(quizBook);
    }


}
