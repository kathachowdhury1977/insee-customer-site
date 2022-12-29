import React, { useState } from "react";

const inputStyle = {
    // "margin-bottom": "3%",
    // "border-radius": "6px",
    // padding: "6% 2%",
    position: "relative",
    width: "90%",
    height: "40px",
    paddingLeft: "15px",
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "15px",
    borderBottom: "1px solid rgba(0,0,0,.5)",
    marginBottom: "15px"

};
function FormInputEditCase(props) {
    const [inputType] = useState(props.type);
    const [inputValue, setInputValue] = useState("");

    function handleChange(event) {
        setInputValue(event.target.value);
        props.onChange(event);
    }

    return (
        <>
            {props.defaultValue ? <input
                type={inputType}
                class={props.classname}
                onChange={handleChange}
                name={props.name}
                defaultValue={props.defaultValue}
                style={inputStyle}
                value={props.value}
            /> :
                <input
                    type={inputType}
                    className={props.classname}
                    onChange={handleChange}
                    name={props.name}
                    placeholder={props.label ? props.label : "Enter"}
                    style={inputStyle}
                />}
        </>
    );
}
export default FormInputEditCase;
