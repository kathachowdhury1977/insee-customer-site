import { orderConstants } from "../_constants";

export function getShippingCondForVn(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_SHIPPING_VN_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_SHIPPING_VN_SUCCESS:
      return {
        getShippingCondForVn: action.getShippingCondForVn,
      };
    case orderConstants.GET_SHIPPING_VN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
