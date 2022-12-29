import { paymentofflineConstants } from "../_constants";
import { paymentofflineService } from "../_services";

export const paymentofflineActions = {
  getAvailablity,
  getSapAging,
  getPaymentMode,
  getPaymentType,
  getPaymentBank,
  getPendingPayment,
  paymentStatus,
  PaymentSummaryUpdate,
  getCatForFilter, 
  offlinegetPaymentStatus,
  getSettledPayment,
  makePaymentData,
  totalMakePaymentData,
  onPaymentMode,
  onPaymentType,
  onBankName,
  onPaymentDateChange,
  confirmPaymentButton,
  confirmPaymentButtonOnline,
  paymentHistoryData,
  paymentHistoryDetail,
  paymentHistoryDataDelete,
  serachValue,
  getPaymentOfflineChartData,
  getPendingPaymentStatus,
  totalCheckedPandingData,
  totalCheckedData,
  loadcacheData,
  getBayBankResponse
  
};

function getAvailablity(getavailData) {
  
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getAvailablity(getavailData).then(
      (getavailablity) => dispatch(success(getavailablity)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getavailablity) {
    return { type: paymentofflineConstants.GET_AVAILABLITY_REQUEST, getavailablity };
  }
  function success(getavailablity) {
    return { type: paymentofflineConstants.GET_AVAILABLITY_SUCCESS, getavailablity };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_AVAILABLITY_FAILURE, error };
  }
}

function getSettled(settledData) {
  
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getSettled(settledData).then(
      (getsettled) => dispatch(success(getsettled)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getsettled) {
    return { type: paymentofflineConstants.GET_SETTLED_LIST_REQUEST, getsettled };
  }
  function success(getsettled) {
    return { type: paymentofflineConstants.GET_SETTLED_LIST_SUCCESS, getsettled };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_SETTLED_LIST_FAILURE, error };
  }
}

function getSapAging(customerCode, paymentCategory) {
  console.log(customerCode, "customerCode")
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getSapAging(customerCode, paymentCategory ).then(
      (getsapaging) => dispatch(success(getsapaging)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getsapaging) {
    return { type: paymentofflineConstants.GET_SAPAGING_REQUEST, getsapaging };
  }
  function success(getsapaging) {
    return { type: paymentofflineConstants.GET_SAPAGING_SUCCESS, getsapaging };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_SAPAGING_FAILURE, error };
  }
}

function getPaymentMode() {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getPaymentMode().then(
      (getpaymentmode) => dispatch(success(getpaymentmode)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getpaymentmode) {
    return { type: paymentofflineConstants.GET_PAYMENT_MODE_REQUEST, getpaymentmode};
  }
  function success(getpaymentmode) {
    return { type: paymentofflineConstants.GET_PAYMENT_MODE_SUCCESS, getpaymentmode };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_PAYMENT_MODE_FAILURE, error };
  }
}


function loadcacheData(soldToNo) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.loadcacheData(soldToNo).then(
      (loadcacheData) => dispatch(success(loadcacheData)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(loadcacheData) {
    return { type: paymentofflineConstants.GET_LOAD_CACHE_REQUEST, loadcacheData};
  }
  function success(loadcacheData) {
    return { type: paymentofflineConstants.GET_LOAD_CACHE_SUCCESS, loadcacheData };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_LOAD_CACHE_FAILURE, error };
  }
}




function getPaymentType(c_payment_mode) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getPaymentType(c_payment_mode).then(
      (getpaymenttype) => dispatch(success(getpaymenttype)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getpaymenttype) {
    return { type: paymentofflineConstants.GET_PAYMENT_TYPE_REQUEST, getpaymenttype};
  }
  function success(getpaymenttype) {
    return { type: paymentofflineConstants.GET_PAYMENT_TYPE_SUCCESS, getpaymenttype };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_PAYMENT_TYPE_FAILURE, error };
  }
}

function getPaymentBank() {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getPaymentBank().then(
      (getpaymentbank) => dispatch(success(getpaymentbank)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getpaymentbank) {
    return { type: paymentofflineConstants.GET_PAYMENT_BANK_REQUEST, getpaymentbank};
  }
  function success(getpaymentbank) {
    return { type: paymentofflineConstants.GET_PAYMENT_BANK_SUCCESS, getpaymentbank };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_PAYMENT_BANK_FAILURE, error };
  }
}



