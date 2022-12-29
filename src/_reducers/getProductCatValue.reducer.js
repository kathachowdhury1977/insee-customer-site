
import { masterConstants } from "../_constants";

export function getProductCatLevel(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PRODUCT_CAT_VALUE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PRODUCT_CAT_VALUE_SUCCESS:
      return {
        getProductCatLevel: action.getProductCatLevel,
      };
    case masterConstants.GET_PRODUCT_CAT_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}