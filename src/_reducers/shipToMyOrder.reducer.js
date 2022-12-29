import { masterConstants } from "../_constants";

export function shipToMyOrder(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIP_TO_MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIP_TO_MY_ORDER_SUCCESS:
      return {
        shipToMyOrder: action.shipToMyOrder,
      };
    case masterConstants.GET_SHIP_TO_MY_ORDER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
