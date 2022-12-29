import { alertConstants } from '../_constants';

const initialState = {
    isLoading: false,
    companyList: [],
    contractDeopdownList: [],
    shippingConditionDropdownList: [],
    shipToNmeDropdownList: [],
    plantNameDropdownList: [],
    salseOrderStatusDropdownList: [],
    orderMaterialDropdownList: [],
    companyLoading: false,
    contractLoading: false,
    productLoading: false,
    shippingConditionLoading: false,
    shipToLoading: false,
    plantLoading: false,
    creditStatusLoading:false
}

export function reportsCompany(state = { companyList: [] }, action) {
    switch (action.type) {
        case "COMPANY_LIST":
            return { ...state, companyList: action.payload }
        default:
            return state
    }
}


export function reports(state = initialState, action) {
    switch (action.type) {
        case "COMPANY_LIST":
            return { ...state, companyList: action.payload }
        case "CONTRACT_DROPDOWN_LIST":
            return { ...state, contractDeopdownList: action.payload }
        case "SHIPPING_CONDITION_DROPDOWN_LIST":
            return { ...state, shippingConditionDropdownList: action.payload }
        case "SHIP_TO_NAME_DROPDOWN_LIST":
            return { ...state, shipToNmeDropdownList: action.payload }
        case "PLANT_NAME_DROPDOWN_LIST":
            return { ...state, plantNameDropdownList: action.payload }
        case "SALES_ORDER_STATUS_DROPDOWN_LIST":
            return { ...state, salseOrderStatusDropdownList: action.payload }
        case "ORDER_MATERIAL_DROPDOWN_LIST":
            return { ...state, orderMaterialDropdownList: action.payload }
        case "COMPANY_LOADING":
            return { ...state, companyLoading: action.payload }
        case "CONTRACT_LOADING":
            return { ...state, contractLoading: action.payload }
        case "PRODUCT_LOADING":
            return { ...state, productLoading: action.payload }
        case "SHIPPING_CONDITION_LOADING":
            return { ...state, shippingConditionLoading: action.payload }
        case "SHIPTO_LOADING":
            return { ...state, shipToLoading: action.payload }
        case "PLANT_LOADING":
            return { ...state, plantLoading: action.payload }
        case "CREDIT_STATUS_LOADING":
            return { ...state, creditStatusLoading: action.payload }
        default:
            return state
    }
}

const salesReportState = {
    isLoading: false,
    companyList: [],
    contractDeopdownList: [],
    shippingConditionDropdownList: [],
    shipToNmeDropdownList: [],
    plantNameDropdownList: [],
    salseOrderStatusDropdownList: [],
    orderMaterialDropdownList: [],
    salesReportList: [],
    soList: [],
    poList: [],
    plantList: []
}

export function salesReports(state = salesReportState, action) {
    switch (action.type) {
        case "IS_SALES_LOADING":
            return { ...state, isLoading: action.payload }
        case "SALES_REPORTS_LIST":
            return { ...state, salesReportList: action.payload }
        case "COMPANY_LIST":
            return { ...state, companyList: action.payload }
        case "SO_SEARCH_LIST":
            return { ...state, soList: action.payload }
        case "PO_SEARCH_LIST":
            return { ...state, poList: action.payload }
        case "PLANT_SEARCH_LIST":
            return { ...state, plantList: action.payload }
        case "CONTRACT_DROPDOWN_LIST":
            return { ...state, contractDeopdownList: action.payload }
        case "SHIPPING_CONDITION_DROPDOWN_LIST":
            return { ...state, shippingConditionDropdownList: action.payload }
        case "SHIP_TO_NAME_DROPDOWN_LIST":
            return { ...state, shipToNmeDropdownList: action.payload }
        case "PLANT_NAME_DROPDOWN_LIST":
            return { ...state, plantNameDropdownList: action.payload }
        case "SALES_ORDER_STATUS_DROPDOWN_LIST":
            return { ...state, salseOrderStatusDropdownList: action.payload }
        case "ORDER_MATERIAL_DROPDOWN_LIST":
            return { ...state, orderMaterialDropdownList: action.payload }
        default:
            return state
    }
}


// Credit reports
const creditState = {
    creditNoteStatus: [],
    creditNoteList: []
}

export function creditReports(state = creditState, action) {
    switch (action.type) {
        case "CREDIT_STATUS":
            return { ...state, creditNoteStatus: action.payload }
        case "CREDIT_NOTE_LIST":
            return { ...state, creditNoteList: action.payload }
        default:
            return state
    }
}

// Receipt Reports

const receiptState = {
    isLoading: false,
    receiptReport: null,
    message: ""
}

