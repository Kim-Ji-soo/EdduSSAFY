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
              />
            </div>
          );
          setContent(newContent);
        }}
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
      axios({
        method: "post",
        url: quiz.createQuiz(),
        data: formik.values,
      }).then((res) => {
        console.log(res.data);
        navigate("/problemlist", { replace: true });
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
        <h1>Create Question</h1>

        <input
          type="file"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            formik.values.quizPic = e.target.files[0];
          }}
        />
        <div className={styles.preview}>
          {imageSrc && <img src={imageSrc} alt="preview-img" />}
        </div>
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
            />
          </div>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            // onClick={() => {
            //   formik.values.quizId = new Date()
            //     .toLocaleString()
            //     .replace(/[\.\s\:ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
            // }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}

export default CreateQuestion;
