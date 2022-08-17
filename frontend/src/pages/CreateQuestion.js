import React, { useState } from "react";
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
import styles from "../css/CreateQuestion.module.css";

import { Box } from "@mui/material";
import { Copyright } from "@material-ui/icons";

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
  const [number, setNumber] = useState(1);
  const [value, setValue] = useState({});
  const [content, setContent] = useState([]);

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
      {content}
      <Button
        onClick={(e) => {
          setNumber(() => {
            return number + 1;
          });
          const newContent = [...content];
          newContent.push(
            <div key={number}>
              <TextField
                name={String(number)}
                label={number}
                value={value[number]}
                onChange={(e) => {
                  setValue((value) => {
                    const newValue = { ...value };
                    newValue[number] = e.target.value;
                    return newValue;
                  });
                }}
                autoComplete="off"
                sx={Textfieldsx}
              />
            </div>
          );
          setContent(newContent);
        }}
        className={styles.buttons}
      >
        보기추가
      </Button>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          const newResult = [];
          for (const i in value) {
            newResult.push(value[i]);
          }
          await setResult(newResult);
          props.onSubmit(newResult); //보기 배열 넘기기
        }}
        className={styles.buttons}
      >
        보기 확정
      </Button>
    </>
  );
}
//

function CreateQuestion() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [imageSrc, setImageSrc] = useState("");
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  const formik = useFormik({
    initialValues: {
      answer: "",
      content: "",
      optionSize: 0,
      options: "",
      quizPic: "",
      score: "",
      type: "choice",
      quizbookId: state,
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      setSubmitting(false);
      if (formik.values.quizPic === "") {
        delete formik.values.quizPic;
      }
      console.log(formik.values);
      axios({
        method: "post",
        url: quiz.createQuiz(),
        data: formik.values,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        console.log(res.data);
        navigate("/problemlist", { replace: true });
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
        <h1>Create Question</h1>

        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <label className="inputFileBtn" htmlFor="inputFile" style={{cursor:"pointer", width:"20vw"}}>이미지 넣기</label>
        <input
          id="inputFile"
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            formik.values.quizPic = e.target.files[0];
          }}
          style={{display:"none"}}
        />
        <div className={styles.preview}>
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
        </div>

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
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            sx={Buttonsx}
          >
            Submit
          </Button>
        </form>
        <Button
          onClick={() => {
            navigate("/problemlist");
          }}
        >
          뒤로 가기
        </Button>
      </Box>
    </>
  );
}

export default CreateQuestion;
