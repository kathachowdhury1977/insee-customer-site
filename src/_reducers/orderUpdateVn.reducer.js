import { orderConstants } from "../_constants";

export function orderUpdateVN(state = {}, action) {
  switch (action.type) {
    case orderConstants.ORDER_UPDATE_VN_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.ORDER_UPDATE_VN_SUCCESS:
      return {
        orderUpdateVN: action.orderUpdateVN,
      };
    case orderConstants.ORDER_UPDATE_VN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
