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
import * as api from "./api/api";
import axios from "axios";

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
      axios({
        method: "post",
        url: api.users.signup(),
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
            name="id"
            label="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
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
        <Button type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </form>
    </>
  );
}
export default Signup;
