import { reportConstants } from "../_constants";
import { reportService } from "../_services";
export const reportActions = {
    getSalesOrderReport,
    getDeliveryReport,
    getDeliveryReportConwod,
    getDeliveryReportChild,
    getCreditNoteReport,
    getTaxInvoiceReport,
    getOpenItemsReport,
    getReceiptReport,
    getIncentivePaymentReport,
    getIncentivePaymentReports,
    getCustomerStatementReport,
    getCustomerStatementReportPdf,
    getTaxInvoiceReports,
    getTaxInvoiceReportsConwood,
    getTaxInvoiceMaterial,
    getDeliveryReportMaterial,
    getSalesReportMaterial,
    getSalesAndDeliverContracts,
    getDeliveryShipmentStatus,
    getSalesOrderContracts,
    getSalesOrderMaterialList,
    getSalesOrderShipToName,
    getSalesOrderStatus,
    getSalesOrderShippingCondition,
    getDeliveryStatus,
    getDeliveryContracts,
    getDeliveryMaterialList,
    getDeliveryShipToName,
    getDeliveryShippingCondition,
    getTaxInvoiceContracts,
    resetTaxInvoiceContracts

};

function getSalesOrderReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, shippingCondition, shipToName, division, countryCode) {
    return (dispatch) => {
        dispatch(request());

        reportService.getSalesOrderReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, shippingCondition, shipToName, division, countryCode).then(
            (getSalesOrderReport) => dispatch(success(getSalesOrderReport)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesOrderReport) {
        return { type: reportConstants.GET_SALES_ORDER_REPORT_REQUEST, getSalesOrderReport };
    }
    function success(getSalesOrderReport) {
        return { type: reportConstants.GET_SALES_ORDER_REPORT_SUCCESS, getSalesOrderReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_ORDER_REPORT_FAILURE, error };
    }
}



function getDeliveryReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber, serachNumberPlant) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber, serachNumberPlant).then(
            (getDeliveryReport) => dispatch(success(getDeliveryReport)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryReport) {
        return { type: reportConstants.GET_DELIVERY_REPORT_REQUEST, getDeliveryReport };
    }
    function success(getDeliveryReport) {
        return { type: reportConstants.GET_DELIVERY_REPORT_SUCCESS, getDeliveryReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_REPORT_FAILURE, error };
    }
}

function getDeliveryReportConwod(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryReportConwod(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber).then(
            (getDeliveryReport) => dispatch(success(getDeliveryReport)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryReportConwod) {
        return { type: reportConstants.GET_DELIVERY_REPORT_CONWOOD_REQUEST, getDeliveryReportConwod };
    }
    function success(getDeliveryReportConwod) {
        return { type: reportConstants.GET_DELIVERY_REPORT_CONWOOD_SUCCESS, getDeliveryReportConwod };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_REPORT_CONWOOD_FAILURE, error };
    }
}

function getDeliveryReportChild(custmerNo, deliveryDivision, id) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryReportChild(custmerNo, deliveryDivision, id).then(
            (getDeliveryReportChild) => dispatch(success(getDeliveryReportChild)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryReportChild) {
        return { type: reportConstants.GET_DELIVERY_REPORT_CHILD_REQUEST, getDeliveryReportChild };
    }
    function success(getDeliveryReportChild) {
        return { type: reportConstants.GET_DELIVERY_REPORT_CHILD_SUCCESS, getDeliveryReportChild };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_REPORT_CHILD_FAILURE, error };
    }
}

