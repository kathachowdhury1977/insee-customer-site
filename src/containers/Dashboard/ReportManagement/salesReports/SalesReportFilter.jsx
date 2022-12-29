import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Select from "../../../../components/Select/Select";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { masterActions } from '../../../../_actions'
import {
  getCompany,
  contarctDropdown,
  shippingConditionDropdown,
  shipToNameDropdown,
  orderMaterialDropdown,
  plantNameDropdown,
  salesStatusDropdown
} from "../../../../_services";
import { AutoCompleteSearch } from '../../../../components/SearchBox/AutoCompleteSearch';
import ReportDatePicker from "../../../../components/DatePicker/ReportDatePicker";
import moment from "moment";
import ExportExcelPopup from "../../../../components/exportPopup/ExportExcelPopup";
import Axios from 'axios';
import TextField from '@mui/material/TextField';

function onYearFarword(fromDate) {
  const addOneYear = moment(fromDate).add(1, 'years').format('DD MMM YYYY')
  const minusOneDay = moment(addOneYear).subtract(1, 'days').format('DD MMM YYYY')
  return minusOneDay;
}

function onYearBack(fromDate) {

  let minusOneYear = moment(fromDate).subtract(1, 'years').format('DD MMM YYYY')
  let addOneDay = moment(minusOneYear).add(1, 'days').format('DD MMM YYYY')
  let tdate = moment(moment(fromDate).format('DD MMM YYYY'));
  let minDate = moment(moment("2021-01-01").format('DD MMM YYYY'))
  const dif = tdate.diff(minDate, 'days');
  const l = moment(fromDate).subtract(dif, 'days').format('DD MMM YYYY');
  return dif > 365 ? addOneDay : l;
  // return addOneDay;
}

const MINIMUM_DATE = new Date("2021-01-01");

