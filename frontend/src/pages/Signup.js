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
import "../css/signup.css";

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
  id: yup
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
      id: "",
      password: "",
      passwordCheck: "",
      email: "",
      tel: "",
      position: "",
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
            navigate("/", { replace: true });
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
  return (
    <>
      <h1>Sign up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div>
          <TextField
            name="name"
            label="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>
        <div>
          <TextField
            name="nickname"
            label="nickname"
            value={formik.values.nickname}
            onChange={formik.handleChange}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            helperText={formik.touched.nickname && formik.errors.nickname}
          />
        </div>
        <div id="inputId">
          <TextField
            name="id"
            label="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
          />
          <Button
            id="inputButton"
            onClick={() => {
              const id = formik.values.id;
              console.log(users.idcheck() + id);
              axios({
                method: "get",
                url: users.idcheck() + id,
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
              formik.touched.passwordCheck && formik.errors.passwordCheck
            }
          />
        </div>
        <div className="inputEmail">
          <TextField
            name="email"
            label="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            className="inputButton"
            onClick={() => {
              const id = formik.values.id;
              console.log(users.idcheck() + id);
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

        <div className="inputEmail">
          <TextField
            name="message"
            label="message"
            value={messageValue}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
          />
          <Button
            className="inputButton"
            onClick={(e) => {
              e.preventDefault();
              if (messageValue === message) {
                setCheckEmail(true);
                setValid(checkEmail && checkId);
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
          />
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="position"
              defaultValue="professor"
              value={formik.values.position}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                checked={formik.values.position === "professor"}
                value="professor"
                control={<Radio />}
                label="교수"
              ></FormControlLabel>
              <FormControlLabel
                checked={formik.values.position === "student"}
                value="student"
                control={<Radio />}
                label="학생"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
export default Signup;
