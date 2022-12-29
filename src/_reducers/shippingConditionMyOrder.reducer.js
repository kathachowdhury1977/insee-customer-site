import { masterConstants } from "../_constants";

export function shippingConditionMyOrderValue(state = {}, action) {
  switch (action.type) {
    case masterConstants.SHIPPING_CONDITION_VALUE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.SHIPPING_CONDITION_VALUE_SUCCESS:
      return {
        shippingConditionMyOrderValue: action.shippingConditionMyOrderValue,
      };
    case masterConstants.GET_SHIPPING_CONDITION_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
