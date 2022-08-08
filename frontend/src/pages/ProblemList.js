/** @format */
import * as React from "react";
import { useState, forwardRef, useEffect, useRef } from "react";
import { quizbook } from "../api/api";
//contain
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { TransitionGroup } from "react-transition-group";
import { Grid, Divider, ListItem } from "@mui/material";
//
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

//
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Tooltip from "@mui/material/Tooltip";

//
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { quizbookActions } from "../redux/quizbook";
import { useNavigate } from "react-router-dom";

//
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { ListItemSecondaryAction } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BackspaceIcon from "@mui/icons-material/Backspace";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

//
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CustomContainerComponent = forwardRef(function CustomContainerComponent(
  { children, extraSecondaryAction, ...other },
  ref
) {
  return (
    <li ref={ref} {...other}>
      {children}
      {extraSecondaryAction}
    </li>
  );
});

function ProblemList() {
  const QUIZBOOK = useSelector((state) => state.quizbooks.quizbooks);
  const QUIZ = useSelector((state) => state.quizbooks.quizsInQuizbooks);
  console.log(QUIZ);
  const USERID = useSelector((state) => state.user.value.userId);
  const booktitle = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Bar = forwardRef((props: any, ref: any) => (
    <span {...props} ref={ref}>
      {props.children}
    </span>
  ));
  const handleCreateQuizbook = () => {
    axios({
      method: "post",
      url: quizbook.createQuizbook(),
      data: {
        title: booktitle.current.value,
        userId: USERID,
      },
    }).then((res) => {
      axios({
        method: "get",
        url: quizbook.getQuizbook() + USERID,
      }).then((res) => {
        console.log(res.data);
        dispatch(quizbookActions.getquizbook(res.data));
      });
    });
  };

  const [open, setOpen] = useState([]);
  const [mopen, setMopen] = useState([]);
  const [cqopen, setCQopen] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: quizbook.getQuizbook() + USERID,
    }).then((res) => {
      console.log(res.data);
      dispatch(quizbookActions.getquizbook(res.data));
    });
    for (let i in QUIZBOOK) {
      setOpen((open) => {
        const newOpen = [...open];
        newOpen.push(false);
        return newOpen;
      });
    }

    for (let i in QUIZBOOK) {
      setMopen((mopen) => {
        const newMopen = [...mopen];
        newMopen.push(false);
        return newMopen;
      });
    }
  }, []);

  return (
    <>
      <Grid item xs={12} md={12}>
        <Box sx={{ mt: 1 }}>
          <List>
            <TransitionGroup>
              {QUIZBOOK.map((item, index) => {
                return (
                  <Collapse key={index}>
                    <List>
                      <ListItem
                        ContainerComponent={CustomContainerComponent}
                        ContainerProps={{
                          extraSecondaryAction: (
                            <ListItemSecondaryAction sx={{ right: "100px" }}>
                              <Tooltip title="문제 삭제하기">
                                <IconButton
                                  onClick={() => {
                                    dispatch(
                                      quizbookActions.removequizbook(
                                        item.quizbookId
                                      )
                                    );
                                  }}
                                  aria-label="delete"
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>

                              {/* 새페이지 버튼 시작 */}
                              <Tooltip title="문제집 수정하기">
                                <IconButton
                                  onClick={() => {
                                    setMopen((mopen) => {
                                      const newMopen = [...mopen];
                                      newMopen[index] = !newMopen[index];
                                      return newMopen;
                                    });
                                  }}
                                  aria-label="hi"
                                >
                                  <AppRegistrationIcon />
                                </IconButton>
                              </Tooltip>
                              {/* <Modal
                                open={mopen[index]}
                                onClose={() => {
                                  setMopen((mopen) => {
                                    const newMopen = [...mopen];
                                    newMopen[index] = !newMopen[index];
                                    return newMopen;
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
                                    id="outlined-basic"
                                    label="Outlined"
                                    variant="outlined"
                                    defaultValue={item}
                                    sx={{}}
                                  />
                                  <Button sx={{ display: "block" }}>
                                    change
                                  </Button>
                                  <Button sx={{ display: "block" }}>
                                    cancel
                                  </Button>
                                </Box>
                              </Modal> */}
                              {/* 새페이지 버튼 끝 */}
                            </ListItemSecondaryAction>
                          ),
                        }}
                      >
                        <ListItemButton
                          sx={{
                            "&.MuiListItemButton-root": {
                              ":hover": {
                                backgroundColor: "yellow",
                                color: "gray",
                              },
                              ":active": {
                                backgroundColor: "red",
                                color: "blue",
                              },
                            },
                          }}
                          onClick={() => {
                            setOpen((open) => {
                              const newOpen = [...open];
                              newOpen[index] = !newOpen[index];
                              return newOpen;
                            });
                          }}
                        >
                          <ListItemIcon>
                            {open[index] ? <FolderOpenIcon /> : <FolderIcon />}
                          </ListItemIcon>

                          <ListItemText primary={item.title} />

                          {open[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <ListItemSecondaryAction> </ListItemSecondaryAction>
                      </ListItem>

                      {open[index] ? <Divider variant="middle" /> : null}

                      {/* 하위 시작 */}
                      <Collapse in={open[index]} timeout="auto" unmountOnExit>
                        {/* 하위 리스트 시작 */}

                        <List component="div" disablePadding>
                          <ListItem sx={{ pl: 10 }}>
                            <ListItemIcon>
                              <DescriptionIcon />
                            </ListItemIcon>

                            <ListItemText primary={"happy"} />

                            <Tooltip title="문제 수정하기" onClick={(e) => {}}>
                              <IconButton sx={{ mr: 1 }}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="문제 삭제하기">
                              <IconButton sx={{ mr: 10 }}>
                                <BackspaceIcon />
                              </IconButton>
                            </Tooltip>
                          </ListItem>
                        </List>

                        {/* 하위 리스트 끝 */}
                        {/* 문제 추가하기 시작 */}
                        <Divider variant="middle" />
                        <ListItemButton
                          onClick={() => {
                            navigate("/createquestion", {
                              replace: true,
                              state: QUIZBOOK[index].quizbookId,
                            });
                          }}
                        >
                          <ListItemText
                            primary={"문제 추가하기"}
                            sx={{ textAlign: "center", m: 1 }}
                          />
                        </ListItemButton>
                        {/* 문제 추가하기 끝 */}
                      </Collapse>

                      <Divider />
                      {/* 하위 끝 */}
                    </List>
                  </Collapse>
                );
              })}
            </TransitionGroup>
          </List>
        </Box>
      </Grid>

      <Grid item container spacing={2}>
        <Button
          onClick={() => {
            setCQopen((cqopen) => {
              return !cqopen;
            });
          }}
        >
          문제집 생성하기
        </Button>
        <Modal
          open={cqopen}
          onClose={() => {
            setCQopen((cqopen) => {
              return !cqopen;
            });
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Bar>
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
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                defaultValue=""
                sx={{}}
                inputRef={booktitle}
              />
              <Button
                sx={{ display: "block" }}
                onClick={() => {
                  handleCreateQuizbook("here");
                }}
              >
                change
              </Button>
              <Button
                sx={{ display: "block" }}
                onClick={(e) => {
                  setCQopen((cqopen) => {
                    return !cqopen;
                  });
                }}
              >
                cancel
              </Button>
            </Box>
          </Bar>
        </Modal>
      </Grid>
    </>
  );
}
export default ProblemList;
