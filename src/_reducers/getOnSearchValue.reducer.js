import { paymentofflineConstants } from "../_constants";

export function serachValue(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.ON_SEARCH_VALUE_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.ON_SEARCH_VALUE_SUCCESS:
      return {
        serachValue: action.serachValue,
      };
    case paymentofflineConstants.ON_SEARCH_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
