import { eventConstants } from "../_constants";

export function createpickup(state = {}, action) {
  switch (action.type) {
    case eventConstants.CREATE_PICKUP_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.CREATE_PICKUP_SUCCESS:
      return {
        createpickup: action.createpickup,
      };
    case eventConstants.CREATE_PICKUP_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
