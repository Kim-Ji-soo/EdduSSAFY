/** @format */

import RoomList from "./homepage/RoomList";
import UserList from "./homepage/UserList";
function Homepage(props) {
  return (
    <div style={{ display: "flex" }}>
      <RoomList></RoomList>
      <UserList></UserList>
    </div>
  );
}
export default Homepage;
