import { orderConstants } from "../_constants";

export function raiseReleaseRequest(state = {}, action) {
  switch (action.type) {
    case orderConstants.RAISE_RELEASE_REQUEST_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.RAISE_RELEASE_REQUEST_SUCCESS:
      return {
        raiseReleaseRequest: action.raiseReleaseRequest,
      };
    case orderConstants.RAISE_RELEASE_REQUEST_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
