
import moment from 'moment';
import Axios from 'axios';
import { sortingDateFormatter } from '../_constant';
//import {process.env.REACT_APP_API_URL_CASE,  process.env.REACT_APP_API_URL_CONFIRMPAYMENT,  process.env.REACT_APP_API_URL_DMS,  process.env.REACT_APP_API_URL_ORDER,  process.env.REACT_APP_API_URL_PAYMENTOFFLINE,  process.env.REACT_APP_MASTER_API_URL,  process.env.REACT_APP_API_URL_RS } from "../constant/index";

export const reportService = {
  getSalesOrderReport,
  getDeliveryReport,
  getDeliveryReportChild,
  getTaxInvoiceReport,
  getCreditNoteReport,
  getOpenItemReport,
  getReceiptReport,
  getIncentivePaymentReport,
  getIncentivePaymentReports,
  getCustomerStatementReport,
  exportOpenItemReport,
  salesOrderReportExport,
  getTaxInvoiceReports,
  getTaxInvoiceReportsConwood,
  getTaxInvoiceMaterial,
  getOrderReportsMaterial,
  getDeliveryReportsMaterial,
  getSalesAndDeliverContracts,
  getDeliveryShipmentStatus,
  getSalesOrderStatus,
  getSalesOrderShipToName,
  getSalesOrderShippingCondition,
  getSalesOrderContracts,
  getSalesOrderMaterialList,
  getDeliveryStatus,
  getDeliveryMaterialList,
  getDeliveryShippingCondition,
  getDeliveryShipToName,
  getDeliveryContracts,
  getTaxInvoiceContracts,
  getDeliveryReportConwod,
  getCustomerStatementReportPdf
};

const customerId = localStorage.getItem('CustomerNumber')



function userInfo() {
  return JSON.parse(localStorage.getItem('userData'));
}


const countryCode = 'TH';

// New Services for reports
export function getCompany() {
  return (dispatch) => {
    dispatch({ type: "COMPANY_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_MASTER_API_URL + `/retailer/reportCompanies`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      // .then((res) => res.json())
      .then(async (response) => {
        dispatch({ type: "COMPANY_LIST", payload: response.data.data })
        dispatch({ type: "COMPANY_LOADING", payload: false })
      }).catch((ee) => {
        dispatch({ type: "COMPANY_LOADING", payload: false })
      })
  };
}

// downloadTaxReport

export function downloadTaxReport(invoiceNo, company) {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber')
    const appUrl = `/report/downloadTaxInvoiceReport?customercode=${customerCode}&inv=${invoiceNo}`
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + appUrl,
      responseType: 'arraybuffer',
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {

        var link = document.createElement('a');
        const file = new Blob([response.data], { type: 'application/pdf' });
        // const fileURL = await URL.createObjectURL(file);
        link.href = window.URL.createObjectURL(file);
        link.download = `TaxInvoices_${company}_${invoiceNo}` + ".pdf";
        link.click();
        // setIsLoadingDownload(false)
        return response.data;

      })
  };
}

// Salse order report filters


export function contarctDropdown(division = "CM", reportName) {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber');
    const apiUrl = `/report/contract-dropdown?countryCode=TH&soldToNumber=${customerCode}&division=${division}&reportType=${reportName}`;
    dispatch({ type: "CONTRACT_DROPDOWN_LIST", payload: [] })
    dispatch({ type: "CONTRACT_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + apiUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const contract = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return ({
            ...item,
            value: item.contractNumber,
            label: item.contractDesc
          })
        })
        dispatch({ type: "CONTRACT_DROPDOWN_LIST", payload: contract })
        dispatch({ type: "CONTRACT_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "CONTRACT_LOADING", payload: false })
      })
  };
}


export function shipmentStatusDropdown() {
  return (dispatch) => {
    dispatch({ type: "DELIVERY_SHIPMENT_STATUS_DROPDOWN_LIST", payload: [] })
    const langCode = localStorage.getItem('lancode');
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + "/report/getShipmentStatusDropDown",
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let contract = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return ({
            ...item,
            label: langCode === "en" ? item.value : item.key
          })
        })
        const sequence = ["Check In", "In Plant", "Dispatched", "Delivered"]
        const sortData = (list, order) => {
          const priority = {};
          order.forEach((item, index) => (priority[item] = index));
          return list.sort((itemA, itemB) => priority[itemA.value] - priority[itemB.value]);
        };

        // console.log("sortData  ", sortData(contract, sequence), "     ", contract);
        dispatch({ type: "DELIVERY_SHIPMENT_STATUS_DROPDOWN_LIST", payload: sortData(contract, sequence) })
      })
  };
}


export function shippingConditionDropdown(division = "CM") {
  return (dispatch) => {
    const langCode = localStorage.getItem('lancode');
    const apiUrl = `/report/shipping-condition?countryCode=TH&division=${division}`
    dispatch({ type: "DELIVERY_SHIPPING_CONDITION_DROPDOWN_LIST", payload: [] })
    dispatch({ type: "SHIPPING_CONDITION_DROPDOWN_LIST", payload: [] })
    dispatch({ type: "SHIPPING_CONDITION_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + apiUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let condition = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return {
            ...item,
            value: item.code,
            label: langCode === "en" ? item.descriptionEn : item.descriptionTh
          };
        })
        let condition2 = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return {
            ...item,
            value: item.description,
            label: langCode === "en" ? item.descriptionEn : item.descriptionTh
          };
        })
        dispatch({ type: "DELIVERY_SHIPPING_CONDITION_DROPDOWN_LIST", payload: condition })
        dispatch({ type: "DELIVERY_SHIPPING_CONDITION_CW_DROPDOWN_LIST", payload: condition2 })
        dispatch({ type: "SHIPPING_CONDITION_DROPDOWN_LIST", payload: condition })
        dispatch({ type: "SHIPPING_CONDITION_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "SHIPPING_CONDITION_LOADING", payload: false })
      })
  };
}


export function shippingConditionDropdownOld() {
  return (dispatch) => {
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_ORDER + `/order/shippingConditionDropDown`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let condition = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return ({
            ...item,
            value: item.key,
            label: item.value
          })
        })
        dispatch({ type: "SHIPPING_CONDITION_DROPDOWN_LIST", payload: condition })
      })
  };
}

export function shipToNameDropdown(division = "CM", reportName) {
  return (dispatch) => {
    const langCode = localStorage.getItem("lancode")
    const customerCode = localStorage.getItem('CustomerNumber')
    const cCode = langCode === "en" ? "TH" : "TH"
    const apiUrl = `/report/shipToNameDropDown?soldToNumber=${customerCode}&countryCode=${cCode}&division=${division}&reportType=${reportName}`
    dispatch({ type: "SHIP_TO_NAME_DROPDOWN_LIST", payload: [] })
    dispatch({ type: "SHIPTO_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + apiUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {

        const shipToName = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return ({
            ...item,
            value: item.key,
            label: langCode === "en" ? item.shipToNameEn : item.shipToNameTh
          })
        })
        dispatch({ type: "SHIP_TO_NAME_DROPDOWN_LIST", payload: shipToName })
        dispatch({ type: "SHIPTO_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "SHIPTO_LOADING", payload: false })
      })
  };
}

