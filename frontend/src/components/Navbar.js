/** @format */

import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
} from "@mui/material";
import DrawerComponent from "./Drawer";
import classes from "../css/navbar.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import users from "../api/api";
import { me } from "../redux/user";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const token = useSelector((state) => state.token.value);
  return (
    <>
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h5"
          component={Link}
          to="/homepage"
          className={classes.logo}
        >
          Eddu SSAFY
        </Typography>
        {isMobile ? (
          <DrawerComponent></DrawerComponent>
        ) : (
          <div className={classes.navlinks}>
            <Link to="/problemlist" className={classes.link}>
              문제 목록
            </Link>
            <Link to="/createquestion" className={classes.link}>
              문제 생성
            </Link>
            <Link
              to="/userprofile"
              onClick={(e) => {
                e.preventDefault();
                console.log(token);
                axios({
                  method: "get",
                  url: users.me(),
                  // headers: {
                  //   Authorization: `Bearer ${token}`,
                  // },
                }).then((res) => {
                  console.log(res.data);
                  dispatch(me(res.data));
                  navigate("/userprofile", { replace: true });

                });
              }}
              className={classes.link}
            >
              개인정보 수정
            </Link>
            <Link to="/logout" 
            className={classes.link}>
              로그아웃
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
    <Outlet />
    </>
  );
}
