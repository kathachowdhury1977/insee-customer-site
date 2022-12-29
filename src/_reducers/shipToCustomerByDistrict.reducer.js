
import { masterConstants } from '../_constants';

export default function shipToCustomerByDistrict(state = {}, action) {
    switch (action.type) {
        case masterConstants.SHIP_TO_CUSTOMER_BY_DISTRICT_REQUEST:
            return {
                loading: true
            };
        case masterConstants.SHIP_TO_CUSTOMER_BY_DISTRICT_SUCCESS:
            return {
                districts: action.districtList
            };
        case masterConstants.SHIP_TO_CUSTOMER_BY_DISTRICT_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}