import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import users from "../api/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { me } from "../redux/user";
import { Box } from "@mui/material";


const validationSchema = yup.object({
  userId: yup
    .string("Enter your id")
    .min(5, "id should be of minimum 5 characters length")
    .required("id is required"),
    oldPassword: yup
    .string("Enter your past password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
    newPassword: yup
    .string("Enter your past password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function ChangePassword() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        userId: user.userId,
        oldPassword : "",
        newPassword : "",
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      setSubmitting(false);
      axios({
        method: "put",
        url: users.changePassword(),
        data: formik.values,
      })
        .then((res) => {
          alert("비밀번호 변경완료!");
          axios({
            method: "get",
            url: users.me(),
          })
            .then((res) => {
              console.log(res.data);
              dispatch(me(res.data));
            })
            .catch((e) => console.log(e));
          navigate("/", { replace: true });
        })
        .catch((e) => {
            alert('비밀번호를 잘못 입력하셨습니다!');
            console.log(e);
        });
    },
  });
  return (
    <>
      <Box
        sx={{
          margin: 10,
        }}
      >
        <h1>Change Password</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
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
                    name="oldPassword"
                    type="password"
                    label="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
                    }
                    helperText={
                      formik.touched.oldPassword && formik.errors.oldPassword
                    }
                  />
                </div>
                <div>
                  <TextField
                    name="newPassword"
                    type="password"
                    label="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.newPassword &&
                      Boolean(formik.errors.newPassword)
                    }
                    helperText={
                      formik.touched.newPassword &&
                      formik.errors.newPassword
                    }
                  />
                </div>
          
          <Button type="submit" disabled={formik.isSubmitting}>
            비밀번호변경
          </Button>
        </form>
        <Link to="/userprofile">
        <Button>
            뒤로가기
        </Button>
        </Link>
      </Box>
    </>
  );
}
export default ChangePassword;
