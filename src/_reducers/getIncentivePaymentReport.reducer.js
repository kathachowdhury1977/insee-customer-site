import { reportConstants } from '../_constants';

export function getIncentivePaymentReport(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_INCENTIVE_PAYMENT_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_INCENTIVE_PAYMENT_REPORT_SUCCESS:
            return {
                loading: false,
                getIncentiveReport: action.getIncentiveReport
            };
        case reportConstants.GET_INCENTIVE_PAYMENT_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