export function orderMaterialDropdown(division = "CM", reportName) {
  return (dispatch) => {
    const { countryCode } = userInfo()
    const customerCode = localStorage.getItem('CustomerNumber')
    const apiUrlNew = `/report/getMaterialDropdown?soldToNumber=${customerCode}&division=${division}&reportType=${reportName}`
    // const apiUrl = `/report/taxMaterialDropdown/?customercode=${customerCode}&division=${division}`
    dispatch({ type: "DELIVERY_MATERIAL_DROPDOWN_LIST", payload: [] })
    dispatch({ type: "ORDER_MATERIAL_DROPDOWN_LIST", payload: [] })
    dispatch({ type: "INVOICE_MATERIAL_DROPDOWN_LIST", payload: [] })
    dispatch({ type: "PRODUCT_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + apiUrlNew,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const langCode = localStorage.getItem("lancode")
        const products =
          response.data.data &&
          response.data.data.length &&
          response.data.data
            .map((item) => {
              let nameInEn = item.nameInEn ? item.nameInEn : parseInt(item.code && item.code);
              let nameInTH = item.nameInTH ? item.nameInTH : parseInt(item.code && item.code);
              return {
                ...item,
                value: item.code,
                label: langCode === "en" ? nameInEn : nameInTH
              };
            });

        dispatch({ type: "DELIVERY_MATERIAL_DROPDOWN_LIST", payload: products })
        dispatch({ type: "ORDER_MATERIAL_DROPDOWN_LIST", payload: products })
        dispatch({ type: "INVOICE_MATERIAL_DROPDOWN_LIST", payload: products })
        dispatch({ type: "PRODUCT_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "PRODUCT_LOADING", payload: false })
      })
  };
}

export function plantNameDropdown(division = "CM", reporttype) {

  console.log('hello', division, reporttype);
  return (dispatch) => {
    dispatch({ type: "PLANT_NAME_DROPDOWN_LIST", payload: [] })
    const customerId = localStorage.getItem('CustomerNumber');
    const langCode = localStorage.getItem("lancode")
    dispatch({ type: "PLANT_LOADING", payload: true })
    dispatch({ type: "PLANT_NAME_DROPDOWN_LIST", payload: [] })

    const otherurl = `/report/plants?customerId=${customerId}&division=${division}`;
    const coUrl = `/report/plants?customerId=${customerId}&division=${division}&reportType=${reporttype}`;
    const sendUrl = division === "CO" ? coUrl : otherurl

    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + sendUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const plants = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return ({
            ...item,
            label: langCode === "en" ? item.plantNameEn : item.plantNameTh,
            value: item.plantCode
          })
        })
        console.log("plants=>", plants)
        dispatch({ type: "PLANT_NAME_DROPDOWN_LIST", payload: plants })
        dispatch({ type: "PLANT_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "PLANT_LOADING", payload: false })
      })
  };
}

export function plantSmartSearch(searchKey) {
  return (dispatch) => {
    Axios({
      method: "GET", url: process.env.REACT_APP_MASTER_API_URL + `/plant/plant-smart/search?countryCode=${countryCode}&search=${searchKey}`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const plants = response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
          return ({
            label: item,
            value: item
          })
        })
        dispatch({ type: "PLANT_SEARCH_LIST", payload: Array.isArray(plants) ? plants : [] })
      })
  };
}

export function salesStatusDropdown(division = "CM") {
  return (dispatch) => {
    const { countryCode } = userInfo()
    const customerCode = localStorage.getItem('CustomerNumber')
    const apiUrl = `/order/getAllSalesOrderStatus?countryCode=${countryCode}&soldToNumber=${customerCode}&division=${division}`;
    dispatch({ type: "SALES_ORDER_STATUS_DROPDOWN_LIST", payload: [] })
    // const apiUrl =`/order/getAllSalesOrderStatus?countryCode=${countryCode}`;
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_ORDER + apiUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const salesStatus = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return ({
            ...item,
            label: item.value
          })
        })
        dispatch({ type: "SALES_ORDER_STATUS_DROPDOWN_LIST", payload: salesStatus })
      })
  };
}

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
export function salesReportsListOld(filter, startCount = 1, endCount = 100) {
  return (dispatch) => {
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
      toDate
    } = filter;

    const dateRangeFrom = moment(fromDate).format("DDMMYYYY");
    const dateRangeTo = moment(toDate).format("DDMMYYYY");
    let addUrl = '';

    if (plant !== "" && plant != undefined && company === "SCCO") {
      addUrl = addUrl + `&plantCode=${plant}`
    }

    if (contract !== "" && contract !== undefined && (company === "SCCC" || company === "Conwood")) {
      addUrl = addUrl + `&contract=${contract}`
    }
    if (fromDate !== "") {
      addUrl = addUrl + `&dateRangeFrom=${dateRangeFrom}`
    }
    if (orderStatus !== "" && orderStatus !== "All") {
      addUrl = addUrl + `&orderstatus=${orderStatus}`
    }
    if (poNo !== "") {
      addUrl = addUrl + `&poSearch=${poNo}`
    }
    if (soNo !== "") {
      addUrl = addUrl + `&soSearch=${soNo}`
    }
    if (product !== "") {
      addUrl = addUrl + `&material=${product}`
    }
    if (shipTo !== "") {
      addUrl = addUrl + `&shipToName=${shipTo}`
    }

    if (shippingCondition !== "") {
      addUrl = addUrl + `&shipingCondition=${shippingCondition}`
    }

    if (toDate !== "") {
      addUrl = addUrl + `&dateRangeTo=${dateRangeTo}`
    }

    dispatch({ type: "IS_SALES_LOADING", payload: true })
    dispatch({ type: "SALES_REPORTS_LIST", payload: [] })

    // const additonalFilter = `&plant=${plant}&soNo=${soNo}&poNo=${poNo}&orderstatus=${orderStatus}&contract=${contract}&shipingCondition=${shippingCondition}&material=${product}&dateRangeFrom=${fromDate}&dateRangeTo=${toDate}&shipToName=${shipTo}`

    const url = `/report/sales-order?countryCode=${countryCode}&division=${salesDivision(company)}&soldToNumber=${customerId}&toIndex=${endCount}&fromIndex=${startCount}${addUrl}`

    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + url,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        dispatch({ type: "IS_SALES_LOADING", payload: false })
        dispatch({ type: "SALES_REPORTS_LIST", payload: response.data?.data?.paginationdto ?? [] })
      }).catch((err) => {
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
  };
}


