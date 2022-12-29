import { masterConstants } from "../_constants";

export function getShipToForVn(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPTO_SHIP_VN_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPTO_SHIP_VN_SUCCESS:
      return {
        getShipToForVn: action.getShipToForVn,
      };
    case masterConstants.GET_SHIPTO_SHIP_VN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
