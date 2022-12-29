import { masterConstants } from "../_constants";

export function getRegionByCountry(state = {}, action) {
    switch (action.type) {
        case masterConstants.REGION_BY_COUNTRY_CODE_REQUEST:
            return {
                loading: true,
            };
        case masterConstants.REGION_BY_COUNTRY_CODE_SUCCESS:
            return {
                regionList: action.regionList,
            };
        case masterConstants.REGION_BY_COUNTRY_CODE_FAILURE:
            return {
                error: action.error,
            };

        default:
            return state;
    }
}
