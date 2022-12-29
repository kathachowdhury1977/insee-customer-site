import { reportConstants } from '../_constants';

export function getDeliveryReportChild(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_REPORT_CHILD_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_REPORT_CHILD_SUCCESS:
            return {
                loading: false,
                getDeliveryReportChild: action.getDeliveryReportChild
            };
        case reportConstants.GET_DELIVERY_REPORT_CHILD_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
