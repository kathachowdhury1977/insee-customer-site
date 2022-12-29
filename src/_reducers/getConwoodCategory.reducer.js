
import { orderConstants } from "../_constants";

export function getConwoodCategory(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_CONWOOD_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_CONWOOD_CATEGORY_SUCCESS:
      return {
        getConwoodCategory: action.getConwoodCategory,
      };
    case orderConstants.GET_CONWOOD_CATEGORY_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


export function getSelectedOrderInCheckout(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_SELECTED_ORDER_CHECKOUT_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_SELECTED_ORDER_CHECKOUT_SUCCESS:
      return {
        getSelectedOrderInCheckout: action.getSelectedOrderInCheckout,
      };
    case orderConstants.GET_SELECTED_ORDER_CHECKOUT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
