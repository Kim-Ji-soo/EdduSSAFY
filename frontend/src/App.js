/** @format */
import Login from "./Login";
import Signup from "./Signup";
import {Routes, Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
    </div>
  );
}

export default App;
