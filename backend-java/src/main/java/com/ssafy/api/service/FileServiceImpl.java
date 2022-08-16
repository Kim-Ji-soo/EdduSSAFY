package com.ssafy.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.ssafy.api.request.QuizAlterReq;
import com.ssafy.api.request.QuizCreateReq;
import com.ssafy.api.request.UploadQuizImgReq;
import com.ssafy.db.entity.Quiz;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class FileServiceImpl implements FileService {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    QuizService quizService;

    public String uploadQuizImg(UploadQuizImgReq uploadQuizImgReq) {
        MultipartFile file = uploadQuizImgReq.getImg();
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {

            Quiz quiz = quizService.findQuiz(uploadQuizImgReq.getQuizId());
            String oldPic = quiz.getQuizPic();

            uploadFile(file, fileName);

            // 이미 퀴즈 사진이 있다면 삭제.
            if (oldPic != null && oldPic.length() > 0) {
                amazonS3Client.deleteObject(bucket, oldPic);
            }

            quiz.setQuizPic(fileName);
            quizService.alterQuiz(QuizAlterReq.of(quiz));

        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }

        return fileName;
    }

    @Override
    public Boolean uploadFile(MultipartFile file, String fileName) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            PutObjectRequest request = new PutObjectRequest(bucket, fileName, file.getInputStream(), metadata);
            request.withCannedAcl(CannedAccessControlList.AuthenticatedRead); // 접근권한 체크
            PutObjectResult result = amazonS3Client.putObject(request);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;

    }

    @Override
    public String downloadImgUrl(String fileName) {
        String imgUrl = "";
        try {
            imgUrl = amazonS3Client.getResourceUrl(bucket, fileName);
            if (imgUrl == null || imgUrl.length() <= 0) {
                throw new Exception("해당 파일 없음");
            }
        } catch (Exception e) {
            e.printStackTrace();

        }
        return imgUrl;
    }
}