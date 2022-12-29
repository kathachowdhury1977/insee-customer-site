import { eventConstants } from "../_constants";

export function getShipToForShipment(state = {}, action) {
  switch (action.type) {
    case eventConstants.GET_SHIP_TO_SHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.GET_SHIP_TO_SHIPMENT_SUCCESS:
      return {
        getShipToForShipment: action.getShipToForShipment,
      };
    case eventConstants.GET_SHIP_TO_SHIPMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
