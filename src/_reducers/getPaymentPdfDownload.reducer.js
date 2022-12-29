import { paymentofflineConstants } from "../_constants";

export function paymentHistoryDownloadPdf(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.PAYMENT_HISTORY_DOWNLOAD_STATUS_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_DOWNLOAD_STATUS_SUCCESS:
      return {
        paymentHistoryDownloadPdf: action.paymentHistoryDownloadPdf,
      };
    case paymentofflineConstants.PAYMENT_HISTORY_DOWNLOAD_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
