/** @format */
import * as React from "react";
import { useState } from 'react';

//contain
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { TransitionGroup } from 'react-transition-group';
import { Grid, Divider } from "@mui/material";
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

const FRUITS = [
  'Apple',
  'Banana',
  'Pineapple',
  'Coconut',
  'Watermelon',
];

function RenderItem({ item, handleRemoveFruit, index }) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>

    <ListItemButton onClick={handleClick}>

      <ListItemIcon>
        { open ? <FolderOpenIcon/> : <FolderIcon/> }
      </ListItemIcon>

      <ListItemText primary={"INDEX " + index}/>

      {open ? <ExpandLess /> : <ExpandMore/>}
      
    </ListItemButton>
     {open ? <Divider variant="middle" /> : null }
    <Collapse in={open} timeout="auto" unmountOnExit >

      <List component="div" disablePadding >

        <ListItemButton onClick={()=>{console.log(index)}} sx={{ pl: 4 }}>

          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>

          <ListItemText primary={item} />


        </ListItemButton>

      </List>

    </Collapse>
    <Divider />
  </List>
  );
}

function ProblemList() {
  const [fruitsInBasket, setFruitsInBasket] = useState(FRUITS);

  const handleRemoveFruit = (item) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  return (
    <>
      <Grid item xs={12} md={12}>
          <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {fruitsInBasket.map((item, index) => (
              <Collapse key={item}>
                {RenderItem({ item, handleRemoveFruit, index })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
        </Grid>
        
      <Grid item container spacing={2}>
      </Grid>
    </>
  );
}
export default ProblemList;
