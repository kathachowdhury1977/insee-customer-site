
//import { process.env.REACT_APP_API_URL_PASSWORD_RESET, process.env.REACT_APP_MASTER_API_URL, process.env.REACT_APP_API_URL_CASE, process.env.REACT_APP_API_URL_LOGIN, process.env.REACT_APP_API_URL_ORDER, process.env.REACT_APP_API_URL_PAYMENT_OFFLINE, process.env.REACT_APP_API_URL_DMS } from '../constant'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const masterService = {
  loginPage,
  getOwnership,
  getVehicles,
  login,
  logout,
  Subdealer,
  getShippingCondition,
  getSpecialShippingCondition,
  getShippingType,
  getShippingTypeMyOrder,
  getOrderType,
  getDateRangeMaster,
  getRetailerBySoldToNumberUsingGET,
  shipToCustomer,
  contractsbyAcc,
  vehicletypes,
  prefaredTruckType,
  specialProject,
  getAllProductCatalog,
  plantbyCountry,
  plantbyCountryForVN,
  shiptobyCountryAccount,
  getProvince,
  getDistrict,
  getShipToForVn,
  getCaseType,
  getCaseStatus,
  getBusinessSegment,
  getCaseCategory,
  getShipmentStatus,
  getShipmentStatusVn,
  getShipToByAccNum,
  shipToForShipment,
  productForShipment,
  plantNameForShipment,
  getShipMentData,
  shipToMyOrder,
  getProductCatLevel,
  getProductSubCatLevel,
  getSpecialShippingConditionConwood,
  chooseTransporter,
  getCustomerBySoldTo,
  getSocialMediaUsingGet,
  deliveryOrderStatus,
  adminSocialmedia,
  createVehicle,
  deleteVehiclesByVehicleId,
  getVehiclesDetailsById,
  updateVehicle,
  shipmentStatusFilterList,
  forgotPassword,
  resetPassword,
  setPassword,
  uploadFile,
  getRetailerByDistrict,
  getRegionByCountry,
  getProvinceByRegion,
  getDistrictByProvince,
  getAllDashBoardImages,
  shipToCustomerByDistrict
};


var userName =  localStorage.getItem('userData')



  userName = JSON.parse(userName)

const selectedShipto = localStorage.getItem("SHIPTOCODE")

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}
///forgotPassword
function forgotPassword(username) { debugger
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ "userId": username })
  }
  return fetch(process.env.REACT_APP_API_URL_PASSWORD_RESET + `customer/password-reset-request`, requestOptions)
    .then(handleResponse)
   
    .then(user => {
      console.log(user, "users")
      return user;
    });
}

function resetPassword(id) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" }
  }
  return fetch(process.env.REACT_APP_API_URL_PASSWORD_RESET + `customer/password-reset/${id}`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}



function setPassword(passwordResetReqId, password, confirmPassword) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ "passwordResetReqId": passwordResetReqId, "password": password, "confirmPassword": confirmPassword })
  }
  return fetch(process.env.REACT_APP_API_URL_PASSWORD_RESET + `customer/password-reset`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return user;

    });
}

// function login(username, password) {
//   const requestOptions = {
//     method: "GET",
//     headers: { "Content-Type": "application/json" }
//   };
//   return fetch(process.env.REACT_APP_API_URL_LOGIN + `ums/external-user/login?password=${password}&username=${username}`, requestOptions)
//       .then(handleResponse)
//       .then(user => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           ///localStorage.setItem('userData', JSON.stringify(user));
//           return user;
//       });
// }



function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ "username": username, "password": password })
  }
  return fetch(process.env.REACT_APP_API_URL_LOGIN + `customer/login`, requestOptions)
    .then(handleLoginResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('userData', JSON.stringify(user));
      
      return user;

    });
}

function handleLoginResponse(response) {
  console.log('response ', response.headers.get("X-AUTH-TOKEN"),
  
  )
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (response.headers.get("X-AUTH-TOKEN") != '') {
      localStorage.setItem('x-auth-token', response.headers.get("X-AUTH-TOKEN"));
    }
    //localStorage.setItem('X-AUTH-TOKEN',response.headers.get("X-AUTH-TOKEN"));
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

//getOwnership
function getOwnership() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/vehicle/ownership`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}

//getOwnership
function getAllDashBoardImages(countryCode,  appType, channel) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
     
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/admin/dashboardImages/get?appType=${appType}&channel=${channel}&country=${countryCode}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}



///getCustomerBySoldTo
function getSocialMediaUsingGet(soldTonumber) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/admin/getSocialMedia/${soldTonumber}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}


///getCustomerBySoldTo
function getCustomerBySoldTo(soldTonumber) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/customer/${soldTonumber}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}

///delivery-order/status
function deliveryOrderStatus(soldTonumber, countryId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_API_URL_DMS + `/delivery-order/status/${soldTonumber}/${countryId}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}

