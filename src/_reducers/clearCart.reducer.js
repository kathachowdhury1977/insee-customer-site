import { orderConstants } from "../_constants";

export function clearCart(state = {}, action) {
  switch (action.type) {
    case orderConstants.CLEAR_CART_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CLEAR_CART_SUCCESS:
      return {
        clearCart: action.clearCart,
      };
    case orderConstants.CLEAR_CART_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


export function deleteProductFormCart(state = {}, action) {
  switch (action.type) {
    case orderConstants.DELETE_PRODUCT_FROM_CART_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.DELETE_PRODUCT_FROM_CART_SUCCESS:
      return {
        deleteProductFormCart: action.deleteProductFormCart,
      };
    case orderConstants.DELETE_PRODUCT_FROM_CART_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
