import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./AccountInfoHeader.scss";
import accountImage from "../../assets/img/chettinad.png"

function AccountInfoHeader(props) { 
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
   
          <div className="row m-3 account-info-header">
              <div className="col-2 p-3">
                <img src={accountImage} />
              </div>
              <div className="col-10 pt-3 pb-2">
                <p>{t("payment.customercode")} : {props.customer_code}</p>
                <p>{t("payment.province_territory")} : {props.province_ase_territory}</p>
                <p>{t("payment.dist_territory")} : {props.district_territory}</p>
              </div>
          </div>
     
    </>
  );
}

export default withTranslation()(AccountInfoHeader);