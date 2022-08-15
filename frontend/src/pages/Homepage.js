/** @format */
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roomActions } from "../redux/room";
import { room } from "../api/api";
import axios from "axios";
import RoomList from "./homepage/RoomList";
import UserList from "./homepage/UserList";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material"; //contain
function Homepage(props) {
  const [cropen, setCropen] = useState(false);
  const roomTitle = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    return state.user.value.userId;
  });
  const position = useSelector((state) => {
    return state.user.value.position;
  });
  const handleJoinRoom = (roomId) => {
    //axios register
    axios({
      url: room.joinRoom(),
      method: "post",
      data: {
        roomId: roomId,
        userId: userId,
      },
    }).then((res) => {
      dispatch(
        roomActions.setRoom({
          roomId: roomId,
        })
      );
      navigate("/openvidu", { replace: true });
    });
  };
  const handleCreateRoom = () => {
    //axios 추가 유저아이디, 타이틀
    console.log(roomTitle.current.value, userId);
    axios({
      url: room.createRoom(),
      method: "post",
      data: {
        title: roomTitle.current.value,
        userId: userId,
      },
    }).then((res) => {
      dispatch(roomActions.setRoom(res.data));
      handleJoinRoom(res.data.roomId);
    });
  };

  const Buttonsx = {
    "&.MuiButton-root": {
      marginTop: "10px",
      width: "10%",
      textDecoration: "none",
      borderRadius: "70px 70px",
      padding: "5px 0px",
      background: "#11b683",
    },
    "&.MuiButton-root:hover": {
      background: "#0bac7a",
      transform: "translateY(-2px)",
    },
  };

  const Gridsx = {
    "&.MuiGrid-root": {
      marginTop: "20px",
    },
    "&.MuiGrid-item": {
      padding: 0,
    },
  };
  useEffect(() => {
    axios({
      method: "get",
      url: room.getRoom(),
    }).then((res) => {
      dispatch(roomActions.getRooms(res.data));
    });
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  });
  return (
    <Grid
      sx={{
        margin: 5,
      }}
      item
      container
      direction="row"
      justifyContent="space-evenly"
      spacing={2}
    >
      <Grid item xs={12} md={12} sx={Gridsx}>
        <RoomList></RoomList>
      </Grid>
      {position === "professor" && (
        <Button
          onClick={() => {
            setCropen((cropen) => !cropen);
          }}
          sx={Buttonsx}
        >
          방 생성
        </Button>
      )}
      <Modal
        open={cropen}
        onClose={() => {
          setCropen((cropen) => {
            return !cropen;
          });
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            minWidth: "200px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20vw",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <TextField
            id="outlined-basic2"
            label="Outlined"
            variant="outlined"
            defaultValue=""
            sx={{}}
            inputRef={roomTitle}
          />
          <Button
            sx={{ display: "block" }}
            onClick={() => {
              handleCreateRoom();
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            change
          </Button>
          <Button
            sx={{ display: "block" }}
            onClick={(e) => {
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            cancel
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}
export default Homepage;
