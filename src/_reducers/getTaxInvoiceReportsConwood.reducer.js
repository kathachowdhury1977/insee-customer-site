import { reportConstants } from '../_constants';

export function getTaxInvoiceReportsConwood(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_CUSTOMER_STATEMENT_REPORT_CONWOOD_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_CUSTOMER_STATEMENT_REPORT_CONWOOD_SUCCESS:
            return {
                loading: false,
                getTaxInvoiceReportsConwood: action.getTaxInvoiceReportsConwood
            };
        case reportConstants.GET_CUSTOMER_STATEMENT_REPORT_CONWOOD_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