export function salesReportsList(filter, startCount, endCount) {
  return (dispatch) => {
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
      toDate
    } = filter;
    console.log("filter => ", filter, "  ")

    const dateRangeFrom = moment(fromDate).format("YYYYMMDD");
    const dateRangeTo = moment(toDate).format("YYYYMMDD");

    const minusOneYear = moment().subtract(1, 'years').format('YYYY-MM-DD')
    const oneYear = moment(minusOneYear).add(1, 'days').format('YYYYMMDD')
    const currentDate = moment(new Date()).format("YYYYMMDD");


    dispatch({ type: "IS_SALES_LOADING", payload: true })
    dispatch({ type: "SALES_REPORTS_LIST", payload: [] })

    const postObj = {
      ...(orderStatus && orderStatus !== "All" && { orderstatus: orderStatus }),
      ...(contract && { contract: contract }),
      ...(poNo && { poSearch: poNo }),
      ...(shippingCondition && shippingCondition !== "All" && { shipingCondition: shippingCondition }),
      ...(product && { material: product }),
      // ...(fromDate && { dateRangeFrom: dateRangeFrom }),
      // ...(toDate && { dateRangeTo: dateRangeTo }),

      ...(fromDate && toDate && { dateRangeFrom: dateRangeFrom, dateRangeTo: dateRangeTo }),
      ...(fromDate === "" && toDate === "" && { dateRangeFrom: oneYear, dateRangeTo: currentDate }),
      // ...(orderStatus === "" && shipTo === "" && plant === "" && product === "" && shippingCondition === "" && contract === "" && soNo === "" && poNo === "" && fromDate === "" && toDate === "" && { dateRangeFrom: oneYear, dateRangeTo: currentDate }),

      ...(shipTo && { shipToNumber: shipTo.toString() }),
      ...(company && { division: salesDivision(company) }),
      ...(countryCode && { countryCode: countryCode }),
      soldToNumber: localStorage.getItem('CustomerNumber'),
      ...(plant !== "" && plant !== undefined && company === "SCCO" && { plantCode: plant }),
      ...(soNo && { soSearch: soNo }),
      // ...("fromIndex" && { fromIndex: startCount ?? 1 }),
      // ...("toIndex" && { toIndex: endCount ?? 20 }),
      fromIndex: 1,
      "toIndex": 5000,
    }

    const url = `/report/sales-order`

    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_RS + url,
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        dispatch({ type: "IS_SALES_LOADING", payload: false })
        response.data.data.paginationdto.results = response.data.data.paginationdto.results.map((item) => {
          return ({
            ...item,
            orderedQuantity: Number(item.orderedQuantity),
            remainingQuantity: Number(item.remainingQuantity),
            remainingQtyWithShipment: Number(item.remainingQtyWithShipment),
            deliveredQuantity: Number(item.deliveredQuantity),
            shipmentQty: Number(item.shipmentQty),
            remainingQtyWithPreDo: Number(item.remainingQtyWithPreDo),
            preDOQuantity: Number(item.preDOQuantity),
            contractName: item.contractName ?? ""

          })
        })
        dispatch({ type: "SALES_REPORTS_LIST", payload: response.data?.data?.paginationdto ?? [] })
      }).catch((err) => {
        dispatch({ type: "IS_SALES_LOADING", payload: false })
        dispatch({ type: "SALES_REPORTS_LIST", payload: [] })
      })
  };
}

function smartDivision(company) {
  let divType = "CM";
  if (company === "SCCO") {
    divType = "CO"
  }
  if (company === "Conwood") {
    divType = "CW"
  }
  return divType
}

export function soPoSmartSearch(searchKey, type, company) {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber')
    const url = `/report/po-so/search?customerCode=${customerCode}&search=${searchKey}&searchType=${type}&division=${smartDivision(company)}`

    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + url,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let resData = response.data && response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
          return ({
            label: item,
            value: item
          })
        })
        if (type === "SO") {
          dispatch({ type: "SO_SEARCH_LIST", payload: Array.isArray(resData) ? resData : [] })
        }
        if (type === "PO") {
          dispatch({ type: "PO_SEARCH_LIST", payload: Array.isArray(resData) ? resData : [] })
        }
        if (type === "PREDO") {
          dispatch({ type: "PRE_DO_SEARCH_LIST", payload: Array.isArray(resData) ? resData : [] })
        }

      })
  };
}


export function ticketNoSmartSearch(searchKey, company) {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber')
    // /report/ticketNoSmartSearch?search=1&customerCode=0710000096&division=CW'
    const url = `/report/ticketNoSmartSearch?customerCode=${customerCode}&search=${searchKey}&&division=${smartDivision(company)}`

    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + url,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let resData = response.data && response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
          return ({
            label: item,
            value: item
          })
        })

        dispatch({ type: "TICKET_SEARCH_LIST", payload: Array.isArray(resData) ? resData : [] })

      })
  };
}


// Credit Dropdown reports

export function creditStatusDropdown() {
  return (dispatch) => {
    dispatch({ type: "CREDIT_STATUS_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + `/reports/CreditNoteStatus`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const salesStatus = response.data.data && response.data.data.length && response.data.data.map((item) => {
          return ({
            ...item,
            value: item.key,
            label: item.value
          })
        })
        dispatch({ type: "CREDIT_STATUS", payload: salesStatus })
        dispatch({ type: "CREDIT_STATUS_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "CREDIT_STATUS_LOADING", payload: false })
      })
  };
}

// Credit Note reports list

function creditDivision(company) {
  let divType = "Cement";
  if (company === "SCCO") {
    divType = "Concrete"
  }
  if (company === "Conwood") {
    divType = "Conwood"
  }
  return divType
}

export function creditNoteList(filters) {
  return (dispatch) => {
    let { company, documentsNo, doctype, description, taxInvoiceNumber, status, fromDate, toDate } = filters;
    const fromdate = moment(fromDate).format("DDMMYYYY");
    const todate = moment(toDate).format("DDMMYYYY");
    const minusOneYear = moment().subtract(1, "years").format("DD MMM YYYY");
    const oneYearBackDate = moment(minusOneYear).add(1, 'days').format('DDMMYYYY')
    // const oneYearBackDate = moment().subtract(1, "years").format("DDMMYYYY");
    const currentDate = moment(new Date()).format("DDMMYYYY");
    const langCode = localStorage.getItem("lancode")
    const postObj = {
      customercode: localStorage.getItem('CustomerNumber'),
      ...(company && { division: creditDivision(company) }),
      "language": langCode === "th" ? "th" : "en",
      ...(fromDate && toDate && { fromdate: fromdate, todate: todate }),
      ...(fromDate === "" && toDate === "" && { fromdate: oneYearBackDate, todate: currentDate }),

      ...(documentsNo && { documentNo: documentsNo }),
      ...(doctype && { doctype: doctype }),
      ...(description && { description: description }),
      statusfilter: status,
      ...(taxInvoiceNumber && { taxInvoice: taxInvoiceNumber })
    }

    dispatch({ type: "IS_SALES_LOADING", payload: true })
    dispatch({ type: "CREDIT_NOTE_LIST", payload: [] })
    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + "/reports/CreditNoteReport",
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const newRow = response.data.data && response.data.data.RES_Records && response.data.data.RES_Records.map((item, index) => {
          return ({
            ...item,
            id: index,
            Net_Due_Date: sortingDateFormatter(item.NetDueDate),
            posting_date: item.PostingDate ? sortingDateFormatter(item.PostingDate) : "",
            netdue_date: item.NetDueDate ? sortingDateFormatter(item.NetDueDate) : "",
            DocAmount: Number(item.DocAmount),
            NetAmount: Number(item.NetAmount),
            Description:item.Description ?? ""
          })
        })
        dispatch({ type: "CREDIT_NOTE_LIST", payload: newRow })
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
  };
}


