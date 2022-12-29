import { reportConstants } from '../_constants';

export function getTaxInvoiceContracts(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_TAX_INVOICE_CONTRACTS_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_TAX_INVOICE_CONTRACTS_SUCCESS:
            return {
                loading: false,
                getTaxInvoiceContracts: action.getTaxInvoiceContracts
            };
        case reportConstants.GET_TAX_INVOICE_CONTRACTS_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case reportConstants.GET_TAX_INVOICE_CONTRACTS_RESET:
            return {

            };
        default:
            return state
    }
}
