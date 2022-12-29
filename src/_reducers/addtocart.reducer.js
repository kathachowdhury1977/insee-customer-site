import { orderConstants } from "../_constants";

export function addtocart(state = {}, action) {
  switch (action.type) {
    case orderConstants.ADD_TO_CART_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.ADD_TO_CART_SUCCESS:
      return {
        addtocart: action.addtocart,
        errorMsg : action.error
       
      };
    case orderConstants.ADD_TO_CART_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
