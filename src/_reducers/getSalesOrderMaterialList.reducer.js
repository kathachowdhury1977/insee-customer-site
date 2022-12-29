import { reportConstants } from '../_constants';

export function getSalesOrderMaterialList(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_ORDER_MATERIAL_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_ORDER_MATERIAL_SUCCESS:
            return {
                loading: false,
                getSalesOrderMaterialList: action.getSalesOrderMaterialList
            };
        case reportConstants.GET_SALES_ORDER_MATERIAL_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
