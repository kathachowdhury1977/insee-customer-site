import { reportConstants } from '../_constants';

export function deliveryReportExport(state = {}, action) {
    switch (action.type) {
        case reportConstants.DELIVERY_REPORT_EXPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.DELIVERY_REPORT_EXPORT_SUCCESS:
            return {
                loading: false,
                getDeliveryReportExportFile: action.getDeliveryReportExportFile
            };
        case reportConstants.DELIVERY_REPORT_EXPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