///getVehiclesDetailsById
function getVehiclesDetailsById(vehicleId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/vehicle/${vehicleId}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}

///updateVehicle
function updateVehicle(updateVehicleData, vehicleId) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(updateVehicleData),
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/vehicle/${vehicleId}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result;
    });
}

///deleteVehiclesByVehicleId
function deleteVehiclesByVehicleId(vehicleId) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/vehicle/${vehicleId}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}

///ship-to/customer
function shipToCustomer(accountNumber, searchValue) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/ship-to/customer/${accountNumber}${!!searchValue ? '?searchKey=' + searchValue : ''}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}

///getCustomerBySoldTo
function getRetailerBySoldToNumberUsingGET(soldTonumber, fromIndex, toIndex, district, searchValue) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_MASTER_API_URL + `/retailer/${soldTonumber}?${!!district ? 'district=' + district + '&' : ''}fromIndex=${fromIndex}&${!!searchValue ? 'search=' + searchValue + '&' : ''}toIndex=${toIndex}`, requestOptions)
    .then(handleResponse)
    .then(result => {
      return result.data;
    });
}

function loginPage(username, password) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
    //  body: JSON.stringify(loginData),
  };
  console.log(requestOptions, "bodybody");
  return fetch(process.env.REACT_APP_API_URL_LOGIN + `external-user/login?password=` + password + `&username=` + username, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}



async function getShippingCondition(countryCode, categoryName, shipToNumberData, customerNumberData) {
  var userName = await localStorage.getItem('userData')

  console.log('userName----', userName)

  userName = JSON.parse(userName)
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  

  return fetch(
    userName && userName.countryCode === 'VN' ? 
    process.env.REACT_APP_MASTER_API_URL + `/pricemaster/getShippingCondition?`+ `shipTo=${shipToNumberData}&soldToNumber=${customerNumberData}`
    :
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/shipping-condition?productCategory=${categoryName}&shipToNumber=${shipToNumberData}&soldToNumber=${customerNumberData}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getSpecialShippingCondition(countryCode, shipingcond) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/special-shipping-condition/?shippingCondition=` + shipingcond,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });

}


function getSpecialShippingConditionConwood(countryCode, categoryName, shipingcond) {
  debugger
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/special-shipping-condition?productCategory=${categoryName}&shippingCondition=${shipingcond}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}
///createVehicle
function createVehicle(createVehicle) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(createVehicle),
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/vehicle`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result;
    });
}

