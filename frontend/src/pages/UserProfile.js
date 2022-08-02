import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
} from "@mui/material";
import * as yup from "yup";
import users from "../api/api";
import axios from "axios";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your name").required("name is required"),
  nickname : yup.string("Enter your nickname").required("nickname is required"),
  id: yup
    .string("Enter your id")
    .min(5, "id should be of minimum 5 characters length")
    .required("id is required"),
  tel: yup
    .string("Enter your phonenumber")
    .length(11, "phonenumber should be 11 characters length")
    .required("phonenumber is required"),
});

function UserProfile() {
  const formik = useFormik({
    initialValues: {
      name : "",
      nickname : "",
      id : "",
      email: "",
      tel: "",

    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      console.log(formik.values);
      console.log(users.update());
      setSubmitting(false);
      axios({
        method: "put",
        url: users.update(),
        data: formik.values,
      })
        .then((res) => {
          console.log(res.data);

        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  return (
    <>
      <h1>User Profile</h1>
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
            error={
              formik.touched.tel && Boolean(formik.errors.tel)
            }
            helperText={formik.touched.tel && formik.errors.tel}
          />
        </div>
        <Button type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </form>
    </>
  );
}
export default UserProfile;
