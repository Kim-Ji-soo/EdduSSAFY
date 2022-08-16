package com.ssafy.api.service;

import com.ssafy.api.request.UploadQuizImgReq;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    public String uploadQuizImg(UploadQuizImgReq uploadQuizImgReq);
    public Boolean uploadFile( MultipartFile file, String fileName);

    public String downloadImgUrl(String fileName);
}
