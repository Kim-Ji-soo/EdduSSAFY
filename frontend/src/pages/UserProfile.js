import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";
import users from "../api/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { me, logout } from "../redux/user";
import { deleteToken} from "../redux/token";
import styles from "../css/userProfile.module.css";
import Box from "@mui/material/Box";


const validationSchema = yup.object({
  email: yup
    .string("이메일을 입력해주세요")
    .email("이메일이 유효하지 않습니다")
    .required("이메일은 필수입니다"),
  name: yup.string("이름을 입력해주세요").required("이름은 필수입니다"),
  nickname: yup.string("닉네임을 입력해주세요").required("닉네임은 필수입니다"),
  userId: yup
    .string("아이디를 입력해주세요")
    .min(5, "아이디는 최소 5자리입니다")
    .required("아이디는 필수입니다"),
  tel: yup
    .string("전화번호를 입력해주세요")
    .length(11, "전화번호는 010-0000-0000입니다")
    .required("전화번호는 필수입니다"),
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

  const Textfieldsx = {
    width: "70%",
    height: "100%",
    marginTop:"15px",
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
        <h1>사용자계정</h1>
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
              error={formik.touched.nickname && Boolean(formik.errors.nickname)}
              helperText={formik.touched.nickname && formik.errors.nickname}
              autoComplete="off"
              sx={Textfieldsx}
            />
          </div>
          <div>
            <TextField
              disabled
              name="userId"
              label="사용자 ID"
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
              disabled
              name="email"
              label="이메일"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="off"
              sx={Textfieldsx}
            />
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
          <Button type="submit" disabled={formik.isSubmitting}  sx={Buttonsx}>
            정보수정
          </Button>
        </form>
        <Link to="/changepassword" className={styles.link}>
        <div>
        <Button className={styles.buttons}>
            비밀번호변경
        </Button>
        </div>
        </Link>
        <Button className={styles.buttons}
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
