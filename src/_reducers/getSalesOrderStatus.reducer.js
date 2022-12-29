import { reportConstants } from '../_constants';

export function getSalesOrderStatus(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_ORDER_STATUS_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_ORDER_STATUS_SUCCESS:
            return {
                loading: false,
                getSalesOrderStatus: action.getSalesOrderStatus
            };
        case reportConstants.GET_SALES_ORDER_STATUS_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
