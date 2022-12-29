import { masterConstants } from "../_constants";

export function searchByOrderNo(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SEARCH_BY_ORDER_NO_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SEARCH_BY_ORDER_NO_SUCCESS:
      return {
        searchByOrderNo: action.searchByOrderNo,
      };
    case masterConstants.GET_SEARCH_BY_ORDER_NO_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
