import React, { Component, useEffect, useState, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";
import { connect, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import "./QuizComponent.css";
import { Tooltip } from "@material-ui/core";
import { quiz } from "../../api/api";
import { ThirtyFpsOutlined } from "@mui/icons-material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { roomActions } from "../../redux/room";
import { room, file } from "../../api/api";
import styles from "../../css/CreateQuestion.module.css";

const mapStateToProps = (state) => ({
  store: state,
});

const mapDispatchToProps = (dispatch) => ({
  getRoomResult: (e) => dispatch(roomActions.getRoomResult(e)),
});

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const Timer = (props) => {
  // 아무것도 입력하지 않으면 undefined가 들어오기 때문에 유효성 검사부터..
  const tempHour = props.hour ? parseInt(props.hour) : 0;
  const tempMin = props.min ? parseInt(props.min) : 0;
  const tempSec = props.sec ? parseInt(props.sec) : 0;
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  const initialTime = useRef(tempHour * 60 * 60 + tempMin * 60 + tempSec);
  const interval = useRef(null);

  const [hour, setHour] = useState(padNumber(tempHour, 2));
  const [min, setMin] = useState(padNumber(tempMin, 2));
  const [sec, setSec] = useState(padNumber(tempSec, 2));

  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(padNumber(initialTime.current % 60, 2));
      setMin(padNumber(parseInt(initialTime.current / 60), 2));
      setHour(padNumber(parseInt(initialTime.current / 60 / 60), 2));
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  // 초가 변할 때만 실행되는 useEffect
  // initialTime을 검사해서 0이 되면 interval을 멈춘다.
  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);
    }
  }, [sec]);

  return (
    <div>
      {hour} : {min} : {sec}
    </div>
  );
};

const Quiz = function (props) {
  const [quiz, setQuiz] = useState(props.quiz);
  const [answer, setAnswer] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState({ result: "", score: 0 });
  const [imageSrc, setImageSrc] = useState("");
  const roomId = useSelector((state) => state.room.roomId);
  const userId = useSelector((state) => state.user.value.userId);
  // const img = JSON.parse(props.quiz.quizPic);
  useEffect(() => {
    // encodeFileToBase64(img);
    if (props.quiz.quizPic !== "") {
      axios({
        method: "get",
        url: file.download(),
        params: { fileName: props.quiz.quizPic },
      }).then((res) => {
        setImageSrc(res.data);
      });
    }
    setIsSubmit(props.isSubmit);
    setQuiz(props.quiz);
    if (props.isTimeOut && isSubmit === false) {
      checkAnswer();
    }
  }, [props.isSubmit, props.quiz, props.isTimeOut]);
  const checkAnswer = function (e) {
    let result = "";
    let score = 0;
    if (quiz.type === "subjective") {
      if (quiz.answer === answer) {
        result = "정답";
        score = quiz.score;
      } else {
        result = "오답";
      }
    } else {
      if (quiz.answer === String(e)) {
        result = "정답";
        score = quiz.score;
      } else {
        result = "오답";
      }
    }
    setIsSubmit(true);
    setResult((oldResult) => {
      const newResult = { ...oldResult };
      newResult.result = result;
      newResult.score = newResult.score + score;
      const data = {
        roomId: roomId,
        userId: userId,
        score: newResult.score,
      };
      axios({
        method: "put",
        url: room.updateScore(),
        data: data,
      })
        .then((res) => {})
        .catch((e) => {
          console.log(e);
        });
      return newResult;
    });
    setAnswer("");
  };
  return (
    <div>
      {isSubmit === false && (
        <>
          <h1>{quiz.content}</h1>
          <div className={styles.preview}>
            {imageSrc && <img src={imageSrc} alt="preview-img" />}
          </div>
          <Timer min={props.min} sec={props.sec}></Timer>
        </>
      )}
      {quiz.type === "choice" &&
        isSubmit === false &&
        quiz.options.map((option, index) => {
          return (
            <div key={index}>
              <Button
                onClick={() => {
                  checkAnswer(index + 1);
                }}
                sx={{
                  "&.MuiButton-root": {
                    display: "inline-block",
                    marginTop: "10px",
                    fontSize: "2rem",
                    background: "#b6dcfc",
                    width: "70vw",
                    border: "2px solid white",
                    borderRadius: "10px",
                  },
                }}
              >
                {option}
              </Button>
            </div>
          );
        })}
      {quiz.type === "subjective" && isSubmit === false && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              checkAnswer();
            }}
          >
            <TextField
              name="answer"
              label="answer"
              value={answer}
              onChange={(e) => {
                setAnswer((answer) => {
                  return e.target.value;
                });
              }}
              sx={{
                "&.MuiButton-root": {
                  display: "inline-block",
                  marginTop: "10px",
                  fontSize: "2rem",
                  background: "#b6dcfc",
                  width: "90vw",
                  border: "2px solid white",
                  borderRadius: "10px",
                },
              }}
            />
            <Button type="submit">제출하기</Button>
          </form>
        </div>
      )}
      {isSubmit === true && (
        <div>
          <h2 style={{ color: "#FFFF60", fontSize: "4rem" }}>
            {result.result}입니다
          </h2>
          <h3 style={{ color: "#FFFF60", fontSize: "3rem" }}>
            총 점수는 {result.score}입니다
          </h3>
        </div>
      )}
    </div>
  );
};

