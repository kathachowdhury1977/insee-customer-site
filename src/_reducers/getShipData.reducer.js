import { masterConstants } from "../_constants";

export function getShipMentData(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_DATA_FORSHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_DATA_FORSHIPMENT_SUCCESS:
      return {
        getShipMentData: action.getShipMentData,
      };
    case masterConstants.GET_DATA_FORSHIPMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
