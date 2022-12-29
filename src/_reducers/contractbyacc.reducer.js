import { masterConstants } from "../_constants";

export function contractbyacc(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_CONTRACT_ACCOUNT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_CONTRACT_ACCOUNT_SUCCESS:
      return {
        contractbyacc: action.contractbyacc,
      };
    case masterConstants.GET_CONTRACT_ACCOUNT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
