import React, { useState } from "react";

const inputStyle = {
  "margin-bottom": "3%",
  "border-radius": "6px",
  padding: "2% 2%",
  height: "50px",
};
function FormSelectbox(props) {
  const [selectedData, updateSelectedData] = useState(0);
  function handleChange(event) {
    updateSelectedData(event.target.value)

    if (props.onSelectChange) props.onSelectChange(event.target.value);
  }

  let options =
    props.data !== "data" ? (
      props.data.map(function (modedata) {
        if(modedata.id === "Online" || modedata.id === "online") {
          return (
            <option disabled key={modedata.id} value={modedata.id}>
              {modedata.name}
            </option>
          );
        }
        else {
          return (
            <option key={modedata.key} value={modedata.value}>
              {modedata.value}
            </option>
          );
        }
      
      })
    ) : (
      <option key={0} value={0}>
        {"No Data Available"}
      </option>
    );

  return (
    <select name={props.name} className={props.class} onChange={handleChange} disabled={props.disabledValue}>
      {(props.defaultValue  && (props.defaultValue.length > 0 )) ?  
            <option disabled="disabled" selected="selected" style={{display:"none"}}>{props.defaultValue}</option> 
            : 
            <option value=""> {props.label}</option>
            }
            {options}
    </select>
  );
}
export default FormSelectbox;
