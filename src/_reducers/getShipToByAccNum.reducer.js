
import { masterConstants } from "../_constants";

export function getShipToByAccNum(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPTO_BYACCNUM_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPTO_BYACCNUM_SUCCESS:
      return {
        getShipToByAccNum: action.getShipToByAccNum,
      };
    case masterConstants.GET_SHIPTO_BYACCNUM_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
