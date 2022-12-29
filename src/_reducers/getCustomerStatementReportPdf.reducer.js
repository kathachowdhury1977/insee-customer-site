import { reportConstants } from '../_constants';

export function getCustomerStatementReportPdf(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_CUSTOMER_STATEMENT_PDF_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_CUSTOMER_STATEMENT_PDF_REPORT_SUCCESS:
            return {
                loading: false,
                getCustomerStatementReportPdf: action.getCustomerStatementReportPdf
            };
        case reportConstants.GET_CUSTOMER_STATEMENT_PDF_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
