import { masterConstants } from "../_constants";

export function specialpro(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SPECIAL_PROJECT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SPECIAL_PROJECT_SUCCESS:
      return {
        specialpro: action.specialpro,
      };
    case masterConstants.GET_SPECIAL_PROJECT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
