import { orderConstants } from "../_constants";

export function changePaymentMethod(state = {}, action) {
  switch (action.type) {
    case orderConstants.CHANGE_PAYMENT_METHOD_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.CHANGE_PAYMENT_METHOD_SUCCESS:
      return {
        changePaymentMethod: action.changePaymentMethod,
      };
    case orderConstants.CHANGE_PAYMENT_METHOD_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
