import { reportConstants } from '../_constants';

export function getSalesOrderContracts(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_ORDER_CONTRACT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_ORDER_CONTRACT_SUCCESS:
            return {
                loading: false,
                getSalesOrderContracts: action.getSalesOrderContracts
            };
        case reportConstants.GET_SALES_ORDER_CONTRACT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
