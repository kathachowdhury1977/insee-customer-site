import { orderConstants } from "../_constants";

export function getAllOrdersList(state = {}, action) {
  switch (action.type) {
    case orderConstants.GET_ALL_ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case orderConstants.GET_ALL_ORDER_LIST_SUCCESS:
      return {
        getAllOrdersList: action.getAllOrdersList,
      };
    case orderConstants.GET_ALL_ORDER_LIST_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
