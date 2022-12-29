import { reportConstants } from '../_constants';

export function getDeliveryShippingCondition(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_SHIPPING_CONDITION_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_SHIPPING_CONDITION_SUCCESS:
            return {
                loading: false,
                getDeliveryShippingCondition: action.getDeliveryShippingCondition
            };
        case reportConstants.GET_DELIVERY_SHIPPING_CONDITION_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
