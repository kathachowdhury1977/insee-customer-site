import { masterConstants } from "../_constants";

export function shipToForShipment(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPTO_FORSHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPTO_FORSHIPMENT_SUCCESS:
      return {
        shipToForShipment: action.shipToForShipment,
      };
    case masterConstants.GET_SHIPTO_FORSHIPMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
