import { reportConstants } from '../_constants';

export function getDeliveryContracts(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_CONTRACT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_CONTRACT_SUCCESS:
            return {
                loading: false,
                getDeliveryContracts: action.getDeliveryContracts
            };
        case reportConstants.GET_DELIVERY_CONTRACT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
