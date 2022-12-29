import { reportConstants } from '../_constants';

export function getDeliveryReportMaterial(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_DELIVERY_REPORT_MATERIALMATERIAL_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_DELIVERY_REPORT_MATERIALMATERIAL_SUCCESS:
            return {
                loading: false,
                getDeliveryReportMaterials: action.getDeliveryReportMaterials
            };
        case reportConstants.GET_DELIVERY_REPORT_MATERIALMATERIAL_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
