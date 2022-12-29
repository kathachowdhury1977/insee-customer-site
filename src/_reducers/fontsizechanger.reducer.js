import { eventConstants } from "../_constants";

export function fontsizechanger(state = {}, action) {
  switch (action.type) {
    case eventConstants.FONT_SIZE_CHANGER_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.FONT_SIZE_CHANGER_SUCCESS:
      return {
        fontsizechanger: action.fontsizechanger,
      };
    case eventConstants.FONT_SIZE_CHANGER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}