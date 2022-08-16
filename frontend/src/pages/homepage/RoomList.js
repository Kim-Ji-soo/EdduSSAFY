/** @format */

import React, { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { room } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { quizbook } from "../../api/api";
import { quizbookActions } from "../../redux/quizbook";
import { roomActions } from "../../redux/room";
import { TextField } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function RoomList() {
  const [cropen, setCropen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = useRef();
  const userId = useSelector((state) => {
    return state.user.value.userId;
  });
  const rows = useSelector((state) => {
    return state.room.rooms;
  });
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <TableContainer sx={{ maxWidth: 1200 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>방제목</TableCell>
              <TableCell align="right">방번호</TableCell>
              <TableCell align="right">생성자</TableCell>
              <TableCell align="right">입장</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.roomId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.roomId}</TableCell>
                <TableCell align="right">{row.hostId}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      axios({
                        method: "get",
                        url: quizbook.getQuizbook() + row.hostId,
                      }).then((res) => {
                        dispatch(quizbookActions.getquizbook(res.data));
                        dispatch(
                          roomActions.setRoom({
                            roomTitle: row.title,
                            roomId: row.roomId,
                            hostId: row.hostId,
                          })
                        );
                        if (userId === row.hostId) {
                          navigate("/openvidu", { replace: true });
                        } else {
                          if (row.active === false) {
                            alert("방이 생성되지 않았습니다.");
                          } else {
                            if(row.hasPassword === false){
                              navigate("/openvidu", { replace: true });
                            }
                            else{
                              setCropen((cropen) => !cropen);
                            } 
                          }
                        }
                      });
                    }}
                  >
                    meet
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <TextField
          name="search"
          label="search"
          value={search}
          ref={inputRef}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (search === "") {
              alert("검색어를 입력해 주세요");
            } else {
              axios({
                method: "get",
                url: room.search() + search + "/",
              }).then((res) => {
                dispatch(roomActions.getRooms(res.data));
              });
            }
          }}
        >
          검색
        </Button>
      </div>

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
            id="password"
            label="password"
            variant="outlined"
            defaultValue=""
            sx={{}}
            inputRef={password}
          />
          <Button
            sx={{ display: "block" }}
            onClick={() => {
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            join
          </Button>
          <Button
            sx={{ display: "block" }}
            onClick={(e) => {
             /* axios({
                url: room.checkPassword(),
                method: "post",
                data: {
                  password : password.current.value,
                },
              }).then((res) => {
                navigate("/openvidu", { replace: true });
              });
              */
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export default RoomList;
