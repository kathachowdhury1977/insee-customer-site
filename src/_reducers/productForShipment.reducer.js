import { masterConstants } from "../_constants";

export function productForShipment(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PRODUCT_FORSHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PRODUCT_FORSHIPMENT_SUCCESS:
      return {
        productForShipment: action.productForShipment,
      };
    case masterConstants.GET_PRODUCT_FORSHIPMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
