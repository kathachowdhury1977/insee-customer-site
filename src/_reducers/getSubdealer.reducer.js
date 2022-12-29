import { masterConstants } from "../_constants";
export function getSubdealer(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SUB_DEALER_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SUB_DEALER_SUCCESS:
      return {
        getSubdealer: action.getSubdealer,
      };
    case masterConstants.GET_SUB_DEALER_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
