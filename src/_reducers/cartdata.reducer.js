import { orderConstants } from "../_constants";

export function cartdata(state = {}, action) {
  switch (action.type) {
    case orderConstants.CART_DATA_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CART_DATA_SUCCESS:
      return {
        cartdata: action.cartdata,
        errorMsg : action.error
      };
    case orderConstants.CART_DATA_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