const Quizbook = function (props) {
  const quizbooks = useSelector((state) => {
    return state.quizbooks.quizbooks;
  });
  const position = useSelector((state) => {
    return state.user.value.position;
  });
  const quizs = useSelector((state) => {
    return state.quizbooks.quizsInQuizbooks;
  });
  const [isQuizbook, setIsQuizbook] = useState(true);
  const [quizbookId, setQuizbookId] = useState(0);
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    setQuiz(() => {
      return quizs[quizbookId];
    });
  }, [quizbookId]);
  return (
    <div>
      {position === "professor" && isQuizbook && (
        <div>
          {quizbooks.map((quizbook, index) => {
            return (
              <div key={index}>
                <Button
                  onClick={() => {
                    setIsQuizbook((isQuizbook) => {
                      return !isQuizbook;
                    });
                    setQuizbookId(index);
                  }}
                  sx={{
                    "&.MuiButton-root": {
                      display: "inline-block",
                      marginTop: "10px",
                      fontSize: "2rem",
                      background: "#b6dcfc",
                      width: "90vw",
                      border: "2px solid white",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {quizbook.title}
                </Button>
              </div>
            );
          })}
        </div>
      )}
      {position === "professor" && !isQuizbook && (
        <div>
          <TextField
            name="min"
            label="분"
            value={min}
            onChange={(e) => {
              setMin((min) => {
                return e.target.value;
              });
            }}
            sx={{
              "&.MuiFormControl-root": {
                marginTop: "10px",
                fontSize: "2rem",
              },
            }}
            autoComplete="off"
            variant="standard"
          />
          <TextField
            name="sec"
            label="초"
            value={sec}
            onChange={(e) => {
              setSec((sec) => {
                return e.target.value;
              });
            }}
            sx={{
              "&.MuiFormControl-root": {
                marginTop: "10px",
                marginLeft: "10px",
                fontSize: "2rem",
              },
            }}
            autoComplete="off"
            variant="standard"
          />
          {quiz.map((quiz, index) => {
            return (
              <div key={index}>
                <Button
                  onClick={() => {
                    props.sendQuiz({
                      index: index,
                      quizbookId: quizbookId,
                      min: min,
                      sec: sec,
                    });
                  }}
                  sx={{
                    "&.MuiButton-root": {
                      display: "inline-block",
                      marginTop: "10px",
                      fontSize: "2rem",
                      background: "#b6dcfc",
                      width: "90vw",
                      border: "2px solid white",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {quiz.content}
                </Button>
              </div>
            );
          })}
          <Button
            onClick={() => {
              setIsQuizbook((isQuizbook) => {
                return !isQuizbook;
              });
            }}
            sx={{
              "&.MuiButton-root": {
                display: "inline-block",
                marginTop: "10px",
                fontSize: "1rem",
                background: "#66cbac",
                width: "10vw",
                border: "2px solid white",
                borderRadius: "10px",
              },
            }}
          >
            뒤로 가기
          </Button>
        </div>
      )}
    </div>
  );
};

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
      isNickname: false,
      quizbook: undefined,
      index: 0,
      quizbookId: 0,
      quiz: undefined,
      isSubmit: false,
      isTimeOut: false,
      isEnd: false,
      isResult: false,
      roomResult: [],
      roomId: this.props.store.room.roomId,
      min: 0,
      sec: 0,
    };
    this.chatScroll = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.sendQuiz = this.sendQuiz.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
    this.toggleResult = this.toggleResult.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:quiz", (event) => {
        const data = JSON.parse(event.data);
        this.setState({
          index: data.index,
          quizbookId: data.quizbookId,
          quiz: this.props.store.quizbooks.quizsInQuizbooks[data.quizbookId][
            data.index
          ],
          min: data.min,
          sec: data.sec,
          isSubmit: false,
          isTimeOut: false,
        });
      });
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:endQuiz", (event) => {
        this.setState({
          isSubmit: true,
          isTimeOut: true,
        });
      });
    this.scrollToBottom();
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }
  sendQuiz(e) {
    const data = e;
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "quiz",
    });
    this.setState({
      isEnd: true,
    });
  }

  endQuiz(e) {
    this.props.user.getStreamManager().stream.session.signal({
      type: "endQuiz",
    });
    this.setState({
      isEnd: false,
    });
    this.toggleResult();
  }

  toggleResult() {
    this.setState({
      isResult: !this.state.isResult,
    });
  }
  sendMessage() {
    let nickname;
    if (this.state.isNickname === false) {
      nickname = this.props.user.getNickname();
    } else {
      nickname = "익명";
    }

    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: nickname,
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  toggleButton() {
    if (this.state.isNickname === true) {
      this.setState({ isNickname: false });
    } else {
      this.setState({ isNickname: true });
    }
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    const quizbook = this.state.quizbook;
    const { getRoomResult } = this.props;
    return (
      <div id="quizContainer">
        <div id="quizComponent" style={styleChat}>
          <div id="quizToolbar">
            <span>Quiz</span>
            <IconButton id="quizcloseButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton>
          </div>
          <div className="quiz-wrap" ref={this.chatScroll}>
            {quizbook === undefined &&
              !this.state.isEnd &&
              !this.state.isResult &&
              this.props.store.user.value.position === "professor" && (
                <Quizbook
                  sendQuiz={(e) => {
                    this.sendQuiz(e);
                  }}
                ></Quizbook>
              )}
            {this.state.quiz !== undefined &&
              this.props.store.user.value.position === "student" && (
                <Quiz
                  quiz={this.state.quiz}
                  isSubmit={this.state.isSubmit}
                  isTimeOut={this.state.isTimeOut}
                  min={this.state.min}
                  sec={this.state.sec}
                ></Quiz>
              )}
            {this.state.quiz !== undefined &&
              this.state.isEnd &&
              !this.state.isResult &&
              this.props.store.user.value.position === "professor" && (
                <>
                  <div style={{ fontSize: "2rem" }}>
                    "{this.state.quiz.content}" 를 진행중입니다
                  </div>
                  <Timer min={this.state.min} sec={this.state.sec}></Timer>
                  <Button
                    onClick={() => {
                      this.endQuiz();
                      setTimeout(() => {
                        axios({
                          method: "get",
                          url: room.getResult() + this.state.roomId + "/",
                        }).then((res) => {
                          getRoomResult(res.data);
                          this.setState({
                            roomResult: res.data,
                          });
                        });
                      });
                    }}
                    sx={{
                      "&.MuiButton-root": {
                        display: "inline-block",
                        marginTop: "10px",
                        fontSize: "1rem",
                        background: "#66cbac",
                        width: "10vw",
                        border: "2px solid white",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    종료
                  </Button>
                </>
              )}
            {this.state.isResult &&
              this.props.store.user.value.position === "professor" && (
                <>
                  <TableContainer
                    sx={{
                      maxWidth: "70vw",
                      minHeight: "70vh",
                      border: "1px solid white",
                      overflowX: "hidden",
                    }}
                    component={Paper}
                  >
                    <Table aria-label="simple table">
                      <TableHead sx={{ background: "#FFFF74" }}>
                        <TableRow>
                          <TableCell>이름</TableCell>
                          <TableCell align="right">점수</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ background: "#FFFFCC" }}>
                        {this.state.roomResult
                          .filter((row) => row.position !== "professor")
                          .map((row) => (
                            <TableRow
                              key={row.nickName}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.nickName}
                              </TableCell>
                              <TableCell align="right">{row.score}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    onClick={() => {
                      this.toggleResult();
                    }}
                    sx={{
                      "&.MuiButton-root": {
                        display: "inline-block",
                        marginTop: "10px",
                        fontSize: "1rem",
                        background: "#66cbac",
                        width: "10vw",
                        border: "2px solid white",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    종료하기
                  </Button>
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);
