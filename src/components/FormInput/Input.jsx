import React, { useState } from "react";
import { withTranslation, useTranslation } from 'react-i18next'
const inputStyle = {
  "margin-bottom": "3%",
  "border-radius": "6px",
  padding: "6% 2%",
};
function FormInput(props) {
  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation()
  function handleChange(event) {
    setInputValue(event.target.value);
    if (props.onChange) props.onChange(event.target.value);
  }
   if(inputType=='date')
   {
    return (
      <>
      
        <input
          type={inputType}
          value={props.onChange(inputValue, props.name)}
          class={props.class}
          onChange={handleChange}
          name={props.name}
          placeholder={t('ddmmyyyy')}
          style={inputStyle}
          min={props.min}
          
        />
      </>
    );
   }else
   {
    return (
      <>
        <input
          type={inputType}
          value={props.onChange(inputValue, props.name)}
          class={props.class}
          onChange={handleChange}
          name={props.name}
          placeholder={props.label}
          style={inputStyle}
        />
      </>
    );
   }
  
}
export default FormInput;