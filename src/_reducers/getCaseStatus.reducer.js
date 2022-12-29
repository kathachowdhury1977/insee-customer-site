import { masterConstants } from "../_constants";

export function getCaseStatus(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_CASE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_CASE_STATUS_SUCCESS:
      return {
        getCaseStatus: action.getCaseStatus,
      };
    case masterConstants.GET_CASE_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
