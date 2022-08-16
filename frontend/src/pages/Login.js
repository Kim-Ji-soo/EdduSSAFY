/** @format */

import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import users from "../api/api";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/token";
import styles from "../css/login.module.css";
import { me } from "../redux/user";
import { quizbook, room } from "../api/api";
import { quizbookActions } from "../redux/quizbook";

import { roomActions } from "../redux/room";
import Box from "@mui/material/Box";

import logo from "../assets/EDDUSSAFY_slogan포함_동그라미.png";

const validationSchema = yup.object({
  password: yup.string("Enter your password").required("Password is required"),
  userId: yup
    .string("Enter your id")
    .min(5, "id should be of minimum 5 characters length")
    .required("id is required"),
});
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      console.log(data);
      setSubmitting(false);
      axios({
        method: "post",
        url: users.login(),
        data: formik.values,
      }).then((res) => {
        console.log(res.data);
        const token = res.data.accessToken;
        dispatch(setToken(res.data));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // dispatch(setToken(res.data.accessToken));
        //localStorage.setItem("token", token);
        //console.log(localStorage.getItem("token"));
        axios({
          method: "get",
          url: users.me(),
        }).then((res) => {
          console.log(res.data);
          dispatch(me(res.data));
        });
        axios({
          method: "get",
          url: quizbook.getQuizbook() + formik.values.userId,
        }).then((res) => {
          console.log(res.data);
          dispatch(quizbookActions.getquizbook(res.data));
        });
        axios({
          method: "get",
          url: room.getRoom(),
        }).then((res) => {
          console.log(res.data);
          dispatch(roomActions.getRooms(res.data));
        });
        navigate("/", { replace: true });
      });
    },
  });

  const Textfieldsx = {
    width: "70%",
    height: "100%",
    "& .MuiInputLabel-root": { color: "black", fontSize: "0.8vmax" },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        width: "100%",
        height: "100%",
        border: "3px solid blue",
        borderRadius: "20px 20px",
      },
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "blue",
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        borderColor: "blue",
      },
    },
  };

  const Buttonsx = {
    "&.MuiButton-root": {
      border: "3px blue solid",
      width: "80%",
      textDecoration: "none",
      borderRadius: "70px 70px",
      padding: "10px 0px",
      color: "#4C3657",
    },
    "&.MuiButton-root::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "70px 70px",
      backgroundColor: "#FDDD6D",
      top: "-10px",
      left: "10px",
      zIndex: "-1",
    },
  };

  return (
    <div>
      <div>
        <div className={styles.background}></div>
        <div className={styles.container}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              minWidth: "400px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "20vw",
              bgcolor: "background.paper",
              // bgcolor: "#f8f7fc",
              border: "2px #000",
              borderRadius: 10,
              boxShadow: 10,
              pt: 2,
              px: 4,
              pb: 3,
            }}
          >
            {/* <div>
              <img text-align="center" width="350" height="350" src={logo} />
            </div> */}
            <div className={styles.toplinks}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div>
                  <Link to="/signup" className={styles.link}>
                    <Button type="submit" className={styles.buttons}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
            <div>
              <img text-align="center" width="350" height="350" src={logo} />
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                formik.handleSubmit(event);
              }}
            >
              <div>
                <h2 className={styles.h2}>Login</h2>
                <span className={styles.span}>
                  To join our Eddu SSAFY community web site{" "}
                </span>
              </div>

              <div className={styles.textcon}>
                <div>
                  <TextField
                    name="userId"
                    label="userId"
                    value={formik.values.userId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.userId && Boolean(formik.errors.userId)
                    }
                    helperText={formik.touched.userId && formik.errors.userId}
                    autoComplete="off"
                    sx={Textfieldsx}
                  />
                </div>
                <div>
                  <TextField
                    name="password"
                    type="password"
                    label="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    autoComplete="off"
                    sx={Textfieldsx}
                  />
                </div>
              </div>
              <div className={styles.subcon}>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={Buttonsx}
                >
                  Login
                </Button>
              </div>
            </form>

            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div>
                <Link to="/forgotpassword" className={styles.linktext}>
                  <Button
                    type="submit"
                    sx={{
                      "&.MuiButton-root": {
                        color: "black",
                        fontSize: "0.8vmin",
                      },
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Link>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Login;
