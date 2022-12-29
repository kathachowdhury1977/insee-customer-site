import { eventConstants } from "../_constants";

export function SelectShipToProduct(state = {}, action) {
    ///console.log('action.SelectShipToProduct',action);
    switch (action.type) {
        case eventConstants.SELECTEDSHIP_PRODUCTS_REQUEST:
          return {
            loading: true,
          };
        case eventConstants.SELECTEDSHIP_PRODUCTS_SUCCESS:
          return {
            SelectShipToProduct: action.selectProd,
          };
        case eventConstants.SELECTEDSHIP_PRODUCTS_FAILURE:
          return {
            error: action.error,
          };
    
        
        default:
          return state;
      }
}
