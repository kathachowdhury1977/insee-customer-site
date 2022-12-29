import { masterConstants } from "../_constants";

export function loginPage(state = {}, action) {
  switch (action.type) {
    case masterConstants.LOGIN_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.LOGIN_SUCCESS:
      return {
        loginPage: action.loginPage,
      };
    case masterConstants.LOGIN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}


export function isLoggedIn(state = {}, action) {
  switch (action.type) {
    case masterConstants.ISLOGGED_IN_REQUEST:
      return {
        loading: true,
      };
    case masterConstants.ISLOGGED_IN_SUCCESS:
      return {
        isLoggedIn: action.isLoggedIn,
      };
    case masterConstants.ISLOGGED_IN_FAILURE:
      return {
        error: action.error,
      };

    
    default:
      return state;
  }
}
