
import { masterConstants } from "../_constants";

export function getProductSubCatLevel(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PRODUCT_SUB_CAT_VALUE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PRODUCT_SUB_CAT_VALUE_SUCCESS:
      return {
        getProductSubCatLevel: action.getProductSubCatLevel,
      };
    case masterConstants.GET_PRODUCT_SUB_CAT_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}