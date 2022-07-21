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

const validationSchema = yup.object({
  title: yup.string("Enter your title").required("title is required"),
  score: yup
    .number("Enter your score")
    .lessThan(100, "The maximum score is 100 points.")
    .required("score is required")
    .positive("Must be positive")
    .integer("Only integers are allowed."),
  type: yup.string("Enter your type").required("type is required"),
  content: yup.array(),
  file: yup.mixed(),
  answer: yup.mixed().required("필수 항목입니다."),
});

function CreateContent(props) {
  const [result, setResult] = useState([]);
  const [number, setNumber] = useState("1");
  const [value, setValue] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  console.log(number);
  const [content, setContent] = useState([
    // <div key={number}>
    //   <TextField
    //     name={number}
    //     label={number}
    //     value={value[1]}
    //     onChange={async (e) => {
    //       e.preventDefault();
    //       const newValue = { ...value };
    //       newValue[1] = e.target.value;
    //       console.log(newValue[1]);
    //       await setValue(newValue);
    //     }}
    //   />
    // </div>,
  ]);
  return (
    <>
      {content}
      <Button
        onClick={(e) => {
          setNumber(() => {
            console.log(number);
            return String(Number(number) + 1);
          });
          const newContent = [...content];
          newContent.push(
            <div key={number}>
              <TextField
                name={number}
                label={number}
                value={value[Number(number)]}
                onChange={(e) => {
                  e.preventDefault();
                  const newValue = { ...value };
                  newValue[Number(number)] = e.target.value;
                  console.log(newValue[Number(number)]);
                  console.log(newValue, "newValue");
                  setValue(newValue);
                  // console.log(value, "setValue한 후 value");
                }}
              />
            </div>
          );
          setContent(newContent);
        }}
      >
        보기추가
      </Button>
      <Button type="submit">보기 확정</Button>
    </>
  );
}

function CreateQuestion() {
  const formik = useFormik({
    initialValues: {
      title: "",
      score: "",
      type: "",
      content: [],
      file: null,
      answer: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);
      console.log(formik.values);
      setSubmitting(false);
      console.log(formik.values);
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
            name="title"
            label="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
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
              defaultValue="multiple"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                checked={formik.values.type === "multiple"}
                value="multiple"
                control={<Radio />}
                label="객관식"
              ></FormControlLabel>
              <FormControlLabel
                checked={formik.values.type === "subjective"}
                value="subjective"
                control={<Radio />}
                label="주관식"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </div>
        <CreateContent
          onSubmit={(event, arr) => {
            event.preventDefault();
            formik.values.content = arr;
          }}
        ></CreateContent>
        <Button type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default CreateQuestion;
