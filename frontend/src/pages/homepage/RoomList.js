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
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import "./RoomList.css";
import TablePagination from "@mui/material/TablePagination";

function RoomList() {
  //
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //
  const [cropen, setCropen] = useState(false);
  const [roomId, setRoomId] = useState("");
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

  const handleJoinRoom = () => {
    //axios register
    axios({
      url: room.check(),
      method: "post",
      data: {
        password: password.current.value,
        roomId: roomId,
        userId: userId,
      },
    })
      .then((res) => {
        dispatch(
          roomActions.setRoom({
            roomId: roomId,
          }),
        );
        navigate("/openvidu", { replace: true });
      })
      .catch((e) => {
        alert("정보가 잘못 입력되었습니다!");
        console.log(e);
      });
  };

  return (
    <div>
      <TableContainer
        sx={{
          display: "grid",
          width: "80vw",
          boxShadow: "none",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">방번호</TableCell>
              <TableCell align="center">방제목</TableCell>

              <TableCell align="center">생성자</TableCell>
              <TableCell align="center">입장</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.roomId}
                sx={{"&:last-child td, &:last-child th": { border: 0 } }}
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
                            navigate("/openvidu", { replace: true });
                          }
                        }
                      });
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Tooltip title="방 입장">
                  <TableRow
                    hover="true"
                    key={row.roomId}
                    sx={{
                      margin: "0 20px",
                    }}
                    className="tableRow"
                  >
                    <TableCell width="15%" align="center">
                      <Chip label={row.roomId} />
                    </TableCell>
                    <TableCell
                      width="40%"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell width="30%" align="center">
                      {row.hostId}
                    </TableCell>
                    <TableCell width="15%" align="center">
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
                              }),
                            );
                            if (userId === row.hostId) {
                              navigate("/openvidu", { replace: true });
                            } else {
                              if (row.active === false) {
                                alert("방이 생성되지 않았습니다.");
                              } else {
                                if (row.hasPassword === false) {
                                  navigate("/openvidu", { replace: true });
                                } else {
                                  setRoomId(row.roomId);
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
                </Tooltip>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <TextField
          sx={{
            "& .MuiFormLabel-root": {
              fontFamily: "Single Day, cursive",
            },
          }}
          name="search"
          label="방 제목"
          value={search}
          ref={inputRef}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          autoComplete="off"
          variant="standard"
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
          sx={{ marginTop: "2%" }}
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
              handleJoinRoom();
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
