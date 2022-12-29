import { orderConstants } from "../_constants";

export function getallproduct(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_ALL_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_ALL_PRODUCT_SUCCESS:
      return {
        getallproduct: action.getallproduct,
      };
    case orderConstants.GET_ALL_PRODUCT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
