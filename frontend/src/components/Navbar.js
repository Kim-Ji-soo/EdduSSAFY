/** @format */

import React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Typography, useTheme, useMediaQuery, AppBar, Toolbar} from "@mui/material";
import DrawerComponent from "./Drawer";
import classes from "../css/navbar.module.css"

export default function Navbar() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = React.useState(0);


  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" component={Link} to="/homepage" className={classes.logo}>
          Eddu SSAFY
        </Typography>
        { isMobile ? (
          <DrawerComponent></DrawerComponent>
        ) : (
          <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            로그인
          </Link>
          <Link to="/signup" className={classes.link}>
            회원가입
          </Link>
          <Link to="/problemlist" className={classes.link}>
            문제 목록
          </Link>
          <Link to="createquestion" className={classes.link}>
            문제 생성
          </Link>
          <Link to="/" className={classes.link}>
            개인정보 수정
          </Link>
          <Link to="/" className={classes.link}>
            로그아웃
          </Link>
        </div>
        )
        }
      </Toolbar>
    </AppBar>

  );
}
