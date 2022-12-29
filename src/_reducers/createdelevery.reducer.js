import { eventConstants } from "../_constants";

export function createDelivery(state = {}, action) {
  switch (action.type) {
    case eventConstants.CREATE_DELIVERY_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.CREATE_DELIVERY_SUCCESS:
      return {
        createDelivery: action.createDelivery,
      };
    case eventConstants.CREATE_DELIVERY_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
