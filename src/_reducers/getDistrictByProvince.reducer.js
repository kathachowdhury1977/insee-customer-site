
import { masterConstants } from "../_constants";

export function getDistrictByProvince(state = {}, action) {
    switch (action.type) {
        case masterConstants.DISTRICT_BY_PROVINCE_REQUEST:
            return {
                loading: true,
            };
        case masterConstants.DISTRICT_BY_PROVINCE_SUCCESS:
            return {
                districtList: action.districtList,
            };
        case masterConstants.DISTRICT_BY_PROVINCE_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}
