import { paymentofflineConstants } from "../_constants";

export function getavailablity(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_AVAILABLITY_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_AVAILABLITY_SUCCESS:
      return {
        getavailablity: action.getavailablity,
      };
    case paymentofflineConstants.GET_AVAILABLITY_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
export function getsapaging(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_SAPAGING_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_SAPAGING_SUCCESS:
      return {
        getsapaging: action.getsapaging,
      };
    case paymentofflineConstants.GET_SAPAGING_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function getpaymentmode(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_PAYMENT_MODE_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_PAYMENT_MODE_SUCCESS:
      return {
        getpaymentmode: action.getpaymentmode,
      };
    case paymentofflineConstants.GET_PAYMENT_MODE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function getpaymenttype(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_PAYMENT_TYPE_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_PAYMENT_TYPE_SUCCESS:
      return {
        getpaymenttype: action.getpaymenttype,
      };
    case paymentofflineConstants.GET_PAYMENT_TYPE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function getpaymentbank(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_PAYMENT_BANK_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_PAYMENT_BANK_SUCCESS:
      return {
        getpaymentbank: action.getpaymentbank,
      };
    case paymentofflineConstants.GET_PAYMENT_BANK_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function getpendingpay(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_PAYMENT_PENDING_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_PAYMENT_PENDING_SUCCESS:
      return {
        getpendingpay: action.getpendingpay,
      };
    case paymentofflineConstants.GET_PAYMENT_PENDING_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}



export function getpaymentstatus(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_PAYMENT_PENDING_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_PAYMENT_PENDING_SUCCESS:
      return {
        getpaymentstatus: action.getpaymentstatus,
      };
    case paymentofflineConstants.GET_PAYMENT_PENDING_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


export function paymentStatus(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_STATUS_SUCCESS:
      return {
        paymentStatus: action.paymentStatus,
      };
    case paymentofflineConstants.PAYMENT_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


export function paymentsummaryupdate(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_SUMMARY_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_SUMMARY_UPDATE_SUCCESS:
      return {
        paymentsummaryupdate: action.paymentsummaryupdate,
      };
    case paymentofflineConstants.PAYMENT_SUMMARY_UPDATE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}