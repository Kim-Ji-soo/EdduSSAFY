import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import users from "../api/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../css/forgotPassword.module.css";
import Box from "@mui/material/Box";

const validationSchema = yup.object({
  email: yup
    .string("이메일을 입력해주세요")
    .email("이메일이 유효하지 않습니다")
    .required("이메일은 필수입니다"),
  userId: yup
    .string("아이디를 입력해주세요")
    .min(5, "아이디는 최소 5글자 입니다")
    .required("아이디는 필수입니다"),
  password: yup
    .string("비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8글자 입니다")
    .required("비밀번호는 필수입니다"),
  passwordCheck: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], "비밀번호와 같아야 합니다"),
  }),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const formik = useFormik({
    initialValues: {
      userId: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      if (checkEmail === true) {
        setSubmitting(true);
        setSubmitting(false);

        axios({
          method: "put",
          url: users.resetPassword(),
          data: {
            authKey: messageValue,
            email: formik.values.email,
            password: formik.values.password,
            userId: formik.values.userId,
          },
        })
          .then((res) => {
            navigate("/login", { replace: true });
          })
          .catch((e) => {
            alert("정보가 잘못 입력되었습니다!");
            console.log(e);
          });
      } else {
        alert("이메일 인증 해주세요.");
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
              justifyContent: "center",
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
              mt: 4,
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
                      로그인
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
            <div>
              <h2 className={styles.h2}>비밀번호 찾기</h2>
              <span className={styles.span}>
                당신의 Eddu SSAFY 계정을 찾아보세요
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <div className={styles.textcon}>
                <div userId={styles.inputId}>
                  <TextField
                    name="userId"
                    label="사용자 ID"
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
                <div className={styles.inputEmail}>
                  <TextField
                    name="email"
                    label="이메일"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    autoComplete="off"
                    sx={Textbtnfieldsx}
                  />
                  <Button
                    className={styles.inputButton}
                    onClick={() => {
                      const userId = formik.values.userId;
                      axios({
                        method: "post",
                        url: users.sendEmail(),
                        data: { email: formik.values.email, reqType: "reset" },
                      }).then((res) => {});
                    }}
                  >
                    코드발송
                  </Button>
                </div>

                <div className={styles.inputEmail}>
                  <TextField
                    name="message"
                    label="메일로 받은 코드"
                    value={messageValue}
                    onChange={(e) => {
                      setMessageValue(e.target.value);
                    }}
                    autoComplete="off"
                    sx={Textbtnfieldsx}
                  />
                  <Button
                    className={styles.inputButton}
                    onClick={(e) => {
                      e.preventDefault();
                      axios({
                        method: "post",
                        url: users.confirmCode(),
                        data: {
                          authKey: messageValue,
                          email: formik.values.email,
                          reqType: "reset",
                        },
                      })
                        .then((res) => {
                          setCheckEmail(true);
                          alert("이메일 인증이 완료 되었습니다.");
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  >
                    코드제출
                  </Button>
                </div>
                <div>
                  <TextField
                    name="password"
                    type="password"
                    label="새로운 비밀번호"
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
                <div>
                  <TextField
                    name="passwordCheck"
                    type="password"
                    label="비밀번호 확인"
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
                    autoComplete="off"
                    sx={Textfieldsx}
                  />
                </div>
              </div>

              <Button type="submit" sx={Buttonsx}>
                변경하기
              </Button>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
