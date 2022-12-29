import { caseConstants } from "../_constants";

export function getCase(state = {}, action) {
  switch (action.type) {
    case caseConstants.GET_CASE_REQUEST:
      return {
        loading: true,
      };
    case caseConstants.GET_CASE_SUCCESS:
      return {
        getCase: action.getCase,
      };
    case caseConstants.GET_CASE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
