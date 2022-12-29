import { paymentofflineConstants } from "../_constants";

export function getPaymentOfflineChartData(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants. GET_PAYMENT_CHART_FILTER_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants. GET_PAYMENT_CHART_FILTER_SUCCESS:
      return {
        getPaymentOfflineChartData: action.getPaymentOfflineChartData,
      };
    case paymentofflineConstants. GET_PAYMENT_CHART_FILTER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
