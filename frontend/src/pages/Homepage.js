/** @format */
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import RoomList from "./homepage/RoomList";
import UserList from "./homepage/UserList";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material"; //contain
function Homepage(props) {
  const [cropen, setCropen] = useState(false);
  const roomTitle = useRef();
  const userId = useSelector((state) => {
    return state.user.value.userId;
  });
  const handleCreateRoom = () => {
    console.log(userId);
    console.log(roomTitle);
  };
  return (
    <Grid item container spacing={2}>
      <Grid item xs={12} md={9}>
        <RoomList></RoomList>
      </Grid>
      <Grid item xs={12} md={3}>
        <UserList></UserList>
      </Grid>
      <Button>방 생성</Button>
      <Modal
        open={cropen}
        onClose={() => {
          setCropen((cropen) => {
            return !cropen;
          });
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            minWidth: "200px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20vw",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <TextField
            id="outlined-basic2"
            label="Outlined"
            variant="outlined"
            defaultValue=""
            sx={{}}
            inputRef={roomTitle}
          />
          <Button
            sx={{ display: "block" }}
            onClick={() => {
              handleCreateRoom();
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            change
          </Button>
          <Button
            sx={{ display: "block" }}
            onClick={(e) => {
              setCropen((cropen) => {
                return !cropen;
              });
            }}
          >
            cancel
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}
export default Homepage;
