import { caseConstants } from '../_constants';

export function createCaseReducer(state = {}, action) {
    switch (action.type) {
        case caseConstants.CREATE_CASE_REQUEST:
            return {
                loading: true,
            };
        case caseConstants.CREATE_CASE_SUCCESS:
            return {
                loading: false,
                createCase: action.createCase
            };
        case caseConstants.CREATE_CASE_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        case caseConstants.CREATE_CASE_RESET:
            return {
            };
        default:
            return state
    }
}
