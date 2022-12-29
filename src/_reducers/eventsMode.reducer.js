import { eventConstants } from "../_constants";

export function eventMode(state = {}, action) {
  switch (action.type) {
    case eventConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.GETALL_SUCCESS:
      return {
        eventMode: action.eventMode,
      };
    case eventConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