function getTaxInvoiceReport(createCaseDetails) {
    return (dispatch) => {
        dispatch(request());

        reportService.getTaxInvoiceReport(createCaseDetails).then(
            (getTaxInvoice) => dispatch(success(getTaxInvoice)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getTaxInvoiceReport) {
        return { type: reportConstants.GET_TAX_INVOICE_REPORT_REQUEST, getTaxInvoiceReport };
    }
    function success(getTaxInvoiceReport) {
        return { type: reportConstants.GET_TAX_INVOICE_REPORT_SUCCESS, getTaxInvoiceReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_TAX_INVOICE_REPORT_FAILURE, error };
    }
}


function getCreditNoteReport(fromDate, toDate, startIndex, endIndex, search, division, statusFilter) {
    return (dispatch) => {
        dispatch(request());

        reportService.getCreditNoteReport(fromDate, toDate, startIndex, endIndex, search, division, statusFilter).then(
            (getCreditNoteReport) => dispatch(success(getCreditNoteReport)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getCreditNoteReport) {
        return { type: reportConstants.GET_CREDIT_NOTE_REPORT_REQUEST, getCreditNoteReport };
    }
    function success(getCreditNoteReport) {
        return { type: reportConstants.GET_CREDIT_NOTE_REPORT_SUCCESS, getCreditNoteReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_CREDIT_NOTE_REPORT_FAILURE, error };
    }
}


function getIncentivePaymentReports(custmerNo, incentiveReports, division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getIncentivePaymentReports(custmerNo, incentiveReports, division).then(
            (getIncentivePaymentReports) => dispatch(success(getIncentivePaymentReports)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getIncentivePaymentReports) {
        return { type: reportConstants.GET_INCENT_PAYMENT_REPORT_REQUEST, getIncentivePaymentReports };
    }
    function success(getIncentivePaymentReports) {
        return { type: reportConstants.GET_INCENT_PAYMENT_REPORT_SUCCESS, getIncentivePaymentReports };
    }
    function failure(error) {
        return { type: reportConstants.GET_INCENT_PAYMENT_REPORT_FAILURE, error };
    }
}


function getOpenItemsReport(customerCode, division, fromIndex, toIndex) {
    return (dispatch) => {
        dispatch(request());

        reportService.getOpenItemReport(customerCode, division, fromIndex, toIndex).then(
            (getOpenItemsReport) => dispatch(success(getOpenItemsReport)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getOpenItemsReport) {
        return { type: reportConstants.GET_OPEN_ITEM_REPORT_REQUEST, getOpenItemsReport };
    }
    function success(getOpenItemsReport) {
        return { type: reportConstants.GET_OPEN_ITEM_REPORT_SUCCESS, getOpenItemsReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_OPEN_ITEM_REPORT_FAILURE, error };
    }
}

function getReceiptReport(formDate, toDate, startIndex, endIndex, division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getReceiptReport(formDate, toDate, startIndex, endIndex, division).then(
            (getReceiptReport) => dispatch(success(getReceiptReport)),
            //(error) => dispatch(failure(error.toString()))
        );
    };

    function request(getReceiptReport) {
        return { type: reportConstants.GET_RECEIPT_REPORT_REQUEST, getReceiptReport };
    }
    function success(getReceiptReport) {
        return { type: reportConstants.GET_RECEIPT_REPORT_SUCCESS, getReceiptReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_RECEIPT_REPORT_FAILURE, error };
    }
}

function getIncentivePaymentReport(createCaseDetails) {
    return (dispatch) => {
        dispatch(request());

        reportService.getIncentivePaymentReport(createCaseDetails).then(
            (getIncentiveReport) => dispatch(success(getIncentiveReport)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getIncentiveReport) {
        return { type: reportConstants.GET_INCENTIVE_PAYMENT_REPORT_REQUEST, getIncentiveReport };
    }
    function success(getIncentiveReport) {
        return { type: reportConstants.GET_INCENTIVE_PAYMENT_REPORT_SUCCESS, getIncentiveReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_INCENTIVE_PAYMENT_REPORT_FAILURE, error };
    }
}


function getCustomerStatementReport(fromDate, toDate, startIndex, endIndex, division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getCustomerStatementReport(fromDate, toDate, startIndex, endIndex, division).then(
            (getCustomerStatementReport) => dispatch(success(getCustomerStatementReport)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getCustomerStatementReport) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_REPORT_REQUEST, getCustomerStatementReport };
    }
    function success(getCustomerStatementReport) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_REPORT_SUCCESS, getCustomerStatementReport };
    }
    function failure(error) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_REPORT_FAILURE, error };
    }
}

function getCustomerStatementReportPdf(fromDate, toDate, division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getCustomerStatementReportPdf(fromDate, toDate,  division).then(
            (getCustomerStatementReportPdf) => dispatch(success(getCustomerStatementReportPdf)),
            (error) => dispatch(failure(error))
        );
    };

    function request(getCustomerStatementReportPdf) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_PDF_REPORT_REQUEST, getCustomerStatementReportPdf };
    }
    function success(getCustomerStatementReportPdf) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_PDF_REPORT_SUCCESS, getCustomerStatementReportPdf };
    }
    function failure(error) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_PDF_REPORT_FAILURE, error };
    }
}



