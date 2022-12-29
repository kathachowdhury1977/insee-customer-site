import { orderConstants } from "../_constants";

export function orderdetail(state = {}, action) {
  switch (action.type) {
    case orderConstants.ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.ORDER_DETAIL_SUCCESS:
      return {
        orderdetail: action.orderdetail,
      };
    case orderConstants.ORDER_DETAIL_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
