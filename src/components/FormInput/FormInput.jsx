import React, { useState } from "react";
import { withTranslation, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'


function FormInput(props) {
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState(props.value);
  const { t } = useTranslation()

  const inputStyle = {
    "margin-bottom": "3%",
    "border-radius": "6px",
    padding: "6% 2%",
    fontSize: `${FontChange}px`
  };
  
  function handleChange(event) {
    setInputValue(event.target.value);
    if (props.onChange) props.onChange(inputValue, props.name);
  }
  console.log(props.value, 'ram789')
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
          defaultValue={props.value}
          placeholder={t('ddmmyyyy')}
          style={inputStyle }
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