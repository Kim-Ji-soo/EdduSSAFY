/** @format */

import React from "react";
import { useFormik } from "formik";
<<<<<<< HEAD
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
=======
import { TextField, Button, getFormLabelUtilityClasses } from "@mui/material";

>>>>>>> cba73cdc33efaf6f93b4ff73d3aacade614e9dc5
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import users from "../api/api";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { login } from "../redux/user";

=======
>>>>>>> cba73cdc33efaf6f93b4ff73d3aacade614e9dc5
const validationSchema = yup.object({
  password: yup.string("Enter your password").required("Password is required"),
  id: yup
    .string("Enter your id")
    .min(5, "id should be of minimum 5 characters length")
    .required("id is required"),
});
<<<<<<< HEAD
function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
=======
function Login(props) {
  //const dispatch = useDispatch();
  //const [id, setId] = useState("");
  //const [password, setPassword] = useState("");
  //const [loading, setLoading] = useState(false);
  //const [msg, setMsg] = useState("");
>>>>>>> cba73cdc33efaf6f93b4ff73d3aacade614e9dc5
  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      console.log(data);
      setSubmitting(false);
      axios({
        method: "post",
<<<<<<< HEAD
        url: users.login(),
        data: formik.values,
      }).then((res) => {
        console.log(res.data);
        // dispatch(login({}));
        navigate("/homepage", { replace: true });
=======
        url: users.users.login(),
        data: formik.values
      }).then((res) => {
        console.log(res.data);
>>>>>>> cba73cdc33efaf6f93b4ff73d3aacade614e9dc5
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
<<<<<<< HEAD
          <Button type="submit" disabled={formik.isSubmitting}>
            로그인
          </Button>
=======
          <Link to="/homepage">
            <Button type="submit" disabled={formik.isSubmitting}>
              로그인
            </Button>
          </Link>
        </div>
        <div>
            <Button type="submit" disabled={formik.isSubmitting}>
              로그인
            </Button>
     
>>>>>>> cba73cdc33efaf6f93b4ff73d3aacade614e9dc5
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
    </div>
  );
}

export default Login;
