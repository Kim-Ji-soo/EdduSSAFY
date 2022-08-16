package com.ssafy.api.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadQuizImgReq {
    private MultipartFile img;
    private long quizId;
}
