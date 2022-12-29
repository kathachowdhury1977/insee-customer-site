import { paymentofflineConstants } from "../_constants";

export function onPaymentDateChange(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_DATE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_DATE_STATUS_SUCCESS:
      return {
        onPaymentDateChange: action.onPaymentDateChange,
      };
    case paymentofflineConstants.PAYMENT_DATE_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
