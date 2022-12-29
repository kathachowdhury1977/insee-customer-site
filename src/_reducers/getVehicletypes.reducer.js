import { masterConstants } from "../_constants";

export function getVehicletypes(state = {}, action) {
  switch (action.type) {
    case masterConstants.GET_VEHICLETYPES_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GET_VEHICLETYPES_SUCCESS:
      return {
        getVehicletypes: action.getVehicletypes,
      };
    case masterConstants.GET_VEHICLETYPES_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
///getOwnership
export function getOwnership(state = {}, action) {
  switch (action.type) {
    case masterConstants.GETOWNERSHIP_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.GETOWNERSHIP_SUCCESS:
      return {
        getOwnership: action.getOwnership,
      };
    case masterConstants.GETOWNERSHIP_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

///getOwnership
export function createVehicle(state = {}, action) {
  switch (action.type) {
    case masterConstants.CREATEVEHICLE_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.CREATEVEHICLE_SUCCESS:
      return {
        createVehicle: action.createVehicle,
      };
    case masterConstants.CREATEVEHICLE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}

///deleteVehiclesByVehicleId
export function deleteVehiclesByVehicleId(state = {}, action) {
  switch (action.type) {
    case masterConstants.DELETEVEHICLESBYID_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.DELETEVEHICLESBYID_SUCCESS:
      return {
        deleteVehiclesById: action.deleteVehiclesById,
      };
    case masterConstants.DELETEVEHICLESBYID_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


///getVehiclesDetailsById
export function getVehiclesDetailsById(state = {}, action) {
  switch (action.type) {
    case masterConstants.EDITVEHICLESBYID_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.EDITVEHICLESBYID_SUCCESS:
      return {
        editVehiclesById: action.editVehiclesById,
      };
    case masterConstants.EDITVEHICLESBYID_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}

///updateVehicle
export function updateVehicle(state = {}, action) {
  switch (action.type) {
    case masterConstants.UPDATEVEHICLESBYID_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.UPDATEVEHICLESBYID_SUCCESS:
      return {
        updateVehicle: action.updateVehicle,
      };
    case masterConstants.UPDATEVEHICLESBYID_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
