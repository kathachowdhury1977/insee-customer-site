import { reportConstants } from '../_constants';

export function getSalesOrderReportMaterial(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_SALES_REPORT_MATERIALMATERIAL_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_SALES_REPORT_MATERIALMATERIAL_SUCCESS:
            return {
                loading: false,
                getSalesReportMaterials: action.getSalesReportMaterials
            };
        case reportConstants.GET_SALES_REPORT_MATERIALMATERIAL_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
