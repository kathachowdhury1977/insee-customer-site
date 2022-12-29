import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import StrategicVerticalTab from './StrategicVerticalTab';
import "./Strategic.scss";


function Strategic(props) { 
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
      <div className="container-fluid stragic_section p-0">
          <div className="row">
              <div className="col-12">
                 <StrategicVerticalTab/>
              </div>       
          </div>
      </div>
    </>
  );
}

export default withTranslation()(Strategic);