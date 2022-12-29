import { masterConstants } from "../_constants";

export function getRemarks(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_REAMRKS_NOTE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_REAMRKS_NOTE_SUCCESS:
      return {
        getRemarks: action.getRemarks,
      };
    case masterConstants.GET_REAMRKS_NOTE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