export function creditNoteListOld(filters) {
  return (dispatch) => {
    let { company, fromDate, toDate } = filters;
    const fromdate = moment(fromDate).format("DDMMYYYY");
    const todate = moment(toDate).format("DDMMYYYY");
    const customerCode = localStorage.getItem('CustomerNumber')
    // const cre = `/reports/CreditNoteReport?customercode=0110008926&division=Cement&doctype=DC&fromdate=01052021&todate=31082021`
    const searchUrl = `/reports/CreditNoteReport?customercode=${customerCode}&division=${creditDivision(company)}&doctype=DC&fromdate=${fromdate}&todate=${todate}`;
    dispatch({ type: "IS_SALES_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + searchUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const newRow = response.data.data && response.data.data.RES_Records && response.data.data.RES_Records.map((item, index) => {
          return ({
            ...item, id: index
          })
        })
        dispatch({ type: "CREDIT_NOTE_LIST", payload: newRow })
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
  };
}


// Receipt Reports 

function receiptDivision(company) {
  let divType = "Cement";
  if (company === "SCCO") {
    divType = "Concrete"
  }
  if (company === "Conwood") {
    divType = "Conwood"
  }
  return divType
}
export function receiptReportListOld(filters) {
  return (dispatch) => {
    let { company, fromDate, toDate } = filters;
    const fromdate = moment(fromDate).format("DDMMYYYY");
    const todate = moment(toDate).format("DDMMYYYY");

    const customerCode = localStorage.getItem('CustomerNumber')

    const searchUrl = `/reports/receiptReport?customercode=${customerCode}&division=${receiptDivision(company)}&fromIndex=1&toIndex=100&receiptNo=5210000034&fromdate=${fromdate}&todate=${todate}`
    dispatch({ type: "IS_SALES_LOADING", payload: true })
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + searchUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        if (response.data.status === 200) {
          dispatch({ type: "RECEIPT_REPORTS", payload: response.data.data })
        } else {
          dispatch({ type: "RECEIPT_REPORTS", payload: [] })
          dispatch({ type: "RECEIPT_REPORTS_MESSAGE", payload: response.data.message })
        }
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      }).catch((err) => {

        dispatch({ type: "RECEIPT_REPORTS", payload: [] })
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
  };
}

export function receiptReportList(filters) {
  return (dispatch) => {
    let { company, receiptNumber, fromDate, toDate } = filters;

    const fromdate = moment(fromDate).format("DDMMYYYY");
    const todate = moment(toDate).format("DDMMYYYY");
    const minusOneYear = moment().subtract(1, "years").format("DD MMM YYYY");
    const oneYearBackDate = moment(minusOneYear).add(1, 'days').format('DDMMYYYY')
    console.log("oneYearBackDate=>", oneYearBackDate)
    const currentDate = moment(new Date()).format("DDMMYYYY");
    const postObj = {
      ...(receiptNumber && { "receiptNo": receiptNumber }),
      customercode: localStorage.getItem('CustomerNumber'),
      ...(fromDate && toDate && { fromdate: fromdate, todate: todate }),
      ...(fromDate === "" && toDate === "" && { fromdate: oneYearBackDate, todate: currentDate }),

      division: receiptDivision(company),
    }
    const searchUrl = `/reports/receiptReport`
    dispatch({ type: "IS_SALES_LOADING", payload: true })
    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + searchUrl,
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        if (response.data.status === 200) {
          console.log("response.data=>", response.data)
          dispatch({ type: "RECEIPT_REPORTS", payload: response.data.data })
        } else {
          dispatch({ type: "RECEIPT_REPORTS", payload: [] })
          dispatch({ type: "RECEIPT_REPORTS_MESSAGE", payload: response.data.message })
        }
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      }).catch((err) => {

        dispatch({ type: "RECEIPT_REPORTS", payload: [] })
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
  };
}

// delivery Api integration

export function deliveryMaterialDropdown(division = "CM") {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber')
    const apiUrl = `/order/getOrderMeterialDrodown?countryCode=${countryCode}&soldToNumber=${customerCode}&division=${division}`;
    // const apiUrl = `/order/getOrderMeterialDrodown?countryCode=${countryCode};
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_ORDER + apiUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {

        const products = response.data.data && response.data.data.length && response.data.data.filter((item) => item.materialName != null).map((item) => {
          return ({
            ...item,
            label: item.materialName,
            value: item.materialNumber
          })
        })

        dispatch({ type: "ORDER_MATERIAL_DROPDOWN_LIST", payload: products })
      })
  };
}

// =================================

function smtDivision(company) {
  let divType = "Cement";
  if (company === "SCCO") {
    divType = "Concrete"
  }
  if (company === "Conwood") {
    divType = "Conwood"
  }
  return divType
}

export function doSearch(searchKey, company) {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber')
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + `/report/do/search?search=${searchKey}&customerCode=${customerCode}&division=${smtDivision(company)}`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const doNo = response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
          return ({
            label: item,
            value: item
          })
        })

        dispatch({ type: "DO_SEARCH_LIST", payload: Array.isArray(doNo) ? doNo : [] })
      })
  };
}

export function shipNumberSearch(searchKey, company) {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber')
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + `/report/shipmentNumber/search?search=${searchKey}&customerCode=${customerCode}&division=${smtDivision(company)}`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const shipNo = response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
          return ({
            label: item,
            value: item
          })
        })
        dispatch({ type: "DELIVERY_SHIPMENT_NUMBER_DROPDOWN_LIST", payload: Array.isArray(shipNo) ? shipNo : [] })
      })
  };
}

function deliveryDivision(company) {
  // CM,CO,CW, MT
  let divType = "MT";
  if (company === "SCCO") {
    divType = "CO"
  }
  if (company === "Conwood") {
    divType = "CW"
  }
  return divType
}


