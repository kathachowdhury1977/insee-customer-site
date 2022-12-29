import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { eventActions } from "../../../_actions";
import Header from "../../../components/Header/Header";
import "./Payment.scss"
// import paymentHistroryTable from "../../../components/Table/paymentHistroryTable";
import PaymentRefTable from "../../../components/Table/PaymentRefTable";
import { paymentofflineActions } from "../../../_actions/paymentoffline.action";
function PaymentRefrence(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const productId = props.location && props.location.state ? props.location.state.id : null
    const paymentHistoryData = useSelector((state) => state.paymentHistoryDetail.paymentHistoryDetail);
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
     
console.log(paymentHistoryData, 'paymentHistoryData85')
    useEffect (() => {
        dispatch(paymentofflineActions.paymentHistoryDetail(productId));
    },[0])
    
    return (
        <>
            <div className="content-wrapper">
                <Header title={`${t("label.payment_ref_no")} ${paymentHistoryData && paymentHistoryData.paymentRefNo ? paymentHistoryData.paymentRefNo : ''}`} />

                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">

                        <div className="col-12">
                            <div className="payment-history card">
                               
                                <PaymentRefTable paymentHistoryData={paymentHistoryData}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(PaymentRefrence);
