import { masterConstants } from "../_constants";

export function shipTypeValueMyOredr(state = {}, action) {
  switch (action.type) {
    case masterConstants.SHIPPING_TYPE_VALUE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.SHIPPING_TYPE_VALUE_SUCCESS:
      return {
        shipTypeValueMyOredr: action.shipTypeValueMyOredr,
      };
    case masterConstants.GET_SHIPPING_TYPE_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
