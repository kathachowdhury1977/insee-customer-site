import { masterConstants } from "../_constants";

export function preftrucktype(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PREF_TRUCK_TYPE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PREF_TRUCK_TYPE_SUCCESS:
      return {
        preftrucktype: action.preftrucktype,
      };
    case masterConstants.GET_PREF_TRUCK_TYPE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
