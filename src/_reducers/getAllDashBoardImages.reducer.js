import { masterConstants } from "../_constants";

export function getAllDashBoardImages(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_BANNER_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_BANNER_SUCCESS:
      return {
        getAllDashBoardImages: action.getAllDashBoardImages,
      };
    case masterConstants.GET_BANNER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
