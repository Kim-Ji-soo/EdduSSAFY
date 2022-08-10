package com.ssafy.api.service;

import com.ssafy.api.request.RoomAlterReq;
import com.ssafy.api.request.RoomCreateReq;
import com.ssafy.api.request.UserRoomReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserRoom;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoomServiceImpl implements  RoomService{

    @Autowired
    RoomRepository roomRepository;
    @Autowired
    UserRoomService userRoomService;

    @Override
    public Room createRoom(RoomCreateReq roomCreateReq) {

        Room room;
        try {
            //해당 유저가 호스트인 방이 또 있을 경우 그 방을 리턴. 이부분 조심. db에 유니크 설정 안해서 옛날 db랑 섞이면 꼬일 수도.
            Optional<Room> optionalRoom = roomRepository.findByHostUserId(roomCreateReq.getUserId());
            if(optionalRoom.isPresent()){
                room = optionalRoom.get();
                room.setTitle(roomCreateReq.getTitle());
                roomRepository.save(room);
                return room;
            }

            room = roomRepository.save(roomCreateReq.toEntity());
//            UserRoom userRoom = UserRoom.builder()
//                    .user(User.builder().userId(roomCreateReq.getUserId()).build())
//                    .room(Room.builder().roomId(room.getRoomId()).build())
//                    .build();
            //userRoomRepository.save(userRoom);


            //방 생성하면 호스트는 바로 들어가는 걸로.
            UserRoomReq userRoomReq = new UserRoomReq();
            userRoomReq.setRoomId(room.getRoomId());
            userRoomReq.setUserId(room.getHost().getUserId());
            userRoomService.enterRoom(userRoomReq);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return room;
    }

    @Override
    public boolean alterRoom(RoomAlterReq roomAlterReq) {
        try{
            Room room = roomAlterReq.toEntity();
            roomRepository.save(room);
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean startRoom(UserRoomReq userRoomReq) {
        try{
            Room room = roomRepository.findById(userRoomReq.getRoomId()).get();
            if(room == null || !room.getHost().getUserId().equals(userRoomReq.getUserId())  ){
                throw new Exception("호스트 아님");
            }
            room.setActive(true);
            roomRepository.save(room);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override   //방이 끝나면 방 안 모든 유저 추방
    public boolean endRoom(UserRoomReq userRoomReq) {
        try{
            Room room = roomRepository.findById(userRoomReq.getRoomId()).get();
            if(room == null || !room.getHost().getUserId().equals(userRoomReq.getUserId())  ){
                throw new Exception("호스트 아님");
            }

            List<UserRes> users = userRoomService.getUsersByRoomId(userRoomReq.getRoomId());
            for(UserRes ur : users){
                if(ur.getUserId().equals(room.getHost().getUserId())){
                    continue;
                }
                UserRoomReq urq = new UserRoomReq();
                urq.setRoomId(userRoomReq.getRoomId());
                urq.setUserId(ur.getUserId());
                userRoomService.quitRoom(urq);
            }
            room.setActive(false);

            roomRepository.save(room);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public RoomRes getRoomById(long roomId) {
        try{
            return new RoomRes(roomRepository.findById(roomId).get());
        }catch(Exception e){
            e.printStackTrace();

        }
        return null;
    }

    @Override
    public boolean deleteRoom(Long roomId) {
        try{
            roomRepository.deleteById(roomId);
        } catch(Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
