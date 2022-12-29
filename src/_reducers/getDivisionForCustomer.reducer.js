
import { eventConstants } from "../_constants";

export function getDivisionForCustomer(state = {}, action) {
    switch (action.type) {
        case eventConstants.GET_DIVISION_REQUEST:
            return {
                loading: true,
            };
        case eventConstants.GET_DIVISION_SUCCESS:
            return {
                getDivisionForCustomer: action.getDivisionForCustomer,
            };
        case eventConstants.GET_DIVISION_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}
