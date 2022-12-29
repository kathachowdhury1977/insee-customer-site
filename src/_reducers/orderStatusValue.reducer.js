import { masterConstants } from "../_constants";

export function orderByStatusValue(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_ORDERBY_STATUS_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_ORDERBY_STATUS_SUCCESS:
      return {
        orderByStatusValue: action.orderByStatusValue,
      };
    case masterConstants.GET_ORDERBY_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
