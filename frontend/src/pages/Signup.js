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
import styles from "../css/signup.module.css";
import Box from "@mui/material/Box";

const validationSchema = yup.object({
  email: yup
    .string("이메일을 입력해주세요")
    .email("이메일이 유효하지 않습니다")
    .required("이메일은 필수입니다"),
  password: yup
    .string("패스워드를 입력해주세요")
    .min(8, "패스워드는 최소 8글자 입니다")
    .required("패스워드는 필수입니다"),
  passwordCheck: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "패스워드와 일치해야합니다"),
  }),
  name: yup.string("이름을 입력해주세요").required("이름은 필수입니다"),
  nickname: yup.string("닉네임을 입력해주세요").required("닉네임은 필수입니다"),
  userId: yup
    .string("아이디를 입력해주세요")
    .min(5, "아이디는 최소 5글자 입니다")
    .required("아이디는 필수입니다"),
  tel: yup
    .string("전화번호를 적어주세요")
    .length(11, "전화번호는 01012345678형식입니다")
    .required("전화번호는 필수입니다"),
  position: yup.string("직업을 골라주세요").required("직업 선택은 필수입니다"),
});

function Signup() {
  const navigate = useNavigate();
  const [checkId, setCheckId] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
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
        setSubmitting(false);

        axios({
          method: "post",
          url: users.signup(),
          data: formik.values,
        })
          .then((res) => {
            navigate("/login", { replace: true });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        if (checkId === false) {
          alert("아이디 중복체크 해주세요");
        } else {
          alert("이메일 인증 해주세요");
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
              minWidth: "15vw",
              height: "90vh",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30vw",
              bgcolor: "background.paper",
              border: "2px #000",
              borderRadius: 5,
              boxShadow: 10,
              pt: 2,
              px: 4,
              pb: 3,
              overflowY: "scroll",
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
              <h2 className={styles.h2}>회원가입</h2>
              <span className={styles.span}>
                Eddu SSAFY의 일원이 되어보세요
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
                    label="이름"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    autoComplete="off"
                    sx={Textfieldsx}
                  />
                </div>
                <div>
                  <TextField
                    name="nickname"
                    label="닉네임"
                    value={formik.values.nickname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.nickname && Boolean(formik.errors.nickname)
                    }
                    helperText={
                      formik.touched.nickname && formik.errors.nickname
                    }
                    autoComplete="off"
                    sx={Textfieldsx}
                  />
                </div>
                <div className={styles.inputId}>
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
                    sx={{ ...Textfieldsx, width: "52%" }}
                  />
                  <Button
                    className={styles.inputButton}
                    onClick={() => {
                      const userId = formik.values.userId;
                      if (userId.length < 5) {
                        alert("아이디 길이는 5자 이상이어야 합니다!");
                      } else {
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
                      }
                    }}
                    sx={{ marginTop: "2%", width: "18%" }}
                  >
                    중복체크
                  </Button>
                </div>
                <div>
                  <TextField
                    name="password"
                    type="password"
                    label="비밀번호"
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
                    label="비밀번호 다시입력"
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
                        data: {
                          email: formik.values.email,
                          reqType: "register",
                        },
                      })
                        .then((res) => {
                          alert("이메일 발신 성공!");
                        })
                        .catch((e) => {
                          alert("이미 존재하는 이메일입니다!");
                          console.log(e);
                        });
                    }}
                    sx={{ marginTop: "2%", width: "18%" }}
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
                          reqType: "register",
                        },
                      })
                        .then((res) => {
                          setCheckEmail(true);
                          setValid(true && checkId);
                          alert("이메일 인증이 완료 되었습니다.");
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                    sx={{ marginTop: "2%", width: "18%" }}
                  >
                    코드제출
                  </Button>
                </div>

                <div>
                  <TextField
                    name="tel"
                    label="전화번호"
                    value={formik.values.tel}
                    onChange={formik.handleChange}
                    error={formik.touched.tel && Boolean(formik.errors.tel)}
                    helperText={formik.touched.tel && formik.errors.tel}
                    autoComplete="off"
                    sx={Textfieldsx}
                  />
                </div>
              </div>
              <div>
                <FormControl>
                  <FormLabel className="demo-radio-buttons-group-label"></FormLabel>
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
                가입하기
              </Button>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
}
export default Signup;
