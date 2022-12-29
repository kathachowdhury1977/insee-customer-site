import { reportConstants } from '../_constants';

export function getSalesOrderShippingCondition(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_ORDER_SHIPPING_CONDITION_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_ORDER_SHIPPING_CONDITION_SUCCESS:
            return {
                loading: false,
                getSalesOrderShippingCondition: action.getSalesOrderShippingCondition
            };
        case reportConstants.GET_SALES_ORDER_SHIPPING_CONDITION_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
