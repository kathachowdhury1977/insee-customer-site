import { masterConstants } from "../_constants";

export function searchByNoValue(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SEARCHBY_VALUE_MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SEARCHBY_VALUE_MY_ORDER_SUCCESS:
      return {
        searchByNoValue: action.searchByNoValue,
      };
    case masterConstants.GET_SEARCHBY_VALUE_MY_ORDER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
