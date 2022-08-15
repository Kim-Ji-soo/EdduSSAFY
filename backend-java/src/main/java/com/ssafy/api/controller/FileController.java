package com.ssafy.api.controller;

import com.ssafy.api.request.UploadQuizImgReq;
import com.ssafy.api.service.FileService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Api(value ="파일 API", tags = {"File"})
@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    private FileService fileService;

    @PostMapping(value="/upload",consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadQuizImg(@RequestBody UploadQuizImgReq uploadQuizImgReq) {

        String imgName = fileService.uploadQuizImg(uploadQuizImgReq);
        if(imgName == null || imgName.length() <= 0){
            return ResponseEntity.status(400).body("");
        }

        return ResponseEntity.status(200).body(imgName);
    }

    @GetMapping("/download")
    public ResponseEntity<String> downloadImgUrl(@RequestParam String fileName) {

        String imgUrl = fileService.downloadImgUrl(fileName);
        if(imgUrl == null || imgUrl.length() <= 0){
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.status(200).body(imgUrl);
    }
}
