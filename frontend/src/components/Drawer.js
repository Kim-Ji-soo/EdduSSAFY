import React, { useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Home";

import classes from "../css/drawer.module.css";

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const position = useSelector((state) => state.user.value.position);
  return (
    <>
      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#2ea2f8",
          },
        }}
      >
        <List>
          {position === "professor" && (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/problemlist" className={classes.link}>
                  문제 목록
                </Link>
              </ListItemText>
            </ListItem>
          )}
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/roomlist" className={classes.link}>
                방 목록
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/userprofile" className={classes.link}>
                개인정보 수정
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/logout" className={classes.link}>
                로그아웃
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.icon}
        sx={{ color: "#c4e5fd" }}
        disableFocusRipple
        disableRipple
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
