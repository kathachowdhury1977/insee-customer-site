import { orderConstants } from "../_constants";

export function placeOrder(state = {}, action) {
  switch (action.type) {
    case orderConstants.PLACE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.PLACE_ORDER_SUCCESS:
      return {
        placeOrder: action.placeOrder,
      };
    case orderConstants.PLACE_ORDER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
