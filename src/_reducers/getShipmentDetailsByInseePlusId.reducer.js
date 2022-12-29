import { eventConstants } from "../_constants";

export function getShipmentDetailsByInseePlusId(state = {}, action) {
  switch (action.type) {
    case eventConstants.SHIPMENTDETAILS_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.SHIPMENTDETAILS_SUCCESS:
      return {
        getShipmentDetailsByInseePlusId: action.shipmentDetails,
      };
    case eventConstants.SHIPMENTDETAILS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
