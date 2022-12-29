import { masterConstants } from "../_constants";

export function shippingcondition(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPPING_CONDITION_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPPING_CONDITION_SUCCESS:
      return {
        shippingcondition: action.shippingcondition,
      };
    case masterConstants.GET_SHIPPING_CONDITION_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
