import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';

function VisitCounter(props) {
  const [FaIcon] = useState(props.faIcon)


  console.log(props, "?navbalu")
  return (
    <>
      <div className="col-md-2 col-sm-4 col-xs-12">
        <div className="info-box">
          <div className="info-box-content">
          <span className="info-box-text">{props.name}</span>
            <span className="info-box-number">{props.counter}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitCounter;

