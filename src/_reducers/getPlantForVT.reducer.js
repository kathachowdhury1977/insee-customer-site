import { masterConstants } from "../_constants";

export function plantbyCountryForVN(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PLANTBY_COUNTRY_VN_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PLANTBY_COUNTRY_VN_SUCCESS:
      return {
        plantbyCountryForVN: action.plantbyCountryForVN,
      };
    case masterConstants.GET_PLANTBY_COUNTRY_VN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
