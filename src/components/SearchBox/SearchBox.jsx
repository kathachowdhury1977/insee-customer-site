import React, { useState } from "react";

const inputStyle = {
  "border-radius": "10px 0px 0px 10px",
  "background-color": "#ecf0f5"
};
const buttonStyle ={
  "background-color": "#ecf0f5",
    "border-radius": "0px 10px 10px 0px"
}
function SearchBox(props) {
  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
    if (props.onChange) props.onChange(inputValue, props.name);
  }

  return (
    <>
      <div class="row no-gutters align-items-center">
        <div class="col">
          <input
            class="form-control form-control-lg form-control-borderless"
            type="search"
            placeholder="Search topics or keywords"
            style={inputStyle}
          />
        </div>
        <div class="col-auto">
          <button class="btn btn-lg btn-light" type="submit" style={buttonStyle}>
            <i className="fa fa-search"></i>{" "}
          </button>
        </div>
      </div>
    </>
  );
}
export default SearchBox;
