import React, { useState } from "react";
import { Grid } from "@mui/material";
import Select from "../../../../components/Select/Select";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { AutoCompleteSearch } from '../../../../components/SearchBox/AutoCompleteSearch';
import ReportDatePicker from "../../../../components/DatePicker/ReportDatePicker";
import {
    getCompany,
    contarctDropdown,
    shippingConditionDropdown,
    shipToNameDropdown,
    plantNameDropdown,
    salesStatusDropdown,
    orderMaterialDropdown,
    shipmentStatusDropdown
} from "../../../../_services";
import moment from "moment";
import Axios from 'axios';
import ExportExcelPopup from "../../../../components/exportPopup/ExportExcelPopup";
import TextField from '@mui/material/TextField';

function threeMonthFarword(fromDate) {
    const addThreeMonth = moment(fromDate).add(3, 'months').format('DD MMM YYYY');
    const minusOneDay = moment(addThreeMonth).subtract(1, 'days').format('DD MMM YYYY')
    return minusOneDay;
}

function threeMonthBack(fromDate) {
    let minusThreeMonth = moment(fromDate).subtract(3, 'months').format('DD MMM YYYY')
    let addOneDay = moment(minusThreeMonth).add(1, 'days').format('DD MMM YYYY')
    let tdate = moment(moment(fromDate).format('DD MMM YYYY'));
    let minDate = moment(moment("2021-01-01").format('DD MMM YYYY'))
    const dif = tdate.diff(minDate, 'days');
    const l = moment(fromDate).subtract(dif, 'days').format('DD MMM YYYY');
    return dif > 90 ? addOneDay : l;
    // return addOneDay;
}

const MINIMUM_DATE = new Date("2021-01-01");

