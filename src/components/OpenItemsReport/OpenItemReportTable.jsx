import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { reportActions } from "../../_actions";
import Loading from '../Loader/Loading'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'

function OpenItemReportTable(props) {
    const { t } = useTranslation();
    const textColor = { color: "#7a7a79" };
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);

    let userName = localStorage.getItem('userData')
    userName = JSON.parse(userName)
    const countryCode = userName ? userName.countryCode : ''


    const getOpenItemsReportData = useSelector((state) => state.getOpenItemsReport.getOpenItemsReport);
    const isPageLoading = useSelector((state) => state.getOpenItemsReport.loading)

    const handleChangePage = (event, value) => {
        let start = 1;
        let end = 10;
        if (value === 1) {
            setStartIndex(1)
            setEndIndex(10)
        }
        else {
            start = ((value - 1) * 10) + 1;
            end = value * 10;
            setStartIndex(((value - 1) * 10) + 1);
            setEndIndex(value * 10);
        }
        setPage(value);
        props.onChangeStartAndEndIndex(start, end, value);
    }

    function convertDate(dateString) {
        var p = dateString.split(/\D/g)
        return [p[2], p[1], p[0]].join("-")
    }


    const decimalwithcoma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    return (
        <>
            <div className="row mt-3" style={{ backgroundColor: "#e9ecef", borderRadius: "10px", padding: "20px", margin: "10px" }}>
                <div className="col-xl-5 col-lg-3 col-md-6 col-sm-12" >
                    {countryCode != "TH" ? <> <h6 style={textColor}><b>{t("ACTUAL OVER DUE AMOUNT")}</b></h6>
                        <h6><b>{getOpenItemsReportData && getOpenItemsReportData.object &&
                            getOpenItemsReportData.object.overdue ? getOpenItemsReportData.object.overdue : ""}
                            {' '}
                            {getOpenItemsReportData && getOpenItemsReportData.object &&
                                getOpenItemsReportData.object.list ? getOpenItemsReportData.object.list[0].docCurrency : ""}
                        </b></h6></> : null}
                </div>
                <div className="col-xl-4 col-lg-3 col-md-1 col-sm-12" >
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12" >
                    <h6 style={textColor}><b>{t("Total")}</b></h6>
                    <h6><b>{getOpenItemsReportData && getOpenItemsReportData.object &&
                        getOpenItemsReportData.object.total ? getOpenItemsReportData.object.total : ""}
                        {' '}
                        {getOpenItemsReportData && getOpenItemsReportData.object &&
                            getOpenItemsReportData.object.list ? getOpenItemsReportData.object.list[0].docCurrency : ""}
                    </b></h6>
                </div>


            </div>
            <div className="row mt-3 case-report-table" style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 pl-0 pr-0">
                    <table class="table" style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }}>
                        <thead class="thead-light">
                            <tr>

                                <th scope="col">{t("label.type")}</th>
                                <th scope="col">{t("Doc No.")}</th>
                                <th scope="col">{t("Ref. No.")}</th>

                                <th scope="col">{t("Billing Document Date")}</th>
                                <th scope="col">{t("Due Date")}</th>
                                <th scope="col">{t("Amount (VND)")}</th>
                                <th scope="col">{t("Over Due Days")}</th>


                                <th scope="col">{t("Over Due Amount(VND)")}</th>
                                <th scope="col">{t("label.description")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isPageLoading ? (getOpenItemsReportData && getOpenItemsReportData.object &&
                                getOpenItemsReportData.object.list ? getOpenItemsReportData.object.list.map((item) =>
                                    <tr>
                                        <td><span>{item.DocumentType}</span></td>
                                        <td><span>{item.documentNo_FI}</span></td>
                                        <td><span>{item.reference}</span></td>
                                        <td><span>{convertDate(item.asondate)}</span></td>
                                        <td><span>{convertDate(item.DueDate)}</span></td>
                                        <td><span>{decimalwithcoma(item.amountDocCurrency)}</span></td>
                                        <td><span>{item.overdueDays}</span></td>
                                        <td><span>{decimalwithcoma(item.overdueAmount)}</span></td>
                                        <td><span>{item.description}</span></td>
                                    </tr>) : null) : <div className='loading'>
                                <Loading />
                            </div>}

                        </tbody>
                    </table>

                </div>
            </div>

            <div className="row ">

                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                    {
                        getOpenItemsReportData && getOpenItemsReportData.totalCount ?
                            <Pagination count={Math.ceil(getOpenItemsReportData.totalCount / 10)}
                                page={props.page} onChange={handleChangePage} />
                            : null
                    }

                </div>
            </div>

        </>
    );
}
export default withTranslation()(OpenItemReportTable);
