import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Select from "../../../../components/Select/Select";
import Button from "@mui/material/Button";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { masterActions } from './../../../../_actions'
import { AutoCompleteSearch } from '../../../../components/SearchBox/AutoCompleteSearch';
import {
    getCompany,
    contarctDropdown,
    shippingConditionDropdown,
    shipToNameDropdown,
    plantNameDropdown,
    salesStatusDropdown,
    orderMaterialDropdown,
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

const DeliveryReportFilterSCCO = ({ setFilterState, filterState, filterReports, clearAll, resetCount, setDateError, dateError, setDateErrorD, dateErrorD, INITIAL_FILTER_STATE }) => {
    const deliveryReports = useSelector((state) => state.deliveryReports)
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [fileUrl, setFileUrl] = useState("");
    const [exportFiles, setExportFiles] = useState([])
    const [open, setOpen] = useState(false);
    const { companyList, ticketNoList, deliveryMaterialDropdownList, shipToNameDropdownList, plantNameDropdownList } = deliveryReports;
    const COMPANY_LIST = companyList;

    function productDrop(products) {
        const lancode = localStorage.getItem('lancode');
        const prod =products && products.length>0 && products.map((item) => {
            return ({
                ...item,
                label: lancode === "en" ? item.nameInEn : item.nameInTH,
            })
        })
        return Array.isArray(prod) ? prod : []
    }
    const PRODUCT_LIST = productDrop(deliveryMaterialDropdownList);
    const SHIP_TO = shipToNameDropdownList;

    let userName = localStorage.getItem('userData')
    userName = JSON.parse(userName)
    let custmerNo = userName ? userName.soldTo[0] : 0;

    useEffect(() => {
        dispatch(masterActions.shiptobyCountryAccount('True', custmerNo))
    }, [])

    // function for auto select that is pass into the AutoSelectSearch Components
    function autoSelectFn(selected) {
        setFilterState({ ...filterState, [selected.name]: selected.value })
    }

    function handleFilterChange(e) {
        setFilterState({ ...filterState, [e.target.name]: e.target.value })
        setDateError("")
        setDateErrorD("")
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
        clearAll()
        setDateError("")
        setDateErrorD("")
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: [] })
        setFilterState({ ...INITIAL_FILTER_STATE, [e.target.name]: e.target.value })
    }


    var deliveryDate = moment(threeMonthFarword(filterState.deliveryDateFrom))
    var departureDate = moment(threeMonthFarword(filterState.departureDateFrom))
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
            deliveryDateFrom,
            deliveryDateTo,
            departureDateFrom,
            departureDateTo
        } = filterState;

        if (deliveryDateFrom !== "" && deliveryDateTo === "") {
            setDateError("deliveryDateFrom")
            return 0;
        }
        if (deliveryDateFrom === "" && deliveryDateTo !== "") {
            setDateError("deliveryDateTo")
            return 0;
        }

        if (departureDateFrom !== "" && departureDateTo === "") {
            setDateErrorD("departureDateFrom")
            return 0;
        }
        if (departureDateFrom === "" && departureDateTo !== "") {
            setDateErrorD("departureDateTo")
            return 0;
        }

        const lancode = localStorage.getItem('lancode');
        // const fromdate = moment(weightOutDateFrom).format("YYYY-MM-DD");
        // const todate = moment(weightOutDateTo).format("YYYY-MM-DD");
        const fromdate = moment(deliveryDateFrom).format("YYYY-MM-DD");
        const todate = moment(deliveryDateTo).format("YYYY-MM-DD");

        const fromDepdate = moment(departureDateFrom).format("YYYY-MM-DD");
        const toDepdate = moment(departureDateTo).format("YYYY-MM-DD");


        const minusThreeMonth = moment().subtract(3, 'months').format("YYYY-MM-DD");
        const oneThreeMonth = moment(minusThreeMonth).add(1, 'days').format('YYYY-MM-DD')
        const currentDate = moment(new Date()).format("YYYY-MM-DD");

        const postObj = {
            division: "CO",
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
            ...(deliveryDateFrom && deliveryDateTo && {
                weightOutFromDate: fromdate,
                weightOutToDate: todate
            }),
            // ...(weightOutDateFrom && weightOutDateTo && {
            //     weightOutFromDate: fromdate,
            //     weightOutToDate: todate
            // }),
            // ...(weightOutDateFrom === "" && weightOutDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
            ...(deliveryDateFrom === "" && deliveryDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
            ...(departureDateFrom && departureDateTo && { departureDateFrom: fromDepdate, departureDateTo: toDepdate }),
            "countryCode": lancode === "en" ? "en" : "th",
            // "uploadFolder":"",
            "languageType": lancode === "en" ? "en" : "th",
        }


        const url = `/report/export/delivery-orderCOCW`;

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
            <Grid item md={2} sm={4} xs={12} className="selctStyle">
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
            <Grid item md={2} sm={4} xs={12}>
                <AutoCompleteSearch
                    inputLabel={t("report.product")}
                    name="product"
                    autoSelectFn={autoSelectFn}
                    resetCount={resetCount}
                    OPTIONS_TO_OBJECT={PRODUCT_LIST}
                    INITIAL_VALUE={filterState.product}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={2} sm={4} xs={12} className="reportInputText">

                <TextField
                    id="standard-basic"
                    label={t("report.ticketNo")}
                    variant="standard"
                    style={{ width: "100%" }}
                    name="ticketNo"
                    value={filterState.ticketNo}
                    onChange={handleFilterChange}
                />

            </Grid>
            <Grid item md={2} sm={4} xs={12}>
                <AutoCompleteSearch
                    inputLabel={t("report.plant")}
                    name="plant"
                    autoSelectFn={autoSelectFn}
                    resetCount={resetCount}
                    OPTIONS_TO_OBJECT={plantNameDropdownList}
                    INITIAL_VALUE={filterState.plant}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
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
            <Grid item md={2} sm={4} xs={12}>
                <DatePicker
                    name="deliveryDateFrom"
                    label={t("report.deliveryDateFrom")}
                    onChange={handleFilterChange}
                    value={typeof filterState.deliveryDateFrom === "object" ? filterState.deliveryDateFrom : null}
                    maxDate={(filterState.deliveryDateTo !== "" && typeof filterState.deliveryDateTo === "object" && filterState.deliveryDateTo !=null && filterState.deliveryDateTo !="Invalid Date") ? filterState.deliveryDateTo : new Date()}
                    minDate={typeof filterState.deliveryDateTo === "object"  && filterState.deliveryDateTo !=null && filterState.deliveryDateTo !="Invalid Date" ? threeMonthBack(filterState.deliveryDateTo) : MINIMUM_DATE}
                    {...(dateError === "deliveryDateTo" && { error: t("report.required") })}
                />
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
                <DatePicker
                    name="deliveryDateTo"
                    label={t("report.deliveryDateTo")}
                    onChange={handleFilterChange}
                    value={typeof filterState.deliveryDateTo === "object" ? filterState.deliveryDateTo : null}
                    minDate={typeof filterState.deliveryDateFrom === "object"  && filterState.deliveryDateFrom !=null && filterState.deliveryDateFrom !="Invalid Date" ? filterState.deliveryDateFrom : MINIMUM_DATE}
                    maxDate={((deliveryDate >= now) || threeMonthFarword(filterState.deliveryDateFrom) === "Invalid date") ? new Date() : threeMonthFarword(filterState.deliveryDateFrom)}

                    {...(dateError === "deliveryDateFrom" && { error: t("report.required") })} />
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
                <DatePicker
                    name="departureDateFrom"
                    label={t("report.departureDateFrom")}
                    value={typeof filterState.departureDateFrom === "object" ? filterState.departureDateFrom : null}
                    onChange={handleFilterChange}
                    maxDate={(filterState.departureDateTo !== "" && typeof filterState.departureDateTo === "object" && filterState.departureDateTo !=null && filterState.departureDateTo !="Invalid Date") ? filterState.departureDateTo : new Date()}
                    minDate={typeof filterState.departureDateTo === "object" && filterState.departureDateTo !=null && filterState.departureDateTo !="Invalid Date" ? threeMonthBack(filterState.departureDateTo) : MINIMUM_DATE}
                    style={{ width: "100%" }}
                    {...(dateErrorD === "departureDateTo" && { error: t("report.required") })}
                />
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
                <DatePicker
                    name="departureDateTo"
                    label={t("report.departureDateTo")}
                    value={typeof filterState.departureDateTo === "object" ? filterState.departureDateTo : null}
                    onChange={handleFilterChange}
                    style={{ width: "100%" }}
                    minDate={typeof filterState.departureDateFrom === "object" && filterState.departureDateFrom !=null && filterState.departureDateFrom !="Invalid Date" ? filterState.departureDateFrom : MINIMUM_DATE}
                    maxDate={((departureDate >= now) || threeMonthFarword(filterState.departureDateFrom) === "Invalid date") ? new Date() : threeMonthFarword(filterState.departureDateFrom)}
                    {...(dateErrorD === "departureDateFrom" && { error: t("report.required") })}
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


export default DeliveryReportFilterSCCO