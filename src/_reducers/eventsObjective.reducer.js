import { eventConstants } from "../_constants";

export function eventObjective(state = {}, action) {
  switch (action.type) {
    case eventConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.GETALL_SUCCESS:
      return {
        eventObjective: action.eventObjective,
      };
    case eventConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