export function deliveryReportsListSCCC(filters, startCount, endCount) {
  return (dispatch) => {
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
      weightOutDateTo
    } = filters;

    const fromdate = moment(weightOutDateFrom).format("YYYY-MM-DD");
    const todate = moment(weightOutDateTo).format("YYYY-MM-DD");

    const minusThreeMonth = moment().subtract(3, 'months').format("YYYY-MM-DD");
    const oneThreeMonth = moment(minusThreeMonth).add(1, 'days').format('YYYY-MM-DD')
    const currentDate = moment(new Date()).format("YYYY-MM-DD");


    dispatch({ type: "IS_DELIVERY_LOADING", payload: true })
    dispatch({ type: "DELIVERY_REPORTS_LIST", payload: [] })

    const postObj = {
      division: "CM",
      ...(contractNo && { contract: contractNo }),
      ...(product && { material: product }),
      ...(poNo && { poRefNumber: poNo }),
      ...(doNo && { deliveryNumberSap: doNo }),
      ...(soNo && { soNumber: soNo }),
      ...(shippingCondition && shippingCondition !== "All" && { shippingCondition: shippingCondition }),
      ...(shipmentNo && { shipmentNumber: shipmentNo }),
      ...(shipmentStatus && shipmentStatus !== "All" && { shipmentStatus: shipmentStatus }),
      ...(shipTo && { shipToNumber: shipTo.toString() }),
      soldToNumber: localStorage.getItem('CustomerNumber'),
      // ...("fromIndex" && { fromIndex: startCount ?? 1 }),
      // ...("toIndex" && { toIndex: endCount ?? 20 }),
      fromIndex: 1,
      toIndex: 5000,
      ...(weightOutDateFrom && weightOutDateTo && {
        weightOutFromDate: fromdate,
        weightOutToDate: todate
      }),
      ...(weightOutDateFrom === "" && weightOutDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
      // ...(shipTo === "" && shipmentStatus === "" && shipmentNo === "" && shippingCondition === "" && product === "" && poNo === "" && doNo === "" && soNo === "" && contractNo === "" && weightOutDateFrom === "" && weightOutDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
    }

    const url = `/report/deliveryReport`

    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_RS + url,
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let res = response.data.data.paginationdtoDel
        res.results = res.results && res.results.length > 0 && res.results.map((item, index) => {
          return ({
            ...item,
            id: index
          })
        })
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: res })
        dispatch({ type: "IS_DELIVERY_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "IS_DELIVERY_LOADING", payload: false })
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: [] })
      })
  };
}


export function deliveryReportsListSCCO(filters, startCount, endCount) {
  return (dispatch) => {
    let {
      ticketNo,
      product,
      shipTo,
      plant,
      deliveryDateFrom,
      deliveryDateTo,
      departureDateFrom,
      departureDateTo
    } = filters;

    const fromdate = moment(deliveryDateFrom).format("YYYY-MM-DD");
    const todate = moment(deliveryDateTo).format("YYYY-MM-DD");
    const fromDepdate = moment(departureDateFrom).format("YYYY-MM-DD");
    const toDepdate = moment(departureDateTo).format("YYYY-MM-DD");

    // console.log('filters=>', fromDepdate)
    // console.log('filters=>', toDepdate)

    const minusThreeMonth = moment().subtract(3, 'months').format("YYYY-MM-DD");
    const oneThreeMonth = moment(minusThreeMonth).add(1, 'days').format('YYYY-MM-DD')
    const currentDate = moment(new Date()).format("YYYY-MM-DD");

    dispatch({ type: "IS_DELIVERY_LOADING", payload: true })
    dispatch({ type: "DELIVERY_REPORTS_LIST", payload: [] })

    const postObj = {
      division: "CO",
      ...(product && { material: product }),
      ...(shipTo && { shipToNumber: shipTo }),
      ...(plant && { plant: plant }),
      ...(ticketNo && { preDoNo: ticketNo }),
      soldToNumber: localStorage.getItem('CustomerNumber'),
      // ...("fromIndex" && { fromIndex: startCount ?? 1 }),
      // ...("toIndex" && { toIndex: endCount ?? 20 }),
      fromIndex: 1,
      toIndex: 5000,
      ...(deliveryDateFrom && deliveryDateTo && { weightOutFromDate: fromdate, weightOutToDate: todate }),
      ...(deliveryDateFrom === "" && deliveryDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
      // ...(product === "" && shipTo === "" && plant === "" && ticketNo === "" && departureDateFrom === "" && deliveryDateFrom === "" && deliveryDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
      ...(departureDateFrom && departureDateTo && { departureDateFrom: fromDepdate, departureDateTo: toDepdate })
    }

    const url = `/report/deliveryReport/cw-co`

    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_RS + url,
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let res = response.data.data.paginationdtoDel
        res.results = res.results && res.results.length > 0 && res.results.map((item, index) => {
          return ({
            ...item,
            id: index
          })
        })
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: res })
        dispatch({ type: "IS_DELIVERY_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "IS_DELIVERY_LOADING", payload: false })
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: [] })
      })
  };
}

export function deliveryReportsListConwood(filters, startCount, endCount) {
  return (dispatch) => {
    let {
      contractNo,
      product,
      doNo,
      poNo,
      soNo,
      preDoNo,
      shippingCondition,
      shipTo,
      weightOutDateFrom,
      weightOutDateTo,
    } = filters;
    const fromdate = moment(weightOutDateFrom).format("YYYY-MM-DD");
    const todate = moment(weightOutDateTo).format("YYYY-MM-DD");

    const minusThreeMonth = moment().subtract(3, 'months').format("YYYY-MM-DD");
    const oneThreeMonth = moment(minusThreeMonth).add(1, 'days').format('YYYY-MM-DD')
    const currentDate = moment(new Date()).format("YYYY-MM-DD");

    dispatch({ type: "IS_DELIVERY_LOADING", payload: true })
    dispatch({ type: "DELIVERY_REPORTS_LIST", payload: null })

    const postObj = {
      division: "CW",
      ...(contractNo && { contract: contractNo }),
      ...(product && { product: product }),
      ...(poNo && { poRefNumber: poNo }),
      ...(doNo && { deliveryNumberSap: doNo }),
      ...(soNo && { soNumber: soNo }),
      ...(preDoNo && { preDoNo: preDoNo }),
      ...(shippingCondition && shippingCondition !== "All" && { shippingCondition: shippingCondition }),
      ...(shipTo && { shipToNumber: shipTo }),
      soldToNumber: localStorage.getItem('CustomerNumber'),
      // ...("fromIndex" && { fromIndex: startCount ?? 1 }),
      // ...("toIndex" && { toIndex: endCount ?? 20 }),
      fromIndex: 1,
      toIndex: 5000,
      ...(weightOutDateFrom && weightOutDateTo && { weightOutFromDate: fromdate, weightOutToDate: todate }),
      ...(weightOutDateFrom === "" && weightOutDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
      // ...(contractNo === "" && product === "" && poNo === "" && doNo === "" && soNo === "" && preDoNo === "" && shippingCondition === "" && shipTo === "" && weightOutDateFrom === "" && weightOutDateTo === "" && { weightOutFromDate: oneThreeMonth, weightOutToDate: currentDate }),
    }

    const url = `/report/deliveryReport/cw-co`

    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_RS + url,
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let res = response.data.data.paginationdtoDel
        res.results = res.results && res.results.length > 0 && res.results.map((item, index) => {
          return ({
            ...item,
            id: index
          })
        })
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: res })
        dispatch({ type: "IS_DELIVERY_LOADING", payload: false })
      }).catch((err) => {
        dispatch({ type: "IS_DELIVERY_LOADING", payload: false })
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: null })
      })
  };
}


