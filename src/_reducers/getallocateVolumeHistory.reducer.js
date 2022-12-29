import { caseConstants } from "../_constants";

export function allocateVolumeHistory(state = {}, action) {
  switch (action.type) {
    case caseConstants.ALLOCATED_VOLUME_REQUEST:
      return {
        loading: true,
      };
    case caseConstants.ALLOCATED_VOLUME_SUCCESS:
      return {
        allocateVolumeHistory: action.allocateVolumeHistory,
      };
    case caseConstants.ALLOCATED_VOLUME_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