function getPendingPayment(paymentType, fromIndex,toIndex, custmerNo, defaultCat, serachValueData, startdateFinal, enddateFinal, doc, dueDate,documentDate, noOfDueDays) {
  console.log(paymentType, "action on paymentType")
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getPendingPayment(paymentType, fromIndex,toIndex, custmerNo, defaultCat, serachValueData, startdateFinal, enddateFinal, doc,dueDate,documentDate, noOfDueDays).then(
      (getpendingpay) => dispatch(success(getpendingpay)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getpendingpay) {
    return { type: paymentofflineConstants.GET_PAYMENT_PENDING_REQUEST, getpendingpay};
  }
  function success(getpendingpay) {
    return { type: paymentofflineConstants.GET_PAYMENT_PENDING_SUCCESS, getpendingpay };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_PAYMENT_PENDING_FAILURE, error };
  }
}


function getPendingPaymentStatus(status, custmerNo) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getPendingPaymentStatus(status, custmerNo).then(
      (getPendingPaymentStatus) => dispatch(success(getPendingPaymentStatus)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getPendingPaymentStatus) {
    return { type: paymentofflineConstants.GET_PAYMENT_PENDING_STATUS_REQUEST, getPendingPaymentStatus};
  }
  function success(getPendingPaymentStatus) {
    return { type: paymentofflineConstants.GET_PAYMENT_PENDING_STATUS_SUCCESS, getPendingPaymentStatus };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_PAYMENT_PENDING_STATUS_FAILURE, error };
  }
}





function getSettledPayment(paymentType,pamentTypeCat, romIndex,toIndex, custmerNo, defaultCat, searchText, startdateFinal, enddateFinal, doc) {
  console.log(paymentType, "action on paymentType")
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getSettledPayment(paymentType, pamentTypeCat, romIndex,toIndex, custmerNo, defaultCat, searchText, startdateFinal, enddateFinal, doc).then(
      (getSettledPayment) => dispatch(success(getSettledPayment)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getSettledPayment) {
    return { type: paymentofflineConstants.GET_PAYMENT_SETTLED_REQUEST, getSettledPayment};
  }
  function success(getSettledPayment) {
    return { type: paymentofflineConstants.GET_PAYMENT_SETTLED_SUCCESS, getSettledPayment };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_PAYMENT_SETTLED_FAILURE, error };
  }
}





function paymentStatus(statue,proID, summary) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.paymentStatus(statue,proID, summary).then(
      (paymentStatus) => dispatch(success(paymentStatus)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(paymentStatus) {
    return { type: paymentofflineConstants.PAYMENT_STATUS_REQUEST, paymentStatus};
  }
  function success(paymentStatus) {
    return { type: paymentofflineConstants.PAYMENT_STATUS_SUCCESS, paymentStatus };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_STATUS_FAILURE, error };
  }
}


function PaymentSummaryUpdate(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(paymentsummaryupdate) {
    return { type: paymentofflineConstants.PAYMENT_SUMMARY_UPDATE_REQUEST, paymentsummaryupdate };
  }
  function success(paymentsummaryupdate) {
    return { type: paymentofflineConstants.PAYMENT_SUMMARY_UPDATE_SUCCESS, paymentsummaryupdate };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_SUMMARY_UPDATE_FAILURE, error };

  }
}


function getCatForFilter(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(getCatForFilter) {
    return { type: paymentofflineConstants.PAYMENT_CAT_REQUEST, getCatForFilter };
  }
  function success(getCatForFilter) {
    return { type: paymentofflineConstants.PAYMENT_CAT_SUCCESS, getCatForFilter };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_CAT_FAILURE, error };

  }
}

function offlinegetPaymentStatus(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(offlinegetPaymentStatus) {
    return { type: paymentofflineConstants.OFFLINE_PAYMENT_STATUS_REQUEST, offlinegetPaymentStatus };
  }
  function success(offlinegetPaymentStatus) {
    return { type: paymentofflineConstants.OFFLINE_PAYMENT_STATUS_SUCCESS, offlinegetPaymentStatus };
  }
  function failure(error) {
    return { type: paymentofflineConstants.OFFLINE_PAYMENT_STATUS_FAILURE, error };

  }
}


