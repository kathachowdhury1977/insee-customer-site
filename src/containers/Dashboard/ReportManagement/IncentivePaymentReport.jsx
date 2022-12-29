import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import IncentiveReportHeader from "../../../components/IncentivePaymentReport/IncentivePaymentReportHeader";
import IncentiveReportTable from "../../../components/IncentivePaymentReport/IncentivePaymentReportTable";
import Header from "../../../components/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { reportActions } from "../../../_actions";
import { paymentofflineActions, masterActions } from "../../../_actions";
import './ReportManagement.scss'
// import "../CaseReports";

function IncentivePaymentReport() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const [division, setDivision] = useState('OD');
    const dispatch = useDispatch();
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const countryCode = userData.countryCode;
    var customerNo =  localStorage.getItem('CustomerNumber')
    const [incentiveReports, setIncentiveReports] = useState(0)
    const [page, setPage] = React.useState(1);
    const incentivePaymentReport = useSelector((state) => state.getIncentivePaymentReports.getIncentivePaymentReports);
    function onSelectChange (){

    }

    function handleChange (){}

    useEffect(() => {
        dispatch(reportActions.getIncentivePaymentReports('0930002005', incentiveReports, division));
    }, [incentiveReports, division])


    const onChangeDivision = (event) => {debugger
        setDivision(event.target.value);
    }

    const handleshipingCondition = (k) => {debugger
        setIncentiveReports(k)
      }

      let startIndex = incentivePaymentReport && incentivePaymentReport.startIndex;
      let endIndex = incentivePaymentReport && incentivePaymentReport.endIndex;

      const handleChangePage = async (event, value) => {
        await dispatch(masterActions.paginationValue(value));
        if (value === 1) {
          startIndex = 1;
          endIndex = 10;
        } else {
          startIndex = (value - 1) * 10 + 1;
          endIndex = value * 10;
        }
        setPage(value);
        // dispatch(
        //   paymentofflineActions.getPendingPayment(
        //     "pendingnew",
        //     startIndex,
        //     endIndex,
        //     custmerNo,
        //     defaultCat,
        //     filterDataValueData,
        //     startdateFinal ? startdateFinal : "",
        //     enddateFinal ? enddateFinal : "",
        //     docType ? docType : ""
        //   )
        // );
      };

    console.log(customerNo, 'customerNo1232')


    return (
        <>
            <div className="content-wrapper">
                <Header title="Report" />
                <div className="row">
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                        <IncentiveReportHeader 
                        />
                        <div className="incentivePayment">
                        <Tabs
                        activeKey={incentiveReports}
                        onSelect={(k) => handleshipingCondition(k)}
                        >
                            <TabList>
                                <Tab>{t('Off Invoice & Free Charge')}</Tab>
                                <Tab>{t('Offset & Price Adjustment')}</Tab>
                            </TabList>
                            <TabPanel>
                            <IncentiveReportTable 
                            onChangeDivision={onChangeDivision}
                            division = {division}
                            handleChangePage={handleChangePage}
                            page = {page}
                            />
                            </TabPanel>
                            <TabPanel>
                            <IncentiveReportTable 
                            onChangeDivision={onChangeDivision}
                            division= {division}
                            handleChangePage={handleChangePage}
                            page = {page}
                            />
                            </TabPanel>
                            </Tabs>
                            </div>
                       
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(IncentivePaymentReport);
