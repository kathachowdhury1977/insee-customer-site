import React, { useState } from "react";
import { Grid } from "@mui/material";
import Select from "../../../../components/Select/Select";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { AutoCompleteSearch } from './../../../../components/SearchBox/AutoCompleteSearch';
import ReportDatePicker from "../../../../components/DatePicker/ReportDatePicker";
import {
    soPoSmartSearch,
    invoiceNumberSearch,
    doSearch,
    shipToNameDropdown,
    contarctDropdown,
    shippingConditionDropdown,
    plantNameDropdown,
    salesStatusDropdown,
    orderMaterialDropdown,
    shipmentStatusDropdown
} from "../../../../_services";
import moment from "moment";
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import ExportExcelPopup from "../../../../components/exportPopup/ExportExcelPopup";

function sixMonthFarword(fromDate) {
    const addSixMonth = moment(fromDate).add(6, 'months').format('DD MMM YYYY')
    const minusOneDay = moment(addSixMonth).subtract(1, 'days').format('DD MMM YYYY')
    return minusOneDay;
}

function sixMonthBack(fromDate) {
    let minusSixMonth = moment(fromDate).subtract(6, 'months').format('DD MMM YYYY')
    let addOneDay = moment(minusSixMonth).add(1, 'days').format('DD MMM YYYY')

    let tdate = moment(moment(fromDate).format('DD MMM YYYY'));
    let minDate = moment(moment("2021-01-01").format('DD MMM YYYY'))
    const dif = tdate.diff(minDate, 'days');
    const l = moment(fromDate).subtract(dif, 'days').format('DD MMM YYYY');
    return dif > 181 ? addOneDay : l;
    // return addOneDay;
}

const MINIMUM_DATE = new Date("2021-01-01");