const SalesReportFilter = ({
  setFilterState,
  filterState,
  filterReports,
  clearAll,
  resetCount,
  setCount,
  INITIAL_FILTER_STATE,
  setDateError,
  dateError,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [exportFiles, setExportFiles] = useState([]);
  const [open, setOpen] = useState(false);

  const salesReports = useSelector((state) => state.salesReports);
  const reportsCompany = useSelector((state) => state.reportsCompany);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const ORDER_STATUS_LIST = [
    {
      key: "All",
      label: "All",
      labelTh: "ทั้งหมด",
    },
    {
      key: "Open",
      label: "Open",
      labelTh: "พร้อมทำชิปเม้นท์",
    },
    {
      key: "Completed",
      label: "Completed",
      labelTh: "ดำเนินการเรียบร้อย",
    },
    {
      key: "Cancel",
      label: "Cancel",
      labelTh: "ยกเลิก",
    },
    {
      key: "Blocked",
      label: "Blocked",
      labelTh: "ถูกบล็อก",
    },


  ];

  let condition = salesReports.shippingConditionDropdownList;

  const CONTRACT_LIST = salesReports.contractDeopdownList;

  const PLANT_LIST = salesReports.plantNameDropdownList;

  const PRODUCT_LIST = salesReports.orderMaterialDropdownList;

  const SHIP_TO = Array.isArray(salesReports.shipToNmeDropdownList)
    ? salesReports.shipToNmeDropdownList
    : [];

  let userName = localStorage.getItem("userData");
  userName = JSON.parse(userName);
  let custmerNo = userName ? userName.soldTo[0] : 0;

  const langCode = localStorage.getItem("lancode");
  useEffect(() => {
    dispatch(getCompany());
    dispatch(contarctDropdown("CM","salesOrder"));
    dispatch(shippingConditionDropdown());
    dispatch(shipToNameDropdown("CM","salesOrder"));
    dispatch(orderMaterialDropdown("CM","salesOrder"));
    dispatch(plantNameDropdown());
    dispatch(salesStatusDropdown());
  }, [langCode]);

  useEffect(() => {
    dispatch(masterActions.shiptobyCountryAccount("True", custmerNo));
  }, []);

  // function for auto select that is pass into the AutoSelectSearch Components
  function autoSelectFn(selected) {
    setFilterState({ ...filterState, [selected.name]: selected.value });
  }

  function handleFilterChange(e) {
    setDateError("")
    setFilterState({ ...filterState, [e.target.name]: e.target.value });
  }

  function salesDivision(company) {
    let divType = "CM";
    if (company === "SCCO") {
      divType = "CO";
    }
    if (company === "Conwood") {
      divType = "CW";
    }
    return divType;
  }

  function handleFilterChangeCompany(e) {
    setCount(resetCount + 1);
    dispatch(contarctDropdown(salesDivision(e.target.value), "salesOrder"));
    dispatch(salesStatusDropdown(salesDivision(e.target.value)));
    dispatch(shipToNameDropdown(salesDivision(e.target.value), "salesOrder"));
    dispatch(orderMaterialDropdown(salesDivision(e.target.value), "salesOrder"));
    dispatch(shippingConditionDropdown(salesDivision(e.target.value)));
    dispatch(plantNameDropdown(salesDivision(e.target.value), "salesOrder"));
    setDateError("");
    clearAll();
    dispatch({ type: "SALES_REPORTS_LIST", payload: [] });
    dispatch({ type: "SO_SEARCH_LIST", payload: [] })
    dispatch({ type: "PO_SEARCH_LIST", payload: [] })
    dispatch({ type: "PRE_DO_SEARCH_LIST", payload: [] })
    setFilterState({
      ...INITIAL_FILTER_STATE,
      [e.target.name]: e.target.value,
    });
  }

  var fdate = moment(onYearFarword(filterState.fromDate));
  var now = moment();

  function exportExcelFile(file_url) {
    setExportFiles([]);
    Axios({
      method: "GET",
      url:
        process.env.REACT_APP_API_URL_RS +
        `/report/bucket?folderName=${file_url}`,
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
      },
    })
      .then(async (response) => {
        const newRes = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setExportFiles(newRes);
        // setExportState({ btnName: "EXPORT", linkToDownload: response.data });
      })
      .catch((err) => {
        // setExportState({ btnName: "EXPORT" });
      });
  }

  function exportApiCAll() {
    const {
      company,
      contract,
      fromDate,
      orderStatus,
      plant,
      poNo,
      product,
      shipTo,
      shippingCondition,
      soNo,
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

    const countryCode = "TH";
    const dateRangeFrom = moment(fromDate).format("YYYYMMDD");
    const dateRangeTo = moment(toDate).format("YYYYMMDD");

    const minusOneYear = moment().subtract(1, "years").format("YYYY-MM-DD");
    const oneYear = moment(minusOneYear).add(1, "days").format("YYYYMMDD");
    const currentDate = moment(new Date()).format("YYYYMMDD");

    const lang = localStorage.getItem("lancode");

    const postObj = {
      ...(orderStatus && orderStatus !== "All" && { orderstatus: orderStatus }),
      ...(contract && { contract: contract }),
      ...(poNo && { poSearch: poNo }),
      ...(shippingCondition && { shipingCondition: shippingCondition }),
      ...(product && { material: product }),
      ...(fromDate &&
        toDate && { dateRangeFrom: dateRangeFrom, dateRangeTo: dateRangeTo }),
      ...(orderStatus === "" && shipTo === "" && plant === "" && product === "" && shippingCondition === "" && contract === "" && soNo === "" && poNo === "" && fromDate === "" && toDate === "" && { dateRangeFrom: oneYear, dateRangeTo: currentDate }),
      ...(shipTo && { shipToNumber: shipTo.toString() }),
      ...(company && { division: salesDivision(company) }),
      ...(countryCode && { countryCode: countryCode }),
      soldToNumber: localStorage.getItem("CustomerNumber"),
      ...(plant !== "" &&
        plant != undefined &&
        company === "SCCO" && { plantCode: plant }),
      ...(soNo && { soSearch: soNo }),
      ...(orderStatus && { orderstatus: orderStatus }),
      excel: "true",
      languageType: lang !== "en" ? "TH" : "EN",
    };

    const url = `/report/export/sales-order`;

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
          options={reportsCompany.companyList}
          minWidth="100%"
          showNoneOption={false}
          isDefaultOptionVisible={false}
        />
      </Grid>

      {filterState.company !== "SCCO" && (
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
        </Grid>
      )}

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

      <Grid item md={2} sm={5} xs={12} className="selctStyle">
        <Select
          name="orderStatus"
          label={t("report.orderStatus")}
          value={filterState.orderStatus}
          onChange={handleFilterChange}
          options={ORDER_STATUS_LIST}
          minWidth="100%"
          showNoneOption={false}
          optionCode="key"
          optionLabel={langCode === "th" ? "labelTh" : "label"}
          isDefaultOptionVisible={false}
        />
      </Grid>

      <Grid item md={2} sm={5} xs={12} className="selctStyle">
        <Select
          name="shippingCondition"
          label={t("report.shippingCondition")}
          value={filterState.shippingCondition}
          onChange={handleFilterChange}
          options={condition}
          minWidth="100%"
          showNoneOption={false}
          optionCode="code"
          optionLabel="label"
          isDefaultOptionVisible={false}
          isAllOption={true}
        />
      </Grid>

      <Grid item md={2} sm={5} xs={12}>
        <AutoCompleteSearch
          setSelectedValue={setSelectedValue}
          inputLabel={t("shipTo")}
          name="shipTo"
          autoSelectFn={autoSelectFn}
          resetCount={resetCount}
          OPTIONS_TO_OBJECT={SHIP_TO}
          INITIAL_VALUE={filterState.shipTo}
          variant="outlined"
        />
      </Grid>

      {filterState.company === "SCCO" && (
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
      )}

      <Grid item md={2} sm={5} xs={12}>
        <ReportDatePicker
          name="fromDate"
          label={t("report.fromDate")}
          onChange={handleFilterChange}
          value={
            typeof filterState.fromDate === "object"
              ? filterState.fromDate
              : null
          }
          maxDate={
            typeof filterState.toDate === "object" && filterState.toDate !=null && filterState.toDate !="Invalid Date"
              ? filterState.toDate
              : new Date()
          }
          minDate={
            typeof filterState.toDate === "object" && filterState.toDate !=null && filterState.toDate !="Invalid Date"
              ? onYearBack(filterState.toDate)
              : MINIMUM_DATE
          }
          style={{ width: "100%" }}
          {...(dateError === "toDate" && { error: t("report.required") })}
        />
      </Grid>
      <Grid item md={2} sm={5} xs={12}>
        <ReportDatePicker
          name="toDate"
          label={t("report.toDate")}
          value={
            typeof filterState.toDate === "object" ? filterState.toDate : null
          }
          minDate={
            typeof filterState.fromDate === "object" && filterState.fromDate !=null && filterState.fromDate !="Invalid Date"
              ? filterState.fromDate
              : MINIMUM_DATE
          }
          maxDate={
            fdate >= now ||
              onYearFarword(filterState.fromDate) === "Invalid date"
              ? new Date()
              : onYearFarword(filterState.fromDate)
          }
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
          disabled={filterState.company === ""}
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
  );
};


export default SalesReportFilter