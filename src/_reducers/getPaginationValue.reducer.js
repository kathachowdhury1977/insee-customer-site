import { masterConstants } from "../_constants";

export function paginationValue(state = {}, action) {
  switch (action.type) {
    case masterConstants.PAGINATION_VALUE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.PAGINATION_VALUE_SUCCESS:
      return {
        paginationValue: action.paginationValue,
      };
    case masterConstants.GET_PAGINATION_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
