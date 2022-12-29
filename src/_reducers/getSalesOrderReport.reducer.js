import { reportConstants } from '../_constants';

export function getSalesOrderReport(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_ORDER_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_ORDER_REPORT_SUCCESS:
            return {
                loading: false,
                getSalesOrderReport: action.getSalesOrderReport
            };
        case reportConstants.GET_SALES_ORDER_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
