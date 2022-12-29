import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./Strategic.scss";
import File from "../../../../../assets/img/file.svg";
import { Link } from "react-router-dom";
import StrategicLocation from "./StrategicLocation";


function StrategicLocationName(props) { 
  const { t } = useTranslation();
  const [validate, setValidate] = useState(false);
  const selectedDay = (val) => {
    console.log(val);
  };
  function onToggleChange(checked) {
   
    setValidate(checked)
    }

  function handleChange(event, name) {
    console.log(event, "event target", name);
  }
  function onSelectChange(event) {
    console.log(event);
  }
 
  return (
    <>
      <div className="stragic_section p-0">
          <div className="row">
              <div className="col-12">
                <Link to ="/StrategicLocation">
                 <div className="location_sec">
                     <h5> <img src= {File}/> <b>{props.LocationName}</b></h5>
                     <span className="right-angle-arrow">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                     </span>
                 </div>
                </Link>
                 
              </div>       
          </div>
      </div>
    </>
  );
}

export default withTranslation()(StrategicLocationName);