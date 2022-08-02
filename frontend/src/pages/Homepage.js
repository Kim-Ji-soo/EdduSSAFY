/** @format */

import RoomList from "./homepage/RoomList";
import UserList from "./homepage/UserList";
import { Grid } from "@mui/material"; //contain
function Homepage(props) {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={12} md={9}>
        <RoomList></RoomList>
      </Grid>
      <Grid item xs={12} md={3}>
        <UserList></UserList>
      </Grid>
    </Grid>
  );
}
export default Homepage;
