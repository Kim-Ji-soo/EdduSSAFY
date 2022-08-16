import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import users from "../api/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { me } from "../redux/user";
import styles from "../css/changePassword.module.css";
import Box from "@mui/material/Box";


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

  const Textfieldsx = {
    width: "70%",
    height: "100%",
    marginTop:"10px",
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
    marginTop:"20px",
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
    <>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent:"center",
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
              autoComplete="off"
              sx={Textfieldsx}
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
                    autoComplete="off"
                    sx={Textfieldsx}
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
                    autoComplete="off"
                    sx={Textfieldsx}
                  />
                </div>
          
          <Button type="submit" disabled={formik.isSubmitting}   sx={Buttonsx}>
            비밀번호변경
          </Button>
        </form>
        <Link to="/userprofile" className={styles.link}>
        <Button className={styles.buttons}>
            뒤로가기
        </Button>
        </Link>
      </Box>
    </>
  );
}
export default ChangePassword;
