import { caseConstants } from "../_constants";

export function getAllCase(state = {}, action) {
  switch (action.type) {
    case caseConstants.GETALL_CASE_REQUEST:
      return {
        loading: true,
      };
    case caseConstants.GETALL_CASE_SUCCESS:
      return {
        getAllCase: action.getAllCase,
      };
    case caseConstants.GETALL_CASE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
