import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Select from "../../../../components/Select/Select";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { AutoCompleteSearch } from '../../../../components/SearchBox/AutoCompleteSearch';
import ReportDatePicker from "../../../../components/DatePicker/ReportDatePicker";
import Axios from 'axios';
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../../../constant'
import {
    creditStatusDropdown,
    getCompany
} from "../../../../_services";
import moment from "moment";
import ExportPopup from "../../../../components/exportPopup/ExportPopup";
import TextField from '@mui/material/TextField';
import ExportExcelPopup from "../../../../components/exportPopup/ExportExcelPopup";

//const MINIMUM_DATE = new Date("2015-10-01");
const MINIMUM_DATE = moment("2015-10-01");
function onYearFarword(fromDate) {
    let addOneYear = moment(fromDate).add(1, 'years').format('DD MMM YYYY')
    let minusOneDay = moment(addOneYear).subtract(1, 'days').format('DD MMM YYYY')
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

const CreditNoteReportFilters = ({ setFilterState, filterState, filterReports, clearAll, resetCount, setDateError, dateError, INITIAL_FILTER_STATE }) => {
    const [selectedValue, setSelectedValue] = useState(null)
    console.log(selectedValue)
    const creditReports = useSelector((state) => state.creditReports)
    const reportsCompany = useSelector((state) => state.reportsCompany)

    const [openExportPopup, setOpenExportPopup] = useState(null);
    // Export Excel
    const [exportState, setExportState] = useState({
        btnName: "EXPORT",
        linkToDownload: null,
    });

    // const customerId = localStorage.getItem('CustomerNumber')

    const { t } = useTranslation();
    const dispatch = useDispatch()

    const CREDIT_STATUS_LIST = creditReports.creditNoteStatus

    useEffect(() => {
        dispatch(getCompany())
        dispatch(creditStatusDropdown())
    }, [])


    // function for auto select that is pass into the AutoSelectSearch Components
    function autoSelectFn(selected) {
        setFilterState({ ...filterState, [selected.name]: selected.value })
    }

    function handleFilterChange(e) {
        setDateError("")
        setFilterState({ ...filterState, [e.target.name]: e.target.value })
    }

    function handleFilterChangeCompany(e) {
        clearAll()
        setDateError("")
        setFilterState({ ...INITIAL_FILTER_STATE, [e.target.name]: e.target.value })
        dispatch({ type: "CREDIT_NOTE_LIST", payload: [] })
    }

    // export Excel

    function division() {
        let divType = "Cement";
        if (filterState.company === "SCCO") {
            divType = "Concrete"
        }
        if (filterState.company === "Conwood") {
            divType = "Conwood"
        }
        return divType
    }

    const [fileUrl, setFileUrl] = useState("");
    const [exportFiles, setExportFiles] = useState([])
    const [open, setOpen] = useState(false);

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

        let { company, documentsNo, doctype, description, taxInvoiceNumber, status, fromDate, toDate } = filterState;

        if (fromDate !== "" && toDate === "") {
            setDateError("fromDate")
            return 0;
        }
        if (fromDate === "" && toDate !== "") {
            setDateError("toDate")
            return 0;
        }

        const langCode = localStorage.getItem("lancode")
        const dateRangeFrom = moment(fromDate).format("DDMMYYYY");
        const dateRangeTo = moment(toDate).format("DDMMYYYY");
        const minusOneYear = moment().subtract(1, "years").format("DD MMM YYYY");
        const oneYearBackDate = moment(minusOneYear).add(1, 'days').format('DDMMYYYY')
        // const oneYearBackDate = moment().subtract(1, "years").format("DDMMYYYY");
        const currentDate = moment(new Date()).format("DDMMYYYY");
        const postObj = {
            ...(fromDate && toDate && { fromdate: dateRangeFrom, todate: dateRangeTo }),
            ...(fromDate === "" && toDate === "" && { fromdate: oneYearBackDate, todate: currentDate }),
            ...(company && { division: division(company) }),
            customercode: localStorage.getItem("CustomerNumber"),
            "language": langCode === "th" ? "th" : "en",
            ...(documentsNo && { documentNo: documentsNo }),
            "doctype": "R8",
            ...(description && { desciption: description }),
            ...(status && { statusfilter: status }),
            ...(taxInvoiceNumber && { taxInvoice: taxInvoiceNumber })
        };

        const url = `/reports/export/creditNoteReport`;

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

    var fdate = moment(onYearFarword(filterState.fromDate))
    var now = moment();

    return (
        <Grid container spacing={2} mt={2} columns={10}>
            {console.log("state=>", filterState.fromDate)}
            <Grid item lg={2} md={5} sm={5} xs={12} className="SelectRightPadding">
                <ExportPopup
                    title={"Credit Note Report"}
                    fileName={"Credit_nate_report"}
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

            <Grid item lg={2} md={5} sm={5} xs={12} className="reportInputText">
                <TextField
                    id="standard-basic"
                    label={t("Document No.")}
                    variant="standard"
                    style={{ width: "100%" }}
                    name="documentsNo"
                    value={filterState.documentsNo}
                    onChange={handleFilterChange}
                />
            </Grid>


            <Grid item lg={2} md={5} sm={5} xs={12} className="reportInputText">
                <TextField
                    id="standard-basic"
                    label={t("report.description")}
                    variant="standard"
                    style={{ width: "100%" }}
                    name="description"
                    value={filterState.description}
                    onChange={handleFilterChange}
                />
            </Grid>

            <Grid item lg={2} md={5} sm={5} xs={12} className="reportInputText">

                <TextField
                    id="standard-basic"
                    label={t("Tax Invoice Number")}
                    variant="standard"
                    style={{ width: "100%" }}
                    name="taxInvoiceNumber"
                    value={filterState.taxInvoiceNumber}
                    onChange={handleFilterChange}
                />
            </Grid>


            <Grid item lg={2} md={5} sm={5} xs={12}>
                <AutoCompleteSearch
                    setSelectedValue={setSelectedValue}
                    inputLabel={t("Status")}
                    name="status"
                    autoSelectFn={autoSelectFn}
                    resetCount={resetCount}
                    OPTIONS_TO_OBJECT={CREDIT_STATUS_LIST}
                    INITIAL_VALUE={filterState.status}
                    variant="outlined"
                />
            </Grid>

            <Grid item lg={2} md={5} sm={5} xs={12}>
                <ReportDatePicker
                    name="fromDate"
                    label={t("label.start_date")}
                    onChange={handleFilterChange}
                    value={typeof filterState.fromDate === "object" ? filterState.fromDate : null}
                    maxDate={typeof filterState.toDate === "object" && filterState.toDate !=null && filterState.toDate !="Invalid Date" ? filterState.toDate : new Date()}
                    minDate={typeof filterState.toDate === "object" && filterState.toDate !=null && filterState.toDate !="Invalid Date" ? onYearBack(filterState.toDate) : MINIMUM_DATE}
                    {...(dateError === "toDate" && { error: t("report.required") })}
                />
            </Grid>

            <Grid item lg={2} md={5} sm={5} xs={12}>
                <ReportDatePicker
                    name="toDate"
                    label={t("label.end_date")}
                    value={typeof filterState.toDate === "object" ? filterState.toDate : null}
                    minDate={typeof filterState.fromDate === "object" && filterState.fromDate !=null && filterState.fromDate !="Invalid Date" ? filterState.fromDate : MINIMUM_DATE}
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


export default CreditNoteReportFilters