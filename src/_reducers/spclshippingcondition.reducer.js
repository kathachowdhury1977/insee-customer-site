import { masterConstants } from "../_constants";

export function spclshippingcondition(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SPCLSHIPPING_CONDITION_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SPCLSHIPPING_CONDITION_SUCCESS:
      return {
        spclshippingcondition: action.spclshippingcondition,
      };
    case masterConstants.GET_SPCLSHIPPING_CONDITION_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
