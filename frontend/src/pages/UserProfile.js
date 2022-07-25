import React from "react";
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
  id: yup
    .string("Enter your id")
    .min(5, "id should be of minimum 5 characters length")
    .required("id is required"),
  phonenumber: yup
    .string("Enter your phonenumber")
    .length(11, "phonenumber should be 11 characters length")
    .required("phonenumber is required"),
  position: yup.string("Enter your position").required("position is required"),
});

function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
      password: "",
      passwordCheck: "",
      email: "",
      phonenumber: "",
      position: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      console.log(formik.values);
      setSubmitting(false);
      console.log(users.users.signup());
      axios({
        method: "post",
        url: users.users.signup(),
        data: formik.values,
      })
        .then((res) => {
          console.log(res.data);
          navigate("/", { replace: true });
        })
        .catch((e) => {
          console.log(e);
        });
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
        <div>
          <TextField
            name="phonenumber"
            label="phonenumber"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
            }
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
          />
        </div>
        <Button type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </form>
    </>
  );
}
export default Signup;
