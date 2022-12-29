import { reportConstants } from '../_constants';

export function getDeliveryShipmentStatusReducer(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_REPORT_SHIPMENT_STATUS_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_REPORT_SHIPMENT_STATUS_SUCCESS:
            return {
                loading: false,
                getDeliveryShipmentStatus: action.getDeliveryShipmentStatus
            };
        case reportConstants.GET_DELIVERY_REPORT_SHIPMENT_STATUS_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
