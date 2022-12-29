import { paymentofflineConstants } from "../_constants";

export function getPendingPaymentStatus(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_PAYMENT_PENDING_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_PAYMENT_PENDING_STATUS_SUCCESS:
      return {
        getPendingPaymentStatus: action.getPendingPaymentStatus,
      };
    case paymentofflineConstants.GET_PAYMENT_PENDING_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
