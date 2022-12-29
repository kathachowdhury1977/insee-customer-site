import { masterConstants } from "../_constants";

export function getVehicles(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_VEHICLES_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_VEHICLES_SUCCESS:
      return {
        getVehicles: action.getVehicles,
      };
    case masterConstants.GET_VEHICLES_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}