import React, { useState } from "react";

function PlainDiv(props) {

  return (
    <> 
       <div className= {props.class1}>
        <div className={props.class2}>{props.title}</div>
      </div>
    </>
  );
}
export default PlainDiv;
