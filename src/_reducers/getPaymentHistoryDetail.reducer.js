import { paymentofflineConstants } from "../_constants";

export function paymentHistoryDetail(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_HISTORY_DETAILS_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_DETAILS_STATUS_SUCCESS:
      return {
        paymentHistoryDetail: action.paymentHistoryDetail,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_DETAILS_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
