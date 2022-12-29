import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,useLocation,Redirect, Link } from 'react-router-dom';
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { eventActions } from "../../../_actions";
import Header from "../../../components/Header/Header";

import "./Payment.scss"
import SuccessImg from '../../../assets/img/success.png'
import { paymentofflineActions } from "../../../_actions/paymentoffline.action";
function PaymentRefrenceSuccess(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let history = useHistory();

    const bgURL = window.location.search
    const dataBgRef = bgURL.split("&")
    const bgRefNo = dataBgRef ? dataBgRef[0].split("=") : ''
    const bgRefNoData = bgRefNo ? bgRefNo[1] : ''
    const bgRefStatus = dataBgRef ? dataBgRef[2].split("=") : ''
    const bgStatus = bgRefStatus ? bgRefStatus[1] : ''
    console.log(bgStatus, 'bgURL----')
    var getBayBankResponseData = useSelector((state) => state.getBayBankResponse.getBayBankResponse);

    useEffect (() => {
        dispatch(paymentofflineActions.getBayBankResponse(bgRefNoData, bgStatus));
    },[0])
  
    return (
        <>
           <div className="content-wrapper">
                <Header title={`${t("label.payment_ref_no")}`} />

                <div className="row ipad_css">
                    <div className="mainScroll">

                        <div className="col-12">
                            <div className="payment-history card1">
                               
                                <div className="boxSuccess">
                                    <div className="imgSuccess">
                                        <img src={SuccessImg} />
                                    </div>
                                    <div className="boxText" style={{marginBottom : '20px'}}>
                                        <h2>{`Your payment status is ${bgStatus}`}</h2>
                                        <p>{`Transaction reference NO is ${bgRefNoData}`}</p>
                                        
                                    </div>
                                   
                                </div>
                                <div className="btnPayment">
                                <Link
                                        className="create_btn mb-3"
                                        to="/PaymentHistory"
                                    >
                                        {" "}
                                        {t("payment.pay_history_btn")}
                                    </Link>
                                </div>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(PaymentRefrenceSuccess);
