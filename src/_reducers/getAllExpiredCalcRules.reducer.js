import { masterConstants } from "../_constants";

export function getAllExpiredCalcRulesUsing(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_EX_CALC_RULES_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_EX_CALC_RULES_SUCCESS:
      return {
        getAllExpiredCalcRulesUsing: action.getAllExpiredCalcRulesUsing,
        error : action.message
      };
    case masterConstants.GET_EX_CALC_RULES_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