//admin/socialmedia
function adminSocialmedia(socialmediaData) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(socialmediaData),
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/admin/socialmedia`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


async function getShippingType(countryCode, data, soldToNumber) {
  var userName = await localStorage.getItem('userData')

  console.log('MSXXXXX', userName)

  userName = JSON.parse(userName)
  const requestOptions = 
  userName && userName.countryCode === 'VN' ? 
  {
   
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  
  }
  
  :
  {
   
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(data),
  };
  
  return fetch(
    userName && userName.countryCode === 'VN' ?  
    process.env.REACT_APP_MASTER_API_URL + `/pricemaster/getShippingType?shipTo=${soldToNumber}&soldToNumber=${soldToNumber}` :
    process.env.REACT_APP_API_URL_ORDER + `/order/trucktype/` + countryCode,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

// async function getShippingType(countryCode,soldToNumber, data) {
//   var userName = await localStorage.getItem('userData')

//   console.log('MSXXXXX', userName)

//   userName = JSON.parse(userName)
  
//   const requestOptions = 

//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
//       'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
//     },
//     body: JSON.stringify(data),
//   };

//   return fetch(
//     process.env.REACT_APP_API_URL_ORDER + `/order/trucktype/` + countryCode,
//     requestOptions
//   )
//     .then((res) => res.json())
//     .then((result) => {
//       if (!result.status) {
//         const error = (result && result.message) || result.statusText;
//         return Promise.reject(error);
//       }

//       return result.data;
//     });
// }

function getShippingTypeMyOrder(countryCode, data) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(data),
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/shipping-types`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}
function getShipToByAccNum(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/ship-to/customer/` + countryCode,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}
function getShipmentStatus(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/getAllSalesOrderStatus`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function getShipmentStatusVn(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/getOrderStatus?countryCode=${countryCode}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}



function shipmentStatusFilterList(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/countryCode/shipmentStatus?countryCode=${countryCode}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getOrderType(countrycode, customerno, matchedsalesarea, contractno) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countrycode + `/customer/order-types?customerNumber=` + customerno + `&matchedSalesArea=` + matchedsalesarea + '&contractNumber=' + contractno,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function contractsbyAcc(accountNumber) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/contracts/account/` + accountNumber,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function chooseTransporter(countryCode, customerCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/chooseTransporter/` + customerCode,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function prefaredTruckType(countryCode, selectedShippingType, selectedShipTiId, selectedSubCat) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/preferred-truck?productSubCategory=${selectedSubCat}&shippingType=${selectedShippingType}&shipTo=${selectedShipTiId}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function specialProject(countryCode, data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(data),
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/special-project`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}
function getAllProductCatalog() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/products/getAllProductCatalog/TH`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function plantbyCountry(countryCode, category) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/plant/country/plant/${countryCode}?prodctCategory=${category}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      const listForBulk = [
        {plantCode: "1041", plantName: "สระบุรี - Saraburi", lat: null, lng: null, countryCode: "TH"},
        {plantCode: "1010", plantName: "สุราษฎร์ธานี - Suratthani", lat: null, lng: null, countryCode: "TH"},
        { plantCode:"1000", plantName: "สำนักงานใหญ่ - Head Office", lat: null, lng: null, countryCode: "TH"},
        {plantCode: "1012", plantName: "ขอนแก่น - Khon Kean", lat: null, lng: null, countryCode: "TH"},
        {plantCode: "1013", plantName: "อุดรธานี - Udon Thani", lat: null, lng: null, countryCode: "TH"}
      ]

      const listForBag = [
        {plantCode: "1041", plantName: "สระบุรี - Saraburi", lat: null, lng: null, countryCode: "TH"},
        {plantCode: "1011", plantName: "สุราษฎร์ธานี - Suratthani", lat: null, lng: null, countryCode: "TH"},
        { plantCode:"1000", plantName: "สำนักงานใหญ่ - Head Office", lat: null, lng: null, countryCode: "TH"},
        {plantCode: "1012", plantName: "ขอนแก่น - Khon Kean", lat: null, lng: null, countryCode: "TH"},
        {plantCode: "1013", plantName: "อุดรธานี - Udon Thani", lat: null, lng: null, countryCode: "TH"}
      ]

      // console.log('hello', result.data);
      // return result.data;
      return listForBulk;
    });
}

function plantbyCountryForVN(countryCode, shipTo) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/pricemaster/getPlants?shipTo=${shipTo}&soldToNumber=${countryCode}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}



