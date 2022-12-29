import { paymentofflineConstants } from "../_constants";

export function totalCheckedPandingData(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.CHECKED_DATA_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.CHECKED_DATA_STATUS_SUCCESS:
      return {
        totalCheckedPandingData: action.totalCheckedPandingData,
      };
    case paymentofflineConstants.CHECKED_DATA_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