export function deliveryReportsList(filters, fromIndex = 1, toIndex = 20) {
  return (dispatch) => {
    let { company,
      productCode,
      ticketNo,
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
      deliveryDateFrom,
      deliveryDateTo,
      departureDateFrom,
      departureDateTo
    } = filters;

    console.log("plant=>", plant, "     ", filters)

    let addUrl = '';

    if (contractNo !== "") {
      addUrl = addUrl + `&contract=${contractNo}`
    }

    if (product !== "") {
      addUrl = addUrl + `&material=${product}`
    }

    if (ticketNo !== "") {
      addUrl = addUrl + `&ticketNo=${ticketNo}`
    }
    if (plant !== "") {
      console.log("plant=>", plant)
      addUrl = addUrl + `&plant=${plant}`
    }

    if (productCode !== "") {
      addUrl = addUrl + `&material=${productCode}`
    }

    if (doNo !== "") {
      addUrl = addUrl + `&doNumber=${doNo}`
    }

    if (poNo !== "") {
      addUrl = addUrl + `&poNumber=${poNo}`
    }

    if (soNo !== "") {
      addUrl = addUrl + `&soNumber=${soNo}`
    }

    if (shippingCondition !== "") {
      addUrl = addUrl + `&shippingCondition=${shippingCondition}`
    }

    if (shipmentNo !== "") {
      addUrl = addUrl + `&shipmentNumber=${shipmentNo}`
    }
    if (shipmentStatus !== "") {
      addUrl = addUrl + `&shipmentStatus=${shipmentStatus}`
    }
    if (shipTo !== "") {
      addUrl = addUrl + `&shipToName=${shipTo}`
    }
    if (weightOutDateFrom !== "" && weightOutDateTo !== "") {
      const fromdate = moment(weightOutDateFrom).format("YYYY-MM-DD");
      const todate = moment(weightOutDateTo).format("YYYY-MM-DD");
      addUrl = addUrl + `&fromDate=${fromdate}&toDate=${todate}`
    }
    else {
      const fromdate = moment().subtract(3, 'months').format("YYYY-MM-DD");
      const todate = moment(new Date()).format("YYYY-MM-DD");
      addUrl = addUrl + `&fromDate=${fromdate}&toDate=${todate}`
    }

    if (deliveryDateFrom !== "" && deliveryDateTo !== "") {
      const fromdate = moment(deliveryDateFrom).format("YYYY-MM-DD");
      const todate = moment(deliveryDateTo).format("YYYY-MM-DD");
      addUrl = addUrl + `&deliveryDateFrom=${fromdate}&deliveryDateTo=${todate}`
    }

    if (departureDateFrom !== "" && departureDateTo !== "") {
      const fromdate = moment(departureDateFrom).format("YYYY-MM-DD");
      const todate = moment(departureDateTo).format("YYYY-MM-DD");
      addUrl = addUrl + `&departureDateFrom=${fromdate}&departureDateTo=${todate}`
    }


    const customerCode = localStorage.getItem('CustomerNumber')
    const fulteredUrl = `/report/deliveryReport?soldToNumber=${customerCode}&division=${deliveryDivision(company)}&fromIndex=${fromIndex}&toIndex=${toIndex}${addUrl}`;
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + fulteredUrl,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        let res = response.data.data.paginationDTO
        res.results = res.results && res.results.length > 0 && res.results.map((item, index) => {
          return ({
            ...item,
            id: index
          })
        })
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: res })
      })
      .catch((err) => {
        dispatch({ type: "DELIVERY_REPORTS_LIST", payload: [] })
      })
  };
}


// ######################### Invoice Actions ##########################
function invoiceSeachDivision(company) {
  let divType = "Cement";
  if (company === "SCCO") {
    divType = "Concrete"
  }
  if (company === "Conwood") {
    divType = "Conwood"
  }
  return divType
}

export function invoiceNumberSearch(searchKey, company) {
  return (dispatch) => {
    const customerCode = localStorage.getItem('CustomerNumber')
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + `/report/tax-invoiceSmartSearch?search=${searchKey}&customerCode=${customerCode}&division=${invoiceSeachDivision(company)}`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        const invNo = response.data.data && response.data.data.length > 0 && response.data.data.map((item) => {
          return ({
            label: item,
            value: item
          })
        })

        dispatch({ type: "INVOICE_SEARCH_LIST", payload: Array.isArray(invNo) ? invNo : [] })
      }).catch((err) => {
        dispatch({ type: "INVOICE_SEARCH_LIST", payload: [] })
      })
  };
}



function invoiceDivision(company) {
  // CM,CO,CW, MT
  let divType = "cement";
  if (company === "SCCO") {
    divType = "Concrete"
  }
  if (company === "Conwood") {
    divType = "Conwood"
  }
  return divType
}


export function invoiceReportsApiCallOld(filters, fromIndex = 1, toIndex = 20) {
  return (dispatch) => {
    let { company, contract, product, taxInvoiceNumber, doNo, poNo, soNo, invoiceFromDate, invoiceToDate, shipTo, plant } = filters;


    let addUrl = '';

    if (contract !== "") {
      addUrl = addUrl + `&contract=${contract}`
    }
    if (product !== "") {
      addUrl = addUrl + `&material=${product}`
    }
    if (taxInvoiceNumber !== "") {
      addUrl = addUrl + `&taxInvoiceNumber=${taxInvoiceNumber}`
    }
    if (doNo !== "") {
      addUrl = addUrl + `&doNo=${doNo}`
    }
    if (poNo !== "") {
      addUrl = addUrl + `&poNo=${poNo}`
    }
    if (soNo !== "") {
      addUrl = addUrl + `&soNo=${soNo}`
    }
    if (invoiceFromDate !== "" && invoiceToDate !== "") {
      addUrl = addUrl + `&fromDate=${invoiceFromDate}`;
      addUrl = addUrl + `&toDate=${invoiceToDate}`
    }
    if (shipTo !== "") {
      addUrl = addUrl + `&shipTo=${shipTo}`
    }
    if (plant !== "") {
      addUrl = addUrl + `&plant=${plant}`
    }


    const customerCode = localStorage.getItem('CustomerNumber')
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + `/report/tax-invoice?customerCode=${customerCode}&division=${invoiceDivision(company)}&fromIndex=${fromIndex}&toIndex=${toIndex}`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        // let res = response.data.data.paginationDTO
        // res.results = res.results && res.results.length > 0 && res.results.map((item, index) => {
        //   return ({
        //     ...item,
        //     id: index
        //   })
        // })
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: response.data.data })
      })
      .catch((err) => {
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: [] })
      })
  };
}

