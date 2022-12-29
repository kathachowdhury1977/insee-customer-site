
import { masterConstants } from "../_constants";

export function getProductCatLevelValue(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PRODUCT_CATEGORY_LAVEL_VALUE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PRODUCT_CATEGORY_LAVEL_VALUE_SUCCESS:
      return {
        getProductCatLevelValue: action.getProductCatLevelValue,
      };
    case masterConstants.GET_PRODUCT_CATEGORY_LAVEL_VALUE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}