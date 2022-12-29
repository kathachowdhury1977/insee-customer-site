import { masterConstants } from '../_constants';

export function getDateRangeMaster(state = {}, action) {
    switch (action.type) {
        case masterConstants.GET_DATE_RANGE_REQUEST:
            return {
                loading: true,
            };
        case masterConstants.GET_DATE_RANGE_SUCCESS:
            return {
                loading: false,
                getDateRangeMaster: action.getDateRangeMaster
            };
        case masterConstants.GET_DATE_RANGE_FAILURE:
            return {
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}
