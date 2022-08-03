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
        navigate("/homepage", { replace: true });
      });
    },
  });
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit(event);
        }}
      >
        <h2>Login</h2>
        <div>
          <TextField
            name="userId"
            label="userId"
            value={formik.values.userId}
            onChange={formik.handleChange}
            error={formik.touched.userId && Boolean(formik.errors.userId)}
            helperText={formik.touched.userId && formik.errors.userId}
          />
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
          <Button type="submit" disabled={formik.isSubmitting}>
            로그인
          </Button>
        </div>
      </form>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <Link to="/signup">
            <Button type="submit">회원가입</Button>
          </Link>
        </div>
      </form>

      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <Link to="/signup">
            <Button type="submit">비밀번호찾기</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
