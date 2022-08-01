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

import MenuIcon from "@mui/icons-material/Home";

import classes from "../css/drawer.module.css"

function DrawerComponent() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer open={openDrawer} anchor="right" onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/" className={classes.link}>로그인</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/signup" className={classes.link}>회원가입</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/problemlist" className={classes.link}>문제 목록</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/createquestion" className={classes.link}>문제 생성</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/" className={classes.link}>개인정보 수정</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/" className={classes.link}>로그아웃</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.icon}>
                <MenuIcon />
            </IconButton>
        </>
    );
}
export default DrawerComponent;
