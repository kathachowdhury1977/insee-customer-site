import { eventConstants } from "../_constants";
export function deliveryUpdate(state = {}, action) {
  switch (action.type) {
    case eventConstants.DELIVERYUPDATE_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.DELIVERYUPDATE_SUCCESS:
      return {
        deliveryUpdate: action.deliveryUpdate,
      };
    case eventConstants.DELIVERYUPDATE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
