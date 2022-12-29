import { reportConstants } from '../_constants';

export function getCustomerStatementReport(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_CUSTOMER_STATEMENT_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_CUSTOMER_STATEMENT_REPORT_SUCCESS:
            return {
                loading: false,
                getCustomerStatementReport: action.getCustomerStatementReport
            };
        case reportConstants.GET_CUSTOMER_STATEMENT_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
