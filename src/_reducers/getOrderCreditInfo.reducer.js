import { orderConstants } from "../_constants";

export function getOrderCreditInfo(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_ORDER_CREDITINFO_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_ORDER_CREDITINFO_SUCCESS:
      return {
        getOrderCreditInfo: action.getOrderCreditInfo,
      };
    case orderConstants.GET_ORDER_CREDITINFO_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
