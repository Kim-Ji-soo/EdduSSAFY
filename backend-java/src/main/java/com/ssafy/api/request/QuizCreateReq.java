package com.ssafy.api.request;

import com.ssafy.db.entity.Quiz;
import com.ssafy.db.entity.Quizbook;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class QuizCreateReq {
    @ApiModelProperty(name="문제 내용", example="피카츄의 진화는?")
    private String content;

    @ApiModelProperty(name="소속 문제집 아이디", example="0")
    private Long quizbookId;

    @ApiModelProperty(name="객관식 = true 주관식 = false", example="true")
    private boolean isChoice;

    @ApiModelProperty(name="이미지 주소", example="")
    private String quizPic;

    @ApiModelProperty(name="선택지 갯수(주관식은 1)", example="2")
    private int optionSize;

    @ApiModelProperty(name="선택지, /로 구분", example="라이츄/파이리")
    private String options;

    @ApiModelProperty(name="객관식은 답 번호(0부터 시작), 주관식은 정답", example="1")
    private String answer;

    @ApiModelProperty(name="점수", example="20")
    private int score;

    public Quiz toEntity(){
        return Quiz.builder()
                .content(getContent())
                .isChoice(isChoice())
                .quizPic(getQuizPic())
                .optionSize(getOptionSize())
                .options(getOptions())
                .answer(getOptions())
                .quizbook(Quizbook.builder().quizbookId(getQuizbookId()).build())
                .score(getScore())
                .build();
    }
}
