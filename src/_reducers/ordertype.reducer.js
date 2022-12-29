import { masterConstants } from "../_constants";

export function ordertype(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_ORDER_TYPE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_ORDER_TYPE_SUCCESS:
      return {
        ordertype: action.ordertype,
      };
    case masterConstants.GET_ORDER_TYPE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
