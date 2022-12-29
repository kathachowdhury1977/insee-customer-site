import { masterConstants } from "../_constants";

export function getprovince(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_PROVINCE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_PROVINCE_SUCCESS:
      return {
        getprovince: action.getprovince,
      };
    case masterConstants.GET_PROVINCE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
