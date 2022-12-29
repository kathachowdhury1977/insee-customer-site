
import { reportConstants } from '../_constants';

export function getIncentivePaymentReports(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_INCENT_PAYMENT_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_INCENT_PAYMENT_REPORT_SUCCESS:
            return {
                loading: false,
                getIncentivePaymentReports: action.getIncentivePaymentReports
            };
        case reportConstants.GET_INCENT_PAYMENT_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
