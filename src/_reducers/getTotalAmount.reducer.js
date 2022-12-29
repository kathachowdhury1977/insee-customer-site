import { paymentofflineConstants } from "../_constants";

export function totalMakePaymentData(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.TOTAL_PAYMENT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.TOTAL_PAYMENT_STATUS_SUCCESS:
      return {
        totalMakePaymentData: action.totalMakePaymentData,
        totalCount: action.totalCount
      };
    case paymentofflineConstants.TOTAL_PAYMENT_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
