import { masterConstants } from "../_constants";

export function shippingtype(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPPING_TYPE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPPING_TYPE_SUCCESS:
      return {
        shippingtype: action.shippingtype,
      };
    case masterConstants.GET_SHIPPING_TYPE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


export function shippingtypemyorder(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPPING_TYPE_MYORDER_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPPING_TYPE_MYORDER_SUCCESS:
      return {
        shippingtypemyorder: action.shippingtypemyorder,
      };
    case masterConstants.GET_SHIPPING_TYPE_MYORDER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
