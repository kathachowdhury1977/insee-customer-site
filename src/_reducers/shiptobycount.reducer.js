import { masterConstants } from "../_constants";

export function shiptobycount(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPTO_COUNTRY_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPTO_COUNTRY_SUCCESS:
      return {
        shiptobycount: action.shiptobycount,
      };
    case masterConstants.GET_SHIPTO_COUNTRY_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
