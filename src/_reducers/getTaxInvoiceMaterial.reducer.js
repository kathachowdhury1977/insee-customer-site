import { reportConstants } from '../_constants';

export function getTaxInvoiceMaterial(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_TAX_INVOICE_MATERIAL_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_TAX_INVOICE_MATERIAL_SUCCESS:
            return {
                loading: false,
                getTaxInvoiceMaterial: action.getTaxInvoiceMaterial
            };
        case reportConstants.GET_TAX_INVOICE_MATERIAL_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
