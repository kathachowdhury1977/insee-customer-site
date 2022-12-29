import { reportConstants } from '../_constants';

export function getOpenItemsReport(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_OPEN_ITEM_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_OPEN_ITEM_REPORT_SUCCESS:
            return {
                loading: false,
                getOpenItemsReport: action.getOpenItemsReport
            };
        case reportConstants.GET_OPEN_ITEM_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
