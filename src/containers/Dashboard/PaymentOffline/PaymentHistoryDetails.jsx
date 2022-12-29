import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { eventActions } from "../../../_actions";
import Header from "../../../components/Header/Header";
import "./Payment.scss"
import InvoiceDebitCreditBoxes from "../../../components/InvoiceDebitCreditBoxes/InvoiceDebitCreditBoxes";
import TotalPaymentBox from "../../../components/TotalPaymentBox/TotalPaymentBox";
import TotalAmountWhiteBox from "../../../components/TotalAmountWhiteBox/TotalAmountWhiteBox";

function PaymentHistory(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

   

    console.log(event, "??????????")
    return (
        <>
            <div className="content-wrapper">
                <Header />

                <div className="row">
                    <div className="mainScroll">

            
                        <div className="payment-history-details col-12">
                            <div className="row">
                                <div className="col-6">
                                    <p className="bigHeading">102002511</p>
                                </div>
                                <div className="col-6">
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row scroll-box">
                                                <div className="col-12 mb-3">
                                                    <TotalAmountWhiteBox
                                                        total_amt="vnd 3770"
                                                        date_time="23-12-2020 10:45"
                                                        status="pending"
                                                        style_class="bg-warning"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <InvoiceDebitCreditBoxes
                                                        status_class="bg-warning"
                                                        invoice_status="pending"
                                                        doc_number="963852741"
                                                        doc_date="12-12-2020"
                                                        po_number="963852741"
                                                        total_amt="THB 3775"
                                                        due_date="23-12-2020"
                                                        doc_type="Invoice"
                                                        overdue_days="285"
                                                        overdue_amt="8000"
                                                        description="XI Mang holcim da dung(power s)"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <InvoiceDebitCreditBoxes
                                                        status_class="bg-warning"
                                                        invoice_status="pending"
                                                        doc_number="963852741"
                                                        doc_date="12-12-2020"
                                                        po_number="963852741"
                                                        total_amt="THB 3775"
                                                        due_date="23-12-2020"
                                                        doc_type="Invoice"
                                                        overdue_days="285"
                                                        overdue_amt="8000"
                                                        description="XI Mang holcim da dung(power s)"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <InvoiceDebitCreditBoxes
                                                        status_class="bg-warning"
                                                        invoice_status="pending"
                                                        doc_number="963852741"
                                                        doc_date="12-12-2020"
                                                        po_number="963852741"
                                                        total_amt="THB 3775"
                                                        due_date="23-12-2020"
                                                        doc_type="Invoice"
                                                        overdue_days="285"
                                                        overdue_amt="8000"
                                                        description="XI Mang holcim da dung(power s)"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <InvoiceDebitCreditBoxes
                                                        status_class="bg-warning"
                                                        invoice_status="pending"
                                                        doc_number="963852741"
                                                        doc_date="12-12-2020"
                                                        po_number="963852741"
                                                        total_amt="THB 3775"
                                                        due_date="23-12-2020"
                                                        doc_type="Invoice"
                                                        overdue_days="285"
                                                        overdue_amt="8000"
                                                        description="XI Mang holcim da dung(power s)"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <InvoiceDebitCreditBoxes
                                                        status_class="bg-warning"
                                                        invoice_status="pending"
                                                        doc_number="963852741"
                                                        doc_date="12-12-2020"
                                                        po_number="963852741"
                                                        total_amt="THB 3775"
                                                        due_date="23-12-2020"
                                                        doc_type="Invoice"
                                                        overdue_days="285"
                                                        overdue_amt="8000"
                                                        description="XI Mang holcim da dung(power s)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="">
                                                <div className="col-12 mt-5">
                                                    <TotalPaymentBox />
                                                </div>
                                            </div>
                                        </div>
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

export default withTranslation()(PaymentHistory);
