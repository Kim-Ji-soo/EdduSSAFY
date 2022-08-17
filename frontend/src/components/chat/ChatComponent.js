import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";
import logo from "../../assets/favicon-32x32.png";
import "./ChatComponent.css";
import { Tooltip } from "@material-ui/core";

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
      isNickname: false,
    };
    this.chatScroll = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  componentDidMount() {
    const img = new Image();
    img.src = logo;
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById(
            "userImg-" + (this.state.messageList.length - 1)
            );
            const avatar = userImg.getContext("2d");
          let video = img;
          if (this.state.isNickname === true) {
            video = img;
            avatar.drawImage(video, 0, 0, 64, 64);
          } else {
            video = document.getElementById("video-" + data.streamId);
            avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
          }
          this.props.messageReceived();
        }, 20);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
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
    }, 0);
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
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div id="chatToolbar">
            <span>
              채팅
            </span>
            <IconButton id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton>
          </div>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? " left"
                    : " right")
                }
              >
                <canvas
                  id={"userImg-" + i}
                  width="60"
                  height="60"
                  className="user-img"
                />
                <div className="msg-detail">
                  <div className="msg-info">
                    <p> {data.nickname}</p>
                  </div>
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="messageInput" style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <input
              id="anonymous"
              className="anonymous"
              type="checkbox"
              onChange={this.toggleButton}
            />
            <label
              htmlFor="anonymous"
              style={{ fontSize: "0.8rem", height:"auto" }}
            >
              익명
            </label>
            <input
              className="messageInput"
              placeholder="메시지를 입력해주세요"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />

            <Tooltip title="Send message">
              <Fab size="small" id="sendButton" onClick={this.sendMessage}>
                <Send />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
