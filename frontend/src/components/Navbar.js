import React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import { BrowserRouter, Link } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  return (
    <Paper sx={{ position: "fixed", top: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <BottomNavigationAction
          label="홈페이지"
          icon={<HomeIcon />}
          sx={{ right: 350 }}
        />
        <BottomNavigationAction label="로그인" component={Link} to="/" />
        <BottomNavigationAction
          label="회원가입"
          component={Link}
          to="signup/"
        />
        <BottomNavigationAction label="문제 목록" />
        <BottomNavigationAction label="문제 생성" />
        <BottomNavigationAction label="개인정보수정" />
        <BottomNavigationAction label="로그아웃" />
      </BottomNavigation>
    </Paper>
  );
}
