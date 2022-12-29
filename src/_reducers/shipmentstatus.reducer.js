import { masterConstants } from "../_constants";

export function shipmentstatus(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPMENT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPMENT_STATUS_SUCCESS:
      return {
        shipmentstatus: action.shipmentstatus,
      };
    case masterConstants.GET_SHIPMENT_STATUS_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function shipmentStatusFilterList(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPMENTFILTERLIST_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPMENTFILTERLIST_SUCCESS:
      return {
        shipmentFilter: action.shipmentFilter,
      };
    case masterConstants.GET_SHIPMENTFILTERLIST_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

export function getShipmentStatusVn(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_SHIPMENT_STATUS_VN_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_SHIPMENT_STATUS_VN_SUCCESS:
      return {
        getShipmentStatusVn: action.getShipmentStatusVn,
      };
    case masterConstants.GET_SHIPMENT_STATUS_VN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
