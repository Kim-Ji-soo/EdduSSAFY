import React, { Component, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";
import { connect, useSelector } from "react-redux";
import { Button } from "@mui/material";

import "./QuizComponent.css";
import { Tooltip } from "@material-ui/core";
import { quiz } from "../../api/api";

const mapStateToProps = (state) => ({
  store: state,
});

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
      {position === "professor" && !isQuizbook && quiz.length > 0 && (
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
    };
    this.chatScroll = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.sendQuiz = this.sendQuiz.bind(this);
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
        });
      });
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
          <div id="chatToolbar">
            <span>Quiz</span>
            <IconButton id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton>
          </div>
          {quizbook === undefined && (
            <Quizbook
              sendQuiz={(e) => {
                this.sendQuiz(e);
              }}
            ></Quizbook>
          )}
          {this.state.quiz !== undefined &&
            this.props.store.user.value.position === "student" && (
              <div>{this.state.quiz.content}</div>
            )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(QuizComponent);
