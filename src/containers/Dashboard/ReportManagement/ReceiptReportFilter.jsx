import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import ReportDatePicker from "../../../components/DatePicker/ReportDatePicker";
import Select from "../../../components/Select/Select";
import ExportPopup from "../../../components/exportPopup/ExportPopup";
import moment from "moment";
import Axios from 'axios';
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT, process.env.REACT_APP_API_URL_RS } from '../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany } from "../../../_services";
import ExportExcelPopup from "../../../components/exportPopup/ExportExcelPopup";
import TextField from '@mui/material/TextField';

const MINIMUM_DATE = new Date("2015-10-01");

function onYearFarword(fromDate) {
    let addOneYear = moment(fromDate).add(1, 'years').format('DD MMM YYYY')
    console.log("oneYearBackDate=>", addOneYear)
    let minusOneDay = moment(addOneYear).subtract(1, 'days').format('DD MMM YYYY')
    console.log("oneYearBackDate=>", minusOneDay)
    return minusOneDay
    // return moment(fromDate).add(1, 'years').format('DD MMM YYYY')
}

function onYearBack(fromDate) {
    let minusOneYear = moment(fromDate).subtract(1, 'years').format('DD MMM YYYY')
    let addOneDay = moment(minusOneYear).add(1, 'days').format('DD MMM YYYY')
    let tdate = moment(moment(fromDate).format('DD MMM YYYY'));
    let minDate = moment(moment("2015-10-01").format('DD MMM YYYY'))
    const dif = tdate.diff(minDate, 'days');
    const l = moment(fromDate).subtract(dif, 'days').format('DD MMM YYYY');
    return dif > 365 ? addOneDay : l;
    // return addOneDay
}

