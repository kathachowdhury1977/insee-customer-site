import { masterConstants } from "../_constants";

export function getProvinceByRegion(state = {}, action) {
    switch (action.type) {
        case masterConstants.PROVINCE_BY_REGION_REQUEST:
            return {
                loading: true,
            };
        case masterConstants.PROVINCE_BY_REGION_SUCCESS:
            return {
                provinceList: action.provinceList,
            };
        case masterConstants.PROVINCE_BY_REGION_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}