async function shiptobyCountryAccount(condition, contractData) {
  var userName = await localStorage.getItem('userData')



  userName = JSON.parse(userName)
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  
  let apiEndPoint = process.env.REACT_APP_MASTER_API_URL + '/ship-to/' + contractData; 
    let apiEndPointVn = process.env.REACT_APP_MASTER_API_URL + `/soldTo/getAllShipToForUserId?soldToNUmber=${contractData}&userId=${userName.userId}`    
  
  if (condition === 'True') {
    apiEndPoint = process.env.REACT_APP_MASTER_API_URL + '/ship-to/customer/' + contractData
  }
  return fetch(
    userName && userName.countryCode === 'VN' || userName && userName.countryCode === 'LK'? apiEndPointVn : apiEndPoint,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}



function getProvince(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` +
    countryCode + `/province`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function getDateRangeMaster() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/dateRangeMaster`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}



function getDistrict(countryCode, provinceCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/district/` + provinceCode,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getShipToForVn(soldToNumber, province, district) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/ship-to/getShiptoByTZone?district=${district}&province=${province}&soldToNumber=${soldToNumber}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}




function getCaseType(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/case-type/get`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function getCaseStatus(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/case-status/get`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getVehicles(soldToNumber, vehicleType) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  let apiEndPoint =
  userName && userName.countryCode === 'VN' ? 
  `/vehicle?soldToNumber=${soldToNumber}`
  : 
  `/vehicle?soldToNumber=${soldToNumber}&vehicleType=${vehicleType}`
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + apiEndPoint ,
    requestOptions
  ).then((res) => res.json()).then((result) => {
    if (!result.status) {
      const error = (result && result.message) || result.statusText;
      return Promise.reject(error);
    }

    return result.data;
  });
}

function vehicletypes(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/vehicle/vehicletypes?countryCode=` + countryCode,
    requestOptions
  ).then((res) => res.json()).then((result) => {
    if (!result.status) {
      const error = (result && result.message) || result.statusText;
      return Promise.reject(error);
    }

    return result.data;
  });
}

function Subdealer(soldToNumber) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  return fetch(
    //process.env.REACT_APP_MASTER_API_URL + `/retailer/${soldToNumber}?fromIndex=1&toIndex=100`,
    process.env.REACT_APP_MASTER_API_URL + `/search/sub-dealer-number/search?soldToNumber=${soldToNumber}&filter=Active`,
    requestOptions
  ).then((res) => res.json()).then((result) => {
    if (!result.status) {
      const error = (result && result.message) || result.statusText;
      return Promise.reject(error);
    }

    return result.data;
  });
}

function getBusinessSegment(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
// Here it is segment API changed to division  for case 
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/division/get`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function getCaseCategory(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + '/category/get',
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      console.log(result, "Result")
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function shipToForShipment(customerId, filterData) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };

  let setQueryString = '';
  filterData.forEach((data, index) => {
    if (data[Object.keys(data)[0]]) {
      setQueryString += '&' + Object.keys(data)[0] + '=' + data[Object.keys(data)[0]];
    }

  });

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/shipTo?customerId=${customerId + '' + setQueryString}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function productForShipment(customerId, filterData) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  console.log('filterDatafilterData', filterData);
  let setQueryString = '';
  filterData.forEach((data, index) => {
    if (data[Object.keys(data)[0]]) {
      setQueryString += '&' + Object.keys(data)[0] + '=' + data[Object.keys(data)[0]];
    }

  });
  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/products?customerId=${customerId + '' + setQueryString}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function plantNameForShipment(customerId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };
  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/plants?customerId=${customerId}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function getShipMentData(customerId, productCategory, orderId, plantId, dateRange, productCode, productSubCategory, searchByStatus, shipingCondition, shipTo, shipType) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };


  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/getOrderSummaryByFilterForDelivery?customerNumber=${customerId}&productCategory=${productCategory}&orderId=${orderId}&plantId=${plantId}&dateRange=${dateRange}&productCode=${productCode}&productSubCategory=${productSubCategory}&searchByStatus=${searchByStatus}&shipingCondition=${shipingCondition}&shipTo=${shipTo}&shipType=${shipType}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function shipToMyOrder(customerId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };


  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/shipTo?customerId=${customerId}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function getProductCatLevel(customerId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };


  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/product-hierarchy/category?level=${customerId}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getProductSubCatLevel(cat, lavel) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  };


  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/product-hierarchy/category?category=${cat}&level=${lavel}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    //localStorage.setItem('X-AUTH-TOKEN',response.headers.get("X-AUTH-TOKEN"));
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

async function uploadFile(files) {

  const requestOptions = {
    method: "POST",
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: files
  };

  return fetch(
    process.env.REACT_APP_API_URL_CASE + `case/upload/document`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      console.log(result, "master action result")
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function getRetailerByDistrict(soldToNumber) {
  const requestOptions = {
    method: "GET",
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/retailer/retailerbydistrict/${soldToNumber}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getRegionByCountry(countryCode) {
  const requestOptions = {
    method: "GET",
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/geographical/country/getGeopgraphyByCountry?country=${countryCode}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getProvinceByRegion(region) {
  const requestOptions = {
    method: "GET",
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/geographical/region/getGeopgraphyByRegion?region=${region}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function getDistrictByProvince(province) {
  const requestOptions = {
    method: "GET",
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/geographical/province/getGeopgraphyByProvince?province=${province}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}

function shipToCustomerByDistrict(accountNumber, districtCode, province) {
  const requestOptions = {
    method: "GET",
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/ship-to/customer/district/${accountNumber}?district=${districtCode}&province=${province}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}









