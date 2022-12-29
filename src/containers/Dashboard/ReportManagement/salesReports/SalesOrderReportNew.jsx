import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import Header from "../../../../components/Header/Header";
import Loading from '../../../../components/Loader/Loading';
import 'moment-timezone';
import SalesReportFilter from "./SalesReportFilter";
import SalesReportDataGrid from "./SalesReportDataGrid";
import { salesReportsList } from "../../../../_services";


const INITIAL_FILTER_STATE = {
    "company": "SCCC",
    "contract": "",
    "poNo": "",
    "soNo": "",
    "product": "",
    "orderStatus": "",
    "shippingCondition": "",
    "shipTo": "",
    "plant": "",
    "fromDate": "",
    "toDate": ""
}

const SalesOrderReportNew = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
    const [pageSize, setPageSize] = useState(20);
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
    const [isLoading, setIsLoading] = useState(false);
    const [resetCount, setCount] = useState(0);
    const salesReports = useSelector((state) => state.salesReports)
    const [dateError, setDateError] = useState("");
    const [clearDensity, setClearDensity] = useState("")

    const reportRes = useSelector((state) => state.reports);
    function isLoadingCheck(reportRes){
      return reportRes.companyLoading || reportRes.contractLoading || reportRes.productLoading || reportRes.shippingConditionLoading || reportRes.shipToLoading; 
    }


    const filterReports = () => {
        if (filterState.fromDate !== "" && filterState.toDate === "") {
            setDateError("fromDate")
            return 0;
        }
        if (filterState.fromDate === "" && filterState.toDate !== "") {
            setDateError("toDate")
            return 0;
        }

        dispatch(salesReportsList(filterState, 1, pageSize))
    }

    const clearAll = () => {
        setCount(resetCount + 1)
        setFilterState(INITIAL_FILTER_STATE);
        dispatch({ type: "SALES_REPORTS_LIST", payload: [] })
        setPageSize(20)
        setDateError("")
    }

    const handlePagination = (rowCount, pageNumber) => {

        const startCount = (rowCount * pageNumber) + 1;
        // const endCount = rowCount * (pageNumber + 1)
        const endCount = rowCount;
        console.log("endCount=>", endCount, rowCount)
        dispatch(salesReportsList(filterState, startCount, endCount))
    }

    useEffect(() => {
        return () => {
            dispatch({ type: "SALES_REPORTS_LIST", payload: [] })
        }
    }, [])

    const [rowCount, setRowCount] = useState(0);
    const getRowCount = salesReports.salesReportList.totalCount ?? 0;

    useEffect(() => {
        setRowCount(salesReports.salesReportList.totalCount)
    }, [getRowCount])

    return (
        <div className="content-wrapper">
            {
                isLoading || isLoadingCheck(reportRes) &&
                <div className="firstLoading">
                    <div className="progressLoding">
                        <Loading />
                    </div>
                </div>
            }
            <Header title={t("report.title")} />
            <div className={"row ipad_css " + MyNewClass}>
                <div className="mainScroll">
                    <div className="reports-landing-container">
                        <SalesReportFilter
                            setFilterState={setFilterState}
                            filterState={filterState}
                            filterReports={filterReports}
                            clearAll={clearAll}
                            resetCount={resetCount}
                            INITIAL_FILTER_STATE={INITIAL_FILTER_STATE}
                            setCount={setCount}
                            setDateError={setDateError}
                            dateError={dateError}
                        />
                        <SalesReportDataGrid
                            loading={salesReports.isLoading}
                            salesReports={salesReports}
                            rows={salesReports.salesReportList?.results ?? []}
                            filterState={filterState}
                            setIsLoading={setIsLoading}
                            handlePagination={handlePagination}
                            rowCount={rowCount}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(SalesOrderReportNew);
