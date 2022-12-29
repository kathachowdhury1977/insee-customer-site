import { masterConstants } from "../_constants";

export function getBusinessSegment(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_BUSINESS_SEGMENT_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_BUSINESS_SEGMENT_SUCCESS:
      return {
        getBusinessSegment: action.getBusinessSegment,
      };
    case masterConstants.GET_BUSINESS_SEGMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
