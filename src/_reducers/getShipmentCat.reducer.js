import { masterConstants } from "../_constants";

export function getShipCatValue(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPMENT_CAT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPMENT_CAT_SUCCESS:
      return {
        getShipCatValue: action.getShipCatValue,
      };
    case masterConstants.GET_SHIPMENT_CAT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
