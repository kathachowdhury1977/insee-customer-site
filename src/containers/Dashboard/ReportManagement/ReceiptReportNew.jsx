import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import Header from "../../../components/Header/Header";
import Loading from '../../../components/Loader/Loading'
import 'moment-timezone';
import { dateFormater, getDateTime } from '../../../_helpers/commonFunctions';
import ReceiptReportFilter from "./ReceiptReportFilter";
import ReceiptReportDataGrid from "./ReceiptReportDataGrid";
import { receiptReportList } from "../../../_services";

const DATE_ONE_YEAR_BACK = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
const INITIAL_FILTER_STATE = {
    "company": "SCCC",
    "receiptNumber": "",
    "fromDate": "",
    "toDate": ""
}

function ReceiptReportNew() {
    const { t } = useTranslation();
    const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
    const [isLoading, setIsLoading] = useState(false);
    const [resetCount, setCount] = useState(0);
    const dispatch = useDispatch()
    const receiptReports = useSelector((state) => state.receiptReports.receiptReport)
    const [clearDensity, setClearDensity] = useState("")
    const [dateError, setDateError] = useState("");

    useEffect(() => {
        return (() => {
            dispatch({ type: "RECEIPT_REPORTS", payload: [] })
        })
    }, [])

    const filterReports = () => {

        if (filterState.fromDate !== "" && filterState.toDate === "") {
            setDateError("fromDate")
            return 0;
        }
        if (filterState.fromDate === "" && filterState.toDate !== "") {
            setDateError("toDate")
            return 0;
        }

        dispatch(receiptReportList(filterState))
    }

    const clearAll = () => {
        setCount(resetCount + 1)
        setClearDensity("standard")
        dispatch({ type: "RECEIPT_REPORTS", payload: [] })
        setFilterState(INITIAL_FILTER_STATE);
        setDateError("")
    }
    useEffect(() => {
        setClearDensity("")
    }, [receiptReports])

    console.log("filterState=>", filterState)
    return (
        <div className="content-wrapper">
            {
                isLoading &&
                <div className="firstLoading">
                    <div className="progressLoding">
                        <Loading />
                    </div>
                </div>
            }

            <Header title={t("receipt.ReceiptReport")} />
            <div className={"row ipad_css " + MyNewClass}>
                <div className="mainScroll">
                    <div className="reports-landing-container">
                        <ReceiptReportFilter
                            setFilterState={setFilterState}
                            filterState={filterState}
                            filterReports={filterReports}
                            clearAll={clearAll}
                            resetCount={resetCount}
                            setIsLoading={setIsLoading}
                            INITIAL_FILTER_STATE={INITIAL_FILTER_STATE}
                            setDateError={setDateError}
                            dateError={dateError}
                        />
                        <ReceiptReportDataGrid
                            rows={receiptReports ?? []}
                            filterState={filterState}
                            setIsLoading={setIsLoading}
                            clearDensity={clearDensity}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(ReceiptReportNew);