function makePaymentData(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(makePaymentData) {
    return { type: paymentofflineConstants.MAKE_PAYMENT_STATUS_REQUEST, makePaymentData };
  }
  function success(makePaymentData) {
    return { type: paymentofflineConstants.MAKE_PAYMENT_STATUS_SUCCESS, makePaymentData };
  }
  function failure(error) {
    return { type: paymentofflineConstants.MAKE_PAYMENT_STATUS_FAILURE, error };

  }
}

function totalCheckedPandingData(data) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(data))
  };

  function request(totalCheckedPandingData) {
    return { type: paymentofflineConstants.CHECKED_DATA_STATUS_REQUEST, totalCheckedPandingData };
  }
  function success(totalCheckedPandingData) {
    return { type: paymentofflineConstants.CHECKED_DATA_STATUS_SUCCESS, totalCheckedPandingData };
  }
  function failure(error) {
    return { type: paymentofflineConstants.CHECKED_DATA_STATUS_FAILURE, error };

  }
}


function totalCheckedData(data) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(data))
  };

  function request(totalCheckedData) {
    return { type: paymentofflineConstants.GET_CHECKED_DATA_STATUS_REQUEST, totalCheckedData };
  }
  function success(totalCheckedData) {
    return { type: paymentofflineConstants.GET_CHECKED_DATA_STATUS_SUCCESS, totalCheckedData };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_CHECKED_DATA_STATUS_FAILURE, error };

  }
}





function getBayBankResponse(paymentRefNo, status) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getBayBankResponse(paymentRefNo, status).then(
      (getBayBankResponse) => dispatch(success(getBayBankResponse)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getBayBankResponse) {
    return { type: paymentofflineConstants.GET_BAY_BANK_STATUS_REQUEST, getBayBankResponse};
  }
  function success(getBayBankResponse) {
    return { type: paymentofflineConstants.GET_BAY_BANK_STATUS_SUCCESS, getBayBankResponse };
  }
  function failure(error) {
    return { type: paymentofflineConstants.GET_BAY_BANK_STATUS_FAILURE, error };
  }
}







function totalMakePaymentData(totalAmt, totalCount) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(totalAmt, totalCount))
  };
  

  function request(totalMakePaymentData, totalCount) {
    return { type: paymentofflineConstants.TOTAL_PAYMENT_STATUS_REQUEST, totalMakePaymentData, totalCount };
  }
  function success(totalMakePaymentData, totalCount) {
    return { type: paymentofflineConstants.TOTAL_PAYMENT_STATUS_SUCCESS, totalMakePaymentData, totalCount };
  }
  function failure(error) {
    return { type: paymentofflineConstants.TOTAL_PAYMENT_STATUS_FAILURE, error };

  }
}



function onPaymentMode(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(onPaymentMode) {
    return { type: paymentofflineConstants.PAYMENT_MODE_STATUS_REQUEST, onPaymentMode };
  }
  function success(onPaymentMode) {
    return { type: paymentofflineConstants.PAYMENT_MODE_STATUS_SUCCESS, onPaymentMode };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_MODE_STATUS_FAILURE, error };

  }
}

function onPaymentType(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(onPaymentType) {
    return { type: paymentofflineConstants.PAYMENT_TYPE_STATUS_REQUEST, onPaymentType };
  }
  function success(onPaymentType) {
    return { type: paymentofflineConstants.PAYMENT_TYPE_STATUS_SUCCESS, onPaymentType };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_TYPE_STATUS_FAILURE, error };

  }
}


function onBankName(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(onBankName) {
    return { type: paymentofflineConstants.PAYMENT_BANK_STATUS_REQUEST, onBankName };
  }
  function success(onBankName) {
    return { type: paymentofflineConstants.PAYMENT_BANK_STATUS_SUCCESS, onBankName };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_BANK_STATUS_FAILURE, error };

  }
}


function onPaymentDateChange(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(onPaymentDateChange) {
    return { type: paymentofflineConstants.PAYMENT_DATE_STATUS_REQUEST, onPaymentDateChange };
  }
  function success(onPaymentDateChange) {
    return { type: paymentofflineConstants.PAYMENT_DATE_STATUS_SUCCESS, onPaymentDateChange };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_DATE_STATUS_FAILURE, error };

  }
}

