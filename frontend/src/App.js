/** @format */
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import ProblemList from "./pages/ProblemList";
import CreateQuestion from "./pages/CreateQuestion";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import Logout from "./pages/Logout";
import QuizList from "./pages/QuizList"; //contain
import { Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { Grid } from "@mui/material"; //contain
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import PrivateRoute from "./lib/PrivateRoute";
import UpdateQuestion from "./pages/UpdateQuestion";

function App() {
  return (
  <div className="App">
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            direction="column"
          >
            

          <Routes>
          <Route element={<Grid item xs={12} sm={12}>
              <Navbar></Navbar>
            </Grid>}>
              <Route path="/homepage" element={<Homepage></Homepage>}></Route>
              <Route
                path="/problemlist"
                element={<ProblemList></ProblemList>}
              ></Route>
              <Route
                path="/createquestion"
                element={<CreateQuestion></CreateQuestion>}
              ></Route>
              <Route
                path="/userprofile"
                element={
                  <PrivateRoute
                  component={<UserProfile></UserProfile>}>
                  </PrivateRoute>
                }
              ></Route>
              <Route
              path="/logout"
              element={<Logout></Logout>}
              ></Route>
              <Route
              path="/quizlist/:id"
              element={<QuizList></QuizList>}
            ></Route>
            <Route
                path="/updateQuestion"
                element={<UpdateQuestion></UpdateQuestion>}
            >
            </Route>
            </Route>
              <Route path="/" element={<Login></Login>}></Route>
              <Route path="/signup" element={<Signup></Signup>}></Route>
            </Routes>
          </Grid>
        </PersistGate>
        </Provider>
    </div>
  );
}

export default App;
