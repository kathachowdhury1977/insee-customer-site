import { paymentofflineConstants } from "../_constants";

export function confirmPaymentButtonOnline(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.CONFIRM_PAYMENT_ONLINE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.CONFIRM_PAYMENT_ONLINE_STATUS_SUCCESS:
      return {
        confirmPaymentButtonOnline: action.confirmPaymentButtonOnline,
      };
    case paymentofflineConstants.CONFIRM_PAYMENT_ONLINE_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
