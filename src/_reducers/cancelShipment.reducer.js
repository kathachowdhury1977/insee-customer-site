import { eventConstants } from "../_constants";
export function cancelShipment(state = {}, action) {
  switch (action.type) {
    case eventConstants.CANCELSHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.CANCELSHIPMENT_SUCCESS:
      return {
        cancelShipment: action.cancelShipment,
      };
    case eventConstants.CANCELSHIPMENT_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}

export function getShipmentStatus(state = {}, action) {
  switch (action.type) {
    case eventConstants.GET_SHIPMENTSTATUS_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.GET_SHIPMENTSTATUS_SUCCESS:
      return {
        getShipmentStatus: action.getShipmentStatus,
      };
    case eventConstants.GET_SHIPMENTSTATUS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}