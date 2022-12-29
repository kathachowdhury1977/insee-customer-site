import { orderConstants } from "../_constants";

export function getShipToDetails(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_SHIPTO_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_SHIPTO_DETAILS_SUCCESS:
      return {
        getShipToDetails: action.getShipToDetails,
      };
    case orderConstants.GET_SHIPTO_DETAILS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
