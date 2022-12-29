import { reportConstants } from '../_constants';

export function getDeliveryMaterialList(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_MATERIAL_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_MATERIAL_SUCCESS:
            return {
                loading: false,
                getDeliveryMaterialList: action.getDeliveryMaterialList
            };
        case reportConstants.GET_DELIVERY_MATERIAL_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
