
import { orderConstants } from "../_constants";

export function isPlantsSelected(state = {}, action) {
  switch (action.type) {
    case orderConstants.CHECK_PLANT_SELECTED_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CHECK_PLANT_SELECTED_SUCCESS:
      return {
        isPlantsSelected: action.isPlantsSelected,
      };
    case orderConstants.CHECK_PLANT_SELECTED_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function placeOrderFilterSearchClicked(state = {}, action) {
  switch (action.type) {
    case orderConstants.PLACE_ORDER_SEARCH_CLICKED_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.PLACE_ORDER_SEARCH_CLICKED_SUCCESS:
      return {
        placeOrderFilterSearchClicked: action.placeOrderFilterSearchClicked,
      };
    case orderConstants.PLACE_ORDER_SEARCH_CLICKED_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function ShipingCondSelected(state = {}, action) {
  switch (action.type) {
    case orderConstants.CHECK_SHIPPING_COND_SELECTED_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CHECK_SHIPPING_COND_SELECTED_SUCCESS:
      return {
        ShipingCondSelected: action.ShipingCondSelected,
      };
    case orderConstants.CHECK_SHIPPING_COND_SELECTED_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function ShipingTypeSelected(state = {}, action) {
  switch (action.type) {
    case orderConstants.CHECK_SHIPPING_TYPE_SELECTED_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CHECK_SHIPPING_TYPE_SELECTED_SUCCESS:
      return {
        ShipingTypeSelected: action.ShipingTypeSelected,
      };
    case orderConstants.CHECK_SHIPPING_TYPE_SELECTED_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


