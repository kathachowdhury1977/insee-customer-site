import { masterConstants } from "../_constants";

export function getRetailerByDistrict(state = {}, action) {
    switch (action.type) {
        case masterConstants.RETAILER_BY_DISTRICT_REQUEST:
            return {
                loading: true,
            };
        case masterConstants.RETAILER_BY_DISTRICT_SUCCESS:
            return {
                districtList: action.districtList,
            };
        case masterConstants.RETAILER_BY_DISTRICT_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}
