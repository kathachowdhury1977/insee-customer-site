import { paymentofflineConstants } from "../_constants";

export function onPaymentMode(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_MODE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_MODE_STATUS_SUCCESS:
      return {
        onPaymentMode: action.onPaymentMode,
      };
    case paymentofflineConstants.PAYMENT_MODE_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
