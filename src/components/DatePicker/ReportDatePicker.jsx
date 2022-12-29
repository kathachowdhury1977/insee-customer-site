import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import {enUS, th} from 'date-fns/locale';

const ReportDatePicker = (props) => {
  const {
    name,
    label,
    value,
    onChange,
    error = null,
    disable,
    format,
    views,
    style,
    ...other
  } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
const langCode = localStorage.getItem("lancode")

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={langCode === "th" ? th : enUS} >
      <MuiDatePicker
        inputFormat={format || "dd-MM-yyyy"}
        label={label}
        {...(views && { views: ["year", "month", "date"] })}
        disabled={disable || false}
        value={value}
        {...other}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(params) => (
          <TextField
            {...params}
            style={style}
            size="small"
            InputLabelProps={{
                style: { paddingLeft: '0px', fontSize:"14px", color:"gray" }, 
             }}
            {...(error && { error: true, helperText: error })}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default ReportDatePicker;
