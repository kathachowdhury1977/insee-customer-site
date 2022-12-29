import React, { useState } from "react";
import { useSelector } from 'react-redux'

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

    if (props.onSelectChange) props.onSelectChange(event.target.value, event.target.name);
  }

  console.log(props.defaultValue, 'defaultValue')
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);

  let options =
    props.data !== "data" ? (
      props.data.map(function (modedata) {
        return (
          <option key={modedata.id} value={modedata.id} style={{fontSize: `${FontChange}px`}}>
            {modedata.name}
          </option>
        );
        // if(modedata.id === "Online" || modedata.id === "online") {
        //   return (
        //     <option disabled key={modedata.id} value={modedata.id}>
        //       {modedata.name}
        //     </option>
        //   );
        // }
        // else {
        //   return (
        //     <option key={modedata.id} value={modedata.id}>
        //       {modedata.name}
        //     </option>
        //   );
        // }
      
      })
    ) : (
      <option key={0} value={0} style={{fontSize: `${FontChange}px`}}>
        {"No Data Available"}
      </option>
    );

  return (
    <select name={props.name} className={props.class} onChange={handleChange} disabled={props.disabledValue} style={{fontSize: `${FontChange}px`}}>
      {(props.defaultValue  && (props.defaultValue.length > 0 )) ?  
      <>
      <option  selected="selected"  style={{display:"none",fontSize: `${FontChange}px`}}>{props.defaultValue}</option> 
       <option  value="" style={{fontSize: `${FontChange}px`}}> {props.label}</option>
       
      </>
            
            : 
            <option selected value="" style={{fontSize: `${FontChange}px`}}> {props.label}</option>
            }
            {options}
    </select>
  );
}
export default FormSelectbox;
