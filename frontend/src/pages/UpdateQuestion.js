import React, { useState, useEffect, useMemo, useRef } from "react";
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
import axios from "axios";
import { quiz } from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "../css/UpdateQuestion.module.css";

const validationSchema = yup.object({
  content: yup.string("Enter your content").required("content is required"),
  score: yup
    .number("Enter your score")
    .lessThan(100, "The maximum score is 100 points.")
    .required("score is required")
    .positive("Must be positive")
    .integer("Only integers are allowed."),
  type: yup.string("Enter your type").required("type is required"),
  options: yup.string(),
  file: yup.mixed(),
  answer: yup.mixed().required("필수 항목입니다."),
});

//
function CreateContent(props) {
  const [result, setResult] = useState([]);
  const [number, setNumber] = useState(props.state.optionSize + 1);
  const [value, setValue] = useState(props.state.options);
  const arr = props.state;
  useEffect(() => {
    props.onSubmit(value);
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

  return (
    <>
      {arr.options.map((option, index) => {
        return (
          <div key={index + 1}>
            <TextField
              name={String(index + 1)}
              label={index + 1}
              value={value[index] || ""}
              onChange={(e) => {
                setValue((value) => {
                  const newValue = [...value];
                  newValue[index] = e.target.value;
                  return newValue;
                });
              }}
              autoComplete="off"
              sx={Textfieldsx}
            />
          </div>
        );
      })}
      <Button
        onClick={(e) => {
          setNumber((number) => {
            return number + 1;
          });
          arr.options.push("");
        }}
        className={styles.buttons}
      >
        보기추가
      </Button>
    </>
  );
}
//

function CreateQuestion() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const newState = { ...state };
  const formik = useFormik({
    initialValues: newState,
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      console.log(formik.values);
      setSubmitting(false);
      console.log(quiz.createQuiz());
      axios({
        method: "put",
        url: quiz.updateQuiz(),
        data: formik.values,
      })
        .then((res) => {
          console.log(res.data);
          navigate("/problemlist", { replace: true });
        })
        .catch((e) => console.log(e));
    },
  });
  console.log(formik.values);

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
      <h1>update Question</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div>
          <TextField
            name="content"
            label="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            autoComplete="off"
            sx={Textfieldsx}
          />
        </div>
        <div>
          <TextField
            name="score"
            label="score"
            value={formik.values.score}
            onChange={formik.handleChange}
            error={formik.touched.score && Boolean(formik.errors.score)}
            helperText={formik.touched.score && formik.errors.score}
            autoComplete="off"
            sx={Textfieldsx}
          />
        </div>
        <div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="type"
              defaultValue="choice"
              value={formik.values.type}
              onChange={formik.handleChange}
              row
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop:"10px",
              }}
            >
              <FormControlLabel
                checked={formik.values.type === "choice"}
                value="choice"
                control={<Radio />}
                label="객관식"
                onClick={() => {
                  formik.values.options = "";
                  formik.values.optionSize = 0;
                }}
              ></FormControlLabel>
              <FormControlLabel
                checked={formik.values.type === "subjective"}
                value="subjective"
                control={<Radio />}
                label="주관식"
                onClick={() => {
                  formik.values.options = "";
                  formik.values.optionSize = 0;
                }}
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </div>
        {formik.values.type === "choice" && (
          <CreateContent
            state={state}
            onSubmit={(result) => {
              const newResultCount = result.filter(
                (element) => "" !== element
              ).length;
              formik.values.optionSize = newResultCount;
              formik.values.options = result.join("|");
            }}
          ></CreateContent>
        )}
        <div>
          <TextField
            name="answer"
            label="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={formik.touched.answer && Boolean(formik.errors.answer)}
            helperText={formik.touched.answer && formik.errors.answer}
            autoComplete="off"
            sx={Textfieldsx}
          />
        </div>
        <Button type="submit" disabled={formik.isSubmitting}  sx={Buttonsx}>
          Submit
        </Button>
      </form>
      <Button
        onClick={() => {
          navigate("/problemlist", { replace: true });
        }}
        className={styles.buttons}
      >
        뒤로 가기
      </Button>
      </Box>
    </>
  );
}

export default CreateQuestion;
