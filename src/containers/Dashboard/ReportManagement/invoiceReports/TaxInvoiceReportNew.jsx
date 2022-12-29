import 'moment-timezone';
import React, { useState, useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import Header from "../../../../components/Header/Header";
import 'moment-timezone'
import InvoiceReportFilters from './InvoiceReportFilters';
import InvoiceReportDataGrid from './InvoiceReportDataGrid';
import InvoiceReportDataGridconwood from './InvoiceReportDataGridconwood';
import InvoiceReportDataGridscco from './InvoiceReportDataGridscco';
import Loading from '../../../../components/Loader/Loading';

import {
  getCompany,
  contarctDropdown,
  shippingConditionDropdown,
  shipToNameDropdown,
  plantNameDropdown,
  salesStatusDropdown,
  orderMaterialDropdown,
  invoiceReportsApiCall,
  invoiceReportsApiCallConwood
} from "../../../../_services";

const INITIAL_FILTER_STATE = {
  "company": "SCCC",
  "contract": "",
  "product": "",
  "taxInvoiceNumber": "",
  "doNo": "",
  "poNo": "",
  "soNo": "",
  "invoiceFromDate": "",
  "invoiceToDate": "",
  "shipTo": "",
  "plant": ""
}


function TaxInvoiceReportNew() {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [resetCount, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [dateError, setDateError] = useState("");

  const invoiceReports = useSelector((state) => state.invoiceReports)

  const reportRes = useSelector((state) => state.reports);

  function isLoadingCheck(reportRes) {
    const { companyLoading, contractLoading, productLoading, shippingConditionLoading, shipToLoading } = reportRes
    return companyLoading || contractLoading || productLoading || shippingConditionLoading || shipToLoading;
  }

  const filterReports = () => {
    if (filterState.invoiceFromDate !== "" && filterState.invoiceToDate === "") {
      setDateError("invoiceFromDate")
      return 0;
    }
    if (filterState.invoiceFromDate === "" && filterState.invoiceToDate !== "") {
      setDateError("invoiceToDate")
      return 0;
    }

    if (filterState.company === "Conwood") {
      dispatch(invoiceReportsApiCallConwood(filterState, 1, pageSize))
    } else {
      dispatch(invoiceReportsApiCall(filterState, 1, pageSize))
    }
  }

  const clearAll = () => {
    setCount(resetCount + 1)
    setFilterState(INITIAL_FILTER_STATE);
    dispatch({ type: "INVOICE_REPORTS_LIST", payload: [] });
    setPageSize(20)
    setDateError("")
  }

  const handlePagination = (rowCount, pageNumber) => {

    const startCount = (rowCount * pageNumber) + 1;
    const endCount = rowCount * (pageNumber + 1)
    if (filterState.company === "Conwood") {
      dispatch(invoiceReportsApiCallConwood(filterState, startCount, endCount))
    } else {
      dispatch(invoiceReportsApiCall(filterState, startCount, endCount))
    }
  }

  useEffect(() => {
    dispatch(getCompany())
    dispatch(contarctDropdown("CM", "taxInvoice"))
    dispatch(shippingConditionDropdown())
    dispatch(shipToNameDropdown("CM", "taxInvoice"))
    dispatch(orderMaterialDropdown("CM", "taxInvoice"))
    dispatch(plantNameDropdown())
    dispatch(salesStatusDropdown())
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: "INVOICE_REPORTS_LIST", payload: [] })
    }
  }, [])

  const totalAmount = invoiceReports?.invoiceReportData?.totalAmount ? invoiceReports.invoiceReportData.totalAmount : "000"


  const [rowCount, setRowCount] = useState(100);
  const getRowCount = invoiceReports?.invoiceReportData?.totalCount ?? 0;

  useEffect(() => {
    setRowCount(invoiceReports?.invoiceReportData?.totalCount ?? 0)
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
      <Header title={t("tax_invoice.lable")} />
      <div className={"row ipad_css "}>
        <div className="mainScroll">
          <div className="reports-landing-container">
            <InvoiceReportFilters
              setFilterState={setFilterState}
              filterState={filterState}
              filterReports={filterReports}
              clearAll={clearAll}
              resetCount={resetCount}
              INITIAL_FILTER_STATE={INITIAL_FILTER_STATE}
              setDateError={setDateError}
              dateError={dateError}
            />
            {filterState.company === "SCCC" &&
              <InvoiceReportDataGrid
                rows={Array.isArray(invoiceReports.invoiceReportData?.results) ? invoiceReports.invoiceReportData?.results : []}
                filterState={filterState}
                setIsLoading={setIsLoading}
                totalAmount={totalAmount}
                handlePagination={handlePagination}
                rowCount={rowCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
                loading={invoiceReports.isLoading}
              />
            }
            {filterState.company === "SCCO" &&
              <InvoiceReportDataGridscco rows={Array.isArray(invoiceReports.invoiceReportData?.results) ? invoiceReports.invoiceReportData?.results : []}
                filterState={filterState}
                setIsLoading={setIsLoading}
                totalAmount={totalAmount}
                handlePagination={handlePagination}
                rowCount={rowCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
                loading={invoiceReports.isLoading}
              />
            }
            {filterState.company === "Conwood" &&
              <InvoiceReportDataGridconwood
                rows={Array.isArray(invoiceReports.invoiceReportData?.results) ? invoiceReports.invoiceReportData?.results : []}
                filterState={filterState}
                setIsLoading={setIsLoading}
                totalAmount={totalAmount}
                handlePagination={handlePagination}
                rowCount={rowCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
                loading={invoiceReports.isLoading}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(TaxInvoiceReportNew);
