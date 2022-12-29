import { orderConstants } from "../_constants";

export function getCustomerPdpInfo(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_PDP_INFO_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_PDP_INFO_SUCCESS:
      return {
        getCustomerPdpInfo: action.getCustomerPdpInfo,
      };
    case orderConstants.GET_PDP_INFO_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
