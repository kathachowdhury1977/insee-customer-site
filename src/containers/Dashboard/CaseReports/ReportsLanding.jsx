import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import CaseReportHeader from "../../../components/CaseReportHeader/CaseReportHeader";
import CaseReportTable from "../../../components/CaseReportTable/CaseReportTable";
import Header from "../../../components/Header/Header";
import "./Reports.scss";

function ReportsLanding() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    function onSelectChange (){

    }

    function handleChange (){}


    return (
        <>
            <div className="content-wrapper">
                <Header title="Dashboard" />
                <div className="row">
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                        <CaseReportHeader />
                        <CaseReportTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(ReportsLanding);
