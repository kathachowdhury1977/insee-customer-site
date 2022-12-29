import { loyaltyPointsConstants } from "../_constants/loyaltyPoints.constants";

const initialState = {
  error: null,
  errorMessage: "",
  getMyPointsList: [],
  //   addSubdealerLoyaltyTransaction: null,
};

export function getMyPoints(state = initialState, action) {
  switch (action.type) {
    case loyaltyPointsConstants.GET_MY_POINTS_SUCCESS:
      return {
        ...state,
        getMyPointsList: action.data,
        error: false,
        errorMessage: "",
      };
    case loyaltyPointsConstants.GET_MY_POINTS_FAILURE:
      return {
        ...state,
        getMyPointsList: null,
        error: true,
        errorMessage: action.error,
      };

    default:
      return state;
  }
}
