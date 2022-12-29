import { orderConstants } from "../_constants";

export function orderdata(state = {}, action) {
  switch (action.type) {
    case orderConstants.ORDER_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.ORDER_SUCCESS:
      return {
        orderdata: action.orderdata,
      };
    case orderConstants.ORDER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
