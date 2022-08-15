/** @format */

import React, { useState } from "react";
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

function RoomList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    return state.user.value.userId;
  });
  const rows = useSelector((state) => {
    return state.room.rooms;
  });
  const [search, setSearch] = useState("");
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
                          axios({
                            url: room.joinRoom(),
                            method: "post",
                            data: {
                              roomId: row.roomId,
                              userId: row.hostId,
                            },
                          }).then((res) => {
                            navigate("/openvidu", { replace: true });
                          });
                        } else {
                          if (row.active === false) {
                            alert("방이 생성되지 않았습니다.");
                          } else {
                            axios({
                              url: room.joinRoom(),
                              method: "post",
                              data: {
                                roomId: row.roomId,
                                userId: userId,
                              },
                            }).then((res) => {
                              navigate("/openvidu", { replace: true });
                            });
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
    </div>
  );
}
export default RoomList;
