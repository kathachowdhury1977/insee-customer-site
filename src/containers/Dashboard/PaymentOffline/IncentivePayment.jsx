import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import 'react-tabs/style/react-tabs.css';
import { eventActions } from "../../../_actions";
import Header from "../../../components/Header/Header";
import "./Payment.scss"
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import IncentiveChildTab from "../../../components/Tabs/IncentiveChildTab";
import IncentivePayment from '../../../components/RadioButtonGroup/IncentivePayment'
function PaymentSummary(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    function onSelectChange(event) {
        console.log(event);
    }

   

    console.log(event, "??????????")
    return (
        <>
            <div className="content-wrapper">
                <Header />

                <div className="row">
                    <div className="mainScroll">
                        <div className="col-12">


                            <div className="incentive-payment card">
                                <PaymentHeader
                                    heading={t("label.payment")}
                                />
                                <div className="row">
                                    <div className="col-12 text-right">
                                        <p style={{ fontSize: "12px", color: "red" }}>{t("label.incentive_rednote")}</p>
                                    </div>
                                    <div className="col-12">
                                        <Tabs>
                                            <TabList>
                                                <Tab>{t("label.off_invoice_free_charge_tab")}</Tab>
                                                <Tab>{t("label.offset_price_adjust_tab")}</Tab>

                                            </TabList>
                                            
                                            <TabPanel>
                                                <IncentiveChildTab />

                                            </TabPanel>
                                            <TabPanel>
                                                <IncentiveChildTab />
                                            </TabPanel>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(PaymentSummary);
