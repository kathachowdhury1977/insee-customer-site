import { masterConstants } from "../_constants";

 export function ShipToValueMyOrder(state = {}, action) {
   switch (action.type) {
     case masterConstants.SHIP_TO_VALUE_REQUEST:
       return {
         loading: true,
       };
     case masterConstants.SHIP_TO_VALUE_SUCCESS:
       return {
         ShipToValueMyOrder: action.ShipToValueMyOrder,
       };
     case masterConstants.SHIP_TO_VALUE_FAILURE:
       return {
         error: action.error,
       };


     default:
       return state;
   }
 }