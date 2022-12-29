import { orderConstants } from "../_constants";

export function cancelSO(state = {}, action) {
  switch (action.type) {
    case orderConstants.CANCEL_SO_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CANCEL_SO_SUCCESS:
      return {
        cancelSO: action.cancelSO,
      };
    case orderConstants.CANCEL_SO_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
