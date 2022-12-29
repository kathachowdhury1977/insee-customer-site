import { eventConstants } from "../_constants";

export function getProductForShipment(state = {}, action) {
  switch (action.type) {
    case eventConstants.GET_PRODUCT_ID_SHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.GET_PRODUCT_ID_SHIPMENT_SUCCESS:
      return {
        getProductForShipment: action.getProductForShipment,
      };
    case eventConstants.GET_PRODUCT_ID_SHIPMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
