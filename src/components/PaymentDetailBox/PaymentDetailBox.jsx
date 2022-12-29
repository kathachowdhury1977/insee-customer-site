import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paymentofflineActions } from "../../_actions";
import { withTranslation, useTranslation } from "react-i18next";
import "./PaymentDetailBox.scss";
import Loading from '../../components/Loader/Loading'
import moment from "moment";
import "moment-timezone";
function AccountInfoHeader(props) {
  const { t } = useTranslation();
  const getavailablity = useSelector((state) => state.getavailablity);
  const detailbox = getavailablity.getavailablity ? getavailablity.getavailablity : null;
  const selectedLangCode = localStorage.getItem('lancode');
  const  decimalwithcoma = (num) => 
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
 
console.log(selectedLangCode, 'selectedLangCode=')
  return (
    <>
      <div className="payment-detail-box">
        <div className="col-sm-12 col-md-12 col-lg-12 p-0">
          <div className="row bottom-line pb-0 bg-gray">
            <div className="col-sm-4 col-md-4 col-lg-4 pt-3">
              <p className="textLight" style={{fontSize:`${SmallFontChanger}px`}}>{t("payment.credit_limit")}</p>
              <p className="textDark mb-3" style={{fontSize:`${SmallFontChanger}px`}}>
                {
                  props.getavailablity && props.getavailablity.currency ? 
                  <span>
                    {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${props.getavailablity && props.getavailablity ? props.getavailablity && props.getavailablity.currency : ''})`
                              : props.getavailablity && props.getavailablity.currency === 'THB' ? '(บาท)' :
                              props.getavailablity && props.getavailablity.currency === 'USD' ? '(ดอลล่าร์)' :  `(${props.getavailablity && props.getavailablity.currency})`
                                       
                             }
                  </span> : ''
                }
                {' '}

             
              
                { props.getavailablity && props.getavailablity.creditLimit ? 
                 decimalwithcoma((props.getavailablity.creditLimit && props.getavailablity.creditLimit))           
                : "0"}
              </p>

            
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pt-3 pl-0 pr-0 text-center">
              <p className="textLight"style={{fontSize:`${SmallFontChanger}px`}}>{t("paymentCreditLimitBal")}</p>
              <p className="textDark mb-3" style={{fontSize:`${SmallFontChanger}px`}}>
                {
                   props.getavailablity && props.getavailablity.currency ? 
                   <span>{selectedLangCode === 'en' || selectedLangCode === null ? 
                   `(${props.getavailablity && props.getavailablity ? props.getavailablity && props.getavailablity.currency : ''})`
                   : props.getavailablity && props.getavailablity.currency === 'THB' ? '(บาท)' :
                   props.getavailablity && props.getavailablity.currency === 'USD' ? '(ดอลล่าร์)' :  `(${props.getavailablity && props.getavailablity.currency})`
                            
                  }</span> : ''
                }
             {' '}
              { props.getavailablity && props.getavailablity.creditLimitBalance ? 
                decimalwithcoma( (props.getavailablity.creditLimit && props.getavailablity.creditLimitBalance)): "0"}
               
              </p>

             
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pt-3 text-right">
              <p className="textLight" style={{fontSize:`${SmallFontChanger}px`}}>{t("outstandingPayment")}</p>
              <p className="textDark" style={{fontSize:`${SmallFontChanger}px`}}>
                {
                    props.getavailablity && props.getavailablity.currency ? 
                    <span>{selectedLangCode === 'en' || selectedLangCode === null ? 
                    `(${props.getavailablity && props.getavailablity ? props.getavailablity && props.getavailablity.currency : ''})`
                    : props.getavailablity && props.getavailablity.currency === 'THB' ? '(บาท)' :
                    props.getavailablity && props.getavailablity.currency === 'USD' ? '(ดอลล่าร์)' :  `(${props.getavailablity && props.getavailablity.currency})`
                             
                   }</span> : '' 
                }
            {' '}
              { props.getavailablity && props.getavailablity.outstanding ? 
                decimalwithcoma( props.getavailablity.creditLimit && props.getavailablity.outstanding) : "0"}
                
              </p>
            </div>
          </div>
        </div>
        

       
              <div className="col-sm-12 col-md-12 col-lg-12 p-0">
              {
              detailbox &&  detailbox.bankDetail.length > 0 
              ?detailbox  && detailbox.bankDetail.map((bankdetail, ind) => {
                return (
                
                <div className="row bottom-line pb-2 pt-2">
                    {
                      bankdetail.Message === "Successful" ?
                      <>
                      <div className="col">
                        <p className="textLight" style={{fontSize:`${SmallFontChanger}px`}}>{t("payment.bg_no")}</p>
                        <p className="textDark bgNoText" style={{fontSize:`${SmallFontChanger}px`}}>{bankdetail.BankGuaranteeNumber}</p>
                      </div>
                      <div className="col pl-5">
                        <p className="textLight" style={{fontSize:`${SmallFontChanger}px`}}>
                          {t("payment.bg_valid_from")}
                        </p>
                        <p className="textDark" style={{fontSize:`${SmallFontChanger}px`}}>{moment(bankdetail.StartDate).format('DD-MM-YYYY')}</p>
                      </div>

                    
                      <div className="col pl-5">
                        <p className="textLight" style={{fontSize:`${SmallFontChanger}px`}}>{t("payment.bg_duedate")}</p>
                        <p className="textDark" style={{fontSize:`${SmallFontChanger}px`}}>{moment(bankdetail.DueDate).format('DD-MM-YYYY')}</p>
                      </div>
                      <div className="col pr-5">
                        <p className="textLight text-right"style={{fontSize:`${SmallFontChanger}px`}}>{t("payment.bg_amt")}</p>
                        <p className="textDark text-right"style={{fontSize:`${SmallFontChanger}px`}}>
                         {decimalwithcoma(parseFloat(bankdetail.DocAmount).toFixed(2))}
                          </p>
                      </div>
                      <div className="col pl-5">
                        <p className="textLight"style={{fontSize:`${SmallFontChanger}px`}}>
                        {t("payment.bank_detail")}
                        </p>
                        <p className="textDark"style={{fontSize:`${SmallFontChanger}px`}}>{bankdetail.BankDetail}</p>
                      </div>
              
                    </> : <p className="noBankFound">{t('Data not available')}</p>
                    }
                   
                </div>
                 );
                })
                : 
                <>
                 {
                   props.loading ?  <div className="loading"> <Loading /></div> :   <p className="noBankFound">{t('Data not available')}</p>
                 }
                </> 
              }
              </div>
           

       
      </div>
    </>
  );
}

export default withTranslation()(AccountInfoHeader);
