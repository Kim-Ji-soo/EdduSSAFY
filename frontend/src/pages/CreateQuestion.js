import React, { useState } from "react";
import { Formik, useFormik} from "formik";
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
import { render } from 'react-dom';
import Dropzone from "react-dropzone";
import Thumb from "./Thumb";

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
  const dropzoneStyle = {
    width: "100%",
    height: "auto",
    borderWidth: 2,
    borderColor: "rgb(102, 102, 102)",
    borderStyle: "dashed",
    borderRadius: 5,
  }
  const formik = useFormik({
    initialValues: {
      answer: "",
      content: "",
      optionSize: 0,
      options: "",
      quizPic: [],
      score: "",
      type: "",
      quizbookId: state,
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      console.log(data);
      setSubmitting(false);
      console.log(data);
      console.log(quiz.createQuiz());
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
      <h1>Create Question</h1>
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
    <div className="container">
    <Formik
     initialValues={{
       quizPic: [],
     }}
      onSubmit={(values) => {
        console.log("..");
        alert(
          JSON.stringify(
            {
              quizPic: values.quizPic.map(file => ({
                fileName: file.name,
                type: file.type,
                size: `${file.size} bytes`
              })),
            },
            null,
            2
          )
        );
      }}
      validationSchema={yup.object().shape({
        recaptcha: yup.array(),
      })}
      render={({ values, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Multiple files</label>
            <Dropzone style={dropzoneStyle} accept="image/*" onDrop={(acceptedFiles) => {
              // do nothing if no files
              if (acceptedFiles.length === 0) { return; }

              // on drop we add to the existing files
              setFieldValue("quizPic", values.quizPic.concat(acceptedFiles));
            }}>
              {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                if (isDragActive) {
                  return "This file is authorized";
                }

                if (isDragReject) {
                  return "This file is not authorized";
                }

                if (values.quizPic.length === 0) { 
                  return <p>Try dragging a file here!</p>
                }

                return values.quizPic.map((file, i) => (<Thumb key={i} file={file} />));
              }}
            </Dropzone>
          </div>
          <button type="submit" className="btn btn-primary">submit</button>
        </form>
      )} />
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
    </>
  );
}
export default CreateQuestion;
