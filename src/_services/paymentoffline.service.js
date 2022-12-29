import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import  { Redirect } from 'react-router-dom'
//import {process.env.REACT_APP_MASTER_API_URL, process.env.REACT_APP_API_URL_ORDER, process.env.REACT_APP_API_URL_PAYMENTOFFLINE, process.env.REACT_APP_API_URL_PAYMENT_OFFLINE, process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../constant'
export const paymentofflineService = {
  getAvailablity,
  getSapAging,
  getPaymentMode,
  getPaymentType,
  getPaymentBank,
  getPendingPayment,
  paymentStatus,
  getSettledPayment,
  confirmPaymentButton,
  confirmPaymentButtonOnline,
  paymentHistoryData,
  paymentHistoryDetail,
  paymentHistoryDataDelete,
  getPaymentOfflineChartData,
  getPendingPaymentStatus,
  loadcacheData,
  getBayBankResponse

};


var langCode = localStorage.getItem('lancode') 


function getAvailablity(getavailData) {
  console.log(getavailData, "on service---")
  const requestOptions = {
    method: "POST",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
  },
    body: JSON.stringify(getavailData)
  };
  return fetch(
    process.env.REACT_APP_API_URL_PAYMENT_OFFLINE +`/offline/CreditAvailablity`,
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

function getSapAging(customerData, paymentCategory) {

  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };
  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE +`/agignbycustomer/`+customerData+`?type=`+paymentCategory,
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

function getPaymentMode() {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE +`/paymentmode`,
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


function loadcacheData(soldToNo) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE +`/loadcache/${soldToNo}`,
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

function getPaymentType(c_payment_mode) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE +`/paymenttype?paymentMode=${c_payment_mode}`,
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

function getPaymentBank() {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE +`/paymentbank`,
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

function remove_first_occurrence(str, searchstr)       {
  var index = str.indexOf(searchstr);
  if (index === -1) {
    return str;
  }
  return  '?'+ str.slice(index + searchstr.length);
}


function getPendingPayment(paymentType, fromIndex,toIndex, soldToNo, defaultCat, serachValueData, startdateFinal, enddateFinal, doc, dueDate,documentDate, noOfDueDays) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };
 
  let setQueryString='';
  serachValueData && serachValueData.forEach((data,index)=>{
    if(data[Object.keys(data)[0]])
    {
      setQueryString+='&'+Object.keys(data)[0]+'='+data[Object.keys(data)[0]];
    }
    
  });
  return fetch( process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/${paymentType}?customercode=${soldToNo}&division=${defaultCat}&fromIndex=${fromIndex}&${setQueryString}&toIndex=${toIndex}&fromdate=${startdateFinal}&todate=${enddateFinal}&typedate=${doc}&dueDate=${dueDate}&documentDate=${documentDate}&dueDays=${noOfDueDays}
`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}



function getPendingPaymentStatus(status, custmerNo) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };
  let apiBackend=`/checkStatus?customercode=${custmerNo}&status=${status}`
  
  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + apiBackend,
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


function getSettledPayment(paymentType, pamentTypeCat, fromIndex,toIndex, soldToNo, defaultCat, serachValueData, startdateFinal, enddateFinal, doc) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };
  let setQueryString='';
  serachValueData && serachValueData.forEach((data,index)=>{
    if(data[Object.keys(data)[0]])
    {
      setQueryString+='&'+Object.keys(data)[0]+'='+data[Object.keys(data)[0]];
    }
    
  });
  return fetch( process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/${paymentType}?customercode=${soldToNo}&division=${defaultCat}&fromIndex=${fromIndex}${setQueryString}&status=${pamentTypeCat}&toIndex=${toIndex}&fromdate=${startdateFinal}&todate=${enddateFinal}&typedate=${doc}`, requestOptions)
 
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}




function paymentStatus(status,proID, summary) {
  const requestOptions = {
    method: "POST",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  let apiBackend=`/updatePaymentStatus/${proID}?status=${status}&type=${summary}`
  
  return fetch(
    process.env.REACT_APP_API_URL_PAYMENTOFFLINE + apiBackend,
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

function confirmPaymentButton(data) { debugger
  const requestOptions = {
    method: "POST",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
    body: JSON.stringify(data)
  };

  
  return fetch(
    process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/confirmpayment`,
    requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
       if(result.message === 'Failure') {
        const error = result.data;
        toast.error(
          langCode === 'en' ? 'Invoices you selected are on processing.' : 'ใบกำกับภาษีที่ท่านเลือกอยู่ระหว่างดำเนินการ',
         {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        return Promise.reject(error);
      }

      return result.data;
    });
}

function confirmPaymentButtonOnline(data) { debugger
  const requestOptions = {
    method: "POST",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
    body: JSON.stringify(data)
  };

var bankUrl 
  switch(data.paymentbank)
      {
      case "Krungsri Bank - Krungsri Online":
        bankUrl = '/payment/bay/online/initiate'
        break;
      case "Kasikorn Bank - K-Cash Connect":
        bankUrl = '/payment/kbank/online/initiate'
        break;  
        case "Siam Commercial Bank (SCB) - Business Net":
        bankUrl = '/payment/scb/online/initiate'
        break;       
      
      }
  
  
  return fetch(
    process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`${bankUrl}`,
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



function paymentHistoryData(data, fromIndex, toIndex, serachValueData, defaultCat, startdateFinalTransDate, enddateFinalTransDate) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  let setQueryString='';
serachValueData && serachValueData.forEach((data,index)=>{
  if(data[Object.keys(data)[0]])
  {
    setQueryString+='&'+Object.keys(data)[0]+'='+data[Object.keys(data)[0]];
  }
  
});
  return fetch(
    process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/history/${data}?division=${defaultCat}&fromIndex=${fromIndex}&search=${setQueryString}&toIndex=${toIndex}&fromdate=${startdateFinalTransDate}&todate=${enddateFinalTransDate}
    `, requestOptions)
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }

      return result.data;
    });
}


function paymentHistoryDetail(data) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  
  return fetch(
    process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/historyDetails/${data}`,
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

function getPaymentOfflineChartData(soldToNo, paymentCategory, fromdate, todate, filter) {
  const requestOptions = {
    method: "GET",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  
  return fetch(
    process.env.REACT_APP_API_URL_ORDER+`/order/getMonthlySalesOrderSummary/${soldToNo}?division=${paymentCategory}&fromdate=${fromdate}&todate=${todate}&type=${filter}`,
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


function getBayBankResponse(paymentRefNo, status) {
  const requestOptions = {
    method: "PUT",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  
  return fetch(
    process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/payment/bay/background/status?paymentRefNo=${paymentRefNo}&status=${status}`,
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



function paymentHistoryDataDelete(data) {
  const requestOptions = {
    method: "DELETE",
       headers: { "Content-Type": "application/json",
    'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
  };

  
  return fetch(
    process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/delete/${data}`,
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














