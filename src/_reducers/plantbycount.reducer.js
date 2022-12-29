import { masterConstants } from "../_constants";

export function plantbycount(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PLANTBY_COUNTRY_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PLANTBY_COUNTRY_SUCCESS:
      return {
        plantbycount: action.plantbycount,
      };
    case masterConstants.GET_PLANTBY_COUNTRY_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
