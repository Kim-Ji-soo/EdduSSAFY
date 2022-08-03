package com.ssafy.api.controller;

import com.ssafy.api.request.QuizBookCreateGetReq;
import com.ssafy.api.response.QuizBookCreateGetRes;
import com.ssafy.api.service.QuizbookService;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(value ="문제집 API", tags = {"Quizbook"})
@RestController
@RequestMapping("/api/v1/quizbook")
public class QuizbookController {

    @Autowired
    QuizbookService quizbookService;

    @PostMapping("/create")
    public ResponseEntity<QuizBookCreateGetRes> createQuizBook(@RequestBody QuizBookCreateGetReq quizBookCreateGetReq){
        Quizbook quizBook = new Quizbook();
        quizBook = quizbookService.createQuizBook(quizBookCreateGetReq);

        QuizBookCreateGetRes  quizBookCreateGetRes= new QuizBookCreateGetRes();
        return ResponseEntity.status(200).body(quizBookCreateGetRes.of(quizBook));
    };

    @GetMapping("/search/{quizbookId}")
    public ResponseEntity<Quizbook> searchQuizBookById(@PathVariable("quizbookId") Long quizbookId){
        Optional<Quizbook> quizbookOptional = quizbookService.getQuizBookById(quizbookId);

        if(!quizbookOptional.isPresent()){
            ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(quizbookOptional.get());
    }

    @DeleteMapping("/delete/{quizbookId}")
    public ResponseEntity<Boolean> deleteQuizBook(@PathVariable("quizbookId") long quizbookId){

        if(!quizbookService.deleteQuizBookById(quizbookId)){
            return ResponseEntity.status(400).body(false);
        }

        return ResponseEntity.status(200).body(true);
    }

//    @GetMapping("/quizList/{quizbookId}")
//    public ResponseEntity<List<Quiz>> getQuizList(@PathVariable("quizbookId") long quizbookId){
//        List<Quiz> quizs = quizbookService.getQuizList(quizbookId);
//        if(quizs == null ){
//            return ResponseEntity.status(400).body(null);
//        }
//
//        return ResponseEntity.status(200).body(quizs);
//
//    }
}
