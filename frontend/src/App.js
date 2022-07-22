/** @format */
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import CreateQuestion from "./pages/CreateQuestion";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/homepage" element={<Homepage></Homepage>}></Route>
        <Route
          path="/createquestion"
          element={<CreateQuestion></CreateQuestion>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