const DeliveryReportFilter = ({ setFilterState, filterState, filterReports, clearAll, resetCount, setDateError, dateError, INITIAL_FILTER_STATE }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [fileUrl, setFileUrl] = useState("");
    const [exportFiles, setExportFiles] = useState([])
    const [open, setOpen] = useState(false);

    const deliveryReports = useSelector((state) => state.deliveryReports)

    const { companyList, contractDeopdownList, deliveryMaterialDropdownList, shipToNameDropdownList, deliveryshippingConditionDropdownList, deliveryShipmentStatusDropdownList } = deliveryReports;
    const COMPANY_LIST = companyList;

    const ORDER_STATUS_LIST = deliveryShipmentStatusDropdownList;

    const SHIPPING_CONDITION = deliveryshippingConditionDropdownList;

    const CONTRACT_LIST = contractDeopdownList;
    const PRODUCT_LIST = deliveryMaterialDropdownList
    const SHIP_TO = shipToNameDropdownList

    // function for auto select that is pass into the AutoSelectSearch Components
    function autoSelectFn(selected) {
        setFilterState({ ...filterState, [selected.name]: selected.value })
    }

    function handleFilterChange(e) {
        setFilterState({ ...filterState, [e.target.name]: e.target.value })
        setDateError("")
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

    function handleFilterChangeCompany(e) {
        const cmp = shortDivision(e.target.value);
        dispatch(getCompany())
        dispatch(contarctDropdown(cmp, "deliveryReport"))
        dispatch(shippingConditionDropdown(cmp))
        dispatch(shipToNameDropdown(cmp, "deliveryReport"))
        dispatch(orderMaterialDropdown(cmp, "deliveryReport"))
        dispatch(plantNameDropdown(cmp, "deliveryReport"))
        dispatch(salesStatusDropdown(cmp))
        dispatch(shipmentStatusDropdown())
        clearAll()
        setDateError("")
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: null })
        setFilterState({ ...INITIAL_FILTER_STATE, [e.target.name]: e.target.value })
    }

    var fdate = moment(threeMonthFarword(filterState.weightOutDateFrom))
    var now = moment();

    // ============================ Export Function ===================================

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
            }).catch((err) => {
                // setExportState({ btnName: "EXPORT" });
            })
    }

    function exportApiCAll() {
        let {
            contractNo,
            product,
            doNo,
            poNo,
            soNo,
            shippingCondition,
            shipmentNo,
            shipmentStatus,
            shipTo,
            plant,
            weightOutDateFrom,
            weightOutDateTo,
        } = filterState;

        if (weightOutDateFrom !== "" && weightOutDateTo === "") {
            setDateError("weightOutDateFrom")
            return 0;
        }
        if (weightOutDateFrom === "" && weightOutDateTo !== "") {
            setDateError("weightOutDateTo")
            return 0;
        }

        const lancode = localStorage.getItem('lancode');
        const fromdate = moment(weightOutDateFrom).format("YYYY-MM-DD");
        const todate = moment(weightOutDateTo).format("YYYY-MM-DD");

        const minusThreeMonth = moment().subtract(3, 'months').format("YYYY-MM-DD");
        const oneThreeMonth = moment(minusThreeMonth).add(1, 'days').format('YYYY-MM-DD')
        const currentDate = moment(new Date()).format("YYYY-MM-DD");

        const postObj = {
            division: "CM",
            ...(contractNo && { contract: contractNo }),
            ...(product && { material: product }),
            ...(poNo && { poRefNumber: poNo }),
            ...(doNo && { deliveryNumberSap: doNo }),
            ...(soNo && { soNumber: soNo }),
            ...(shippingCondition && shippingCondition !== "All" && { shippingCondition: shippingCondition }),
            ...(shipmentNo && { shipmentNumber: shipmentNo }),
            ...(shipmentStatus && { shipmentStatus: shipmentStatus }),
            ...(shipTo && { shipToNumber: shipTo }),
            soldToNumber: localStorage.getItem('CustomerNumber'),
            "excel": "true",
            // ...("fromIndex" && { fromIndex: startCount ?? 1 }),
            // ...("toIndex" && { toIndex: endCount ?? 20 }),
            ...(weightOutDateFrom && weightOutDateTo && {
                weightOutFromDate: fromdate,
                weightOutToDate: todate
            }),
            ...(weightOutDateFrom === "" && weightOutDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
            "countryCode": lancode === "en" ? "en" : "th",
            // "uploadFolder":"",
            "languageType": lancode === "en" ? "en" : "th",
        }

        const url = `/report/export/delivery-orderCM`;

        Axios({
            method: "POST",
            url: process.env.REACT_APP_API_URL_RS + url,
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
                title={"Delivery Report"}
                fileName={"delivery_report"}
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

            <Grid item md={2} sm={5} xs={12}>
                <AutoCompleteSearch
                    inputLabel={t("report.contract")}
                    name="contractNo"
                    autoSelectFn={autoSelectFn}
                    resetCount={resetCount}
                    OPTIONS_TO_OBJECT={CONTRACT_LIST}
                    INITIAL_VALUE={filterState.contractNo}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={2} sm={5} xs={12}>
                <AutoCompleteSearch
                    inputLabel={t("report.product")}
                    name="product"
                    autoSelectFn={autoSelectFn}
                    resetCount={resetCount}
                    OPTIONS_TO_OBJECT={PRODUCT_LIST}
                    INITIAL_VALUE={filterState.productName}
                    variant="outlined"
                />
            </Grid>

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

            <Grid item md={2} sm={5} xs={12} className="reportInputText">

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

            <Grid item md={2} sm={5} xs={12} className="reportInputText">

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

            <Grid item md={2} sm={5} xs={12} className="selctStyle">

                <Select
                    name="shippingCondition"
                    label={t("report.shippingCondition")}
                    value={filterState.shippingCondition}
                    onChange={handleFilterChange}
                    options={SHIPPING_CONDITION}
                    minWidth="100%"
                    showNoneOption={false}
                    optionCode="code"
                    optionLabel="label"
                    isDefaultOptionVisible={false}
                    isAllOption={true}
                />
            </Grid>

            <Grid item md={2} sm={5} xs={12} className="reportInputText">

                <TextField
                    id="standard-basic"
                    label={t("report.shipmentNo")}
                    variant="standard"
                    style={{ width: "100%" }}
                    name="shipmentNo"
                    value={filterState.shipmentNo}
                    onChange={handleFilterChange}
                />

            </Grid>
            <Grid item md={2} sm={5} xs={12} className="selctStyle">

                <Select
                    name="shipmentStatus"
                    label={t("report.shipmentStatus")}
                    value={filterState.shipmentStatus}
                    onChange={handleFilterChange}
                    options={ORDER_STATUS_LIST}
                    minWidth="100%"
                    showNoneOption={false}
                    optionLabel="label"
                    optionCode="value"
                    isDefaultOptionVisible={false}
                    isAllOption={true}
                />
            </Grid>

            <Grid item md={2} sm={5} xs={12}>
                <AutoCompleteSearch
                    inputLabel={t("shipTo")}
                    name="shipTo"
                    autoSelectFn={autoSelectFn}
                    resetCount={resetCount}
                    OPTIONS_TO_OBJECT={SHIP_TO}
                    INITIAL_VALUE={filterState.shipTo}
                    variant="outlined"
                />
            </Grid>

            <Grid item md={2} sm={5} xs={12}>
                <ReportDatePicker
                    name="weightOutDateFrom"
                    label={t("report.weightOutDateFrom")}
                    onChange={handleFilterChange}
                    value={typeof filterState.weightOutDateFrom === "object" ? filterState.weightOutDateFrom : null}
                    maxDate={(filterState.weightOutDateTo !== "" && typeof filterState.weightOutDateTo === "object" && filterState.weightOutDateTo !=null && filterState.weightOutDateTo !="Invalid Date") ? filterState.weightOutDateTo : new Date()}
                    minDate={typeof filterState.weightOutDateTo === "object" && filterState.weightOutDateTo !=null && filterState.weightOutDateTo !="Invalid Date" ? threeMonthBack(filterState.weightOutDateTo) : MINIMUM_DATE}
                    style={{ width: "100%" }}
                    {...(dateError === "weightOutDateTo" && { error: t("report.required") })}
                />
            </Grid>

            <Grid item md={2} sm={5} xs={12}>
                <ReportDatePicker
                    name="weightOutDateTo"
                    label={t("report.weightOutDateTo")}
                    value={typeof filterState.weightOutDateTo === "object" ? filterState.weightOutDateTo : null}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
                    minDate={typeof filterState.weightOutDateFrom === "object" && filterState.weightOutDateFrom !=null && filterState.weightOutDateFrom !="Invalid Date" ? filterState.weightOutDateFrom : MINIMUM_DATE}
                    maxDate={((fdate >= now) || threeMonthFarword(filterState.weightOutDateFrom) === "Invalid date") ? new Date() : threeMonthFarword(filterState.weightOutDateFrom)}
                    {...(dateError === "weightOutDateFrom" && { error: t("report.required") })}
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


export default DeliveryReportFilter