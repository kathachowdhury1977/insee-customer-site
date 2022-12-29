import { masterConstants } from "../_constants";

export function getSpecialShippingConditionConwood(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SPECIAL_SHIP_COND_BY_CAT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SPECIAL_SHIP_COND_BY_CAT_SUCCESS:
      return {
        getSpecialShippingConditionConwood: action.getSpecialShippingConditionConwood,
      };
    case masterConstants.GET_SPECIAL_SHIP_COND_BY_CAT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
