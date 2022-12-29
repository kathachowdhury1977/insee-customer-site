import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { paymentofflineActions } from "../../_actions";
import { Link } from "react-router-dom";
import PaymentSummaryConfirmPopup from "../ModalPopup/PaymentSummaryConfirmPopup";
import "./MakePaymentBox.scss";
import { useHistory } from "react-router-dom";

function MakePaymentBox(props) {
  const selectedLangCode = localStorage.getItem('lancode');
  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName.countryCode
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  return (
    <>
      <div className="row makepayment_box_container">
      <div className="col-6 pb-2 pt-2" style={{ backgroundColor: "red" }}>
        {
          props.tab === "AGING" ? '' :
          <>
          <p className="bigText mb-1"  style={{fontSize:`${SmallFontChanger}px`}}>
          {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${props.docCurrencyData})`
                              : props.docCurrencyData === 'THB' ? '(บาท)' :
                              props.docCurrencyData === 'USD' ? '(ดอลล่าร์)' :  `(${props.docCurrencyData})`
                                       
                             }
             {' '}
          {
            
              Number(parseFloat(props.totalPayment).toFixed(2)).toLocaleString('en', {
                minimumFractionDigits: 2
            })
          }
          
          </p>
         
          <p className="smallText mb-0"  style={{fontSize:`${SmallFontChanger}px`}}>{' '}{props.totalChecked}{' '}{t('Items')}</p>
          </>
       
        }
         </div>
        
        
            <div
            className="col-6 text-right pb-4 pt-4"
            style={{ backgroundColor: "red" }}
            
          >
            {
          countryCode && countryCode === 'VN' || countryCode && countryCode === 'LK' ? 
          '' : 
        
          props.label === "Confirm Payment" ||
          props.label === "ගෙවීම තහවුරු කරන්න" ||
          props.label === "ยืนยันการชำระเงิน" ||
          props.label === "Xác nhận thanh toán" ? (
            <button className="cancel_btn"  onClick={props.onClick}>
              {props.label}
              
            </button>
          ) : (

            <button className="cancel_btn makePaymentBtn"  style={{fontSize:`${SmallFontChanger}px`}}>
              <Link className="text-white" onClick={props.onClick} to={props.navigateurl}>
                {" "}
                {props.label}
              </Link>
            </button>
            
          )
        }
        </div>
        
        
      </div>
    </>
  );
}

export default withTranslation()(MakePaymentBox);
