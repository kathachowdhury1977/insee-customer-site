import { paymentofflineConstants } from "../_constants";

export function getBayBankResponse(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_BAY_BANK_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_BAY_BANK_STATUS_SUCCESS:
      return {
        getBayBankResponse: action.getBayBankResponse,
      };
    case paymentofflineConstants.GET_BAY_BANK_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
