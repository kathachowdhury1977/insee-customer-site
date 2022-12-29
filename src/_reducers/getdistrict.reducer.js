import { masterConstants } from "../_constants";

export function getdistrict(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_DISTRICT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_DISTRICT_SUCCESS:
      return {
        getdistrict: action.getdistrict,
      };
    case masterConstants.GET_DISTRICT_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
