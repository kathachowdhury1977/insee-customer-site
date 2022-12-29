import { masterConstants } from "../_constants";

export function getCaseCategory(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_CASE_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_CASE_CATEGORY_SUCCESS:
      return {
        getCaseCategory: action.getCaseCategory,
      };
    case masterConstants.GET_CASE_CATEGORY_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
