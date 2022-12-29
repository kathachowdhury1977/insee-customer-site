import { masterConstants } from "../_constants";

export function getCaseType(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_CASE_TYPE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_CASE_TYPE_SUCCESS:
      return {
        getCaseType: action.getCaseType,
      };
    case masterConstants.GET_CASE_TYPE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
