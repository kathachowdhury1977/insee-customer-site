import { reportConstants } from '../_constants';

export function getDeliveryReportConwod(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_REPORT_CONWOOD_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_REPORT_CONWOOD_SUCCESS:
            return {
                loading: false,
                getDeliveryReportConwod: action.getDeliveryReportConwod
            };
        case reportConstants.GET_DELIVERY_REPORT_CONWOOD_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
