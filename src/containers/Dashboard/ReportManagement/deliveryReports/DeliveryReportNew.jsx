import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import 'moment-timezone';
import DeliveryReportDataGrid from "./DeliveryReportDataGrid";
import DeliveryReportDataGridSCCO from "./DeliveryReportDataGridSCCO";
import DeliveryReportDataGridWOOD from "./DeliveryReportDataGridWOOD";
import DeliveryReportFilter from "./DeliveryReportFilter";
import DeliveryReportFilterSCCO from "./DeliveryReportFilterSCCO";
import DeliveryReportFilterWood from "./DeliveryReportFilterWood";
import Loading from '../../../../components/Loader/Loading';

import {
  getCompany,
  contarctDropdown,
  shippingConditionDropdown,
  shipToNameDropdown,
  salesStatusDropdown,
  orderMaterialDropdown,
  shipmentStatusDropdown,
  deliveryReportsListSCCC,
  deliveryReportsListSCCO,
  deliveryReportsListConwood
} from "../../../../_services";


const INITIAL_FILTER_STATE = {
  "company": "SCCC",
  "contractNo": "",
  "productName": "",
  "productCode": "",
  "doNo": "",
  "poNo": "",
  "soNo": "",
  "preDoNo": "",
  "product": "",
  "orderStatus": "",
  "shippingCondition": "",
  "shipmentStatus": "",
  "shipmentNo": "",
  "shipTo": "",
  "plant": "",
  "ticketNo": "",
  "weightOutDateFrom": "",
  "weightOutDateTo": "",
  "deliveryDateFrom": "",
  "deliveryDateTo": "",
  "departureDateFrom": "",
  "departureDateTo": "",
  "fromDate": "",
  "toDate": ""
}


