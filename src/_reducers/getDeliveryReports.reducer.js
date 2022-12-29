import { reportConstants } from '../_constants';

export function getDeliveryReports(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_REPORT_SUCCESS:
            return {
                loading: false,
                getDeliveryReport: action.getDeliveryReport
            };
        case reportConstants.GET_DELIVERY_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
