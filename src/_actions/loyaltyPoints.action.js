import { loyaltyPointsConstants } from "../_constants/loyaltyPoints.constants";
import { getMyPointsService , getMyPointsGraphService } from "../_services/loyaltyPoints.service";

export function getMyPointsAction(accountNumber) {
  return (dispatch) => {
    getMyPointsService(accountNumber)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(success(res.data));
        } else {
          dispatch(failure(res));
        }
      })
      .catch((error) => dispatch(failure(error)));
  };

  function success(data) {
    return { type: loyaltyPointsConstants.GET_MY_POINTS_SUCCESS, data };
  }
  function failure(error) {
    return { type: loyaltyPointsConstants.GET_MY_POINTS_FAILURE, error };
  }
}

export function getMyPointsGraphAction(filterData,accountNumber) {
  return (dispatch) => {
    getMyPointsGraphService(filterData,accountNumber)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(success(res.data));
        } else {
          dispatch(failure(res));
        }
      })
      .catch((error) => dispatch(failure(error)));
  };

  function success(data) {
    return { type: loyaltyPointsConstants.GET_MONTHWISE_POINTS_SUCCESS, data };
  }
  function failure(error) {
    return { type: loyaltyPointsConstants.GET_MONTHWISE_POINTS_FAILURE, error };
  }
}