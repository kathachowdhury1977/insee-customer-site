import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import CaseReportDashboardChildbox from "../../../components/CaseReportDashboardChildbox/CaseReportDashboardChildbox";
import "./Reports.scss";
import CaseBarChart from "../../../components/CaseReportsCharts/CaseBarChart";
import CaseTwoStackedBarChart from "../../../components/CaseTwoStackedBarChart/CaseTwoStackedBarChart";
import CaseThreeStackedBarChart from "../../../components/CaseThreeStackedBarChart/CaseThreeStackedBarChart";
import CaseSevenStackedBarChart from "../../../components/CaseSevenStackedBarChart/CaseSevenStackedBarChart";


function ReportsDashboard() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();


    return (
        <>
            <div className="content-wrapper">
                <Header title="" />
                <div className="row">
                    <div className="mainScroll">
                        <div className="reports-dashboard-container">
                            <p>Dashborad</p>

                            <div className="row">
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="card case-report-childbox-container">
                                        <div className="form_section">
                                            <CaseReportDashboardChildbox />                                           
                                            <CaseBarChart />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="card case-report-childbox-container">
                                        <div className="form_section">
                                            <CaseReportDashboardChildbox />
                                            <CaseTwoStackedBarChart />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="card case-report-childbox-container">
                                        <div className="form_section">
                                            <CaseReportDashboardChildbox />
                                            <CaseThreeStackedBarChart />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="card case-report-childbox-container">
                                        <div className="form_section">
                                            <CaseReportDashboardChildbox />
                                            {/* <CaseSevenStackedBarChart /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="card case-report-childbox-container">
                                        <div className="form_section">
                                            <CaseReportDashboardChildbox />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="card case-report-childbox-container">
                                        <div className="form_section">
                                            <CaseReportDashboardChildbox />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <div className="card case-report-childbox-container">
                                        <div className="form_section">
                                            <CaseReportDashboardChildbox />
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

export default withTranslation()(ReportsDashboard);
