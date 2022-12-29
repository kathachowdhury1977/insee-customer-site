import { caseConstants } from "../_constants";
import { caseService } from "../_services";

export const caseActions = {
  getCase,
  getAllCase,
  createCase,
  resetCreateCaseReducer,
  allocateVolumeHistory
};

function getCase(accountID,countryCode) {
  return (dispatch) => {
    dispatch(request());

    caseService.getCase(accountID,countryCode).then(
      (getCase) => dispatch(success(getCase)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getCase) {
    return { type: caseConstants.GET_CASE_REQUEST, getCase };
  }
  function success(getCase) {
    return { type: caseConstants.GET_CASE_SUCCESS, getCase };
  }
  function failure(error) {
    return { type: caseConstants.GET_CASE_FAILURE, error };
  }
}

function getAllCase(requiredJSON) {
  return (dispatch) => {
    dispatch(request());

    caseService.getAllCase(requiredJSON).then(
      (getAllCase) => dispatch(success(getAllCase)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getAllCase) {
    return { type: caseConstants.GETALL_CASE_REQUEST, getAllCase };
  }
  function success(getAllCase) {
    return { type: caseConstants.GETALL_CASE_SUCCESS, getAllCase };
  }
  function failure(error) {
    return { type: caseConstants.GETALL_CASE_FAILURE, error };
  }
}

function createCase(createCaseDetails) {
  return (dispatch) => {
    dispatch(request());

    caseService.createCase(createCaseDetails).then(
      (createCase) => dispatch(success(createCase)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(createCase) {
    return { type: caseConstants.CREATE_CASE_REQUEST, createCase };
  }
  function success(createCase) {
    return { type: caseConstants.CREATE_CASE_SUCCESS, createCase };
  }
  function failure(error) {
    return { type: caseConstants.CREATE_CASE_FAILURE, error };
  }
}


function allocateVolumeHistory(customerId, fromIndex, toIndex, selectedCompany, selectedMonth, currentYear, selectedRetailer) {
  return (dispatch) => {
    dispatch(request());

    caseService.allocateVolumeHistory(customerId, fromIndex, toIndex, selectedCompany, selectedMonth, currentYear, selectedRetailer).then(
      (allocateVolumeHistory) => dispatch(success(allocateVolumeHistory)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(allocateVolumeHistory) {
    return { type: caseConstants.ALLOCATED_VOLUME_REQUEST, allocateVolumeHistory };
  }
  function success(allocateVolumeHistory) {
    return { type: caseConstants.ALLOCATED_VOLUME_SUCCESS, allocateVolumeHistory };
  }
  function failure(error) {
    return { type: caseConstants.ALLOCATED_VOLUME_FAILURE, error };
  }
}




function resetCreateCaseReducer() {
  return (dispatch) => {
      dispatch(reset());

  };
  function reset() {
      return { type: caseConstants.CREATE_CASE_RESET };
  }
}
