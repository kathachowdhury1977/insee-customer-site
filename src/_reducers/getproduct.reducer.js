import { orderConstants } from "../_constants";

export function getproduct(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_PRODUCT_SUCCESS:
      return {
        getproduct: action.getproduct,
      };
    case orderConstants.GET_PRODUCT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
