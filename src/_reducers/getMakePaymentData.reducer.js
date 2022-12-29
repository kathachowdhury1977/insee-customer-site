import { paymentofflineConstants } from "../_constants";

export function makePaymentData(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.MAKE_PAYMENT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.MAKE_PAYMENT_STATUS_SUCCESS:
      return {
        makePaymentData: action.makePaymentData,
        
      };
    case paymentofflineConstants.MAKE_PAYMENT_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
