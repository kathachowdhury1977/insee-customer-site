import { reportConstants } from '../_constants';

export function getTaxInvoiceReports(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_CUSTOMER_TAX_INVOICE_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_CUSTOMER_TAX_INVOICE_REPORT_SUCCESS:
            return {
                loading: false,
                getTaxInvoiceReports: action.getTaxInvoiceReports
            };
        case reportConstants.GET_CUSTOMER_TAX_INVOICE_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
