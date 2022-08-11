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
import { email } from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../css/signup.module.css";
import Box from "@mui/material/Box";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordCheck: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
  name: yup.string("Enter your name").required("name is required"),
  nickname: yup.string("Enter your nickname").required("nickname is required"),
  userId: yup
    .string("Enter your id")
    .min(5, "id should be of minimum 5 characters length")
    .required("id is required"),
  tel: yup
    .string("Enter your phonenumber")
    .length(11, "phonenumber should be 11 characters length")
    .required("phonenumber is required"),
  position: yup.string("Enter your position").required("position is required"),
});

function Signup() {
  const navigate = useNavigate();
  const [checkId, setCheckId] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [valid, setValid] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      nickname: "",
      userId: "",
      password: "",
      passwordCheck: "",
      email: "",
      tel: "",
      position: "professor",
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
              <h2 className={styles.h2}>Sign Up</h2>
              <span className={styles.span}>
                Make our Eddu SSAFY community register{" "}
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
                <div>
                  <TextField
                    name="nickname"
                    label="nickname"
                    value={formik.values.nickname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nickname && Boolean(formik.errors.nickname)
                    }
                    helperText={
                      formik.touched.nickname && formik.errors.nickname
                    }
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
                    sx={Textfieldsx}
                  />
                </div>
                <div>
                  <TextField
                    name="passwordCheck"
                    type="password"
                    label="passwordcheck"
                    value={formik.values.passwordCheck}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.passwordCheck &&
                      Boolean(formik.errors.passwordCheck)
                    }
                    helperText={
                      formik.touched.passwordCheck &&
                      formik.errors.passwordCheck
                    }
                    sx={Textfieldsx}
                  />
                </div>
                <div className={styles.inputEmail}>
                  <TextField
                    name="email"
                    label="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={Textbtnfieldsx}
                  />
                  <Button
                    className={styles.inputButton}
                    onClick={() => {
                      const userId = formik.values.userId;
                      console.log(users.idcheck() + userId);
                      console.log(formik.values.email);
                      axios({
                        method: "post",
                        url: email.emailConfirm(),
                        data: { email: formik.values.email },
                      }).then((res) => {
                        console.log(res.data.message);
                        setMessage(res.data.message);
                      });
                    }}
                  >
                    코드발송
                  </Button>
                </div>

                <div className={styles.inputEmail}>
                  <TextField
                    name="message"
                    label="message"
                    value={messageValue}
                    onChange={(e) => {
                      setMessageValue(e.target.value);
                    }}
                    sx={Textbtnfieldsx}
                  />
                  <Button
                    className={styles.inputButton}
                    onClick={(e) => {
                      e.preventDefault();
                      if (messageValue === message) {
                        setCheckEmail(true);
                        setValid(true && checkId);
                        alert("이메일 인증이 완료 되었습니다.");
                      } else {
                        alert("코드가 일치하지 않습니다.");
                      }
                    }}
                  >
                    코드제출
                  </Button>
                </div>

                <div>
                  <TextField
                    name="tel"
                    label="tel"
                    value={formik.values.tel}
                    onChange={formik.handleChange}
                    error={formik.touched.tel && Boolean(formik.errors.tel)}
                    helperText={formik.touched.tel && formik.errors.tel}
                    sx={Textfieldsx}
                  />
                </div>
              </div>
              <div>
                <FormControl>
                  <FormLabel userId="demo-radio-buttons-group-label"></FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="position"
                    defaultValue="professor"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    row
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "20px",
                    }}
                  >
                    <FormControlLabel
                      checked={formik.values.position === "professor"}
                      value="professor"
                      control={<Radio sx={radiosx} />}
                      label="교수"
                      sx={{
                        color: "black",
                      }}
                    ></FormControlLabel>
                    <FormControlLabel
                      checked={formik.values.position === "student"}
                      value="student"
                      control={<Radio sx={radiosx} />}
                      label="학생"
                      sx={{
                        color: "black",
                      }}
                    ></FormControlLabel>
                  </RadioGroup>
                </FormControl>
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
export default Signup;