function confirmPaymentButton(data) { debugger
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.confirmPaymentButton(data).then(
      (confirmPaymentButton) => dispatch(success(confirmPaymentButton)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(confirmPaymentButton) {
    return { type: paymentofflineConstants.CONFIRM_PAYMENT_STATUS_REQUEST, confirmPaymentButton};
  }
  function success(confirmPaymentButton) {
    return { type: paymentofflineConstants.CONFIRM_PAYMENT_STATUS_SUCCESS, confirmPaymentButton };
  }
  function failure(error) {
    return { type: paymentofflineConstants.CONFIRM_PAYMENT_STATUS_FAILURE, error };
  }
}

function confirmPaymentButtonOnline(data) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.confirmPaymentButtonOnline(data).then(
      (confirmPaymentButtonOnline) => dispatch(success(confirmPaymentButtonOnline)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(confirmPaymentButtonOnline) {
    return { type: paymentofflineConstants.CONFIRM_PAYMENT_ONLINE_STATUS_REQUEST, confirmPaymentButtonOnline};
  }
  function success(confirmPaymentButtonOnline) {
    return { type: paymentofflineConstants.CONFIRM_PAYMENT_ONLINE_STATUS_SUCCESS, confirmPaymentButtonOnline };
  }
  function failure(error) {
    return { type: paymentofflineConstants.CONFIRM_PAYMENT_ONLINE_STATUS_FAILURE, error };
  }
}



function paymentHistoryData(data, fromIndex, toIndex, filtercat, defaultCat,startdateFinalTransDate, enddateFinalTransDate) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.paymentHistoryData(data, fromIndex, toIndex, filtercat, defaultCat,startdateFinalTransDate, enddateFinalTransDate).then(
      (paymentHistoryData) => dispatch(success(paymentHistoryData)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(paymentHistoryData) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_STATUS_REQUEST, paymentHistoryData};
  }
  function success(paymentHistoryData) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_STATUS_SUCCESS, paymentHistoryData };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_STATUS_FAILURE, error };
  }
}

function paymentHistoryDetail(data) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.paymentHistoryDetail(data).then(
      (paymentHistoryDetail) => dispatch(success(paymentHistoryDetail)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(paymentHistoryDetail) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_DETAILS_STATUS_REQUEST, paymentHistoryDetail};
  }
  function success(paymentHistoryDetail) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_DETAILS_STATUS_SUCCESS, paymentHistoryDetail };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_DETAILS_STATUS_FAILURE, error };
  }
}


function paymentHistoryDataDelete(data) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.paymentHistoryDataDelete(data).then(
      (paymentHistoryDataDelete) => dispatch(success(paymentHistoryDataDelete)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(paymentHistoryDataDelete) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_DELETE_STATUS_REQUEST, paymentHistoryDataDelete};
  }
  function success(paymentHistoryDataDelete) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_DELETE_STATUS_SUCCESS, paymentHistoryDataDelete };
  }
  function failure(error) {
    return { type: paymentofflineConstants.PAYMENT_HISTORY_DELETE_STATUS_FAILURE, error };
  }
}

function serachValue(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(serachValue) {
    return { type: paymentofflineConstants.ON_SEARCH_VALUE_REQUEST, serachValue };
  }
  function success(serachValue) {
    return { type: paymentofflineConstants.ON_SEARCH_VALUE_SUCCESS, serachValue };
  }
  function failure(error) {
    return { type: paymentofflineConstants.ON_SEARCH_VALUE_FAILURE, error };

  }
}

function getPaymentOfflineChartData(soldToNo, paymentCategory, fromdate, todate, filter) {
  return (dispatch) => {
    dispatch(request());

    paymentofflineService.getPaymentOfflineChartData(soldToNo, paymentCategory, fromdate, todate, filter).then(
      (getPaymentOfflineChartData) => dispatch(success(getPaymentOfflineChartData)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getPaymentOfflineChartData) {
    return { type: paymentofflineConstants. GET_PAYMENT_CHART_FILTER_REQUEST, getPaymentOfflineChartData};
  }
  function success(getPaymentOfflineChartData) {
    return { type: paymentofflineConstants. GET_PAYMENT_CHART_FILTER_SUCCESS, getPaymentOfflineChartData };
  }
  function failure(error) {
    return { type: paymentofflineConstants. GET_PAYMENT_CHART_FILTER_FAILURE, error };
  }
}


















