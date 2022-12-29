import { userConstants,masterConstants } from '../_constants';
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {loggedInFail: true,message:"Username or password is incorrect"};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}

export function getCustomerBySoldTo(state = {}, action) {
    switch (action.type) {
        case masterConstants.CUSTOMERPROFILE_REQUEST:
            return {
                loading: true
            };
        case masterConstants.CUSTOMERPROFILE_SUCCESS:
            return {
                customerDetailById: action.customerProfile
            };
        case masterConstants.CUSTOMERPROFILE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function getRetailerBySoldToNumberUsingGET(state = {}, action) {
    switch (action.type) {
        case masterConstants.CUSTOMERRETAILER_REQUEST:
            return {
                loading: true
            };
        case masterConstants.CUSTOMERRETAILER_SUCCESS:
            return {
                customerRetailer: action.customerRetailer
            };
        case masterConstants.CUSTOMERRETAILER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

///getSocialMediaUsingGet
export function getSocialMediaUsingGet(state = {}, action) {
    switch (action.type) {
        case masterConstants.CUSTOMERSOCIALMEDIA_REQUEST:
            return {
                loading: true
            };
        case masterConstants.CUSTOMERSOCIALMEDIA_SUCCESS:
            return {
                getSocialMedia: action.getSocialMedia
            };
        case masterConstants.CUSTOMERSOCIALMEDIA_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

///delivery-order/status
export function deliveryOrderStatus(state = {}, action) {
    switch (action.type) {
        case masterConstants.DELIVERYORDERSTATUS_REQUEST:
            return {
                loading: true
            };
        case masterConstants.DELIVERYORDERSTATUS_SUCCESS:
            return {
                deliveryOrderStatus: action.deliveryOrderStatus
            };
        case masterConstants.DELIVERYORDERSTATUS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

///adminSocialmedia
export function adminSocialmedia(state = {}, action) {
    switch (action.type) {
        case masterConstants.CUSTOMERSOCIALMEDIA_REQUEST:
            return {
                loading: true
            };
        case masterConstants.CUSTOMERSOCIALMEDIA_SUCCESS:
            return {
                adminSocialmedia: action.adminSocialmedia
            };
        case masterConstants.CUSTOMERSOCIALMEDIA_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

///getshipToCustomer
export function getshipToCustomer(state = {}, action) {
    switch (action.type) {
        case masterConstants.SHIPTOCUSTOMER_REQUEST:
            return {
                loading: true
            };
        case masterConstants.SHIPTOCUSTOMER_SUCCESS:
            return {
                shipToCustomer: action.shipToCustomer
            };
        case masterConstants.SHIPTOCUSTOMER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

///getshipToCustomer
export function forgotPassword(state = {}, action) {
    switch (action.type) {
        case masterConstants.FORGOTPASSWORD_REQUEST:
            return {
                loading: true
            };
        case masterConstants.FORGOTPASSWORD_SUCCESS:
            return {
                forgotPassword: action.forgotPassword
            };
        case masterConstants.FORGOTPASSWORD_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

///resetPassword
export function resetPassword(state = {}, action) {
    switch (action.type) {
        case masterConstants.RESETPASSWORD_REQUEST:
            return {
                loading: true
            };
        case masterConstants.RESETPASSWORD_SUCCESS:
            return {
                resetPassword: action.resetPassword
            };
        case masterConstants.RESETPASSWORD_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

///resetPassword
export function setPassword(state = {}, action) {
    switch (action.type) {
        case masterConstants.SETPASSWORD_REQUEST:
            return {
                loading: true
            };
        case masterConstants.SETPASSWORD_SUCCESS:
            return {
                setPassword: action.setPassword
            };
        case masterConstants.SETPASSWORD_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}