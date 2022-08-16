import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import users from "../api/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { me, logout } from "../redux/user";
import { deleteToken } from "../redux/token";
import { Box } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
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
});

function UserProfile() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: user.name,
      nickname: user.nickName, // api/me 로 받아올때 nickName으로 받음
      userId: user.userId,
      email: user.email,
      tel: user.tel,
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      setSubmitting(true);
      setSubmitting(false);
      await axios({
        method: "put",
        url: users.update(),
        data: formik.values,
      })
        .then((res) => {
          alert("회원정보 수정완료!")
        })
        .catch((e) => {
          console.log(e);
        });
      axios({
        method: "get",
        url: users.me(),
      })
        .then((res) => {
          dispatch(me(res.data));
        })
        .catch((e) => console.log(e));
        navigate("/", { replace: true });
    },
  });
  return (
    <>
      <Box
        sx={{
          margin: 10,
        }}
      >
        <h1>User Profile</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div>
            <TextField
              disabled
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
          <div>
            <TextField
              disabled
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
              disabled
              name="email"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
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
          <Button type="submit" disabled={formik.isSubmitting}>
            정보수정
          </Button>
        </form>
        <Link to="/changepassword">
          <div>
            <Button>비밀번호변경</Button>
          </div>
        </Link>
        <Button
          onClick={() => {
            axios({
              method: "delete",
              url: users.delete() + user.userId + "/",
            })
              .then((res) => {
                console.log(res.data);
                alert("회원 탈퇴가 완료되었습니다!");
                dispatch(deleteToken());
                dispatch(logout());
                navigate("/login", { replace: true });
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          회원탈퇴
        </Button>
      </Box>
    </>
  );
}
export default UserProfile;
