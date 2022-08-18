/** @format */
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roomActions } from "../redux/room";
import { quizbookActions } from "../redux/quizbook";
import { room, quizbook } from "../api/api";
import axios from "axios";
import RoomList from "./homepage/RoomList";
import UserList from "./homepage/UserList";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material"; //contain
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";

function Homepage(props) {
  const [cropen, setCropen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const roomTitle = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => {
    return state.user.value.userId;
  });
  const position = useSelector((state) => {
    return state.user.value.position;
  });
  const handleJoinRoom = (data) => {
    //axios register
    axios({
      url: room.joinRoom(),
      method: "post",
      data: {
        roomId: data.roomId,
        userId: userId,
      },
    }).then((res) => {
      dispatch(
        roomActions.setRoom({
          roomId: data.roomId,
          roomTitle: data.title,
        })
      );
      navigate("/openvidu", { replace: true });
    });
  };
  const handleCreateRoom = () => {
    //axios 추가 유저아이디, 타이틀
    let pass = "";
    if (password.current !== undefined) {
      pass = password.current.value;
    }
    const title = roomTitle.current.value;
    axios({
      url: room.createRoom(),
      method: "post",
      data: {
        title: title,
        userId: userId,
        password: pass,
      },
    }).then((res) => {
      dispatch(roomActions.setRoom(res.data));
      const roomId = res.data.roomId;
      axios({
        method: "get",
        url: quizbook.getQuizbook() + userId,
      }).then((res) => {
        dispatch(quizbookActions.getquizbook(res.data));
        dispatch(
          roomActions.setRoom({
            roomTitle: title,
            roomId: roomId,
            hostId: userId,
          })
        );
        navigate("/openvidu", { replace: true });
      });
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
      color: "white",
    },
    "&.MuiButton-root:hover": {
      background: "#0bac7a",
      transform: "translateY(-2px)",
    },
  };

  const Gridsx = {
    "&.MuiGrid-root": {
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
    },
    "&.MuiGrid-item": {
      padding: 0,
    },
  };
  const token = useSelector((state) => state.token.value.accessToken);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios({
      method: "get",
      url: room.activeRoom(),
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
            width: "40vw",
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
            label="방 이름"
            variant="outlined"
            defaultValue=""
            sx={{}}
            inputRef={roomTitle}
            autoComplete="off"
          />
          <FormGroup sx={{ alignSelf: "center" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="비밀번호 넣기"
            />
          </FormGroup>
          <Collapse in={checked} timeout="auto" unmountOnExit>
            <TextField
              id="password"
              label="방 비밀번호"
              variant="outlined"
              defaultValue=""
              sx={{ marginTop: "15px" }}
              inputRef={password}
              autoComplete="off"
              fullWidth
            />
          </Collapse>
          <Button
            sx={{ display: "block" }}
            onClick={() => {
              handleCreateRoom();
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            생성하기
          </Button>
          <Button
            sx={{ display: "block" }}
            onClick={(e) => {
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            돌아가기
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}
export default Homepage;
