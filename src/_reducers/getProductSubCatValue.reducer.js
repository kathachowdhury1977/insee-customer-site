
import { masterConstants } from "../_constants";

export function getProductSubCatLevelValue(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PRODUCT_SUB_CATEGORY_LAVEL_VALUE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PRODUCT_SUB_CATEGORY_LAVEL_VALUE_SUCCESS:
      return {
        getProductSubCatLevelValue: action.getProductSubCatLevelValue,
      };
    case masterConstants.GET_PRODUCT_SUB_CATEGORY_LAVEL_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}