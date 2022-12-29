import { reportConstants } from '../_constants';

export function getReceiptReport(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_RECEIPT_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_RECEIPT_REPORT_SUCCESS:
            return {
                loading: false,
                getReceiptReport: action.getReceiptReport
            };
        case reportConstants.GET_RECEIPT_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
