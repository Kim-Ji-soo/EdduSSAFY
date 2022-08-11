package com.ssafy.api.response;

import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class QuizRes {

    public QuizRes(Quiz quiz){
        setQuizId(quiz.getQuizId());
        setAnswer(quiz.getAnswer());
        setContent(quiz.getContent());
        setQuizPic(quiz.getQuizPic());
        setOptions(quiz.getOptions());
        setOptionSize(quiz.getOptionSize());
        setScore(quiz.getScore());
        setType(quiz.getType());
        setQuizbookId(quiz.getQuizbook().getQuizbookId());
    }

    private long quizId;

    long quizbookId;

    private String content;

    private String type; //choice : 객관식, subjective : 주관식

    private String quizPic;

    private int optionSize;

    private String options;

    //복수 정답을 위해선 나중에 따로 처리해줘야 됨. //객관식이면 문자열로 숫자. 주관식이면 그대로 문자열 답.
    private String answer;

    private int score;
}
