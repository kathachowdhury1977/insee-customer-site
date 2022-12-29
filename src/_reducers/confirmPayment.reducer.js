import { paymentofflineConstants } from "../_constants";

export function confirmPaymentButton(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.CONFIRM_PAYMENT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.CONFIRM_PAYMENT_STATUS_SUCCESS:
      return {
        confirmPaymentButton: action.confirmPaymentButton,
      };
    case paymentofflineConstants.CONFIRM_PAYMENT_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