const ReceiptReportFilter = ({ setFilterState, filterState, filterReports, clearAll, setDateError, dateError, INITIAL_FILTER_STATE }) => {

    const reportsCompany = useSelector((state) => state.reportsCompany)
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [fileUrl, setFileUrl] = useState("");
    const [exportFiles, setExportFiles] = useState([])
    const [open, setOpen] = useState(false);

    const [openExportPopup, setOpenExportPopup] = useState(null);
    // Export Excel
    const [exportState, setExportState] = useState({
        btnName: "EXPORT",
        linkToDownload: null,
    });

    function handleFilterChange(e) {
        setDateError("")
        setFilterState({ ...filterState, [e.target.name]: e.target.value })
    }

    function handleFilterChangeCompany(e) {
        setDateError("")
        clearAll()
        dispatch({ type: "RECEIPT_REPORTS", payload: [] })
        setFilterState({ ...INITIAL_FILTER_STATE, [e.target.name]: e.target.value })
    }


    function exportDivision(company) {
        let divType = "Cement";
        if (company === "SCCO") {
            divType = "Concrete"
        }
        if (company === "Conwood") {
            divType = "Conwood"
        }
        return divType
    }

    function exportExcelFile(file_url) {
        setExportFiles([])
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + `/reports/bucket?folderName=${file_url}`,
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            .then(async (response) => {
                const newRes = Array.isArray(response.data.data) ? response.data.data : []
                setExportFiles(newRes)
            }).catch((err) => {
                // setExportState({ btnName: "EXPORT" });
            })
    }

    function exportApiCAll() {
        const {
            company,
            receiptNo,
            fromDate,
            toDate,
        } = filterState;

        if (fromDate !== "" && toDate === "") {
            setDateError("fromDate")
            return 0;
        }
        if (fromDate === "" && toDate !== "") {
            setDateError("toDate")
            return 0;
        }


        const countryCode = localStorage.getItem('lancode');

        const dateRangeFrom = moment(fromDate).format("DDMMYYYY");
        const dateRangeTo = moment(toDate).format("DDMMYYYY");

        const minusOneYear = moment().subtract(1, "years").format("DD MMM YYYY");
        const oneYearBackDate = moment(minusOneYear).add(1, 'days').format('DDMMYYYY')

        // const oneYearBackDate = moment().subtract(1, "years").format("DDMMYYYY");
        const currentDate = moment(new Date()).format("DDMMYYYY");

        const postObj = {
            ...(receiptNo && { receiptNo: receiptNo }),
            // ...(fromDate && { fromdate: dateRangeFrom }),
            // ...(toDate && { todate: dateRangeTo }),
            ...(fromDate && toDate && { fromdate: dateRangeFrom, todate: dateRangeTo }),
            ...(fromDate === "" && toDate === "" && { fromdate: oneYearBackDate, todate: currentDate }),
            ...(company && { division: exportDivision(company) }),
            ...(countryCode && { countryCode: countryCode }),
            customercode: localStorage.getItem("CustomerNumber"),
        };

        const url = `/reports/export/receiptReport`;

        Axios({
            method: "POST",
            url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + url,
            data: postObj,
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
                "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
            },
        })
            .then(async (response) => {
                setOpen(true);
                setFileUrl(response.data.data);
                exportExcelFile(response.data.data);
            })
            .catch((err) => { });
    }


    useEffect(() => {
        dispatch(getCompany())
    }, [])

    var fdate = moment(onYearFarword(filterState.fromDate))
    var now = moment();


    return (
        <Grid container spacing={2} mt={2} columns={12}>
            <ExportPopup
                title={"Receipt Report"}
                fileName={"Receipt_report"}
                openPopup={openExportPopup}
                setOpenExportPopup={setOpenExportPopup}
                linkToDownload={exportState.linkToDownload}
            />

            <ExportExcelPopup
                title={"Customer"}
                fileName={"customer"}
                setOpen={setOpen}
                open={open}
                exportExcelFile={exportExcelFile}
                fileUrl={fileUrl}
                exportFiles={exportFiles}
            />

            <Grid item lg={2} md={3} sm={6} xs={12} className="SelectRightPadding">
                <Select
                    name="company"
                    label={t("report.company")}
                    value={filterState.company}
                    onChange={handleFilterChangeCompany}
                    options={reportsCompany.companyList}
                    minWidth="100%"
                    showNoneOption={false}
                    isDefaultOptionVisible={false}
                />
            </Grid>

            <Grid item lg={2} md={3} sm={6} xs={12} className="reportInputText">
                <TextField
                    id="standard-basic"
                    label={t("report.receiptNumber")}
                    variant="standard"
                    style={{ width: "100%" }}
                    name="receiptNumber"
                    value={filterState.receiptNumber}
                    onChange={handleFilterChange}
                />
            </Grid>

            <Grid item lg={2} md={3} sm={6} xs={12} className="reportDatePicker SelectRightPadding">
                <ReportDatePicker
                    name="fromDate"
                    label={t("report.receiptStartDate")}
                    onChange={handleFilterChange}
                    value={typeof filterState.fromDate === "object" ? filterState.fromDate : null}
                    maxDate={typeof filterState.toDate === "object" && filterState.toDate != null && filterState.toDate != "Invalid Date" ? filterState.toDate : new Date()}
                    minDate={typeof filterState.toDate === "object" && filterState.toDate != null && filterState.toDate != "Invalid Date" ? onYearBack(filterState.toDate) : MINIMUM_DATE}
                    {...(dateError === "toDate" && { error: t("report.required") })}
                />
            </Grid>
            <Grid item lg={2} md={3} sm={6} xs={12} className="reportDatePicker SelectRightPadding">
                <ReportDatePicker
                    name="toDate"
                    label={t("label.end_date")}
                    value={typeof filterState.toDate === "object" ? filterState.toDate : null}
                    minDate={typeof filterState.fromDate === "object" && filterState.fromDate != null && filterState.fromDate != "Invalid Date" ? filterState.fromDate : MINIMUM_DATE}
                    maxDate={((fdate >= now) || onYearFarword(filterState.fromDate) === "Invalid date") ? new Date() : onYearFarword(filterState.fromDate)}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
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
                <Button
                    variant="contained"
                    className="btncolor"
                    size="small"
                    sx={{ m: 1 }}
                    onClick={exportApiCAll}
                >
                    {t("Export")}
                </Button>
            </Grid>
        </Grid>
    )
}

export default ReceiptReportFilter