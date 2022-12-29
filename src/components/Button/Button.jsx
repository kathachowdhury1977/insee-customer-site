import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function FormInput(props) {
  const [inputType] = useState(props.type);

  return (
    <>
      <Button type={inputType} className={props.class} disabled={props.disabled} fullWidth>
        {props.label}
      </Button>
    </>
  );
}
export default FormInput;
