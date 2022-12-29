import { paymentofflineConstants } from "../_constants";

export function paymentHistoryDataDelete(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_HISTORY_DELETE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_DELETE_STATUS_SUCCESS:
      return {
        paymentHistoryDataDelete: action.paymentHistoryDataDelete,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_DELETE_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
