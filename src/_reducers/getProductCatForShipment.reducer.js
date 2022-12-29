
import { masterConstants } from "../_constants";

export function getProductCatForShipment(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PRODUCT_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PRODUCT_CATEGORY_SUCCESS:
      return {
        getProductCatForShipment: action.getProductCatForShipment,
      };
    case masterConstants.GET_PRODUCT_CATEGORY_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}