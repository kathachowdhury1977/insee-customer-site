
import { orderConstants } from "../_constants";

export function isShipToSelected(state = {}, action) {
  switch (action.type) {
    case orderConstants.CHECK_SHIPTO_SELECTED_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CHECK_SHIPTO_SELECTED_SUCCESS:
      return {
        isShipToSelected: action.isShipToSelected,
      };
    case orderConstants.CHECK_SHIPTO_SELECTED_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