function DeliveryReportNew(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [resetCount, setCount] = useState(0);
  const deliveryReports = useSelector((state) => state.deliveryReports)
  const [pageSize, setPageSize] = useState(20);
  const [dateError, setDateError] = useState("");
  const [dateErrorD, setDateErrorD] = useState("");
  const reportRes = useSelector((state) => state.reports);

  function isLoadingCheck(reportRes) {
    return reportRes.companyLoading || reportRes.contractLoading || reportRes.productLoading || reportRes.shippingConditionLoading || reportRes.shipToLoading;
  }



  const filterReports = () => {

    // Api Call for SCCC
    if (filterState.company === "SCCC") {
      if (filterState.weightOutDateFrom !== "" && filterState.weightOutDateTo === "") {
        setDateError("weightOutDateFrom")
        return 0;
      }
      if (filterState.weightOutDateFrom === "" && filterState.weightOutDateTo !== "") {
        setDateError("weightOutDateTo")
        return 0;
      }
      dispatch(deliveryReportsListSCCC(filterState, 1, pageSize))
    }

    // Api Call for SCCO
    if (filterState.company === "SCCO") {
      if (filterState.deliveryDateFrom !== "" && filterState.deliveryDateTo === "") {
        setDateError("deliveryDateFrom")
        return 0;
      }
      if (filterState.deliveryDateFrom === "" && filterState.deliveryDateTo !== "") {
        setDateError("deliveryDateTo")
        return 0;
      }

      if (filterState.departureDateFrom !== "" && filterState.departureDateTo === "") {
        setDateErrorD("departureDateFrom")
        return 0;
      }
      if (filterState.departureDateFrom === "" && filterState.departureDateTo !== "") {
        setDateErrorD("departureDateTo")
        return 0;
      }

      dispatch(deliveryReportsListSCCO(filterState, 1, pageSize))
    }

    // Api Call for Conwood
    if (filterState.company === "Conwood") {
      if (filterState.weightOutDateFrom !== "" && filterState.weightOutDateTo === "") {
        setDateError("weightOutDateFrom")
        return 0;
      }
      if (filterState.weightOutDateFrom === "" && filterState.weightOutDateTo !== "") {
        setDateError("weightOutDateTo")
        return 0;
      }
      dispatch(deliveryReportsListConwood(filterState, 1, pageSize))
    }

  }

  const clearAll = () => {
    setCount(resetCount + 1)
    setFilterState(INITIAL_FILTER_STATE);
    dispatch({ type: "DELIVERY_REPORTS_LIST", payload: null })
    setPageSize(20)
    setDateError("")
    setDateErrorD("")
  }

  const handlePagination = (rowCount, pageNumber) => {
    const startCount = (rowCount * pageNumber) + 1;
    const endCount = rowCount * (pageNumber + 1)

    if (filterState.company === "SCCC") {
      dispatch(deliveryReportsListSCCC(filterState, startCount, endCount))
    }
    if (filterState.company === "SCCO") {
      dispatch(deliveryReportsListSCCO(filterState, startCount, endCount))
    }
    if (filterState.company === "Conwood") {
      dispatch(deliveryReportsListConwood(filterState, startCount, endCount))
    }
  }

  const langCode = localStorage.getItem("lancode")

  useEffect(() => {
    dispatch(getCompany())
    dispatch(contarctDropdown("CM", "deliveryReport"))
    dispatch(shippingConditionDropdown())
    dispatch(shipToNameDropdown("CM","deliveryReport"))
    dispatch(orderMaterialDropdown("CM", "deliveryReport"))
    dispatch(salesStatusDropdown())
    dispatch(shipmentStatusDropdown())
  }, [langCode])

  useEffect(() => {
    return () => {
      dispatch({ type: "DELIVERY_REPORTS_LIST", payload: null })
    }
  }, [])


  const [rowCount, setRowCount] = useState(0);

  const getRowCount = deliveryReports?.deliveryReport?.totalCount ?? 0;

  useEffect(() => {
    setRowCount(deliveryReports?.deliveryReport?.totalCount)
  }, [getRowCount])

  return (
    <div className="content-wrapper">
      {
        isLoadingCheck(reportRes) &&
        <div className="firstLoading">
          <div className="progressLoding">
            <Loading />
          </div>
        </div>
      }
      <Header title={t("delivery_report.lable")} />
      <div className={"row ipad_css "}>
        <div className="mainScroll">
          <div className="reports-landing-container">
            {filterState.company === "SCCC" &&
              <>
                <DeliveryReportFilter
                  setFilterState={setFilterState}
                  filterState={filterState}
                  filterReports={filterReports}
                  clearAll={clearAll}
                  resetCount={resetCount}
                  INITIAL_FILTER_STATE={INITIAL_FILTER_STATE}
                  setDateError={setDateError}
                  dateError={dateError}
                />
                <DeliveryReportDataGrid
                  rows={deliveryReports.deliveryReport?.results}
                  filterState={filterState}
                  setIsLoading={setIsLoading}
                  handlePagination={handlePagination}
                  rowCount={rowCount}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  addQuantity={deliveryReports?.deliveryReport?.orderQty}
                  loading={deliveryReports.isLoading}
                />
              </>
            }

            {filterState.company === "SCCO" &&
              <>
                <DeliveryReportFilterSCCO
                  setFilterState={setFilterState}
                  filterState={filterState}
                  filterReports={filterReports}
                  clearAll={clearAll}
                  resetCount={resetCount}
                  INITIAL_FILTER_STATE={INITIAL_FILTER_STATE}
                  setDateError={setDateError}
                  dateError={dateError}
                  setDateErrorD={setDateErrorD}
                  dateErrorD={dateErrorD}
                />
                <DeliveryReportDataGridSCCO
                  rows={deliveryReports.deliveryReport?.results}
                  filterState={filterState}
                  setIsLoading={setIsLoading}
                  handlePagination={handlePagination}
                  rowCount={rowCount}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  loading={deliveryReports.isLoading}
                  addQuantity={deliveryReports?.deliveryReport?.orderQty}
                />
              </>
            }

            {filterState.company === "Conwood" &&
              <>
                <DeliveryReportFilterWood
                  setFilterState={setFilterState}
                  filterState={filterState}
                  filterReports={filterReports}
                  clearAll={clearAll}
                  resetCount={resetCount}
                  INITIAL_FILTER_STATE={INITIAL_FILTER_STATE}
                  setDateError={setDateError}
                  dateError={dateError}
                />
                <DeliveryReportDataGridWOOD
                  rows={Array.isArray(deliveryReports.deliveryReport?.results) ? deliveryReports.deliveryReport?.results : []}
                  filterState={filterState}
                  setIsLoading={setIsLoading}
                  handlePagination={handlePagination}
                  rowCount={rowCount}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  loading={deliveryReports.isLoading}
                  addQuantity={deliveryReports?.deliveryReport?.orderQty}
                />
              </>
            }

          </div>
        </div>
      </div>

    </div>
  );
}

export default withTranslation()(DeliveryReportNew);
