import React, { Component } from "react";
import "./ToolbarComponent.css";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
import Tooltip from "@material-ui/core/Tooltip";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

import IconButton from "@material-ui/core/IconButton";

const logo = require("../../assets/favicon-32x32.png");

const mapStateToProps = (state) => ({
  store: state,
});

class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mic: true,
      cam: true,
      fullscreen: false,
      position: this.props.store.user.value.position,
      isScreen: false,
    };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleQuiz = this.toggleQuiz.bind(this);
  }

  micStatusChanged() {
    this.setState({ mic: !this.state.mic });
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.setState({ cam: !this.state.cam });
    this.props.camStatusChanged();
  }

  screenShare() {
    this.setState({ isScreen: !this.state.isScreen });
    this.props.screenShare();
  }

  stopScreenShare() {
    this.setState({ isScreen: !this.state.isScreen });
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }
  toggleQuiz() {
    this.props.toggleQuiz();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    console.log(localUser);
    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div id="navSessionInfo">
            <img id="header_img" alt="OpenVidu Logo" src={logo} />

            {this.props.sessionId && (
              <div id="titleContent">
                <span id="session-title">{mySessionId}</span>
              </div>
            )}
          </div>

          <div className="buttonsContent">
            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                <Mic />
              ) : (
                <MicOff color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {localUser !== undefined && localUser.isVideoActive() ? (
                <Videocam />
              ) : (
                <VideocamOff color="secondary" />
              )}
            </IconButton>

            {this.state.position === "professor" && (
              <>
                <IconButton
                  color="inherit"
                  className="navButton"
                  onClick={this.screenShare}
                >
                  {localUser !== undefined && this.state.isScreen ? (
                    <PictureInPicture />
                  ) : (
                    <ScreenShare />
                  )}
                </IconButton>

                {localUser !== undefined && this.state.isScreen && (
                  <IconButton
                    onClick={this.stopScreenShare}
                    id="navScreenButton"
                  >
                    <StopScreenShare color="secondary" />
                  </IconButton>
                )}
              </>
            )}
            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {localUser !== undefined && this.state.fullscreen ? (
                <FullscreenExit />
              ) : (
                <Fullscreen />
              )}
            </IconButton>
            <IconButton
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <PowerSettingsNew />
            </IconButton>
</div>
<div className="messagequizcontainer">
            <IconButton
              color="inherit"
              onClick={this.toggleChat}
            >
              
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={this.toggleQuiz}
            >
              
              <Tooltip title="Quiz">
                <PostAddIcon />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(mapStateToProps)(ToolbarComponent);
