import React, { Component, useEffect, useState } from "react";
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

const mapStateToProps = (state) => ({
  store: state,
});

const Quiz = function (props) {
  const [quiz, setQuiz] = useState(props.quiz);
  const [answer, setAnswer] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState({ result: "", score: 0 });
  useEffect(() => {
    setIsSubmit(props.isSubmit);
    setQuiz(props.quiz);
    if (props.isTimeOut) {
      checkAnswer();
    }
  }, [props.isSubmit, props.quiz]);
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
      return newResult;
    });
    setAnswer("");
  };
  return (
    <div>
      <h1>{quiz.content}</h1>
      {quiz.type === "choice" &&
        isSubmit === false &&
        quiz.options.map((option, index) => {
          return (
            <div key={index}>
              <Button
                onClick={() => {
                  checkAnswer(index + 1);
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
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      )}
      {isSubmit === true && (
        <>
          <h2>{result.result}입니다.</h2>
          <h3>총 점수는 {result.score}입니다.</h3>
        </>
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
  const [quiz, setQuiz] = useState([]);
  console.log(quiz);
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
          {quiz.map((quiz, index) => {
            return (
              <div key={index}>
                <Button
                  onClick={() => {
                    props.sendQuiz({ index: index, quizbookId: quizbookId });
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
    console.log(this.props.store);
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
    };
    this.chatScroll = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.sendQuiz = this.sendQuiz.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:quiz", (event) => {
        const data = JSON.parse(event.data);
        console.log(
          this.props.store.quizbooks.quizsInQuizbooks[data.quizbookId][
            data.index
          ]
        );
        this.setState({
          index: data.index,
          quizbookId: data.quizbookId,
          quiz: this.props.store.quizbooks.quizsInQuizbooks[data.quizbookId][
            data.index
          ],
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
    console.log(e);
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
  }

  sendMessage() {
    console.log(this.state.message);
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
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div className="message-wrap" ref={this.chatScroll}>
            <div id="chatToolbar">
              <span>Quiz</span>
              <IconButton id="closeButton" onClick={this.close}>
                <HighlightOff color="secondary" />
              </IconButton>
            </div>
            {quizbook === undefined &&
              !this.state.isEnd &&
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
                ></Quiz>
              )}
            {this.state.quiz !== undefined &&
              this.state.isEnd &&
              this.props.store.user.value.position === "professor" && (
                <Button
                  onClick={() => {
                    this.endQuiz();
                  }}
                >
                  종료
                </Button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuizComponent);
