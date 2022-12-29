import { orderConstants } from "../_constants";

export function raiseReleaseRequestVN(state = {}, action) {
  switch (action.type) {
    case orderConstants.RAISE_RELEASE_VN_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.RAISE_RELEASE_VN_SUCCESS:
      return {
        raiseReleaseRequestVN: action.raiseReleaseRequestVN,
      };
    case orderConstants.RAISE_RELEASE_VN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
