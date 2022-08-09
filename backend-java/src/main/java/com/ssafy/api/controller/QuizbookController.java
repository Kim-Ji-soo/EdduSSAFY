package com.ssafy.api.controller;

import com.ssafy.api.request.QuizbookCreateReq;
import com.ssafy.api.request.QuizbookUpdateReq;
import com.ssafy.api.response.QuizbookCreateRes;
import com.ssafy.api.response.QuizbookRes;
import com.ssafy.api.response.QuizbooksOfUserRes;
import com.ssafy.api.service.QuizbookService;
import com.ssafy.db.entity.Quizbook;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Api(value ="문제집 API", tags = {"Quizbook"})
@RestController
@RequestMapping("/api/v1/quizbook")
public class QuizbookController {

    @Autowired
    QuizbookService quizbookService;

    @PostMapping("/create")
    public ResponseEntity<QuizbookCreateRes> createQuizBook(@RequestBody QuizbookCreateReq quizbookCreateReq){
        Quizbook quizbook = quizbookService.createQuizBook(quizbookCreateReq);
        if(quizbook == null){
            return ResponseEntity.status(400).body(null);
        }

        QuizbookCreateRes quizbookCreateRes = new QuizbookCreateRes();
        return ResponseEntity.status(200).body(quizbookCreateRes.of(quizbook));
    };

    @GetMapping("/search/{quizbookId}")
    public ResponseEntity<QuizbookRes> searchQuizBookById(@PathVariable("quizbookId") Long quizbookId){
        Optional<Quizbook> quizbookOptional = quizbookService.getQuizBookById(quizbookId);

        if(!quizbookOptional.isPresent()){
            ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(new QuizbookRes(quizbookOptional.get()));
    }

    @DeleteMapping("/delete/{quizbookId}")
    public ResponseEntity<Boolean> deleteQuizBook(@PathVariable("quizbookId") long quizbookId){

        if(!quizbookService.deleteQuizBookById(quizbookId)){
            return ResponseEntity.status(400).body(false);
        }

        return ResponseEntity.status(200).body(true);
    }

    @GetMapping("/getQuizbookCombs/{userId}")
    public ResponseEntity<QuizbooksOfUserRes> getQuizbookCombs(@PathVariable("userId") String userId){
        QuizbooksOfUserRes res = quizbookService.getQuizbookCombsByUserId(userId);
        if(res == null){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(res);
    }

    @PutMapping("/alter")
    public ResponseEntity<Boolean> alterQuizbook(@RequestBody QuizbookUpdateReq quizbookUpdateReq){
        if(!quizbookService.alterQuizbook(quizbookUpdateReq)){
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
