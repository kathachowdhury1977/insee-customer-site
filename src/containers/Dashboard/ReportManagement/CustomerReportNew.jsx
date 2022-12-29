import React, { useState, useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import Loading from '../../../components/Loader/Loading'
import 'moment-timezone';
import moment from "moment";
import CustomerReportFilter from "./CustomerReportFilter";
import CustomerReportDataGrid from "./CustomerReportDataGrid";
import { dateFormater, getDateTime } from '../../../_helpers/commonFunctions';
import { getCompany } from "../../../_services/report.service";

let toMonth = new Date();
toMonth.setMonth(toMonth.getMonth() - 1);

let fromMonth = new Date();
fromMonth.setMonth(fromMonth.getMonth() - 2);

const INITIAL_FILTER_STATE = {
    "company": "SCCC",
    "fromDate": "",
    "toDate": ""
}

function CustomerReportNew() {
    const dispatch = useDispatch()
    const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
    const [reportData, setReportData] = useState([])
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const [dateError, setDateError] = useState("");

    useEffect(() => {
        dispatch(getCompany())
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

        if (filterState.fromDate !== "" && filterState.toDate !== "") {

            var dateStart = moment(new Date(filterState.fromDate));
            var dateEnd = moment(new Date(filterState.toDate));
            var timeValues = [];
            let i = 0;
            while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                timeValues.push({ id: i, company: "Conwood", createdDate: dateStart.format('YYYY-MM-DD') });
                dateStart.add(1, 'month');
                i++;
            }
            console.log("timeValues :", timeValues)
            setReportData(timeValues.reverse())
        } else {
            const minusOneYear = moment().subtract(1, 'years').format('YYYY-MM-DD')
            const oneYear = moment(minusOneYear).add(1, 'months').format('YYYY-MM-DD')
            const currentDate = moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD");

            var dateStart = moment(new Date(oneYear));
            var dateEnd = moment(new Date(currentDate));
            var timeValues = [];
            let i = 0;
            while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                timeValues.push({ id: i, company: "Conwood", createdDate: dateStart.format('YYYY-MM-DD') });
                dateStart.add(1, 'month');
                i++;
            }
            console.log("timeValues :", timeValues)
            setReportData(timeValues.reverse())
        }
    }

    const clearAll = () => {
        setFilterState(INITIAL_FILTER_STATE);
        setReportData([]);
        setDateError("")
    }

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
            <Header title={t("report.customerStatement")} />
            <div className={"row ipad_css " + MyNewClass}>
                <div className="mainScroll">
                    <div className="reports-landing-container">
                        <CustomerReportFilter
                            setFilterState={setFilterState}
                            filterState={filterState}
                            filterReports={filterReports}
                            clearAll={clearAll}
                            setReportData={setReportData}
                            setDateError={setDateError}
                            dateError={dateError}
                            INITIAL_FILTER_STATE={INITIAL_FILTER_STATE}
                        />
                        <CustomerReportDataGrid
                            rows={reportData}
                            filterState={filterState}
                            setIsLoading={setIsLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(CustomerReportNew);
