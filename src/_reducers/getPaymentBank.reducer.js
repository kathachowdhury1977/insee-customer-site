import { paymentofflineConstants } from "../_constants";

export function onBankName(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_BANK_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_BANK_STATUS_SUCCESS:
      return {
        onBankName: action.onBankName,
      };
    case paymentofflineConstants.PAYMENT_BANK_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
