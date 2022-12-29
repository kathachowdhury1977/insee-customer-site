import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
const useForm = (initialFValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    //handle files
    if (e.target.type == "file") {
      value = e.target.files[0];
    }
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
};

const Form = (props) => {
  const { children, elementSize, ...other } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormControl-root": {
        width: elementSize || "100%",
        margin: "3px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
};

export { Form, useForm };
