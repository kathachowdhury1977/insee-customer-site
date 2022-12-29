import { reportConstants } from '../_constants';

export function getSalesOrderShipToName(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_ORDER_SHIP_TO_NAME_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_ORDER_SHIP_TO_NAME_SUCCESS:
            return {
                loading: false,
                getSalesOrderShipToName: action.getSalesOrderShipToName
            };
        case reportConstants.GET_SALES_ORDER_SHIP_TO_NAME_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
