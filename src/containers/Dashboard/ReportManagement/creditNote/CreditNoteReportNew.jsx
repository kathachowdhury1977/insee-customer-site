import React, { useState, useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import Header from "../../../../components/Header/Header";
import Loading from '../../../../components/Loader/Loading'
import 'moment-timezone';
import CreditNoteReportFilters from "./CreditNoteReportFilters";
import CreditNoteReportDataGrid from "./CreditNoteReportDataGrid";
import {
    creditNoteList
} from "../../../../_services";

const INITIAL_FILTER_STATE = {
    "company": "SCCC",
    "documentsNo": "",
    "description": "",
    "taxInvoiceNumber": "",
    "status": "",
    "fromDate": "",
    "toDate": ""
}

const CreditNoteReportNew = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
    const [isLoading, setIsLoading] = useState(false);
    const [resetCount, setCount] = useState(0);
    const [clearDensity, setClearDensity] = useState("")
    const [dateError, setDateError] = useState("");

    const reportRes = useSelector((state) => state.reports);
    function isLoadingCheck(reportRes) {
        return reportRes.companyLoading || reportRes.creditStatusLoading;
    }

    const creditReports = useSelector((state) => state.creditReports)

    const filterReports = () => {
        if (filterState.fromDate !== "" && filterState.toDate === "") {
            setDateError("fromDate")
            return 0;
        }
        if (filterState.fromDate === "" && filterState.toDate !== "") {
            setDateError("toDate")
            return 0;
        }

        dispatch(creditNoteList(filterState))
    }

    const clearAll = () => {
        setCount(resetCount + 1)
        setFilterState(INITIAL_FILTER_STATE);
        dispatch({ type: "CREDIT_NOTE_LIST", payload: [] })
        setClearDensity("standard")
        setDateError("")
    }

    useEffect(() => {
        return () => {
            dispatch({ type: "CREDIT_NOTE_LIST", payload: [] })
        }
    }, [])

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
            <Header title={t("creditnotereport.lable")} />
            <div className={"row ipad_css " + MyNewClass}>
                <div className="mainScroll">
                    <div className="reports-landing-container">
                        <CreditNoteReportFilters
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
                        <CreditNoteReportDataGrid
                            rows={Array.isArray(creditReports.creditNoteList) ? creditReports.creditNoteList : []}
                            filterState={filterState}
                            setIsLoading={setIsLoading}
                            clearDensity={clearDensity}
                            setClearDensity={setClearDensity}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(CreditNoteReportNew);
