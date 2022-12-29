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
import styled from 'styled-components';

export default function PaymentRadioButton(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch(); 
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const [items, setItems] = useState("pendingnew")
  let custmerNo = localStorage.getItem('CustomerNumber');
  const selectedLangCode = localStorage.getItem('lancode');
  const handler = (e) => {
    setItems(e.target.value);
    dispatch(
      paymentofflineActions.offlinegetPaymentStatus(e.target.value)
    );
    if (e.target.value === "pendingnew") {
      props.setIsPaymentTableDisplayed(true);
     // dispatch(paymentofflineActions.getPendingPayment(e.target.value, props.selectedTab, 1, 10, custmerNo));
    }

    if (e.target.value === "Receipt") {
      props.setIsPaymentTableDisplayed(false);
     // dispatch(paymentofflineActions.getSettledPayment(e.target.value, props.selectedTab, 1, 10, custmerNo));
    }

    if (e.target.value === "In-Progress") {
      props.setIsPaymentTableDisplayed(false);
     // dispatch(paymentofflineActions.getSettledPayment(e.target.value, props.selectedTab, 1, 10, custmerNo));
    }

    if (e.target.value === "Processing") {
      props.setIsPaymentTableDisplayed(false);
     // dispatch(paymentofflineActions.getSettledPayment(e.target.value, props.selectedTab, 1, 10, custmerNo));
    }

}


const getSettledPaymentDataLoading = useSelector((state) => state.getSettledPayment.loading);
const getpendingpayLoading = useSelector((state) => state.getpendingpay.loading);
const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
const Container = styled.div`
.MuiFormControlLabel-label {
   font-size: ${FontChange}px

}
`;

  return (
    <>
    {/* <Container> */}
    <FormControl component="fieldset" className="ml-4 ml-md-0">
      <RadioGroup row aria-label="position" name="position" defaultValue="pending">
        <FormControlLabel
          value="pendingnew"
          control={<Radio color="primary" />}
          label={t("label.pending")}
          checked={items === 'pendingnew'}
          onChange={handler}  
          disabled={getSettledPaymentDataLoading || getpendingpayLoading}
               
        />
        
        {
          userName.countryCode === "VN" ? '' : 
          <>
            <FormControlLabel
          value="Receipt"
          control={<Radio color="primary" />}
          label={t("label.settled")}
          checked={items === 'Receipt'}
          onChange={handler}
          disabled={getSettledPaymentDataLoading|| getpendingpayLoading}
         
        />
        <FormControlLabel
          value="In-Progress"
          control={<Radio color="primary" />}
          label={t("label.in_progress")}
          checked={items === 'In-Progress'}
          onChange={handler}
          disabled={getSettledPaymentDataLoading || getpendingpayLoading}
         
        />
        <FormControlLabel
          value="Processing"
          control={<Radio color="primary" />}
          label={t("myshipment.radiogrouplabel_processing")}
          checked={items === 'Processing'}
          onChange={handler}
          disabled={getSettledPaymentDataLoading || getpendingpayLoading}
         
        />
          </>
        }
      
      </RadioGroup>
    </FormControl>
    {/* </Container> */}
    {
      items && items === "pendingnew" ? 
      <div className="statusDef"  style={{fontSize:`${SmallFontChanger}px`}}>
        {
          selectedLangCode === 'en' || selectedLangCode === null ? 'List of invoice, purchase order and summary of invoice to be selected for payment.' :
          'รายการใบแจ้งหนี้, ใบสั่งซื้อ และรายการสรุปใบแจ้งหนี้ ที่ต้องการเลือกเพื่อชำระเงิน'
        }
       
      </div>
      : ''
    }
    {
      items && items === "Receipt" ? 
      <div className="statusDef"  style={{fontSize:`${SmallFontChanger}px`}}>
        {
          selectedLangCode === 'en' || selectedLangCode === null ? 'The payment has been completed successfully.' :
          'รายการที่ชำระเงินเรียบร้อยแล้ว'
        }
       
      </div>
      : ''
    }
    {
      items && items === "In-Progress" ? 
      <div className="statusDef"  style={{fontSize:`${SmallFontChanger}px`}}>
        {
          selectedLangCode === 'en' || selectedLangCode === null ? 'Selected item with a reference number for making the payment' :
          'รายการที่ถูกเลือก โดยได้เลขที่อ้างอิงแล้ว เพื่อนำไปชำระเงิน'
        }
       
      </div>
      : ''
    }

{
      items && items === "Processing" ? 
      <div className="statusDef"  style={{fontSize:`${SmallFontChanger}px`}}>
        {
          selectedLangCode === 'en' || selectedLangCode === null ? 'The system is automatically processing the selected transaction to display the next status.' :
          'ระบบกำลังประมวลผลอัตโนมัติสำหรับรายการที่เลือกชำระเงิน เพื่อแสดงผลในสถานะถัดไป'
        }
       
      </div>
      : ''
    }
    </>
    
  );
}
