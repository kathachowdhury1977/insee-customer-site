import { paymentofflineConstants } from "../_constants";

export function onPaymentType(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_TYPE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_TYPE_STATUS_SUCCESS:
      return {
        onPaymentType: action.onPaymentType,
      };
    case paymentofflineConstants.PAYMENT_TYPE_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
