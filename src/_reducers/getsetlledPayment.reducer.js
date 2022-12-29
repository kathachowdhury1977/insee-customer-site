import { paymentofflineConstants } from "../_constants";

export function getSettledPayment(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_PAYMENT_SETTLED_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_PAYMENT_SETTLED_SUCCESS:
      return {
        getSettledPayment: action.getSettledPayment,
      };
    case paymentofflineConstants.GET_PAYMENT_SETTLED_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