export function invoiceReportsApiCall(filters, startCount, endCount) {
  return (dispatch) => {
    let { company, contract, product, taxInvoiceNumber, doNo, poNo, soNo, invoiceFromDate, invoiceToDate, shipTo, plant } = filters;

    const dateRangeFrom = moment(invoiceFromDate).format("DDMMYYYY");
    const dateRangeTo = moment(invoiceToDate).format("DDMMYYYY");

    const minusThreeMonth = moment().subtract(6, 'months').format("YYYY-MM-DD");
    const oneSixMonth = moment(minusThreeMonth).add(1, 'days').format('DDMMYYYY')
    const currentDate = moment(new Date()).format("DDMMyyyy");

    const lancode = localStorage.getItem('lancode');

    const customerCode = localStorage.getItem('CustomerNumber')

    const postObj = {
      customerCode: customerCode,
      ...(company && { division: invoiceDivision(company) }),
      ...(contract && { contract: contract }),
      ...(poNo && { poNumber: poNo }),
      ...(soNo && { soNumber: soNo }),
      ...(doNo && { doNumber: doNo }),
      ...(shipTo && { shipToNumber: shipTo }),
      ...(plant && { plantCode: plant }),
      ...(taxInvoiceNumber && { invoiceNumber: taxInvoiceNumber }),
      ...(product && { material: product }),
      ...(invoiceFromDate && invoiceToDate && { fromDate: dateRangeFrom, toDate: dateRangeTo }),
      ...(invoiceFromDate === "" && invoiceToDate === "" && { fromDate: oneSixMonth, toDate: currentDate }),
      // ...(plant === "" && product === "" && taxInvoiceNumber === "" && shipTo === "" && doNo === "" && soNo === "" && poNo === "" && contract === "" && invoiceFromDate === "" && invoiceToDate === "" && { fromDate: oneSixMonth, toDate: currentDate }),
      // ...("fromIndex" && { fromIndex: startCount ?? 1 }),
      // ...("toIndex" && { toIndex: endCount ?? 20 }),
      fromIndex: 1,
      toIndex: 5000,
      languageType: lancode === "en" ? "en" : "th",
    }

    dispatch({ type: "IS_SALES_LOADING", payload: true })

    const url = `/report/tax-invoice`

    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_RS + url,
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }

    })
      .then(async (response) => {
        const mappedResponse = response.data.data?.results ? response.data.data.results.map((item) => {
          return ({
            ...item,
            qty: parseFloat(item.qty),
            amountBeforeTax: parseFloat(item.amountBeforeTax),
            tax: parseFloat(item.tax),
            totalamount: parseFloat(item.totalamount),
            contractName: item.contractName ?? "",
            trucklicense: item.trucklicense ?? ""
          })
        }) : []

        const newMappedData = { ...response.data.data, results: mappedResponse }
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: newMappedData })
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
      .catch((err) => {
        dispatch({ type: "IS_SALES_LOADING", payload: false })
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: [] })
      })
  };
}

export function invoiceReportsApiCallConwood(filters, startCount, endCount) {

  return (dispatch) => {
    let { company, contract, product, taxInvoiceNumber, doNo, poNo, soNo, invoiceFromDate, invoiceToDate } = filters;

    const customerCode = localStorage.getItem('CustomerNumber')
    const lancode = localStorage.getItem('lancode');

    const dateRangeFrom = moment(invoiceFromDate).format("DDMMYYYY");
    const dateRangeTo = moment(invoiceToDate).format("DDMMYYYY");

    const minusThreeMonth = moment().subtract(6, 'months').format("YYYY-MM-DD");
    const oneSixMonth = moment(minusThreeMonth).add(1, 'days').format('DDMMYYYY')
    const currentDate = moment(new Date()).format("DDMMyyyy");

    const postObj = {
      customerCode: customerCode,
      ...(company && { division: "Conwood" }),
      ...(contract && { contract: contract }),
      ...(poNo && { poNumber: poNo }),
      ...(soNo && { soNumber: soNo }),
      ...(doNo && { doNumber: doNo }),
      ...(taxInvoiceNumber && { invoiceNumber: taxInvoiceNumber }),
      ...(product && { material: product }),
      ...(invoiceFromDate && invoiceToDate && { fromDate: dateRangeFrom, toDate: dateRangeTo }),
      ...(invoiceFromDate === "" && invoiceToDate === "" && { fromDate: oneSixMonth, toDate: currentDate }),
      // ...(product === "" && taxInvoiceNumber === "" && doNo === "" && soNo === "" && poNo === "" && contract === "" && invoiceFromDate === "" && invoiceToDate === "" && { fromDate: oneSixMonth, toDate: currentDate }),
      // ...("fromIndex" && { fromIndex: startCount ?? 1 }),
      // ...("toIndex" && { toIndex: endCount ?? 20 }),
      fromIndex: 1,
      toIndex: 5000,
      languageType: lancode === "en" ? "en" : "th",

    }
    dispatch({ type: "IS_SALES_LOADING", payload: true })
    const url = `/report/tax-invoice/conwood`

    Axios({
      method: "POST",
      url: process.env.REACT_APP_API_URL_RS + url,
      data: postObj,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {


        const mappedResponse = response.data.data?.results ? response.data.data.results.map((item) => {
          return ({
            ...item,
            qty: Number(item.qty),
            amountBeforeTax: Number(item.amountBeforeTax),
            tax: Number(item.tax),
            totalamount: Number(item.totalamount),
            summary: item.summary.map((item) => {
              return {
                ...item,
                qty: Number(item.qty),
                amountBeforeTax: Number(item.amountBeforeTax),
                tax: Number(item.tax),
                totalamount: Number(item.totalamount),
              }
            })

          })
        }) : []

        const newMappedData = { ...response.data.data, results: mappedResponse }

        dispatch({ type: "INVOICE_REPORTS_LIST", payload: newMappedData })
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
      .catch((err) => {
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: [] })
        dispatch({ type: "IS_SALES_LOADING", payload: false })
      })
  };
}

export function invoiceReportsApiCallConwoodOld(filters, fromIndex = 1, toIndex = 20) {
  return (dispatch) => {
    let { company } = filters;

    const customerCode = localStorage.getItem('CustomerNumber')
    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_RS + `/report/tax-invoice/conwood?customerCode=0930001982&division=Conwood&fromIndex=0&toIndex=3`,
      headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        // let res = response.data.data.paginationDTO
        // res.results = res.results && res.results.length > 0 && res.results.map((item, index) => {
        //   return ({
        //     ...item,
        //     id: index
        //   })
        // })
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: response.data.data })
      })
      .catch((err) => {
        dispatch({ type: "INVOICE_REPORTS_LIST", payload: [] })
      })
  };
}


















































function getSalesOrderReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, shippingCondition, shipToName, division, countryCode) {
  debugger
  const userData = JSON.parse(localStorage.getItem('userData'))
  const userId = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).soldTo) ?
    JSON.parse(localStorage.getItem('userData')).soldTo[0] : ''
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_API_URL_ORDER + `/order/getSalesOrderByFilter?contract=${contract}&dateRangeFrom=${fromDate}&dateRangeTo=${toDate}&fromIndex=${startIndex}&toIndex=${endIndex}&material=${material}&orderstatus=${orderStatus}&shipToName=${shipToName}&shipingCondition=${shippingCondition}&excel=${isExport}&division=${division}&countryCode=${countryCode}&soldToNumber=${localStorage.getItem('CustomerNumber')}&searchKey=${search}`

    , requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}


function getDeliveryReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber, serachNumberPlant) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },

  };
  return fetch(process.env.REACT_APP_API_URL_DMS + '/delivery-order/getAllDeliveryReports?contract=' + contract + '&fromDate=' + fromDate + '&toDate=' + toDate + '&fromIndex=' + startIndex + '&toIndex=' + endIndex
    + '&material=' + material + '&orderStatus=' + orderStatus + '&shipToName=' + shipToName + '&poNumber=' + poNumber
    + '&doNumber=' + doNumber + '&soNumber=' + soNumber + '&shippingCondition=' + shippingCondition + '&excel=' + isExport + '&countryCode=' + countryCode + '&search=' + serachNumber + '&plantName=' + serachNumberPlant + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber'), requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}


function getDeliveryReportConwod(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },

  };
  return fetch(process.env.REACT_APP_API_URL_DMS + '/delivery-order/getAllDeliveryReportsForCW?contract=' + contract + '&fromDate=' + fromDate + '&toDate=' + toDate + '&fromIndex=' + startIndex + '&toIndex=' + endIndex
    + '&material=' + material + '&orderStatus=' + orderStatus + '&shipToName=' + shipToName + '&poNumber=' + poNumber
    + '&doNumber=' + doNumber + '&soNumber=' + soNumber + '&shippingCondition=' + shippingCondition + '&excel=' + isExport + '&countryCode=' + countryCode + '&search=' + serachNumber + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber'), requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}




function getDeliveryReportChild(custmerNo, deliveryDivision, id) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },

  };
  return fetch(process.env.REACT_APP_API_URL_DMS + `/delivery-order/getAllChildRecordsForDoNumberCW?customerId=${custmerNo}&division=${deliveryDivision}&doNumber=${id}`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}

function getTaxInvoiceReport(createCaseDetails) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(createCaseDetails)

  };
  return fetch(process.env.REACT_APP_API_URL_CASE + `case/customer/create`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}

function getCreditNoteReport(fromDate, toDate, startIndex, endIndex, search, division, statusFilter) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/creditNoteReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + division + '&doctype=&fromdate=' + fromDate + '&todate=' + toDate + '&search=' + search + '&statusfilter=' + statusFilter,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}


function getIncentivePaymentReports(custmerNo, incentiveReports, division) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/getIncentiveReportsForVN?customerId=${custmerNo}&fromIndex=1&OD=${division === 'OD' ? true : false}&offIvoiceAndFreeCharge=${incentiveReports === 0 ? true : false}&offsetAndPriceAdjustment=${incentiveReports === 1 ? true : false}&retailer=${division === 'Retailer' ? true : false}&toIndex=10`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}






function getOpenItemReport(customerCode, division, fromIndex, toIndex) {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const userId = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).soldTo) ?
    JSON.parse(localStorage.getItem('userData')).soldTo[0] : ''
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/pendingReport?customercode=' + customerCode + '&division=' + division + '&fromIndex=' + fromIndex + '&toIndex=' + toIndex, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}


function exportOpenItemReport(caseID) {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const userId = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).soldTo) ?
    JSON.parse(localStorage.getItem('userData')).soldTo[0] : ''
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/downloadPendingReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=Cement', requestOptions)

    .then((res) => res.json())
    .then((result) => {
      // return result.data;
    });
}

function getReceiptReport(fromDate, toDate, fromIndex, toIndex, division) {
  debugger
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  return fetch(process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/setlledReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + division + '&fromdate=' + fromDate + '&fromIndex=' + fromIndex
    + '&todate=' + toDate + '&toIndex=' + toIndex, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}

function getIncentivePaymentReport(createCaseDetails) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(createCaseDetails)

  };
  return fetch(process.env.REACT_APP_API_URL_CASE + `case/customer/create`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}

function getCustomerStatementReport(fromDate, toDate, startIndex, endIndex, division) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + '/customerReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + division + '&fromdate=' + fromDate + '&todate=' + toDate + '&fromIndex=' + startIndex + '&toIndex=' + endIndex,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getCustomerStatementReportPdf(fromDate, toDate, division) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + '/customerReportsDownloadVisibility?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + division + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}




function salesOrderReportExport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, search, shippingCondition, shipToName) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_API_URL_ORDER + '/order/getSalesOrderByFilter?contract=' + contract + '&dateRangeFrom=' + fromDate + '&dateRangeTo=' + toDate + '&fromIndex=' + startIndex + '&toIndex=' + endIndex
    + '&material=' + material + '&orderstatus=' + orderStatus + '&shipToName=' + shipToName + '&searchKey=' + search + '&shipingCondition=' + shippingCondition + '&excel=' + isExport
    , requestOptions)

    .then((res) => res.json())
    .then((result) => {

      if (!result.status || parseInt(result.status) != 200 || parseInt(result.status != 420)) {
        const error = (result && result.message) || result.error;
        return Promise.reject(error);
      }
      fetch(result.data.url, {
        method: "GET",
        headers: {}
      })
        .then(response => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");

            const dateAndTime = moment().format("DD_MM_YYYY_HH_mm_ss");
            link.href = url;
            link.setAttribute("download", "CaseList_" + dateAndTime + ".csv"); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link)
          });
        })
        .catch(err => {
          console.log(err);
        });

    });
}

function getTaxInvoiceReports(customercode, division, fromIndex, toIndex, searchText, dateRange, dateRange2, contract, material) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/taxInvoiceReport?customercode=${customercode}&division=${division}&fromIndex=${fromIndex}&toIndex=${toIndex}&search=${searchText}&fromdate=${dateRange}&todate=${dateRange2}&contract=${contract}&material=${material}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}


function getTaxInvoiceReportsConwood(customercode, division, fromIndex, toIndex, searchText, dateRange, dateRange2, contract, material) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/taxInvoiceReportConwood?customercode=${customercode}&division=${division}&fromIndex=${fromIndex}&toIndex=${toIndex}&search=${searchText}&fromdate=${dateRange}&todate=${dateRange2}&contract=${contract}&material=${material}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}





function getTaxInvoiceMaterial(division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + '/taxMaterial?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + division + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getTaxInvoiceContracts(division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + '/taxInvoiceContact?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + division + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getOrderReportsMaterial(division) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + '/order/getOrderMeterialDrodown',
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getDeliveryReportsMaterial(division) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + '/order/getOrderMeterialDrodown',
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getSalesAndDeliverContracts(division) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + '/contracts/getAllContracts',
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}


function getDeliveryShipmentStatus(countryCode) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + 'delivery-order/getShipmentStatusDropDown?countryCode=' + countryCode,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}


function getSalesOrderStatus(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + '/order/getAllSalesOrderStatus?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getSalesOrderMaterialList(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + '/order/getOrderMeterialDrodown?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getSalesOrderShippingCondition(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + '/order/shippingConditionDropDown?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getSalesOrderShipToName(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + '/order/shipToNameDropDown?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getSalesOrderContracts(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + '/order/contarctDropdown?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (result.status === 401) {
        const error = result.error;

        return Promise.reject(error);
      }
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}





function getDeliveryStatus(countryCode, division) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + 'delivery-order/getAllDeliveryStatus?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber'),
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getDeliveryMaterialList(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + 'delivery-order/getMaterialDropDownForReports?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getDeliveryShippingCondition(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + 'delivery-order/getShippingConditionDropDown?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getDeliveryShipToName(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + 'delivery-order/getShipToNameDropDown?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}

function getDeliveryContracts(countryCode, division, fromDate, toDate) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + 'delivery-order/getContractDropDown?countryCode=' + countryCode + '&division=' + division + '&soldToNumber=' + localStorage.getItem('CustomerNumber') + '&fromDate=' + fromDate + '&toDate=' + toDate,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message);
        return Promise.reject(error);
      }
      return result.data;

    });
}








