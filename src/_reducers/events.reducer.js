import { eventConstants } from "../_constants";

export function events(state = {}, action) {
  switch (action.type) {
    case eventConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.GETALL_SUCCESS:
      return {
        items: action.events,
      };
    case eventConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case eventConstants.REGISTER_REQUEST:
      return { registering: true };
    case eventConstants.REGISTER_SUCCESS:
      return {};
    case eventConstants.REGISTER_FAILURE:
      return {};

    default:
      return state;
  }
}
