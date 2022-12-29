
import { eventConstants } from "../_constants";

export function getSoldTosForDivision(state = {}, action) {
    switch (action.type) {
        case eventConstants.GET_SOLDTO_DIVISION_REQUEST:
            return {
                loading: true,
            };
        case eventConstants.GET_SOLDTO_DIVISION_SUCCESS:
            return {
                getSoldTosForDivision: action.getSoldTosForDivision,
            };
        case eventConstants.GET_SOLDTO_DIVISION_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}
