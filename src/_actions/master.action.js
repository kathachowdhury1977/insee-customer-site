import { masterConstants } from "../_constants";
import { masterService } from "../_services";
import { alertActions } from './';
import { history } from '../_helpers';
export const masterActions = {
  loginPage,
  createVehicle,
  login,
  getRetailerBySoldToNumberUsingGET,
  shipToCustomer,
  deliveryOrderStatus,
  Subdealer,
  getShippingCondition,
  getSpecialShippingCondition,
  getShippingType,
  getShippingTypeMyOrder,
  getShipmentStatus,
  getOrderType,
  contractsbyAcc,
  prefaredTruckType,
  specialProject,
  plantbyCountry,
  plantbyCountryForVN,
  shiptobyCountryAccount,
  getProvince,
  getDateRangeMaster,
  getDistrict,
  getShipToForVn,
  getCaseType,
  getCaseStatus,
  getBusinessSegment,
  getCaseCategory,
  getShipToByAccNum,
  isLoggedIn,
  shipToForShipment,
  productForShipment,
  plantNameForShipment,
  getShipMentData,
  getVehicles,
  getProductCatForShipment,
  orderByStatusValue,
  shipToMyOrder,
  searchByNoValue,
  searchByOrderNo,
  shippingConditionMyOrderValue,
  shipTypeValueMyOredr,
  paginationValue,
  getProductCatLevel,
  getProductCatLevelValue,
  getProductSubCatLevel,
  getProductSubCatLevelValue,
  getSpecialShippingConditionConwood,
  getRemarks,
  vehicletypes,
  chooseTransporter,
  getCustomerBySoldTo,
  getSocialMediaUsingGet,
  adminSocialmedia,
  getOwnership,
  deleteVehiclesByVehicleId,
  getVehiclesDetailsById,
  updateVehicle,
  shipmentStatusFilterList,
  ShipToValueMyOrder,
  forgotPassword,
  resetPassword,
  setPassword,
  uploadFile,
  deleteFile,
  getRetailerByDistrict,
  getRegionByCountry,
  getProvinceByRegion,
  getDistrictByProvince,
  getShipCatValue,
  getAllDashBoardImages,
  shipToCustomerByDistrict,
  getShipmentStatusVn,
  
};
//createVehicle
function createVehicle(createVehicle) {
  return dispatch => {

    ////console.log('fromIndex',fromIndex,'toIndex',toIndex);
    dispatch(request());

    masterService.createVehicle(createVehicle)
      .then(
        (createVehicle) => dispatch(success(createVehicle)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(createVehicle) { return { type: masterConstants.CREATEVEHICLE_REQUEST, createVehicle } }
  function success(createVehicle) { return { type: masterConstants.CREATEVEHICLE_SUCCESS, createVehicle } }
  function failure(error) { return { type: masterConstants.CREATEVEHICLE_FAILURE, error } }
}
///deliveryOrderStatus
function deliveryOrderStatus(soldTonumber, countryId) {
  return dispatch => {

    ////console.log('fromIndex',fromIndex,'toIndex',toIndex);
    dispatch(request());

    masterService.deliveryOrderStatus(soldTonumber, countryId)
      .then(
        (deliveryOrderStatus) => dispatch(success(deliveryOrderStatus)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(deliveryOrderStatus) { return { type: masterConstants.DELIVERYORDERSTATUS_REQUEST, deliveryOrderStatus } }
  function success(deliveryOrderStatus) { return { type: masterConstants.DELIVERYORDERSTATUS_SUCCESS, deliveryOrderStatus } }
  function failure(error) { return { type: masterConstants.DELIVERYORDERSTATUS_FAILURE, error } }
}

////deleteVehiclesByVehicleId
function deleteVehiclesByVehicleId(vehicleId) {
  return dispatch => {
    dispatch(request());
    masterService.deleteVehiclesByVehicleId(vehicleId)
      .then(
        (deleteVehiclesById) => dispatch(success(deleteVehiclesById)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(deleteVehiclesById) { return { type: masterConstants.DELETEVEHICLESBYID_REQUEST, deleteVehiclesById } }
  function success(deleteVehiclesById) { return { type: masterConstants.DELETEVEHICLESBYID_SUCCESS, deleteVehiclesById } }
  function failure(error) { return { type: masterConstants.DELETEVEHICLESBYID_FAILURE, error } }
}

////updateVehicle
function updateVehicle(updateVehicleData, vehicleId) {
  return dispatch => {
    dispatch(request());
    masterService.updateVehicle(updateVehicleData, vehicleId)
      .then(
        (updateVehicle) => dispatch(success(updateVehicle)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(updateVehicle) { return { type: masterConstants.UPDATEVEHICLESBYID_REQUEST, updateVehicle } }
  function success(updateVehicle) { return { type: masterConstants.UPDATEVEHICLESBYID_SUCCESS, updateVehicle } }
  function failure(error) { return { type: masterConstants.UPDATEVEHICLESBYID_FAILURE, error } }
}

////getVehiclesDetailsById
function getVehiclesDetailsById(vehicleId) {
  return dispatch => {
    dispatch(request());
    masterService.getVehiclesDetailsById(vehicleId)
      .then(
        (editVehiclesById) => dispatch(success(editVehiclesById)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(editVehiclesById) { return { type: masterConstants.EDITVEHICLESBYID_REQUEST, editVehiclesById } }
  function success(editVehiclesById) { return { type: masterConstants.EDITVEHICLESBYID_SUCCESS, editVehiclesById } }
  function failure(error) { return { type: masterConstants.EDITVEHICLESBYID_FAILURE, error } }
}

function getAllDashBoardImages(countryCode, appType, channel) {
  return dispatch => {
    dispatch(request());
    masterService.getAllDashBoardImages(countryCode, appType, channel)
      .then(
        (getAllDashBoardImages) => dispatch(success(getAllDashBoardImages)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(getAllDashBoardImages) { return { type: masterConstants.GET_BANNER_REQUEST, getAllDashBoardImages } }
  function success(getAllDashBoardImages) { return { type: masterConstants.GET_BANNER_SUCCESS, getAllDashBoardImages } }
  function failure(error) { return { type: masterConstants.GET_BANNER_FAILURE, error } }
}




////shipToCustomer
function shipToCustomer(accountNumber, searchValue) {
  return dispatch => {

    ////console.log('fromIndex',fromIndex,'toIndex',toIndex);
    dispatch(request());

    masterService.shipToCustomer(accountNumber, searchValue)
      .then(
        (shipToCustomer) => dispatch(success(shipToCustomer)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(shipToCustomer) { return { type: masterConstants.SHIPTOCUSTOMER_REQUEST, shipToCustomer } }
  function success(shipToCustomer) { return { type: masterConstants.SHIPTOCUSTOMER_SUCCESS, shipToCustomer } }
  function failure(error) { return { type: masterConstants.SHIPTOCUSTOMER_FAILURE, error } }
}

function getRetailerBySoldToNumberUsingGET(soldTonumber, fromIndex, toIndex, district, searchValue) {
  return dispatch => {

    ////console.log('fromIndex',fromIndex,'toIndex',toIndex);
    dispatch(request());

    masterService.getRetailerBySoldToNumberUsingGET(soldTonumber, fromIndex, toIndex, district, searchValue)
      .then(
        (customerRetailer) => dispatch(success(customerRetailer)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(customerRetailer) { return { type: masterConstants.CUSTOMERRETAILER_REQUEST, customerRetailer } }
  function success(customerRetailer) { return { type: masterConstants.CUSTOMERRETAILER_SUCCESS, customerRetailer } }
  function failure(error) { return { type: masterConstants.CUSTOMERRETAILER_FAILURE, error } }
}
///getSocialMediaUsingGET
function getSocialMediaUsingGet(soldTonumber) {
  return dispatch => {
    dispatch(request());
    masterService.getSocialMediaUsingGet(soldTonumber)
      .then(
        (getSocialMedia) => dispatch(success(getSocialMedia)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(getSocialMedia) { return { type: masterConstants.CUSTOMERSOCIALMEDIA_REQUEST, getSocialMedia } }
  function success(getSocialMedia) { return { type: masterConstants.CUSTOMERSOCIALMEDIA_SUCCESS, getSocialMedia } }
  function failure(error) { return { type: masterConstants.CUSTOMERSOCIALMEDIA_FAILURE, error } }
}


function adminSocialmedia(socialmediaData) {
  return dispatch => {
    dispatch(request());
    masterService.adminSocialmedia(socialmediaData)
      .then(
        (adminSocialmedia) => dispatch(success(adminSocialmedia)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(adminSocialmedia) { return { type: masterConstants.CUSTOMERSOCIALMEDIA_REQUEST, adminSocialmedia } }
  function success(adminSocialmedia) { return { type: masterConstants.CUSTOMERSOCIALMEDIA_SUCCESS, adminSocialmedia } }
  function failure(error) { return { type: masterConstants.CUSTOMERSOCIALMEDIA_FAILURE, error } }
}

//getOwnership
function getOwnership() {
  return dispatch => {
    dispatch(request());
    masterService.getOwnership()
      .then(
        (getOwnership) => dispatch(success(getOwnership)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(getOwnership) { return { type: masterConstants.GETOWNERSHIP_REQUEST, getOwnership } }
  function success(getOwnership) { return { type: masterConstants.GETOWNERSHIP_SUCCESS, getOwnership } }
  function failure(error) { return { type: masterConstants.GETOWNERSHIP_FAILURE, error } }
}


function getCustomerBySoldTo(soldTonumber) {
  return dispatch => {
    dispatch(request());
    masterService.getCustomerBySoldTo(soldTonumber)
      .then(
        (customerProfile) => dispatch(success(customerProfile)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(customerProfile) { return { type: masterConstants.CUSTOMERPROFILE_REQUEST, customerProfile } }
  function success(customerProfile) { return { type: masterConstants.CUSTOMERPROFILE_SUCCESS, customerProfile } }
  function failure(error) { return { type: masterConstants.CUSTOMERPROFILE_FAILURE, error } }
}

function setPassword(passwordResetReqId, password, confirmPassword) {
  return dispatch => {
    dispatch(request());

    masterService.setPassword(passwordResetReqId, password, confirmPassword)
      .then(
        setPassword => {
          if (setPassword.status == 200) {
            dispatch(success(setPassword));
          } else {
            /////console.log('useruser',user); 
            dispatch(failure("The password reset request is either invalid or expired!!"));
          }
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(setPassword) { return { type: masterConstants.SETPASSWORD_REQUEST, setPassword } }
  function success(setPassword) { return { type: masterConstants.SETPASSWORD_SUCCESS, setPassword } }
  function failure(error) { return { type: masterConstants.SETPASSWORD_FAILURE, error } }
}

//resetPassword

function resetPassword(username) {
  return dispatch => {
    dispatch(request({ username }));

    masterService.resetPassword(username)
      .then(
        resetPassword => {
          if (resetPassword.status == 200) {
            dispatch(success(resetPassword));
          } else {
            /////console.log('useruser',user); 
            dispatch(failure("User not Found"));
          }
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(resetPassword) { return { type: masterConstants.RESETPASSWORD_REQUEST, resetPassword } }
  function success(resetPassword) { return { type: masterConstants.RESETPASSWORD_SUCCESS, resetPassword } }
  function failure(error) { return { type: masterConstants.RESETPASSWORD_FAILURE, error } }
}

function forgotPassword(username) {
  debugger
  return dispatch => {
    dispatch(request({ username }));

    masterService.forgotPassword(username)
      .then(
        forgotPassword => {
          if (forgotPassword.status == 200) {
            dispatch(success(forgotPassword));
          } else {
            /////console.log('useruser',user); 
            dispatch(failure("User not Found"));
          }
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(forgotPassword) { return { type: masterConstants.FORGOTPASSWORD_REQUEST, forgotPassword } }
  function success(forgotPassword) { return { type: masterConstants.FORGOTPASSWORD_SUCCESS, forgotPassword } }
  function failure(error) { return { type: masterConstants.FORGOTPASSWORD_FAILURE, error } }
}


function login(username, password, from) {
  const userRole = localStorage.userData ? JSON.parse(localStorage.userData).userRole : "";

  return dispatch => {
    dispatch(request({ username }));

    masterService.login(username, password)
      .then(
        user => {
          if (user.status == 200) {debugger
            ////console.log('finduser',user);
            localStorage.setItem('userData', JSON.stringify(user.data));
            
            dispatch(success(user));
            setTimeout(() => {
              let userName = localStorage.getItem('userData')
             userName = JSON.parse(userName)
             if(userName){
              if(userName.countryCode && userName.countryCode === 'TH'){
                localStorage.setItem("lancode",'th');
              return
              }
              if(userName.countryCode && userName.countryCode === 'VN'){
                localStorage.setItem("lancode",'vt');
               
              }  
            }
            (localStorage.userData && JSON.parse(localStorage.userData).userRole === 'Retailer') ? history.push("/LoyaltyPoints") : (localStorage.userData && JSON.parse(localStorage.userData).performanceRole === 'Active') ? history.push(from) : history.push('/SubDealerLoyalty');
          },0);
          } else {
            /////console.log('useruser',user); 
            dispatch(failure("User not Found"));
          }
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: masterConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: masterConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: masterConstants.LOGIN_FAILURE, error } }
}

function loginPage(username, password, from) {
  return (dispatch) => {
    dispatch(request());

    masterService.loginPage(username, password).then(
      loginPage => {
        dispatch(success(loginPage));
        history.push(from);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(loginPage) {
    console.log(loginPage)
    return { type: masterConstants.LOGIN_REQUEST, loginPage };
  }
  function success(loginPage) {
    return { type: masterConstants.LOGIN_SUCCESS, loginPage };
  }
  function failure(error) {
    console.log(error)
    return { type: masterConstants.LOGIN_FAILURE, error };
  }
}
///getVehicles
function getVehicles(soldToNumber, vehicleType) {
  return (dispatch) => {
    dispatch(request());
    masterService.getVehicles(soldToNumber, vehicleType).then(
      (getVehicles) => dispatch(success(getVehicles)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getVehicles) {
    return { type: masterConstants.GET_VEHICLES_REQUEST, getVehicles };
  }
  function success(getVehicles) {
    return { type: masterConstants.GET_VEHICLES_SUCCESS, getVehicles };
  }
  function failure(error) {
    return { type: masterConstants.GET_VEHICLES_FAILURE, error };
  }
}

function vehicletypes(countryCode) {
  return (dispatch) => {
    dispatch(request());
    masterService.vehicletypes(countryCode).then(
      (getVehicletypes) => dispatch(success(getVehicletypes)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getVehicletypes) {
    return { type: masterConstants.GET_VEHICLETYPES_REQUEST, getVehicletypes };
  }
  function success(getVehicletypes) {
    return { type: masterConstants.GET_VEHICLETYPES_SUCCESS, getVehicletypes };
  }
  function failure(error) {
    return { type: masterConstants.GET_VEHICLETYPES_FAILURE, error };
  }
}

function Subdealer(soldToNumber) {
  return (dispatch) => {
    dispatch(request());

    masterService.Subdealer(soldToNumber).then(
      (getSubdealer) => dispatch(success(getSubdealer)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getSubdealer) {
    return { type: masterConstants.GET_SUB_DEALER_REQUEST, getSubdealer };
  }
  function success(getSubdealer) {
    return { type: masterConstants.GET_SUB_DEALER_SUCCESS, getSubdealer };
  }
  function failure(error) {
    return { type: masterConstants.GET_SUB_DEALER_FAILURE, error };
  }
}

function isLoggedIn(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(isLoggedIn) {
    return { type: masterConstants.ISLOGGED_IN_REQUEST, isLoggedIn };
  }
  function success(isLoggedIn) {
    return { type: masterConstants.ISLOGGED_IN_SUCCESS, isLoggedIn };
  }
  function failure(error) {
    return { type: masterConstants.ISLOGGED_IN_FAILURE, error };
  }
}


function getShippingCondition(countryCode, categoryName, shipToNumberData, customerNumberData) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShippingCondition(countryCode, categoryName, shipToNumberData, customerNumberData).then(
      (shippingcondition) => dispatch(success(shippingcondition)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shippingcondition) {
    return { type: masterConstants.GET_SHIPPING_CONDITION_REQUEST, shippingcondition };
  }
  function success(shippingcondition) {
    return { type: masterConstants.GET_SHIPPING_CONDITION_SUCCESS, shippingcondition };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPPING_CONDITION_FAILURE, error };
  }
}
function getSpecialShippingCondition(countryCode, shipingcond) {
  return (dispatch) => {
    dispatch(request());

    masterService.getSpecialShippingCondition(countryCode, shipingcond).then(
      (spclshippingcondition) => dispatch(success(spclshippingcondition)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(spclshippingcondition) {
    return { type: masterConstants.GET_SPCLSHIPPING_CONDITION_REQUEST, spclshippingcondition };
  }
  function success(spclshippingcondition) {
    return { type: masterConstants.GET_SPCLSHIPPING_CONDITION_SUCCESS, spclshippingcondition };
  }
  function failure(error) {
    return { type: masterConstants.GET_SPCLSHIPPING_CONDITION_FAILURE, error };
  }
}
function getShippingType(countryCode, data, soldToNumber) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShippingType(countryCode, data, soldToNumber).then(
      (shippingtype) => dispatch(success(shippingtype)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shippingtype) {
    return { type: masterConstants.GET_SHIPPING_TYPE_REQUEST, shippingtype };
  }
  function success(shippingtype) {
    return { type: masterConstants.GET_SHIPPING_TYPE_SUCCESS, shippingtype };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPPING_TYPE_FAILURE, error };
  }
}
function getShippingTypeMyOrder(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShippingTypeMyOrder(countryCode).then(
      (shippingtypemyorder) => dispatch(success(shippingtypemyorder)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shippingtypemyorder) {
    return { type: masterConstants.GET_SHIPPING_TYPE_MYORDER_REQUEST, shippingtypemyorder };
  }
  function success(shippingtypemyorder) {
    return { type: masterConstants.GET_SHIPPING_TYPE_MYORDER_SUCCESS, shippingtypemyorder };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPPING_TYPE_MYORDER_FAILURE, error };
  }
}
function getShipToByAccNum(AccNum) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShipToByAccNum(AccNum).then(
      (getShipToByAccNum) => dispatch(success(getShipToByAccNum)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getShipToByAccNum) {
    return { type: masterConstants.GET_SHIPTO_BYACCNUM_REQUEST, getShipToByAccNum };
  }
  function success(getShipToByAccNum) {
    return { type: masterConstants.GET_SHIPTO_BYACCNUM_SUCCESS, getShipToByAccNum };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPTO_BYACCNUM_FAILURE, error };
  }
}
function getShipmentStatus(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShipmentStatus(countryCode).then(
      (shipmentstatus) => dispatch(success(shipmentstatus)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shipmentstatus) {
    return { type: masterConstants.GET_SHIPMENT_STATUS_REQUEST, shipmentstatus };
  }
  function success(shipmentstatus) {
    return { type: masterConstants.GET_SHIPMENT_STATUS_SUCCESS, shipmentstatus };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPMENT_STATUS_FAILURE, error };
  }
}


function getShipmentStatusVn(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShipmentStatusVn(countryCode).then(
      (getShipmentStatusVn) => dispatch(success(getShipmentStatusVn)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getShipmentStatusVn) {
    return { type: masterConstants.GET_SHIPMENT_STATUS_VN_REQUEST, getShipmentStatusVn };
  }
  function success(getShipmentStatusVn) {
    return { type: masterConstants.GET_SHIPMENT_STATUS_VN_SUCCESS, getShipmentStatusVn };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPMENT_STATUS_VN_FAILURE, error };
  }
}


function getOrderType(countrycode, customerno, matchedsalesarea, contractnumber) {
  return (dispatch) => {
    dispatch(request());

    masterService.getOrderType(countrycode, customerno, matchedsalesarea, contractnumber).then(
      (ordertype) => dispatch(success(ordertype)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(ordertype) {
    return { type: masterConstants.GET_ORDER_TYPE_REQUEST, ordertype };
  }
  function success(ordertype) {
    return { type: masterConstants.GET_ORDER_TYPE_SUCCESS, ordertype };
  }
  function failure(error) {
    return { type: masterConstants.GET_ORDER_TYPE_FAILURE, error };
  }
}

function contractsbyAcc(accountNumber) {
  return (dispatch) => {
    dispatch(request());

    masterService.contractsbyAcc(accountNumber).then(
      (contractbyacc) => dispatch(success(contractbyacc)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(contractbyacc) {
    return { type: masterConstants.GET_CONTRACT_ACCOUNT_REQUEST, contractbyacc };
  }
  function success(contractbyacc) {
    return { type: masterConstants.GET_CONTRACT_ACCOUNT_SUCCESS, contractbyacc };
  }
  function failure(error) {
    return { type: masterConstants.GET_CONTRACT_ACCOUNT_FAILURE, error };
  }
}

function chooseTransporter(countryCode, customerCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.chooseTransporter(countryCode, customerCode).then(
      (chooseTransporter) => dispatch(success(chooseTransporter)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(chooseTransporter) {
    return { type: masterConstants.GET_CHOOSETRANSPORTER_REQUEST, chooseTransporter };
  }
  function success(chooseTransporter) {
    return { type: masterConstants.GET_CHOOSETRANSPORTER_SUCCESS, chooseTransporter };
  }
  function failure(error) {
    return { type: masterConstants.GET_CHOOSETRANSPORTER_FAILURE, error };
  }
}

function prefaredTruckType(countryCode, selectedShippingType, selectedShipTiId, selectedSubCat) {
  return (dispatch) => {
    dispatch(request());

    masterService.prefaredTruckType(countryCode, selectedShippingType, selectedShipTiId, selectedSubCat).then(
      (preftrucktype) => dispatch(success(preftrucktype)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(preftrucktype) {
    return { type: masterConstants.GET_PREF_TRUCK_TYPE_REQUEST, preftrucktype };
  }
  function success(preftrucktype) {
    return { type: masterConstants.GET_PREF_TRUCK_TYPE_SUCCESS, preftrucktype };
  }
  function failure(error) {
    return { type: masterConstants.GET_PREF_TRUCK_TYPE_FAILURE, error };
  }
}
function specialProject(countryCode, data) {
  return (dispatch) => {
    dispatch(request());

    masterService.specialProject(countryCode, data).then(
      (specialpro) => dispatch(success(specialpro)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(specialpro) {
    return { type: masterConstants.GET_SPECIAL_PROJECT_REQUEST, specialpro };
  }
  function success(specialpro) {
    return { type: masterConstants.GET_SPECIAL_PROJECT_SUCCESS, specialpro };
  }
  function failure(error) {
    return { type: masterConstants.GET_SPECIAL_PROJECT_FAILURE, error };
  }
}

function plantbyCountry(countryCode, category) {
  return (dispatch) => {
    dispatch(request());

    masterService.plantbyCountry(countryCode, category).then(
      (plantbycount) => dispatch(success(plantbycount)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(plantbycount) {
    return { type: masterConstants.GET_PLANTBY_COUNTRY_REQUEST, plantbycount };
  }
  function success(plantbycount) {
    return { type: masterConstants.GET_PLANTBY_COUNTRY_SUCCESS, plantbycount };
  }
  function failure(error) {
    return { type: masterConstants.GET_PLANTBY_COUNTRY_FAILURE, error };
  }
}

function plantbyCountryForVN(countryCode, shipTo) {
  return (dispatch) => {
    dispatch(request());

    masterService.plantbyCountryForVN(countryCode, shipTo).then(
      (plantbyCountryForVN) => dispatch(success(plantbyCountryForVN)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(plantbyCountryForVN) {
    return { type: masterConstants.GET_PLANTBY_COUNTRY_VN_REQUEST, plantbyCountryForVN };
  }
  function success(plantbyCountryForVN) {
    return { type: masterConstants.GET_PLANTBY_COUNTRY_VN_SUCCESS, plantbyCountryForVN };
  }
  function failure(error) {
    return { type: masterConstants.GET_PLANTBY_COUNTRY_VN_FAILURE, error };
  }
}



function shiptobyCountryAccount(condition, contractData) {
 
  return (dispatch) => {
    dispatch(request());

    masterService.shiptobyCountryAccount(condition, contractData).then(
      (shiptobycount) => dispatch(success(shiptobycount)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shiptobycount) {
    return { type: masterConstants.GET_SHIPTO_COUNTRY_REQUEST, shiptobycount };
  }
  function success(shiptobycount) {
    return { type: masterConstants.GET_SHIPTO_COUNTRY_SUCCESS, shiptobycount };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPTO_COUNTRY_FAILURE, error };
  }
}


function getProvince(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getProvince(countryCode).then(
      (getprovince) => dispatch(success(getprovince)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getprovince) {
    return { type: masterConstants.GET_PROVINCE_REQUEST, getprovince };
  }
  function success(getprovince) {
    return { type: masterConstants.GET_PROVINCE_SUCCESS, getprovince };
  }
  function failure(error) {
    return { type: masterConstants.GET_PROVINCE_FAILURE, error };
  }
}

function getDateRangeMaster() {
  return (dispatch) => {
    dispatch(request());

    masterService.getDateRangeMaster().then(
      (getDateRangeMaster) => dispatch(success(getDateRangeMaster)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getDateRangeMaster) {
    return { type: masterConstants.GET_DATE_RANGE_REQUEST, getDateRangeMaster };
  }
  function success(getDateRangeMaster) {
    return { type: masterConstants.GET_DATE_RANGE_SUCCESS, getDateRangeMaster };
  }
  function failure(error) {
    return { type: masterConstants.GET_DATE_RANGE_FAILURE, error };
  }
}



function getDistrict(country, province) {
  return (dispatch) => {
    dispatch(request());

    masterService.getDistrict(country, province).then(
      (getdistrict) => dispatch(success(getdistrict)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getdistrict) {
    return { type: masterConstants.GET_DISTRICT_REQUEST, getdistrict };
  }
  function success(getdistrict) {
    return { type: masterConstants.GET_DISTRICT_SUCCESS, getdistrict };
  }
  function failure(error) {
    return { type: masterConstants.GET_DISTRICT_FAILURE, error };
  }
}

function getShipToForVn(soldToNumber, province, district) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShipToForVn(soldToNumber, province, district).then(
      (getShipToForVn) => dispatch(success(getShipToForVn)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getShipToForVn) {
    return { type: masterConstants.GET_SHIPTO_SHIP_VN_REQUEST, getShipToForVn };
  }
  function success(getShipToForVn) {
    return { type: masterConstants.GET_SHIPTO_SHIP_VN_SUCCESS, getShipToForVn };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPTO_SHIP_VN_FAILURE, error };
  }
}




function getCaseType(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getCaseType(countryCode).then(
      (getCaseType) => dispatch(success(getCaseType)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getCaseType) {
    return { type: masterConstants.GET_CASE_TYPE_REQUEST, getCaseType };
  }
  function success(getCaseType) {
    return { type: masterConstants.GET_CASE_TYPE_SUCCESS, getCaseType };
  }
  function failure(error) {
    return { type: masterConstants.GET_CASE_TYPE_FAILURE, error };
  }
}

function getCaseStatus(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getCaseStatus(countryCode).then(
      (getCaseStatus) => dispatch(success(getCaseStatus)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getCaseStatus) {
    return { type: masterConstants.GET_CASE_STATUS_REQUEST, getCaseStatus };
  }
  function success(getCaseStatus) {
    return { type: masterConstants.GET_CASE_STATUS_SUCCESS, getCaseStatus };
  }
  function failure(error) {
    return { type: masterConstants.GET_CASE_STATUS_FAILURE, error };
  }
}

function getBusinessSegment(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getBusinessSegment(countryCode).then(
      (getBusinessSegment) => dispatch(success(getBusinessSegment)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getBusinessSegment) {
    return { type: masterConstants.GET_BUSINESS_SEGMENT_REQUEST, getBusinessSegment };
  }
  function success(getBusinessSegment) {
    return { type: masterConstants.GET_BUSINESS_SEGMENT_SUCCESS, getBusinessSegment };
  }
  function failure(error) {
    return { type: masterConstants.GET_BUSINESS_SEGMENT_FAILURE, error };
  }
}

function getCaseCategory(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getCaseCategory(countryCode).then(
      (getCaseCategory) => dispatch(success(getCaseCategory)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getCaseCategory) {
    return { type: masterConstants.GET_CASE_CATEGORY_REQUEST, getCaseCategory };
  }
  function success(getCaseCategory) {
    return { type: masterConstants.GET_CASE_CATEGORY_SUCCESS, getCaseCategory };
  }
  function failure(error) {
    return { type: masterConstants.GET_CASE_CATEGORY_FAILURE, error };
  }
}


function shipToForShipment(countryCode, filterData) {
  return (dispatch) => {
    dispatch(request());

    masterService.shipToForShipment(countryCode, filterData).then(
      (shipToForShipment) => dispatch(success(shipToForShipment)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shipToForShipment) {
    return { type: masterConstants.GET_SHIPTO_FORSHIPMENT_REQUEST, shipToForShipment };
  }
  function success(shipToForShipment) {
    return { type: masterConstants.GET_SHIPTO_FORSHIPMENT_SUCCESS, shipToForShipment };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPTO_FORSHIPMENT_FAILURE, error };
  }
}

function shipmentStatusFilterList(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.shipmentStatusFilterList(countryCode).then(
      (shipmentFilter) => dispatch(success(shipmentFilter)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shipmentFilter) {
    return { type: masterConstants.GET_SHIPMENTFILTERLIST_REQUEST, shipmentFilter };
  }
  function success(shipmentFilter) {
    return { type: masterConstants.GET_SHIPMENTFILTERLIST_SUCCESS, shipmentFilter };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPMENTFILTERLIST_FAILURE, error };
  }
}


function productForShipment(customerId, filterData) {
  return (dispatch) => {
    dispatch(request());

    masterService.productForShipment(customerId, filterData).then(
      (productForShipment) => dispatch(success(productForShipment)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(productForShipment) {
    return { type: masterConstants.GET_PRODUCT_FORSHIPMENT_REQUEST, productForShipment };
  }
  function success(productForShipment) {
    return { type: masterConstants.GET_PRODUCT_FORSHIPMENT_SUCCESS, productForShipment };
  }
  function failure(error) {
    return { type: masterConstants.GET_PRODUCT_FORSHIPMENT_FAILURE, error };
  }
}


function plantNameForShipment(customerId) {
  return (dispatch) => {
    dispatch(request());

    masterService.plantNameForShipment(customerId).then(
      (plantNameForShipment) => dispatch(success(plantNameForShipment)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(plantNameForShipment) {
    return { type: masterConstants.GET_SHIP_TO_MY_ORDER_REQUEST, plantNameForShipment };
  }
  function success(plantNameForShipment) {
    return { type: masterConstants.GET_PLANT_FORSHIPMENT_SUCCESS, plantNameForShipment };
  }
  function failure(error) {
    return { type: masterConstants.GET_PLANT_FORSHIPMENT_FAILURE, error };
  }
}

function shipToMyOrder(customerId) {
  return (dispatch) => {
    dispatch(request());

    masterService.shipToMyOrder(customerId).then(
      (shipToMyOrder) => dispatch(success(shipToMyOrder)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(shipToMyOrder) {
    return { type: masterConstants.GET_SHIP_TO_MY_ORDER_REQUEST, shipToMyOrder };
  }
  function success(shipToMyOrder) {
    return { type: masterConstants.GET_SHIP_TO_MY_ORDER_SUCCESS, shipToMyOrder };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIP_TO_MY_ORDER_FAILURE, error };
  }
}



function getShipMentData(customerId, productCategory, orderId, plantId, dateRange, productCode, productSubCategory, searchByStatus, shipingCondition, shipTo, shipType) {
  return (dispatch) => {
    dispatch(request());

    masterService.getShipMentData(customerId, productCategory, orderId, plantId, dateRange, productCode, productSubCategory, searchByStatus, shipingCondition, shipTo, shipType).then(
      (getShipMentData) => dispatch(success(getShipMentData)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getShipMentData) {
    return { type: masterConstants.GET_DATA_FORSHIPMENT_REQUEST, getShipMentData };
  }
  function success(getShipMentData) {
    return { type: masterConstants.GET_DATA_FORSHIPMENT_SUCCESS, getShipMentData };
  }
  function failure(error) {
    return { type: masterConstants.GET_DATA_FORSHIPMENT_FAILURE, error };
  }
}

function getProductCatLevel(lavel) {
  return (dispatch) => {
    dispatch(request());

    masterService.getProductCatLevel(lavel).then(
      (getProductCatLevel) => dispatch(success(getProductCatLevel)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getProductCatLevel) {
    return { type: masterConstants.GET_PRODUCT_CAT_VALUE_REQUEST, getProductCatLevel };
  }
  function success(getProductCatLevel) {
    return { type: masterConstants.GET_PRODUCT_CAT_VALUE_SUCCESS, getProductCatLevel };
  }
  function failure(error) {
    return { type: masterConstants.GET_PRODUCT_CAT_VALUE_FAILURE, error };
  }
}

function getProductSubCatLevel(cat, lavel) {
  return (dispatch) => {
    dispatch(request());

    masterService.getProductSubCatLevel(cat, lavel).then(
      (getProductSubCatLevel) => dispatch(success(getProductSubCatLevel)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getProductSubCatLevel) {
    return { type: masterConstants.GET_PRODUCT_SUB_CAT_VALUE_REQUEST, getProductSubCatLevel };
  }
  function success(getProductSubCatLevel) {
    return { type: masterConstants.GET_PRODUCT_SUB_CAT_VALUE_SUCCESS, getProductSubCatLevel };
  }
  function failure(error) {
    return { type: masterConstants.GET_PRODUCT_SUB_CAT_VALUE_FAILURE, error };
  }
}

function getSpecialShippingConditionConwood(countryCode, categoryName, shipingcond) {
  return (dispatch) => {
    dispatch(request());

    masterService.getSpecialShippingConditionConwood(countryCode, categoryName, shipingcond).then(
      (getSpecialShippingConditionConwood) => dispatch(success(getSpecialShippingConditionConwood)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getSpecialShippingConditionConwood) {
    return { type: masterConstants.GET_SPECIAL_SHIP_COND_BY_CAT_REQUEST, getSpecialShippingConditionConwood };
  }
  function success(getSpecialShippingConditionConwood) {
    return { type: masterConstants.GET_SPECIAL_SHIP_COND_BY_CAT_SUCCESS, getSpecialShippingConditionConwood };
  }
  function failure(error) {
    return { type: masterConstants.GET_SPECIAL_SHIP_COND_BY_CAT_FAILURE, error };
  }
}






function getProductCatLevelValue(id) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(id))
  };

  function request(getProductCatLevelValue) {
    return { type: masterConstants.GET_PRODUCT_CATEGORY_LAVEL_VALUE_REQUEST, getProductCatLevelValue };
  }
  function success(getProductCatLevelValue) {
    return { type: masterConstants.GET_PRODUCT_CATEGORY_LAVEL_VALUE_SUCCESS, getProductCatLevelValue };
  }
  function failure(error) {
    return { type: masterConstants.GET_PRODUCT_CATEGORY_LAVEL_VALUE_FAILURE, error };
  }
}

function getProductSubCatLevelValue(id) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(id))
  };

  function request(getProductSubCatLevelValue) {
    return { type: masterConstants.GET_PRODUCT_SUB_CATEGORY_LAVEL_VALUE_REQUEST, getProductSubCatLevelValue };
  }
  function success(getProductSubCatLevelValue) {
    return { type: masterConstants.GET_PRODUCT_SUB_CATEGORY_LAVEL_VALUE_SUCCESS, getProductSubCatLevelValue };
  }
  function failure(error) {
    return { type: masterConstants.GET_PRODUCT_SUB_CATEGORY_LAVEL_VALUE_FAILURE, error };
  }
}

function getProductCatForShipment(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(getProductCatForShipment) {
    return { type: masterConstants.GET_PRODUCT_CATEGORY_REQUEST, getProductCatForShipment };
  }
  function success(getProductCatForShipment) {
    return { type: masterConstants.GET_PRODUCT_CATEGORY_SUCCESS, getProductCatForShipment };
  }
  function failure(error) {
    return { type: masterConstants.GET_PRODUCT_CATEGORY_FAILURE, error };
  }
}


function orderByStatusValue(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(orderByStatusValue) {
    return { type: masterConstants.GET_ORDERBY_STATUS_REQUEST, orderByStatusValue };
  }
  function success(orderByStatusValue) {
    return { type: masterConstants.GET_ORDERBY_STATUS_SUCCESS, orderByStatusValue };
  }
  function failure(error) {
    return { type: masterConstants.GET_ORDERBY_STATUS_FAILURE, error };
  }
}

function searchByNoValue(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(searchByNoValue) {
    return { type: masterConstants.GET_SEARCH_BY_ORDER_NO_REQUEST, searchByNoValue };
  }
  function success(searchByNoValue) {
    return { type: masterConstants.GET_SEARCHBY_VALUE_MY_ORDER_SUCCESS, searchByNoValue };
  }
  function failure(error) {
    return { type: masterConstants.GET_SEARCHBY_VALUE_MY_ORDER_FAILURE, error };
  }
}

function searchByOrderNo(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(searchByOrderNo) {
    return { type: masterConstants.GET_SEARCH_BY_ORDER_NO_REQUEST, searchByOrderNo };
  }
  function success(searchByOrderNo) {
    return { type: masterConstants.GET_SEARCH_BY_ORDER_NO_SUCCESS, searchByOrderNo };
  }
  function failure(error) {
    return { type: masterConstants.GET_SEARCH_BY_ORDER_NO_FAILURE, error };
  }
}



function shippingConditionMyOrderValue(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(shippingConditionMyOrderValue) {
    return { type: masterConstants.SHIPPING_CONDITION_VALUE_REQUEST, shippingConditionMyOrderValue };
  }
  function success(shippingConditionMyOrderValue) {
    return { type: masterConstants.SHIPPING_CONDITION_VALUE_SUCCESS, shippingConditionMyOrderValue };
  }
  function failure(error) {
    return { type: masterConstants.SHIPPING_CONDITION_VALUE_FAILURE, error };
  }
}

function shipTypeValueMyOredr(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(shipTypeValueMyOredr) {
    return { type: masterConstants.SHIPPING_TYPE_VALUE_REQUEST, shipTypeValueMyOredr };
  }
  function success(shipTypeValueMyOredr) {
    return { type: masterConstants.SHIPPING_TYPE_VALUE_SUCCESS, shipTypeValueMyOredr };
  }
  function failure(error) {
    return { type: masterConstants.SHIPPING_TYPE_VALUE_FAILURE, error };
  }
}

function ShipToValueMyOrder(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(ShipToValueMyOrder) {
    return { type: masterConstants.SHIP_TO_VALUE_REQUEST, ShipToValueMyOrder };
  }
  function success(ShipToValueMyOrder) {
    return { type: masterConstants.SHIP_TO_VALUE_SUCCESS, ShipToValueMyOrder };
  }
  function failure(error) {
    return { type: masterConstants.SHIP_TO_VALUE_FAILURE, error };
  }
}

function paginationValue(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(paginationValue) {
    return { type: masterConstants.PAGINATION_VALUE_REQUEST, paginationValue };
  }
  function success(paginationValue) {
    return { type: masterConstants.PAGINATION_VALUE_SUCCESS, paginationValue };
  }
  function failure(error) {
    return { type: masterConstants.PAGINATION_VALUE_FAILURE, error };
  }
}

function getRemarks(orderID) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(getRemarks) {
    return { type: masterConstants.GET_REAMRKS_NOTE_REQUEST, getRemarks };
  }
  function success(getRemarks) {
    return { type: masterConstants.GET_REAMRKS_NOTE_SUCCESS, getRemarks };
  }
  function failure(error) {
    return { type: masterConstants.GET_REAMRKS_NOTE_FAILURE, error };
  }
}

function uploadFile(files) {
  return (dispatch) => {
    dispatch(request());

    masterService.uploadFile(files).then(
      (uploadFile) => dispatch(success(uploadFile)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(uploadFile) {
    return { type: masterConstants.UPLOAD_FILE_REQUEST, uploadFile };
  }
  function success(uploadFile) {
    return { type: masterConstants.UPLOAD_FILE_SUCCESS, uploadFile };
  }
  function failure(error) {
    return { type: masterConstants.UPLOAD_FILE_FAILURE, error };
  }

}

function deleteFile() {
  return (dispatch) => {
    dispatch(request());

  };
  function request() {
    return { type: masterConstants.UPLOAD_FILE_RESET };
  }
}


function getRetailerByDistrict(soldToNumber) {
  return (dispatch) => {
    dispatch(request());

    masterService.getRetailerByDistrict(soldToNumber).then(
      (districtList) => dispatch(success(districtList)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(districtList) {
    return { type: masterConstants.RETAILER_BY_DISTRICT_REQUEST, districtList };
  }
  function success(districtList) {
    return { type: masterConstants.RETAILER_BY_DISTRICT_SUCCESS, districtList };
  }
  function failure(error) {
    return { type: masterConstants.RETAILER_BY_DISTRICT_FAILURE, error };
  }
}

function getRegionByCountry(countryCode) {
  return (dispatch) => {
    dispatch(request());

    masterService.getRegionByCountry(countryCode).then(
      (regionList) => dispatch(success(regionList)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(regionList) {
    return { type: masterConstants.REGION_BY_COUNTRY_CODE_REQUEST, regionList };
  }
  function success(regionList) {
    return { type: masterConstants.REGION_BY_COUNTRY_CODE_SUCCESS, regionList };
  }
  function failure(error) {
    return { type: masterConstants.REGION_BY_COUNTRY_CODE_FAILURE, error };
  }
}

function getProvinceByRegion(region) {
  return (dispatch) => {
    dispatch(request());

    masterService.getProvinceByRegion(region).then(
      (provinceList) => dispatch(success(provinceList)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(provinceList) {
    return { type: masterConstants.PROVINCE_BY_REGION_REQUEST, provinceList };
  }
  function success(provinceList) {
    return { type: masterConstants.PROVINCE_BY_REGION_SUCCESS, provinceList };
  }
  function failure(error) {
    return { type: masterConstants.PROVINCE_BY_REGION_FAILURE, error };
  }
}

function getDistrictByProvince(province) {
  return (dispatch) => {
    dispatch(request());

    masterService.getDistrictByProvince(province).then(
      (districtList) => dispatch(success(districtList)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(districtList) {
    return { type: masterConstants.DISTRICT_BY_PROVINCE_REQUEST, districtList };
  }
  function success(districtList) {
    return { type: masterConstants.DISTRICT_BY_PROVINCE_SUCCESS, districtList };
  }
  function failure(error) {
    return { type: masterConstants.DISTRICT_BY_PROVINCE_FAILURE, error };
  }
}

function getShipCatValue(data) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(data))
  };

  function request(getShipCatValue) {
    return { type: masterConstants.GET_SHIPMENT_CAT_REQUEST, getShipCatValue };
  }
  function success(getShipCatValue) {
    return { type: masterConstants.GET_SHIPMENT_CAT_SUCCESS, getShipCatValue };
  }
  function failure(error) {
    return { type: masterConstants.GET_SHIPMENT_CAT_FAILURE, error };
  }
}

function shipToCustomerByDistrict(accountNumber, district, province) {
  return dispatch => {
    dispatch(request());

    masterService.shipToCustomerByDistrict(accountNumber, district, province)
      .then(
        (districtList) => dispatch(success(districtList)),
        (error) => dispatch(failure(error.toString()))
      );
  };
  function request(districtList) { return { type: masterConstants.SHIP_TO_CUSTOMER_BY_DISTRICT_REQUEST, districtList } }
  function success(districtList) { return { type: masterConstants.SHIP_TO_CUSTOMER_BY_DISTRICT_SUCCESS, districtList } }
  function failure(error) { return { type: masterConstants.SHIP_TO_CUSTOMER_BY_DISTRICT_FAILURE, error } }
}

























