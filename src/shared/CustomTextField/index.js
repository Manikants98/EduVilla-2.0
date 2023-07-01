import React from "react";
import TextField from "@mui/material/TextField";
import classNames from "classnames";

export const CustomTextField = ({
  variant,
  placeholder,
  label,
  type,
  name,
  id,
  formik,
  className = "",
  multiline = false,
  rows = 1,
  disabled = false,
  defaultValue = "",
}) => {
  return (
    <>
      <TextField
        className={classNames(className, "!border-none")}
        label={label}
        type={type}
        placeholder={placeholder}
        name={name}
        size="small"
        id={id}
        color="primary"
        rows={rows}
        defaultValue={defaultValue}
        disabled={disabled}
        multiline={multiline}
        variant={variant}
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors[id] && formik.touched[id] ? true : false}
        helperText={formik.touched[id] && formik.errors[id]}
        inputProps={{
          input: "!border-none",
        }}
        classes={{ root: "!border-none" }}
      />
    </>
  );
};
