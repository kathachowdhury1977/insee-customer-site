import { paymentofflineConstants } from "../_constants";

export function totalCheckedData(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_CHECKED_DATA_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_CHECKED_DATA_STATUS_SUCCESS:
      return {
        totalCheckedData: action.totalCheckedData,
      };
    case paymentofflineConstants.GET_CHECKED_DATA_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
