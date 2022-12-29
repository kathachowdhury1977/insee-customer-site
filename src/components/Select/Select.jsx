import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const Select = (props) => {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    disabled,
    minWidth,
    showNoneOption = true,
    isDefaultOptionVisible = true,
    isAllOption = false,
    ...others
  } = props;
  const langCode = localStorage.getItem('lancode');


  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
      size="small"
      sx={{
        minWidth: minWidth || 150,
      }}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled || false}
        {...others}
      >
        {isDefaultOptionVisible ? showNoneOption ? (
          <MenuItem value="">None</MenuItem>
        ) : (
          <MenuItem value="">Select</MenuItem>
        ) : null}
        {isAllOption && <MenuItem value="All">{langCode !== "th" ? "All" : "ทั้งหมด"}</MenuItem>}
        {options &&
          options.length > 0 &&
          options.map((item) => (
            <MenuItem
              key={props.optionCode ? props.optionCode : item}
              value={props.optionCode ? item[props.optionCode] : item}
            >
              {props.optionLabel ? item[props.optionLabel] : item}
            </MenuItem>
          ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