function getTaxInvoiceReports(customercode, division, fromIndex, toIndex, searchText, dateRange, dateRange2, filterType, filterDataValue) {
    return (dispatch) => {
        dispatch(request());

        reportService.getTaxInvoiceReports(customercode, division, fromIndex, toIndex, searchText, dateRange, dateRange2, filterType, filterDataValue).then(
            (getTaxInvoiceReports) => dispatch(success(getTaxInvoiceReports)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getTaxInvoiceReports) {
        return { type: reportConstants.GET_CUSTOMER_TAX_INVOICE_REPORT_REQUEST, getTaxInvoiceReports };
    }
    function success(getTaxInvoiceReports) {
        return { type: reportConstants.GET_CUSTOMER_TAX_INVOICE_REPORT_SUCCESS, getTaxInvoiceReports };
    }
    function failure(error) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_REPORT_FAILURE, error };
    }
}


function getTaxInvoiceReportsConwood(customercode, division, fromIndex, toIndex, searchText, dateRange, dateRange2, filterType, filterDataValue) {
    return (dispatch) => {
        dispatch(request());

        reportService.getTaxInvoiceReportsConwood(customercode, division, fromIndex, toIndex, searchText, dateRange, dateRange2, filterType, filterDataValue).then(
            (getTaxInvoiceReportsConwood) => dispatch(success(getTaxInvoiceReportsConwood)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getTaxInvoiceReportsConwood) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_REPORT_CONWOOD_REQUEST, getTaxInvoiceReportsConwood };
    }
    function success(getTaxInvoiceReportsConwood) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_REPORT_CONWOOD_SUCCESS, getTaxInvoiceReportsConwood };
    }
    function failure(error) {
        return { type: reportConstants.GET_CUSTOMER_STATEMENT_REPORT_CONWOOD_FAILURE, error };
    }
}





