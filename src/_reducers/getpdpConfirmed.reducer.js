import { orderConstants } from "../_constants";

export function pdpConfirmed(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_PDP_CONFIRMED_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_PDP_CONFIRMED_SUCCESS:
      return {
        pdpConfirmed: action.pdpConfirmed,
      };
    case orderConstants.GET_PDP_CONFIRMED_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
