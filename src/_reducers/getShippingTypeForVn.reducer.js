import { orderConstants } from "../_constants";

export function getShippingTypeForVn(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_SHIPPING_TYPE_VN_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_SHIPPING_TYPE_VN_SUCCESS:
      return {
        getShippingTypeForVn: action.getShippingTypeForVn,
      };
    case orderConstants.GET_SHIPPING_TYPE_VN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