const InvoiceReportFilters = ({ setFilterState, filterState, filterReports, clearAll, resetCount, setDateError, dateError, INITIAL_FILTER_STATE }) => {
    const [selectedValue, setSelectedValue] = useState(null)
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [fileUrl, setFileUrl] = useState("");
    const [exportFiles, setExportFiles] = useState([])
    const [open, setOpen] = useState(false);
    const currentDate = new Date()

    const invoiceReports = useSelector((state) => state.invoiceReports)
    const { companyList, contractDeopdownList, poList, doList, soList, invoiceMaterialDropdownList, shipToNameDropdownList, taxInvoiceNumber, plantNameDropdownList } = invoiceReports;

    const lang = localStorage.getItem('lancode')

    const filteredShiToList = shipToNameDropdownList && shipToNameDropdownList.map((item) => {
        return lang !== "en" ? { ...item, label: item.shipToNameTh } : { ...item, label: item.shipToNameEn }
    })

    const filteredPlantList = plantNameDropdownList && plantNameDropdownList.map((item) => {
        return lang !== "en" ? { ...item, label: item.plantNameTh } : { ...item, label: item.plantNameEn }
    })

    const filteredProductList = invoiceMaterialDropdownList && invoiceMaterialDropdownList.map(item => {
        return lang !== "en" ? { ...item, label: item.nameInTH } : { ...item, label: item.nameInEn }
    })


    const COMPANY_LIST = companyList;
    const CONTRACT_LIST = contractDeopdownList;
    const PLANT_LIST = filteredPlantList;
    const PO_NUMBER = poList;
    const TXT_INVOICE_NUMBER = taxInvoiceNumber;
    const DO_NUMBER = doList;
    const SO_NUMBER = soList;
    const PRODUCT_LIST = filteredProductList;
    const SHIP_TO_NAME = filteredShiToList;

    let userName = localStorage.getItem('userData')
    userName = JSON.parse(userName)
    let custmerNo = userName ? userName.soldTo[0] : 0;

    function salesDivision(company) {
        let divType = "CM";
        if (company === "SCCO") {
            divType = "CO"
        }
        if (company === "Conwood") {
            divType = "CW"
        }
        return divType
    }

    // function for auto select that is pass into the AutoSelectSearch Components
    function autoSelectFn(selected) {
        setFilterState({ ...filterState, [selected.name]: selected.value })
    }

    function handleFilterChange(e) {
        setDateError("")
        setFilterState({ ...filterState, [e.target.name]: e.target.value })
    }

    function shortDivision(company) {
        let divType = "CM";
        if (company === "SCCO") {
            divType = "CO"
        }
        if (company === "Conwood") {
            divType = "CW"
        }
        return divType
    }

    function longDivision(company) {
        let divType = "Cement";
        if (company === "SCCO") {
            divType = "Concrete"
        }
        if (company === "Conwood") {
            divType = "Conwood"
        }
        return divType
    }

    function handleFilterChangeCompany(e) {
        const cmp = shortDivision(e.target.value);
        const cmpLong = longDivision(e.target.value)
        clearAll()
        setDateError("")
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: [] })
        setFilterState({ ...INITIAL_FILTER_STATE, [e.target.name]: e.target.value })
        dispatch(contarctDropdown(cmp, "taxInvoice"))
        dispatch(shippingConditionDropdown(cmp))
        dispatch(shipToNameDropdown(cmp, "taxInvoice"))
        dispatch(orderMaterialDropdown(cmp, "taxInvoice"))
        dispatch(plantNameDropdown(cmp, "taxInvoice"))
        dispatch(salesStatusDropdown(cmp))
        dispatch(shipmentStatusDropdown())
        dispatch({ type: "INVOICE_SEARCH_LIST", payload: [] })
        dispatch({ type: "DO_SEARCH_LIST", payload: [] })
        dispatch({ type: "SO_SEARCH_LIST", payload: [] })
        dispatch({ type: "PO_SEARCH_LIST", payload: [] })
    }

    var fdate = moment(sixMonthFarword(filterState.invoiceFromDate))
    var now = moment();

    // =====================================
    function exportExcelFile(file_url) {
        setExportFiles([])
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_RS + `/report/bucket?folderName=${file_url}`,
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            .then(async (response) => {
                const newRes = Array.isArray(response.data.data) ? response.data.data : []
                setExportFiles(newRes)
                // setExportState({ btnName: "EXPORT", linkToDownload: response.data });
            }).catch((err) => {
                // setExportState({ btnName: "EXPORT" });
            })
    }


    function companyDivision(company) {
        let divType = "Cement";
        if (company === "SCCO") {
            divType = "Concrete"
        }
        if (company === "Conwood") {
            divType = "Conwood"
        }
        return divType
    }
    // Call Export functnalities

    function exportApiCAll() {
        let { company, contract, product, taxInvoiceNumber, doNo, poNo, soNo, shipTo, plant, invoiceFromDate, invoiceToDate } = filterState;

        if (invoiceFromDate !== "" && invoiceToDate === "") {
            setDateError("invoiceFromDate")
            return 0;
        }
        if (invoiceFromDate === "" && invoiceToDate !== "") {
            setDateError("invoiceToDate")
            return 0;
        }

        const countryCode = lang !== "en" ? "TH" : "EN";
        const dateRangeFrom = moment(invoiceFromDate).format("DDMMYYYY");
        const dateRangeTo = moment(invoiceToDate).format("DDMMYYYY");

        const minusThreeMonth = moment().subtract(6, 'months').format("YYYY-MM-DD");
        const oneSixMonth = moment(minusThreeMonth).add(1, 'days').format('DDMMYYYY')
        const currentDate = moment(new Date()).format("DDMMyyyy");

        // console.log('hello',dateRangeFrom,dateRangeTo ); 
        // const dateRangeTo = moment(invoiceToDate).format("DDMMYYYY");  currentDate

        const lang = localStorage.getItem('lancode');

        const postObj = {
            customerCode: localStorage.getItem("CustomerNumber"),
            ...(company && { division: companyDivision(company) }),
            ...(countryCode && { countryCode: countryCode }),
            languageType: lang !== "en" ? "TH" : "EN",
            ...(soNo && { soNumber: soNo }),
            ...(poNo && { poNumber: poNo }),
            ...(doNo && { doNumber: doNo }),
            ...(taxInvoiceNumber && { invoiceNumber: taxInvoiceNumber }),
            ...(contract && { contract: contract }),
            ...(product && { material: product }),
            ...(plant && { plantCode: plant }),
            ...(shipTo && { shipToNumber: shipTo }),
            ...(invoiceFromDate && invoiceToDate && { fromDate: dateRangeFrom, toDate: dateRangeTo }),
            ...(plant === "" && product === "" && taxInvoiceNumber === "" && shipTo === "" && doNo === "" && soNo === "" && poNo === "" && contract === "" && invoiceFromDate === "" && invoiceToDate === "" && { fromDate: oneSixMonth, toDate: currentDate })
        };

        const urlCCO = `/report/export/taxInvoiceReport`;
        const urlCW = `/report/export/taxInvoiceCwReport`;
        Axios({
            method: "POST",
            url: process.env.REACT_APP_API_URL_RS + (company === "Conwood" ? urlCW : urlCCO),
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

    return (
        <Grid container spacing={2} mt={2} columns={10}>

            <ExportExcelPopup
                title={"Customer"}
                fileName={"customer"}
                setOpen={setOpen}
                open={open}
                exportExcelFile={exportExcelFile}
                fileUrl={fileUrl}
                exportFiles={exportFiles}
            />

            <Grid item md={2} sm={5} xs={12} className="selctStyle">
                <Select
                    name="company"
                    label={t("report.company")}
                    value={filterState.company}
                    onChange={handleFilterChangeCompany}
                    options={COMPANY_LIST}
                    minWidth="100%"
                    showNoneOption={false}
                    isDefaultOptionVisible={false}
                />
            </Grid>

            {filterState.company !== "SCCO" &&
                <Grid item md={2} sm={5} xs={12}>
                    <AutoCompleteSearch
                        setSelectedValue={setSelectedValue}
                        inputLabel={t("report.contract")}
                        name="contract"
                        autoSelectFn={autoSelectFn}
                        resetCount={resetCount}
                        OPTIONS_TO_OBJECT={CONTRACT_LIST}
                        INITIAL_VALUE={filterState.contract}
                        variant="outlined"
                    />
                    {console.log("==>", CONTRACT_LIST)}
                </Grid>
            }
            <Grid item md={2} sm={5} xs={12}>
            
                <AutoCompleteSearch
                    setSelectedValue={setSelectedValue}
                    inputLabel={t("report.product")}
                    name="product"
                    autoSelectFn={autoSelectFn}
                    resetCount={resetCount}
                    OPTIONS_TO_OBJECT={PRODUCT_LIST}
                    INITIAL_VALUE={filterState.product}
                    variant="outlined"
                />
            </Grid>
           
            <Grid item md={2} sm={5} xs={12} className="reportInputText">
                <TextField
                    id="standard-basic"
                    label={t("report.taxInvoiceNumber")}
                    variant="standard"
                    style={{ width: "100%" }}
                    name="taxInvoiceNumber"
                    value={filterState.taxInvoiceNumber}
                    onChange={handleFilterChange}
                />

            </Grid>

            {filterState.company !== "SCCO" &&
                <>
                    <Grid item md={2} sm={5} xs={12} className="reportInputText">

                        <TextField
                            id="standard-basic"
                            label={t("report.doNo")}
                            variant="standard"
                            style={{ width: "100%" }}
                            name="doNo"
                            value={filterState.doNo}
                            onChange={handleFilterChange}
                        />

                    </Grid>

                    <Grid item md sm={5} xs={12} className="reportInputText">
                        <TextField
                            id="standard-basic"
                            label={t("report.poNo")}
                            variant="standard"
                            style={{ width: "100%" }}
                            name="poNo"
                            value={filterState.poNo}
                            onChange={handleFilterChange}
                        />

                    </Grid>

                    <Grid item md sm={5} xs={12} className="reportInputText">
                        <TextField
                            id="standard-basic"
                            label={t("report.soNo")}
                            variant="standard"
                            style={{ width: "100%" }}
                            name="soNo"
                            value={filterState.soNo}
                            onChange={handleFilterChange}
                        />

                    </Grid>
                </>}

            {filterState.company === "SCCO" &&
                <>
                    <Grid item md={2} sm={5} xs={12}>
                        <AutoCompleteSearch
                            setSelectedValue={setSelectedValue}
                            inputLabel={t("report.plant")}
                            name="plant"
                            autoSelectFn={autoSelectFn}
                            resetCount={resetCount}
                            OPTIONS_TO_OBJECT={PLANT_LIST}
                            INITIAL_VALUE={filterState.plant}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item md={2} sm={5} xs={12}>
                        <AutoCompleteSearch
                            setSelectedValue={setSelectedValue}
                            inputLabel={t("shipTo")}
                            name="shipTo"
                            autoSelectFn={autoSelectFn}
                            resetCount={resetCount}
                            OPTIONS_TO_OBJECT={SHIP_TO_NAME}
                            INITIAL_VALUE={filterState.shipTo}
                            variant="outlined"
                        />
                    </Grid>
                </>
            }

            <Grid item lg={2} md={4} sm={5} xs={12}>
                <ReportDatePicker
                    name="invoiceFromDate"
                    label={t("report.taxInvoiceDateFrom")}
                    onChange={handleFilterChange}
                    value={typeof filterState.invoiceFromDate === "object" ? filterState.invoiceFromDate : null}
                    maxDate={(filterState.invoiceToDate !== "" && typeof filterState.invoiceToDate === "object" && filterState.invoiceToDate != null && filterState.invoiceToDate != "Invalid Date") ? filterState.invoiceToDate : new Date()}
                    minDate={typeof filterState.invoiceToDate === "object" && filterState.invoiceToDate != null && filterState.invoiceToDate != "Invalid Date" ? sixMonthBack(filterState.invoiceToDate) : MINIMUM_DATE}
                    style={{ width: "100%" }}
                    disableFuture={true}
                    {...(dateError === "invoiceToDate" && { error: t("report.required") })}
                />

            </Grid>

            <Grid item lg={2} md={4} sm={5} xs={12}>

                <ReportDatePicker
                    name="invoiceToDate"
                    label={t("report.taxInvoiceDateto")}
                    value={typeof filterState.invoiceToDate === "object" ? filterState.invoiceToDate : null}
                    maxDate={((fdate >= now) || sixMonthFarword(filterState.invoiceFromDate) === "Invalid date") ? new Date() : sixMonthFarword(filterState.invoiceFromDate)}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
                    minDate={typeof filterState.invoiceFromDate === "object" && filterState.invoiceFromDate != null && filterState.invoiceFromDate != "Invalid Date" ? filterState.invoiceFromDate : MINIMUM_DATE}
                    disableFuture={true}
                    {...(dateError === "invoiceFromDate" && { error: t("report.required") })}
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
                // disabled={filterState.invoiceFromDate ==="" || filterState.invoiceToDate ===""}
                >
                    {t("Export")}
                </Button>
            </Grid>
        </Grid>
    )
}

export default InvoiceReportFilters