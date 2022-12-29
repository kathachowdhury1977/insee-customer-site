import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";

const Checkbox = (props) => {
  const { name, label, value, onChange, labelPlacement,...others } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl className={props.className}>
      <FormControlLabel
      style={{justifyContent:"left",margin:"0px"}}
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
            {...others}
          />
        }
        label={label}
        labelPlacement={labelPlacement || "start"}
      />
    </FormControl>
  );
};

export default Checkbox;
