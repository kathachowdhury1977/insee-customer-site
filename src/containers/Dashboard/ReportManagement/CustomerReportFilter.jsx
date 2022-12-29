import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import Select from "../../../components/Select/Select";
import Button from "@mui/material/Button";
import { getCompany } from "../../../_services";
import { useDispatch, useSelector } from 'react-redux';
import MonthYearPicker from "../../../components/DatePicker/MonthYearPicker";

const MINIMUM_DATE = new Date("2015-10-17");
let toMonth = new Date();
toMonth.setMonth(toMonth.getMonth() - 1);

let fromMonth = new Date();
fromMonth.setMonth(fromMonth.getMonth() - 1);

const CustomerReportFilter = ({
    setFilterState,
    filterState,
    filterReports,
    setReportData,
    setDateError,
    dateError,
    clearAll, 
    INITIAL_FILTER_STATE 
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const reportsCompany = useSelector((state) => state.reportsCompany)

    function handleFilterChange(e) {
        setReportData([])
        setFilterState({ ...filterState, [e.target.name]: e.target.value })
        setDateError("")
    }

    function handleFilterChangeCompany(e) {
        clearAll()
        setDateError("");
        setFilterState({
            ...INITIAL_FILTER_STATE,
            [e.target.name]: e.target.value,
          });
    }


    useEffect(() => {
        dispatch(getCompany())
    }, [])

    return (
        <Grid container spacing={2} mt={2} columns={12}>
            <Grid item md={3} sm={6} xs={12}>
                <Select
                    name="company"
                    label={t("label.company")}
                    value={filterState.company}
                    onChange={handleFilterChangeCompany}
                    options={reportsCompany.companyList}
                    minWidth="100%"
                    showNoneOption={false}
                    isDefaultOptionVisible={false}
                />
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <MonthYearPicker
                    name="fromDate"
                    label={t("report.from")}
                    onChange={handleFilterChange}
                    value={typeof filterState.fromDate === "object" ? filterState.fromDate : null}
                    // maxDate={fromMonth}
                    maxDate={typeof filterState.toDate === "object" && filterState.toDate !=null && filterState.toDate !="Invalid Date" ? filterState.toDate : fromMonth}
                    minDate={MINIMUM_DATE}
                    views={true}
                    style={{ width: "100%" }}
                    {...(dateError === "toDate" && { error: t("report.required") })}
                />
            </Grid>
            
            <Grid item md={3} sm={6} xs={12}>
                <MonthYearPicker
                    name="toDate"
                    label={t("report.to")}
                    value={typeof filterState.toDate === "object" ? filterState.toDate : null}
                    maxDate={toMonth}
                    // minDate={MINIMUM_DATE}
                    minDate={typeof filterState.fromDate === "object" && filterState.fromDate !=null && filterState.fromDate !="Invalid Date" ? filterState.fromDate : MINIMUM_DATE}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
                    views={true}
                    {...(dateError === "fromDate" && { error: t("report.required") })}
                />
            </Grid>
            <Grid item md xs display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    className="btncolor"
                    size="small"
                    sx={{ m: 1 }}
                    onClick={filterReports}
                >
                    {t("Search")}
                </Button>
                <Button
                    variant="contained"
                    className="btncolor"
                    size="small"
                    sx={{ m: 1 }}
                    onClick={clearAll}
                >
                    {t("report.clearAll")}
                </Button>
            </Grid>
        </Grid>
    )
}

export default CustomerReportFilter