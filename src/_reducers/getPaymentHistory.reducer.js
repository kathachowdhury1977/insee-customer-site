import { paymentofflineConstants } from "../_constants";

export function paymentHistoryData(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_HISTORY_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_STATUS_SUCCESS:
      return {
        paymentHistoryData: action.paymentHistoryData,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
