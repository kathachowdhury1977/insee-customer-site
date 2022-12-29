import { reportConstants } from '../_constants';

export function salesOrderReportExport(state = {}, action) {
    switch (action.type) {
        case reportConstants.SALES_ORDER_REPORT_EXPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.SALES_ORDER_REPORT_EXPORT_SUCCESS:
            return {
                loading: false,
                getSalesReportExportFile: action.getSalesReportExportFile
            };
        case reportConstants.SALES_ORDER_REPORT_EXPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
