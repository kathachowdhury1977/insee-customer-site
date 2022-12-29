import { masterConstants } from "../_constants";

export function chooseTransporter(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_CHOOSETRANSPORTER_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_CHOOSETRANSPORTER_SUCCESS:
      return {
        chooseTransporter: action.chooseTransporter,
      };
    case masterConstants.GET_CHOOSETRANSPORTER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
