import { eventConstants } from "../_constants";

export function headerfontchanger(state = {}, action) {
  switch (action.type) {
    case eventConstants.HEADER_FONT_CHANGER_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.HEADER_FONT_CHANGER_SUCCESS:
      return {
        headerfontchanger: action.headerfontchanger,
      };
    case eventConstants.HEADER_FONT_CHANGER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}