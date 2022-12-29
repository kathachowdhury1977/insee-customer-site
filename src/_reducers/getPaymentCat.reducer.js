import { paymentofflineConstants } from "../_constants";

export function getCatForFilter(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_CAT_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_CAT_SUCCESS:
      return {
        getCatForFilter: action.getCatForFilter,
      };
    case paymentofflineConstants.PAYMENT_CAT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
