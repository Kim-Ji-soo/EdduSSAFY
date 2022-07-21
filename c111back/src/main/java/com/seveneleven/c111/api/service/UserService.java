package com.seveneleven.c111.api.service;

import com.seveneleven.c111.api.requset.UserRegisterPostReq;
import com.seveneleven.c111.api.requset.UserUpdateDto;
import com.seveneleven.c111.api.response.UserLeaderDtoRes;
import com.seveneleven.c111.db.entity.User;

import java.util.List;

public interface UserService {
    User createUser(UserRegisterPostReq userRegisterInfo);
    User getUserByUserId(String userId);
    boolean checkUserId(String userid);
    int checkUserEmail(String userEmail);
    boolean deleteByUserId(User user);
    void updateUser(UserUpdateDto updateUserDto);

    UserLeaderDtoRes isLeader(String user_id, String study_no);

    public List<User> findAll();
}