function getTaxInvoiceMaterial(division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getTaxInvoiceMaterial(division, fromDate, toDate).then(
            (getTaxInvoiceMaterial) => dispatch(success(getTaxInvoiceMaterial)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getTaxInvoiceMaterial) {
        return { type: reportConstants.GET_TAX_INVOICE_MATERIAL_REQUEST, getTaxInvoiceMaterial };
    }
    function success(getTaxInvoiceMaterial) {
        return { type: reportConstants.GET_TAX_INVOICE_MATERIAL_SUCCESS, getTaxInvoiceMaterial };
    }
    function failure(error) {
        return { type: reportConstants.GET_TAX_INVOICE_MATERIAL_FAILURE, error };
    }
}


function getTaxInvoiceContracts(division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getTaxInvoiceContracts(division, fromDate, toDate).then(
            (getTaxInvoiceContracts) => dispatch(success(getTaxInvoiceContracts)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getTaxInvoiceContracts) {
        return { type: reportConstants.GET_TAX_INVOICE_CONTRACTS_REQUEST, getTaxInvoiceContracts };
    }
    function success(getTaxInvoiceContracts) {
        return { type: reportConstants.GET_TAX_INVOICE_CONTRACTS_SUCCESS, getTaxInvoiceContracts };
    }
    function failure(error) {
        return { type: reportConstants.GET_TAX_INVOICE_CONTRACTS_FAILURE, error };
    }
}


function salesOrderReportExport(division) {
    return (dispatch) => {
        dispatch(request());

        reportService.salesOrderReportExport(division).then(
            (getSalesReportExportFile) => dispatch(success(getSalesReportExportFile)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesReportExportFile) {
        return { type: reportConstants.SALES_ORDER_REPORT_EXPORT_REQUEST, getSalesReportExportFile };
    }
    function success(getSalesReportExportFile) {
        return { type: reportConstants.SALES_ORDER_REPORT_EXPORT_SUCCESS, getSalesReportExportFile };
    }
    function failure(error) {
        return { type: reportConstants.SALES_ORDER_REPORT_EXPORT_FAILURE, error };
    }
}



function deliveryReportExport(division) {
    return (dispatch) => {
        dispatch(request());

        reportService.deliveryReportExport(division).then(
            (getDeliveryReportExportFile) => dispatch(success(getDeliveryReportExportFile)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryReportExportFile) {
        return { type: reportConstants.DELIVERY_REPORT_EXPORT_REQUEST, getDeliveryReportExportFile };
    }
    function success(getDeliveryReportExportFile) {
        return { type: reportConstants.DELIVERY_REPORT_EXPORT_SUCCESS, getDeliveryReportExportFile };
    }
    function failure(error) {
        return { type: reportConstants.DELIVERY_REPORT_EXPORT_FAILURE, error };
    }
}

function getDeliveryReportMaterial(division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getOrderReportsMaterial(division).then(
            (getDeliveryReportMaterials) => dispatch(success(getDeliveryReportMaterials)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryReportMaterials) {
        return { type: reportConstants.GET_DELIVERY_REPORT_MATERIALMATERIAL_REQUEST, getDeliveryReportMaterials };
    }
    function success(getDeliveryReportMaterials) {
        return { type: reportConstants.GET_DELIVERY_REPORT_MATERIALMATERIAL_SUCCESS, getDeliveryReportMaterials };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_REPORT_MATERIALMATERIAL_FAILURE, error };
    }
}

function getSalesReportMaterial(division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getOrderReportsMaterial(division).then(
            (getSalesReportMaterials) => dispatch(success(getSalesReportMaterials)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesReportMaterials) {
        return { type: reportConstants.GET_SALES_REPORT_MATERIALMATERIAL_REQUEST, getSalesReportMaterials };
    }
    function success(getSalesReportMaterials) {
        return { type: reportConstants.GET_SALES_REPORT_MATERIALMATERIAL_SUCCESS, getSalesReportMaterials };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_REPORT_MATERIALMATERIAL_FAILURE, error };
    }
}

function getSalesAndDeliverContracts(division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getSalesAndDeliverContracts(division).then(
            (getSalesAndDeliveryContracts) => dispatch(success(getSalesAndDeliveryContracts)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesAndDeliveryContracts) {
        return { type: reportConstants.GET_SALES_AND_DELIVERY_CONTRACTS_REQUEST, getSalesAndDeliveryContracts };
    }
    function success(getSalesAndDeliveryContracts) {
        return { type: reportConstants.GET_SALES_AND_DELIVERY_CONTRACTS_SUCCESS, getSalesAndDeliveryContracts };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_AND_DELIVERY_CONTRACTS_FAILURE, error };
    }
}


function getDeliveryShipmentStatus(countryCode) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryShipmentStatus(countryCode).then(
            (getDeliveryShipmentStatus) => dispatch(success(getDeliveryShipmentStatus)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryShipmentStatus) {
        return { type: reportConstants.GET_DELIVERY_REPORT_SHIPMENT_STATUS_REQUEST, getDeliveryShipmentStatus };
    }
    function success(getDeliveryShipmentStatus) {
        return { type: reportConstants.GET_DELIVERY_REPORT_SHIPMENT_STATUS_SUCCESS, getDeliveryShipmentStatus };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_REPORT_SHIPMENT_STATUS_FAILURE, error };
    }
}


function getSalesOrderStatus(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getSalesOrderStatus(countryCode, division, fromDate, toDate).then(
            (getSalesOrderStatus) => dispatch(success(getSalesOrderStatus)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesOrderStatus) {
        return { type: reportConstants.GET_SALES_ORDER_STATUS_REQUEST, getSalesOrderStatus };
    }
    function success(getSalesOrderStatus) {
        return { type: reportConstants.GET_SALES_ORDER_STATUS_SUCCESS, getSalesOrderStatus };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_ORDER_STATUS_FAILURE, error };
    }
}


function getSalesOrderShippingCondition(countryCode, division,  fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getSalesOrderShippingCondition(countryCode, division, fromDate, toDate).then(
            (getSalesOrderShippingCondition) => dispatch(success(getSalesOrderShippingCondition)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesOrderShippingCondition) {
        return { type: reportConstants.GET_SALES_ORDER_SHIPPING_CONDITION_REQUEST, getSalesOrderShippingCondition };
    }
    function success(getSalesOrderShippingCondition) {
        return { type: reportConstants.GET_SALES_ORDER_SHIPPING_CONDITION_SUCCESS, getSalesOrderShippingCondition };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_ORDER_SHIPPING_CONDITION_FAILURE, error };
    }
}

function getSalesOrderMaterialList(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getSalesOrderMaterialList(countryCode, division, fromDate, toDate).then(
            (getSalesOrderMaterialList) => dispatch(success(getSalesOrderMaterialList)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesOrderMaterialList) {
        return { type: reportConstants.GET_SALES_ORDER_MATERIAL_REQUEST, getSalesOrderMaterialList };
    }
    function success(getSalesOrderMaterialList) {
        return { type: reportConstants.GET_SALES_ORDER_MATERIAL_SUCCESS, getSalesOrderMaterialList };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_ORDER_MATERIAL_FAILURE, error };
    }
}

function getSalesOrderShipToName(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getSalesOrderShipToName(countryCode, division, fromDate, toDate).then(
            (getSalesOrderShipToName) => dispatch(success(getSalesOrderShipToName)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesOrderShipToName) {
        return { type: reportConstants.GET_SALES_ORDER_SHIP_TO_NAME_REQUEST, getSalesOrderShipToName };
    }
    function success(getSalesOrderShipToName) {
        return { type: reportConstants.GET_SALES_ORDER_SHIP_TO_NAME_SUCCESS, getSalesOrderShipToName };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_ORDER_SHIP_TO_NAME_FAILURE, error };
    }
}

function getSalesOrderContracts(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getSalesOrderContracts(countryCode, division, fromDate, toDate).then(
            (getSalesOrderContracts) => dispatch(success(getSalesOrderContracts)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getSalesOrderContracts) {
        return { type: reportConstants.GET_SALES_ORDER_CONTRACT_REQUEST, getSalesOrderContracts };
    }
    function success(getSalesOrderContracts) {
        return { type: reportConstants.GET_SALES_ORDER_CONTRACT_SUCCESS, getSalesOrderContracts };
    }
    function failure(error) {
        return { type: reportConstants.GET_SALES_ORDER_CONTRACT_FAILURE, error };
    }
}


function getDeliveryStatus(countryCode, division) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryStatus(countryCode, division).then(
            (getDeliveryStatus) => dispatch(success(getDeliveryStatus)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryStatus) {
        return { type: reportConstants.GET_DELIVERY_STATUS_REQUEST, getDeliveryStatus };
    }
    function success(getDeliveryStatus) {
        return { type: reportConstants.GET_DELIVERY_STATUS_SUCCESS, getDeliveryStatus };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_STATUS_FAILURE, error };
    }
}


function getDeliveryShippingCondition(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryShippingCondition(countryCode, division, fromDate, toDate).then(
            (getDeliveryShippingCondition) => dispatch(success(getDeliveryShippingCondition)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryShippingCondition) {
        return { type: reportConstants.GET_DELIVERY_SHIPPING_CONDITION_REQUEST, getDeliveryShippingCondition };
    }
    function success(getDeliveryShippingCondition) {
        return { type: reportConstants.GET_DELIVERY_SHIPPING_CONDITION_SUCCESS, getDeliveryShippingCondition };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_SHIPPING_CONDITION_FAILURE, error };
    }
}

function getDeliveryMaterialList(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryMaterialList(countryCode, division, fromDate, toDate).then(
            (getDeliveryMaterialList) => dispatch(success(getDeliveryMaterialList)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryMaterialList) {
        return { type: reportConstants.GET_DELIVERY_MATERIAL_REQUEST, getDeliveryMaterialList };
    }
    function success(getDeliveryMaterialList) {
        return { type: reportConstants.GET_DELIVERY_MATERIAL_SUCCESS, getDeliveryMaterialList };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_MATERIAL_FAILURE, error };
    }
}

function getDeliveryShipToName(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryShipToName(countryCode, division, fromDate, toDate).then(
            (getDeliveryShipToName) => dispatch(success(getDeliveryShipToName)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryShipToName) {
        return { type: reportConstants.GET_DELIVERY_SHIP_TO_NAME_REQUEST, getDeliveryShipToName };
    }
    function success(getDeliveryShipToName) {
        return { type: reportConstants.GET_DELIVERY_SHIP_TO_NAME_SUCCESS, getDeliveryShipToName };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_SHIP_TO_NAME_FAILURE, error };
    }
}

function getDeliveryContracts(countryCode, division, fromDate, toDate) {
    return (dispatch) => {
        dispatch(request());

        reportService.getDeliveryContracts(countryCode, division, fromDate, toDate).then(
            (getDeliveryContracts) => dispatch(success(getDeliveryContracts)),
            (error) => dispatch(failure(error.toString()))
        );
    };

    function request(getDeliveryContracts) {
        return { type: reportConstants.GET_DELIVERY_CONTRACT_REQUEST, getDeliveryContracts };
    }
    function success(getDeliveryContracts) {
        return { type: reportConstants.GET_DELIVERY_CONTRACT_SUCCESS, getDeliveryContracts };
    }
    function failure(error) {
        return { type: reportConstants.GET_DELIVERY_CONTRACT_FAILURE, error };
    }
}


function resetTaxInvoiceContracts() {
    return (dispatch) => {
        dispatch(reset());

    };
    function reset() {
        return { type: reportConstants.GET_TAX_INVOICE_CONTRACTS_RESET };
    }
}