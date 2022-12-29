import { eventConstants } from "../_constants";

export function getPlantIdForShipment(state = {}, action) {
  switch (action.type) {
    case eventConstants.GET_PLANT_ID_SHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.GET_PLANT_ID_SHIPMENT_SUCCESS:
      return {
        getPlantIdForShipment: action.getPlantIdForShipment,
      };
    case eventConstants.GET_PLANT_ID_SHIPMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
