//import config from 'config';
import { authHeader } from "../_helpers";
import { Link, useLocation } from "react-router-dom";
//import { process.env.REACT_APP_API_URL_DELIVERY, process.env.REACT_APP_API_URL_DMS,process.env.REACT_APP_API_URL_ORDER, process.env.REACT_APP_API_URL_UMS } from "../constant/index";

export const eventService = {
  createEvent,
  cancelShipment,
  shipmentDetails,
  createDelivery,
  getAllEvent,
  getAllVisitMode,
  getAllVisitObjective,
  ShipmentManagment,
  shipmentByFilter,
  filterMyShipments,
  CreatePickup,
  deliveryUpdate,
  getShipmentStatus,
  filterShipmentManagment,
  getDivisionForCustomer,
  getSoldTosForDivision
};
var userName =  localStorage.getItem('userData')

  userName = JSON.parse(userName)


function createEvent() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: "saurabh",
      date: "22u",
      eventLocation: "Noida",
      eventName: "Test",
      inseeGrowthMom: "12",
      inseeStringSow: "13",
      lastVisit: "12-12-2020",
      leadId: "NA",
      mode: "Offline",
      month1: "NA",
      month2: "NA",
      month3: "NA",
      objective: "NAeeee",
      planId: "NA",
      prospectName: "NA",
      salesUserId: "12",
      salesValue: "12",
      time: "12:00",
      visitFor: "EVENT",
      visitType: "ADHOC",
      visiterName: "saurabh mundewal",
    }),
  };

  return fetch(
    `http://inseeapplb-2025958416.ap-south-1.elb.amazonaws.com/vps/visit/createVisit`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

function cancelShipment(countryCode,inseeplusUID) {debugger
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
   }
  };
  return fetch(
    process.env.REACT_APP_API_URL_DMS+`/delivery-order/deleteDO/${countryCode}/${inseeplusUID}`,
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

function getShipmentStatus(country, inseePlusUID) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
   },
  };
  return fetch(
    process.env.REACT_APP_API_URL_DMS+`delivery-order/shipment/status/${country}?inseePlusUid=${inseePlusUID}`,
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

function shipmentDetails(country, inseePlusUID) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token') ,
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
  
  },
    

  };
  return fetch(
    process.env.REACT_APP_API_URL_DMS+`shipment/shipmentDetails?country=${country}&inseePlusUID=${inseePlusUID}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (result.status === 420) {      
        const error = result.message        
        return Promise.reject(error)
      } 
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;
    });
}

function getAllEvent() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token') ,
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
  },
  };

  return fetch(
    `http://inseeapplb-2025958416.ap-south-1.elb.amazonaws.com/vps/visitplan/visitPlanCount/2`,
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

function getAllVisitMode() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  return fetch(
    `http://inseeapplb-2025958416.ap-south-1.elb.amazonaws.com/vps/visit/getAllVisitMode
   `,
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
function getAllVisitObjective() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  return fetch(
    `http://inseeapplb-2025958416.ap-south-1.elb.amazonaws.com/vps/visit/getAllVisitObjective
   `,
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

function shipmentByFilter(shipmentId,country,customerId,shipingConditionValue,startIndex,status,endIndex) {
  const requestOptions = {
    method: "GET",
    headers:{ "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };
  return fetch(process.env.REACT_APP_API_URL_DMS+`shipment/shipmentByFilter?country=${country}&customerId=${customerId}&shippingCondition=${shipingConditionValue}&fromIndex=${startIndex}&shipmentId=${shipmentId}&status=${status}&toIndex=${endIndex}`,
  requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;
    });
}

function filterMyShipments(country,customerId,shipingConditionValue,startIndex,endIndex) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };
  return fetch(process.env.REACT_APP_API_URL_DMS+`shipment/shipmentByFilter?country=${country}&customerId=${customerId}&shippingCondition=${shipingConditionValue}&fromIndex=${startIndex}&toIndex=${endIndex}`,
  requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;
    });
}

function filterShipmentManagment(CustomerNumber,productCategory,shipingConditionValue,startIndex,endIndex) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
   },
  };
  return fetch(process.env.REACT_APP_API_URL_ORDER+`/order/getOrderSummaryByFilterForDelivery?customerNumber=${CustomerNumber}&shipingCondition=${shipingConditionValue}&productCategory=${productCategory}&fromIndex=${startIndex}&toIndex=${endIndex}`,
  requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;
    });
}

function ShipmentManagment(CustomerNumber,filterarray) { 
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
   },
  };
  let setQueryString='';
  Object.entries(filterarray).forEach((data,index)=>{
    var dataArray = data[1]
        if(dataArray!=='')
        {
          if(data[0] === 'shipTo' && userName && userName.countryCode === 'VN' && dataArray != CustomerNumber){
           dataArray.map((item, index) => {
            setQueryString+='&'+data[0]+'='+item;
           })
          }
          else {
            setQueryString+='&'+data[0]+'='+data[1];
          }

          
          
        }
  });
  

  let apiEndPoint =
  userName && userName.countryCode === 'VN' ? 
  `/order/getOrderSummaryByFilterForDeliveryVN?customerNumber=${CustomerNumber+''+setQueryString}
  `
  :
  `/order/getOrderSummaryByFilterForDelivery?customerNumber=${CustomerNumber+''+setQueryString}
  `
    return fetch(
    process.env.REACT_APP_API_URL_ORDER+`${apiEndPoint}`,
    requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      return result.data;
    });
}

function createDelivery(countryCode,DeliveryData) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
   },
    body: JSON.stringify(DeliveryData)
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + `delivery-order/delivery?countryCode=`+countryCode,
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

function deliveryUpdate(countryCode,shipData) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
   },
    body: JSON.stringify(shipData)
  };
  return fetch(
    process.env.REACT_APP_API_URL_DMS + `delivery-order/update?countryCode=`+countryCode,
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

function CreatePickup(countryCode,shipData) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
   },
    body: JSON.stringify(shipData)
  };

  return fetch(
    process.env.REACT_APP_API_URL_DMS + `delivery-order/pickup?countryCode=`+countryCode,
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


function getDivisionForCustomer(userId, soldTo) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': soldTo
   },
  };

  return fetch(
    process.env.REACT_APP_API_URL_UMS + `external-user/getDivisionForCustomer?userId=${userId}`,
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

function getSoldTosForDivision(division, userId, soldTo) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': soldTo
   },
  };

  return fetch(
    process.env.REACT_APP_API_URL_UMS + `external-user/getSoldTosForDivision?division=${division}&userId=${userId}`,
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



