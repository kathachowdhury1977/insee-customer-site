import { reportConstants } from '../_constants';

export function getCreditNoteReport(state = {}, action) {
    switch (action.type) {
        case reportConstants.GET_CREDIT_NOTE_REPORT_REQUEST:
            return {
                loading: true,
            };
        case reportConstants.GET_CREDIT_NOTE_REPORT_SUCCESS:
            return {
                loading: false,
                getCreditNoteReport: action.getCreditNoteReport
            };
        case reportConstants.GET_CREDIT_NOTE_REPORT_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
