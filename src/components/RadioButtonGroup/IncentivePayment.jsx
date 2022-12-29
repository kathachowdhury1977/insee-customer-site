import React, { useState,useEffect } from "react";
import Radio from '@material-ui/core/Radio';
import { useDispatch, useSelector } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { masterActions } from "../../_actions";
import "./RadioButton.scss";
import { withTranslation, useTranslation } from "react-i18next";
import { propTypes } from "react-bootstrap/esm/Image";
import { paymentofflineActions } from "../../_actions";


export default function IncentivePayment(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch(); 
  const [items, setItems] = useState("pendingnew")
  let custmerNo = localStorage.getItem('CustomerNumber');
  const handler = (e) => {
    setItems(e.target.value);
    

}

  return (
    <FormControl component="fieldset" className="ml-4">
      <RadioGroup row aria-label="position" name="position" defaultValue="do">
        <FormControlLabel
          value="do"
          control={<Radio color="primary" />}
          label={t("DO")}
          checked={items === 'do'}
          onChange={handler}        
        />
        <FormControlLabel
          value="Retailer"
          control={<Radio color="primary" />}
          label={t("Retailer")}
          checked={items === 'Retailer'}
          onChange={handler}
         
        />
        
      </RadioGroup>
    </FormControl>
  );
}