export function receiptReports(state = receiptState, action) {
    switch (action.type) {
        case "RECEIPT_REPORTS":
            return { ...state, receiptReport: action.payload }
        case "RECEIPT_REPORTS_MESSAGE":
            return { ...state, message: action.payload }
        case "IS_SALES_LOADING":
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}


// ============================   Delivery Report List ============================

const deliveryReportState = {
    isLoading: false,
    companyList: [],
    contractDeopdownList: [],
    deliveryMaterialDropdownList: [],
    doList: [],
    soList: [],
    poList: [],
    ticketNoList: [],
    preDoNo: [],
    deliveryshippingConditionDropdownList: [],
    deliveryshippingConditionCWDropdownList: [],
    deliveryShipmentNumber: [],
    deliveryShipmentStatusDropdownList: [],
    shipToNameDropdownList: [],
    deliveryReport: null,
    deliveryTicketNumber: [],
    plantNameDropdownList: [],
}

export function deliveryReports(state = deliveryReportState, action) {
    switch (action.type) {
        case "IS_DELIVERY_LOADING":
            return { ...state, isLoading: action.payload }
        case "COMPANY_LIST":
            return { ...state, companyList: action.payload }
        case "CONTRACT_DROPDOWN_LIST":
            return { ...state, contractDeopdownList: action.payload }
        case "DELIVERY_MATERIAL_DROPDOWN_LIST":
            return { ...state, deliveryMaterialDropdownList: action.payload }
        case "DO_SEARCH_LIST":
            return { ...state, doList: action.payload }
        case "SO_SEARCH_LIST":
            return { ...state, soList: action.payload }
        case "PO_SEARCH_LIST":
            return { ...state, poList: action.payload }
        case "TICKET_SEARCH_LIST":
            return { ...state, ticketNoList: action.payload }
        case "PRE_DO_SEARCH_LIST":
            return { ...state, preDoNo: action.payload }
        case "DELIVERY_SHIPPING_CONDITION_DROPDOWN_LIST":
            return { ...state, deliveryshippingConditionDropdownList: action.payload }
        case "DELIVERY_SHIPPING_CONDITION_CW_DROPDOWN_LIST":
            return { ...state, deliveryshippingConditionCWDropdownList: action.payload }
        case "DELIVERY_SHIPMENT_NUMBER_DROPDOWN_LIST":
            return { ...state, deliveryShipmentNumber: action.payload }
        case "DELIVERY_SHIPMENT_STATUS_DROPDOWN_LIST":
            return { ...state, deliveryShipmentStatusDropdownList: action.payload }
        case "SHIP_TO_NAME_DROPDOWN_LIST":
            return { ...state, shipToNameDropdownList: action.payload }
        case "DELIVERY_REPORTS_LIST":
            return { ...state, deliveryReport: action.payload }
        case "PLANT_NAME_DROPDOWN_LIST":
            return { ...state, plantNameDropdownList: action.payload }
        case "DELIVERY_TICKET_DROPDOWN_LIST":
            return { ...state, deliveryTicketNumber: action.payload }
        default:
            return state
    }
}




// ============================   Invoice Report List ============================

const invoiceReportState = {
    isLoading: false,
    companyList: [],
    contractDeopdownList: [],
    invoiceMaterialDropdownList: [],
    doList: [],
    soList: [],
    poList: [],
    preDoNo: [],
    deliveryshippingConditionDropdownList: [],
    taxInvoiceNumber: [],
    deliveryShipmentStatusDropdownList: [],
    shipToNameDropdownList: [],
    invoiceReportData: null,
    deliveryTicketNumber: [],
    plantNameDropdownList: [],
}

export function invoiceReports(state = invoiceReportState, action) {
    switch (action.type) {
        case "IS_SALES_LOADING":
            return { ...state, isLoading: action.payload }
        case "COMPANY_LIST":
            return { ...state, companyList: action.payload }
        case "CONTRACT_DROPDOWN_LIST":
            return { ...state, contractDeopdownList: action.payload }
        case "INVOICE_MATERIAL_DROPDOWN_LIST":
            return { ...state, invoiceMaterialDropdownList: action.payload }
        case "DO_SEARCH_LIST":
            return { ...state, doList: action.payload }
        case "SO_SEARCH_LIST":
            return { ...state, soList: action.payload }
        case "PO_SEARCH_LIST":
            return { ...state, poList: action.payload }
        case "PRE_DO_SEARCH_LIST":
            return { ...state, preDoNo: action.payload }
        case "INVOICE_SEARCH_LIST":
            return { ...state, taxInvoiceNumber: action.payload }
        case "DELIVERY_SHIPPING_CONDITION_DROPDOWN_LIST":
            return { ...state, deliveryshippingConditionDropdownList: action.payload }

        case "DELIVERY_SHIPMENT_STATUS_DROPDOWN_LIST":
            return { ...state, deliveryShipmentStatusDropdownList: action.payload }
        case "SHIP_TO_NAME_DROPDOWN_LIST":
            return { ...state, shipToNameDropdownList: action.payload }
        case "INVOICE_REPORTS_LIST":
            return { ...state, invoiceReportData: action.payload }
        case "PLANT_NAME_DROPDOWN_LIST":
            return { ...state, plantNameDropdownList: action.payload }
        case "DELIVERY_TICKET_DROPDOWN_LIST":
            return { ...state, deliveryTicketNumber: action.payload }
        default:
            return state
    }
}