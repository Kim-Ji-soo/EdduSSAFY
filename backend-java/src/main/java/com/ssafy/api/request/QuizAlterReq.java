package com.ssafy.api.request;

import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
public class QuizAlterReq {

    @ApiModelProperty(name="문제 id", example="0")
    private long quizId;

    @ApiModelProperty(name="문제 내용", example="피카츄의 진화는?")
    private String content;

    @ApiModelProperty(name="객관식 = choice 주관식 = subjective", example="choice")
    private String type;

    @ApiModelProperty(name="이미지 주소", example="")
    private String quizPic;

    @ApiModelProperty(name="선택지 갯수(주관식은 1)", example="2")
    private int optionSize;

    @ApiModelProperty(name="선택지, |로 구분", example="라이츄|파이리")
    private String options;

    @ApiModelProperty(name="객관식은 답 번호(0부터 시작), 주관식은 정답", example="1")
    private String answer;

    @ApiModelProperty(name="점수", example="20")
    private int score;

    public static QuizAlterReq of(Quiz quiz){
        QuizAlterReq quizAlterReq = new QuizAlterReq();
        quizAlterReq.setQuizId(quiz.getQuizId());
        quizAlterReq.setQuizPic(quiz.getQuizPic());
        quizAlterReq.setAnswer(quiz.getAnswer());
        quizAlterReq.setScore(quiz.getScore());
        quizAlterReq.setContent(quiz.getContent());
        quizAlterReq.setOptions(quiz.getOptions());
        quizAlterReq.setType(quiz.getType());
        quizAlterReq.setOptionSize(quiz.getOptionSize());

        return quizAlterReq;
    }

}
