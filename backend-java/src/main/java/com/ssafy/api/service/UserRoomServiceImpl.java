package com.ssafy.api.service;

import com.ssafy.api.request.ScoreReq;
import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.response.UserInRoomRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.UserRoom;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserRoomServiceImpl implements UserRoomService{

    @Autowired
    UserRoomRepository userRoomRepository;

    @Autowired
    RoomService roomService;

    @Override
    public boolean enterRoom(UserRoomReq userRoomReq) {

        try{ //입장하는 유저가 호스트라면 방 start.

            String hostId = roomService.getRoomById(userRoomReq.getRoomId()).getHostId();
            if(hostId.equals(userRoomReq.getUserId())){
                roomService.startRoom(userRoomReq);
            }
            // 호스트가 아니고 방이 비활성화 되있는 경우 못들어감.
            else if(!roomService.isRoomActive(userRoomReq.getRoomId())){
                throw new Exception("방이 활성화 상태가 아닙니다.");
            }
            //호스트가 아니고 방 비밀번호가 틀렸을 경우엔.
            if(!hostId.equals(userRoomReq.getUserId())&& !roomService.checkRoomPassword(userRoomReq.getRoomId(), userRoomReq.getPassword())){
                throw ( new Exception("비밀번호 틀림"));
            }

            userRoomRepository.save(userRoomReq.toEntity());
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean quitRoom(UserRoomReq userRoomReq) {
        try{  //퇴장하는 유저가 마지막 유저면 방 end.

            List<UserRes> users = getUsersByRoomId(userRoomReq.getRoomId());

            if(users.size() == 1 && users.get(0).getUserId().equals(userRoomReq.getUserId())){
                roomService.endRoom(userRoomReq);
            }

            userRoomRepository.deleteByRoomRoomIdAndUserUserId(userRoomReq.getRoomId(), userRoomReq.getUserId());
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public List<RoomRes> getRoomsByUserId(String userId) {
        List<RoomRes> rooms = new ArrayList<>();
        try{
            List<UserRoom> userRooms = userRoomRepository.findByUserUserId(userId);
            for(UserRoom ur : userRooms){
                rooms.add(new RoomRes(ur.getRoom()));
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return rooms;
    }

    @Override
    public List<UserRes> getUsersByRoomId(long roomId) {
        List<UserRes> infos = new ArrayList<>();
        try{
            List<UserRoom> userRooms = userRoomRepository.findByRoomRoomId(roomId);
            for(UserRoom ur : userRooms){
                UserInRoomRes info = UserInRoomRes.of(ur.getUser());
                info.setScore(ur.getScore());
                infos.add(info);
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
        return infos;
    }

    @Override
    public UserInRoomRes updateScore(ScoreReq scoreReq) {
        UserInRoomRes user;
        try{
            Optional<UserRoom> optionalUserRoom
                    = userRoomRepository.findByRoomRoomIdAndUserUserId(scoreReq.getRoomId(), scoreReq.getUserId());
            if(!optionalUserRoom.isPresent()){
                throw new Exception("해당 방에 해당 유저가 없습니다.");
            }

            UserRoom ur = optionalUserRoom.get();
            ur.setScore(scoreReq.getScore());

            user = UserInRoomRes.of(userRoomRepository.save(ur).getUser());
            user.setScore(ur.getScore());
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }

        return user;
    }
}
