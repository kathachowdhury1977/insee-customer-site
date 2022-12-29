import { reportConstants } from '../_constants';

export function getDeliveryStatus(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_STATUS_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_STATUS_SUCCESS:
            return {
                loading: false,
                getDeliveryStatus: action.getDeliveryStatus
            };
        case reportConstants.GET_DELIVERY_STATUS_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
