import { eventConstants } from "../_constants";
export function shipmentmanagment(state = {}, action) {
  switch (action.type) {
    case eventConstants.SHIPMENT_MANAGEMENT_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.SHIPMENT_MANAGEMENT_SUCCESS:
      return {
        shipmentmanagment: action.shipmentmanagment,
      };
    case eventConstants.SHIPMENT_MANAGEMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function shipmentByFilter(state = {}, action) {
  switch (action.type) {
    case eventConstants.SHIPMENT_FILTER_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.SHIPMENT_FILTER_SUCCESS:
      return {
        data: action.shipmentByFilter,
      };
    case eventConstants.SHIPMENT_FILTER_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function filterMyShipments(state = {}, action) {
  switch (action.type) {
    case eventConstants.FILTER_SHIPMENT_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.FILTER_SHIPMENT_SUCCESS:
      return {
        data: action.filterMyShipments,
      };
    case eventConstants.FILTER_SHIPMENT_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function filterShipmentManagment(state = {}, action) {
  switch (action.type) {
    case eventConstants.CREATESHIPMENT_FILTER_REQUEST:
      return {
        loading: true,
      };
    case eventConstants.CREATESHIPMENT_FILTER_SUCCESS:
      return {
        data: action.createShipmentFilter,
      };
    case eventConstants.CREATESHIPMENT_FILTER_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}