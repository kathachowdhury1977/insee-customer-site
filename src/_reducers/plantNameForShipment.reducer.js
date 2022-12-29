import { masterConstants } from "../_constants";

export function plantNameForShipment(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PLANT_FORSHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PLANT_FORSHIPMENT_SUCCESS:
      return {
        plantNameForShipment: action.plantNameForShipment,
      };
    case masterConstants.GET_PLANT_FORSHIPMEN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
