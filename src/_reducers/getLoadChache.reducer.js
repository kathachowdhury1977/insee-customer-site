

import { paymentofflineConstants } from "../_constants";

export function loadcacheData(state = {}, action) {
  switch (action.type) {
    case paymentofflineConstants.GET_LOAD_CACHE_REQUEST:
      return {
        loading: true,
      };
    case paymentofflineConstants.GET_LOAD_CACHE_SUCCESS:
      return {
        loadcacheData: action.loadcacheData,
        
      };
    case paymentofflineConstants.GET_LOAD_CACHE_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
