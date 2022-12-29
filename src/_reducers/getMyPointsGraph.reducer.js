import { loyaltyPointsConstants } from "../_constants/loyaltyPoints.constants";

const initialState = {
  error: null,
  errorMessage: "",
  getMyPointsGraphList: [],
};

export function getMyPointsGraph(state = initialState, action) {
  switch (action.type) {
    case loyaltyPointsConstants.GET_MONTHWISE_POINTS_SUCCESS:
      return {
        ...state,
        getMyPointsGraphList: action.data,
        error: false,
        errorMessage: "",
      };
    case loyaltyPointsConstants.GET_MONTHWISE_POINTS_FAILURE:
      return {
        ...state,
        getMyPointsGraphList: null,
        error: true,
        errorMessage: action.error,
      };

    default:
      return state;
  }
}
