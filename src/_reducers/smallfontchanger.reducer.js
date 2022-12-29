import { eventConstants } from "../_constants";

export function smallfontchanger(state = {}, action) {
  switch (action.type) {
    case eventConstants.SMALL_FONT_CHANGER_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.SMALL_FONT_CHANGER_SUCCESS:
      return {
        smallfontchanger: action.smallfontchanger,
      };
    case eventConstants.SMALL_FONT_CHANGER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}