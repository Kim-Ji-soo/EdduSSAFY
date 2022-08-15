import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import * as yup from "yup";
import users from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../css/forgotPassword.module.css";
import Box from "@mui/material/Box";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your name").required("name is required"),
  userId: yup
    .string("Enter your id")
    .min(5, "id should be of minimum 5 characters length")
    .required("id is required"),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [checkId, setCheckId] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [valid, setValid] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      userId: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      if (valid === true) {
        setSubmitting(true);
        console.log(formik.values);
        console.log(users.signup());
        setSubmitting(false);

        axios({
          method: "post",
          url: users.signup(),
          data: formik.values,
        })
          .then((res) => {
            console.log(res.data);
            navigate("/login", { replace: true });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        if (checkId === false) {
          alert("아이디 중복체크 해주세요.");
        } else {
          alert("이메일 인증 해주세요.");
        }
      }
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

  const Textbtnfieldsx = {
    width: "52%",
    height: "100%",
    "& .MuiInputLabel-root": { color: "black", fontSize: "0.8vmax" },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        width: "90%",
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

  const radiosx = {
    color: "#FDDD6D",
    "&.Mui-checked": {
      color: "#FDDD6D",
    },
  };

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.signupBody}>
        <div className={styles.container}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              minWidth: "385px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "20vw",
              bgcolor: "background.paper",
              border: "2px #000",
              borderRadius: 5,
              boxShadow: 10,
              pt: 2,
              px: 4,
              pb: 3,
            }}
          >
            <div className={styles.toplinks}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div>
                  <Link to="/" className={styles.link}>
                    <Button type="submit" className={styles.buttons}>
                      Sign in
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
            <div>
              <h2 className={styles.h2}>Forgot Password?</h2>
              <span className={styles.span}>
                Find your Eddu SSAFY community account{" "}
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <div className={styles.textcon}>
                <div>
                  <TextField
                    name="name"
                    label="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={Textfieldsx}
                  />
                </div>
                
                <div userId={styles.inputId}>
                  <TextField
                    name="userId"
                    label="userId"
                    value={formik.values.userId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.userId && Boolean(formik.errors.userId)
                    }
                    helperText={formik.touched.userId && formik.errors.userId}
                    sx={Textbtnfieldsx}
                  />
                  <Button
                    userId="inputButton"
                    className={styles.inputButton}
                    onClick={() => {
                      const userId = formik.values.userId;
                      console.log(users.idcheck() + userId);
                      axios({
                        method: "get",
                        url: users.idcheck() + userId,
                      }).then((res) => {
                        if (res.data === true) {
                          alert("중복된 아이디입니다.");
                        } else {
                          setCheckId(true);
                          setValid(checkEmail && checkId);
                          alert("사용 가능한 아이디입니다.");
                        }
                      });
                    }}
                  >
                    중복체크
                  </Button>
                </div>

              </div>
            
              <Button type="submit" sx={Buttonsx}>
                Submit
              </Button>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
