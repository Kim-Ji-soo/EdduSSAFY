/** @format */
import * as React from "react";
import { useState, forwardRef } from 'react';

//contain
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { TransitionGroup } from 'react-transition-group';
import { Grid, Divider, ListItem } from "@mui/material";
//
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

//
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

//
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { quizbookActions } from '../redux/quizbook'

//
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ListItemSecondaryAction } from '@mui/material';



const CustomContainerComponent = forwardRef(
  function CustomContainerComponent(
    { children, extraSecondaryAction, ...other },
    ref
  ) {
    return (
      <li ref={ref} {...other}>
        {children}
        {extraSecondaryAction}
      </li>
    );
  }
);


function RenderItem({ item, index }) {

  const dispatch = useDispatch(); 

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem ContainerComponent={CustomContainerComponent}
        ContainerProps={{
                  extraSecondaryAction: (
                    <ListItemSecondaryAction
                    >
                      <IconButton
                        onClick={() => { dispatch(quizbookActions.removequizbook(item.id)) }}
                        aria-label="delete"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )
              }}>
        
      <ListItemButton onClick={handleClick}>

      <ListItemIcon>
        { open ? <FolderOpenIcon/> : <FolderIcon/> }
      </ListItemIcon>

      <ListItemText primary={item.id}/>

      {open ? <ExpandLess /> : <ExpandMore/>}
        
        </ListItemButton>
        
        <ListItemSecondaryAction>  </ListItemSecondaryAction>
      </ListItem>
    {open ? <Divider variant="middle" /> : null }
    <Collapse in={open} timeout="auto" unmountOnExit >

      <List component="div" disablePadding >

        <ListItemButton onClick={()=>{console.log(index)}} sx={{ pl: 4 }}>

          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>

          <ListItemText primary={"happy"} />


        </ListItemButton>

      </List>

    </Collapse>
    <Divider />
  </List>
  );
}

function ProblemList() {
  const QUIZBOOK = useSelector((state) => state.quizbooks.quizbook);
  
  const dispatch = useDispatch(); 
  
  const handleCreateQuizbook = () => {
    const newID = new Date().toLocaleString().replace(/[\.\s\:ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    console.log(newID);
    dispatch(quizbookActions.addquizbook(newID))
  }


  return (
    <>
      <Grid item xs={12} md={12}>
          <Box sx={{ mt: 1 }}>
        <List>
            <TransitionGroup>
            {QUIZBOOK.map((item, index) => (
              <Collapse key={index}>
                { RenderItem({ item, index }) }
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
        </Grid>
        
      <Grid item container spacing={2}>
        <Button onClick={() => { handleCreateQuizbook() }}>문제집 생성하기</Button>
      </Grid>
    </>
  );
}
export default ProblemList;
