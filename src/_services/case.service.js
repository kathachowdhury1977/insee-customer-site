
//import { process.env.REACT_APP_API_URL_CASE, process.env.REACT_APP_API_URL_LOYALTY } from "../constant/index";

export const caseService = {
  getCase,
  getAllCase,
  createCase,
  addRating,
  allocateVolumeHistory
};

function getCase(caseID,countryCode) {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const userId = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).soldTo) ?
    JSON.parse(localStorage.getItem('userData')).soldTo[0] : ''
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };
  return fetch(process.env.REACT_APP_API_URL_CASE + `case/customer/get/` + `${caseID}?country=${countryCode}&userId=${userId}`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}

function getAllCase(requiredJSON) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(requiredJSON)

  };
  return fetch(process.env.REACT_APP_API_URL_CASE + `case/customer/all`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      return result.data;
    });
}

function createCase(createCaseDetails) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') 
    },
    body: JSON.stringify(createCaseDetails)

  };
  return fetch(process.env.REACT_APP_API_URL_CASE + `case/customer/create`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      if (!result.status ) {
        const error = (result && result.error);
        return Promise.reject(error);
      }
      return result.data;
    });
}

function addRating(caseId, rating,countryCode) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_CASE + 'case/addRating/' + caseId + '?rating=' + rating+'&countryCode='+countryCode,
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


function allocateVolumeHistory(customerId, fromIndex, toIndex, selectedCompany, selectedMonth, currentYear, selectedRetailer) {

  const requestOptions = {
    method: "GET",
    headers: {
      'Content-type': 'application/json'
      , 'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }
  };

  return fetch(
    process.env.REACT_APP_API_URL_LOYALTY + `allocateVolume/history?customerId=${customerId}&fromIndex=${fromIndex}&toIndex=${toIndex}&company=${selectedCompany}&month=${selectedMonth}&year=${currentYear}&subDelearCode=${selectedRetailer}
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


