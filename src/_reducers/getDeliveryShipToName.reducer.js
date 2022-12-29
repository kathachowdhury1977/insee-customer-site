import { reportConstants } from '../_constants';

export function getDeliveryShipToName(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_SHIP_TO_NAME_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_SHIP_TO_NAME_SUCCESS:
            return {
                loading: false,
                getDeliveryShipToName: action.getDeliveryShipToName
            };
        case reportConstants.GET_DELIVERY_SHIP_TO_NAME_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
