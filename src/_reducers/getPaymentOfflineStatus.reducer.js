import { paymentofflineConstants } from "../_constants";

export function offlinegetPaymentStatus(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.OFFLINE_PAYMENT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.OFFLINE_PAYMENT_STATUS_SUCCESS:
      return {
        offlinegetPaymentStatus: action.offlinegetPaymentStatus,
      };
    case paymentofflineConstants.OFFLINE_PAYMENT_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
