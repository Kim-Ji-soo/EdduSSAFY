/** @format */
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import VideoRoomComponent from "./pages/VideoRoomComponent";
import ProblemList from "./pages/ProblemList";
import CreateQuestion from "./pages/CreateQuestion";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";
import Navbar from "./components/Navbar";
import QuizList from "./pages/QuizList"; //contain
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { Grid } from "@mui/material"; //contain
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import PrivateRoute from "./lib/PrivateRoute";
import UpdateQuestion from "./pages/UpdateQuestion";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Mainpage from "./pages/Mainpage";

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: ["Single Day", "cursive"].join(","),
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              direction="column"
            >
              <Routes>
                <Route
                  element={
                    <Grid item xs={10} sm={10}>
                      <Navbar></Navbar>
                    </Grid>
                  }
                >
                  <Route
                    path="/"
                    element={
                      <PrivateRoute
                        component={<Homepage></Homepage>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/problemlist"
                    element={
                      <PrivateRoute
                        component={<ProblemList></ProblemList>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/createquestion"
                    element={
                      <PrivateRoute
                        component={<CreateQuestion></CreateQuestion>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/userprofile"
                    element={
                      <PrivateRoute
                        component={<UserProfile></UserProfile>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/changepassword"
                    element={
                      <PrivateRoute
                        component={<ChangePassword></ChangePassword>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/mainpage"
                    element={
                      <PrivateRoute
                        component={<Mainpage></Mainpage>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route path="/logout" element={<Logout></Logout>}></Route>
                  <Route
                    path="/quizlist/:id"
                    element={
                      <PrivateRoute
                        component={<QuizList></QuizList>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/updateQuestion"
                    element={
                      <PrivateRoute
                        component={<UpdateQuestion></UpdateQuestion>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  {/* <Route
                  path="/openvidu"
                  element={
                    <PrivateRoute
                      component={<Openvidu></Openvidu>}
                    ></PrivateRoute>
                  }
                ></Route> */}
                </Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route
                  path="/forgotpassword"
                  element={<ForgotPassword></ForgotPassword>}
                ></Route>
                <Route
                  path="/openvidu"
                  element={
                    <PrivateRoute
                      component={<VideoRoomComponent></VideoRoomComponent>}
                    ></PrivateRoute>
                  }
                ></Route>
              </Routes>
            </Grid>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
