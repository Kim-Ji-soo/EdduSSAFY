/** @format */
import * as React from "react";
import { useState, forwardRef, useEffect, useRef } from "react";
import { quiz, quizbook } from "../api/api";
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

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
import { ListItemSecondaryAction } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BackspaceIcon from "@mui/icons-material/Backspace";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

//
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";

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
  const USERID = useSelector((state) => state.user.value.userId);
  const booktitle = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [re, setRe] = useState(false);
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
        dispatch(quizbookActions.getquizbook(res.data));
      });
    });
  };

  const [open, setOpen] = useState([]);
  const [mopen, setMopen] = useState([]);
  const [cqopen, setCQopen] = useState(false);
  const [value, setValue] = useState({});
  const [title, setTitle] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: quizbook.getQuizbook() + USERID,
    }).then((res) => {
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
  }, [re]);

  return (
    <>
      <Grid
        sx={{
          margin: 5,
        }}
        item
        xs={12}
        md={12}
      >
        <Box sx={{ mt: 1 }}>
          <List>
            <TransitionGroup>
              {QUIZBOOK.map((item, index) => {
                return (
                  <Collapse key={index}>
                    <List
                      sx={{
                        border: "1px solid #7bc4fc",
                        borderRadius: "10px 10px",
                        marginBottom: "10px",
                        padding: 0,
                      }}
                    >
                      <ListItem
                        sx={{
                          padding: 0,
                          paddingTop: "8px",
                          paddingBottom: "8px",
                        }}
                        ContainerComponent={CustomContainerComponent}
                        ContainerProps={{
                          extraSecondaryAction: (
                            <ListItemSecondaryAction sx={{ right: "50px" }}>
                              {/* 새페이지 버튼 시작 */}
                              <Tooltip title="문제집 수정하기">
                                <IconButton
                                  onClick={() => {
                                    setMopen((mopen) => {
                                      const newMopen = [...mopen];
                                      newMopen[index] = !newMopen[index];
                                      return newMopen;
                                    });
                                    setTitle(item.title);
                                  }}
                                  aria-label="hi"
                                >
                                  <AppRegistrationIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="문제집 삭제하기">
                                <IconButton
                                  onClick={() => {
                                    axios({
                                      method: "delete",
                                      url:
                                        quizbook.delete() +
                                        item.quizbookId +
                                        "/",
                                    });
                                    setRe(!re);
                                  }}
                                  aria-label="delete"
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>

                              {mopen[index] ? (
                                <Modal
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
                                      label="문제집 이름"
                                      variant="outlined"
                                      defaultValue={title}
                                      onChange={(e) => {
                                        setTitle(e.target.value);
                                      }}
                                      autoComplete="off"
                                    />
                                    <Button
                                      sx={{ display: "block" }}
                                      onClick={(e) => {
                                        axios({
                                          url: quizbook.alter(),
                                          method: "put",
                                          data: {
                                            quizbookId: item.quizbookId,
                                            title: title,
                                          },
                                        });
                                        setMopen((mopen) => {
                                          const newMopen = [...mopen];
                                          newMopen[index] = !newMopen[index];
                                          return newMopen;
                                        });
                                        setRe((re) => {
                                          return !re;
                                        });
                                      }}
                                    >
                                      이름 변경하기
                                    </Button>

                                    <Button
                                      sx={{ display: "block" }}
                                      onClick={() => {
                                        setMopen((mopen) => {
                                          const newMopen = [...mopen];
                                          newMopen[index] = !newMopen[index];
                                          return newMopen;
                                        });
                                      }}
                                    >
                                      뒤로가기
                                    </Button>
                                  </Box>
                                </Modal>
                              ) : null}

                              {/* 새페이지 버튼 끝 */}
                            </ListItemSecondaryAction>
                          ),
                        }}
                      >
                        <ListItemButton
                          sx={{
                            "&.MuiListItemButton-root": {
                              padding: "8px, 0px",
                              "&:hover": {
                                background: "none",
                              },
                              "&:child": {
                                backgroundColor: "#e2f0ff",
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
                          {QUIZ[index].map((biq, ind) => {
                            return (
                              <ListItem sx={{ pl: 10 }} key={ind}>
                                <ListItemIcon>
                                  <DescriptionIcon />
                                </ListItemIcon>

                                <ListItemText primary={biq.content} />

                                <Tooltip
                                  title="문제 수정하기"
                                  onClick={(e) => {
                                    const newBiq = { ...biq };
                                    // newBiq.options = {};
                                    // for (
                                    //   let i = 1;
                                    //   i < biq.options.length + 1;
                                    //   i++
                                    // ) {
                                    //   newBiq.options[i] = biq.options[i - 1];
                                    // }
                                    navigate("/updatequestion", {
                                      replace: true,
                                      state: newBiq,
                                    });
                                  }}
                                >
                                  <IconButton sx={{ mr: 1 }}>
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="문제 삭제하기">
                                  <IconButton
                                    sx={{ mr: 10 }}
                                    onClick={() => {
                                      axios({
                                        method: "delete",
                                        url: quiz.delete() + biq.quizId + "/",
                                      });
                                      setRe(!re);
                                    }}
                                  >
                                    <BackspaceIcon />
                                  </IconButton>
                                </Tooltip>
                              </ListItem>
                            );
                          })}
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

                      {/* <Divider /> */}
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
              variant="문제집 이름"
              defaultValue=""
              sx={{}}
              inputRef={booktitle}
              autoComplete="off"
            />
            <Button
              sx={{ display: "block" }}
              onClick={() => {
                handleCreateQuizbook("here");
                setCQopen((cqopen) => {
                  return !cqopen;
                });
              }}
            >
              생성하기
            </Button>
            <Button
              sx={{ display: "block" }}
              onClick={(e) => {
                setCQopen((cqopen) => {
                  return !cqopen;
                });
              }}
            >
              취소하기
            </Button>
          </Box>
        </Modal>
      </Grid>
    </>
  );
}
export default ProblemList;
