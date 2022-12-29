import { eventConstants } from "../_constants";

export function addclasswithstyle(state = {}, action) {
  switch (action.type) {
    case eventConstants.ADD_CLASS_WITH_STYLE_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.ADD_CLASS_WITH_STYLE_SUCCESS:
      return {
        addclasswithstyle: action.addclasswithstyle,
      };
    case eventConstants.ADD_CLASS_WITH_STYLE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}