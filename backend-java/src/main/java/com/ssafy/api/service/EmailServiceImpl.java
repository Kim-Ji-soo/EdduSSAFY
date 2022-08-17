package com.ssafy.api.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.ssafy.api.request.EmailReq;
import com.ssafy.db.entity.AuthCode;
import com.ssafy.db.repository.AuthCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmailServiceImpl implements EmailService{
    @Autowired
    JavaMailSender emailSender;

    @Autowired
    AuthCodeRepository authCodeRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    private MimeMessage createMessage(String to,String authKey, String type)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ authKey);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("EDDU SSAFY회원가입 이메일 인증");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 EDDU SSAFY입니다. </h1>";
        msgg+= "<br>";
        if(type.equals("register")){
            msgg+= "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        }
        else if(type.equals("reset")){
            msgg+= "<p>아래 코드를 비밀번호 찾기 창으로 돌아가 입력해주세요<p>";
        }

        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        if(type.equals("register")){
            msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        }
        else if(type.equals("reset")){
            msgg+= "<h3 style='color:blue;'>비밀번호 찾기 인증 코드입니다.</h3>";
        }

        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= authKey +"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("chlwlsdnr1001@gmail.com","EDDU SSAFY"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }
    @Override
    public Boolean sendSimpleMessage(EmailReq emailReq) {

        try{
            String email = emailReq.getEmail();
            //회원가입 이메일 인증인데 해당 이메일이 이미 등록되었을 경우
            if(emailReq.getReqType().equals("register") && userService.checkEmail(email)){
                throw new Exception("이메일 중복됨");
            }

            String authKey = createKey();
            MimeMessage message = createMessage(email, authKey, emailReq.getReqType());
            emailSender.send(message);

            AuthCode authCode = AuthCode.builder()
                    .email(email)
                    .authKey(passwordEncoder.encode(authKey))
                    .createdTime(LocalDateTime.now())
                    .build();
            authCodeRepository.save(authCode);

        } catch(MailException es) {
           es.printStackTrace();
           return false;
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public Boolean confirmCode(EmailReq emailReq){
        AuthCode authCode = new AuthCode();
        try{
            Optional<AuthCode> optionalAuthCode = authCodeRepository.findById(emailReq.getEmail());
            if(!optionalAuthCode.isPresent()){
                throw new Exception("이메일 발신한적 없음.");
            }
            authCode = optionalAuthCode.get();
            if(!passwordEncoder.matches(emailReq.getAuthKey(),authCode.getAuthKey())){
                throw new Exception("코드 틀림.");
            }
            if(Duration.between(authCode.getCreatedTime(), LocalDateTime.now()).getSeconds() > 300){
                throw new Exception("코드 발송 후 5분 초과.");
            }
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }

        return true;
    }
}