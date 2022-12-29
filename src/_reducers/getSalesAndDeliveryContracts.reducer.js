import { reportConstants } from '../_constants';

export function getSalesAndDeliverContractReducer(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_AND_DELIVERY_CONTRACTS_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_AND_DELIVERY_CONTRACTS_SUCCESS:
            return {
                loading: false,
                getSalesAndDeliveryContracts: action.getSalesAndDeliveryContracts
            };
        case reportConstants.GET_SALES_AND_DELIVERY_CONTRACTS_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
