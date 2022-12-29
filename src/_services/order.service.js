//import { process.env.REACT_APP_MASTER_API_URL, process.env.REACT_APP_API_URL_ORDER } from '../constant'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withTranslation, useTranslation } from 'react-i18next'

export const orderService = {
  
  getAllProductCatalog,

  getProduct,
  addToCart,
  getCartData,
  getOrder,
  getOrderDetail,
  getConwoodCategory,
  getOrderCreditInfo,
  getAllOrdersList,
  clearCart,
  placeOrder,
  getShipToDetails,
  raiseReleaseRequest,
  cancelSO,
  deleteProductFormCart,
  logout,
  getCustomerPdpInfo,
  pdpConfirmed,
  raiseReleaseRequestVN,
  orderUpdateVN,
  changePaymentMethod,
  getShippingCondForVn,
  getShippingTypeForVn
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

async function getAllProductCatalog(
  contractno,
  accountNumber,
  plantcode,
  shiptocode,
  category,
  subcategory,
  shippingCondVn, 
  shippingTypedVn
) {
  var userName = await localStorage.getItem('userData')

  console.log('MSXXXXX', userName)

  userName = JSON.parse(userName)

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }
  console.log(
    contractno,
    accountNumber,
    plantcode,
    shiptocode,
    category,
    subcategory
  )
  if (contractno === 'contractno' || contractno === null) {
    contractno = ''
  }
  if (plantcode === 'plantcode' || plantcode === null) {
    plantcode = ''
  }
  if (shiptocode === 'shiptocode' || shiptocode === null) {
    shiptocode = ''
  }
  if (category === 'productcategory' || category === null) {
    category = ''
  }
  if (subcategory === 'productsubcategory' || subcategory === null) {
    subcategory = ''
  }

  
  let apiEndPoint =
  userName && userName.countryCode === 'VN' ? 
  `/pricemaster/getAllProductByFilter?customerNumber=` +
    accountNumber +
    `&contractNumber=` +
    contractno +
    `&shipToCode=` +
    shiptocode +
    `&plantCode=` +
    plantcode +
    `&productCategory=` +
    category +
    `&productSubCategory=` +
    subcategory +
    `&userId=` +
    userName.userId +
    `&shippingCondition=` +
    shippingCondVn +
    `&shippingType=` +
    shippingTypedVn 
  :
    `/products/getAllProductByFilter?customerNumber=` +
    accountNumber +
    `&contractNumber=` +
    contractno +
    `&shipToCode=` +
    shiptocode +
    `&plantCode=` +
    plantcode +
    `&productCategory=` +
    category +
    `&productSubCategory=` +
    subcategory +
    `&userId=` +
    userName.userId

  return fetch(process.env.REACT_APP_MASTER_API_URL + apiEndPoint, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}







async function getProduct(proID, CustomerNumber) {
  var userName = await localStorage.getItem('userData')

  console.log('MSXXXXX', userName)

  userName = JSON.parse(userName)
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(
    process.env.REACT_APP_MASTER_API_URL +
      `/products/getProductById/order/${proID}?customerId=${CustomerNumber}` +
      `&userId=` +
      userName.userId,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function addToCart(proData) { debugger
  if (
    localStorage.getItem('lancode') === null ||
    localStorage.getItem('lancode') === undefined ||
    localStorage.getItem('lancode') === ''
  ) {
    var langCode = 'en'
  }
  else {
    var langCode = localStorage.getItem('lancode') 
  }
  console.log(proData, 'proDataproDataproData service')
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(proData),
  }

  return fetch(process.env.REACT_APP_API_URL_ORDER + `/cart`, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      if(result.data.clearCart === true) {
        localStorage.setItem('ORDER-ADDED', 'NO')
        const error = result.data.clearCart
        toast.error(
          langCode === 'en' ? 'Product can’t be added at the same time. Please clear cart and try again.' : 'Product can’t be added at the same time. Please clear cart and try again.',
          {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
        return Promise.reject(error)
      }
      if (result.status === 420) {
        localStorage.setItem('ORDER-ADDED', 'NO')
        const error = result.message
        toast.error(result.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return Promise.reject(error)
      } else if (result.data.id === null) {
        localStorage.setItem('ORDER-ADDED', 'NO')
        const error = 'error'
        toast.error(
          langCode === 'en' ? 'Bulk and Bigbag product can’t be added at the same time. Please clear cart and try again.' : 'ไม่สามารถสั่งปูนซีเมนต์ผงและบิ๊กแบ็คพร้อมกันได้ กรุณาลือกสินค้าใหม่อีกครั้ง',
          {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
        return Promise.reject(error)
      } else if (localStorage.getItem('savequantity') === 'YES') {
        toast.success(langCode === 'en' ? 'Product saved successfully.' : 'บันทึกสินค้าเรียบร้อย', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return
      } else {
        localStorage.setItem('ORDER-ADDED', 'YES')
        toast.success(
          langCode === 'en' || langCode === null ?
            "Product added to cart" :
            langCode === 'vt' ? 
            "Đã chọn mua" :
           "สินค้าเพิ่มเข้าตะกร้าเรียบร้อย"
           
         , {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }

      return result.data
    })
}

async function getCartData(customerID) {
  var userName = await localStorage.getItem('userData')

  userName = JSON.parse(userName)

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }
  console.log(customerID, 'customerID for service')
  return fetch(
    process.env.REACT_APP_API_URL_ORDER +
      `/cart?customerId=` +
      customerID +
      `&userId=` +
      userName.userId,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then(async (result) => {
      if(result.status === 401) {
        const error = result.error;
       
        return Promise.reject(error);
      }
      console.log('jsxxxx ' + JSON.stringify(result))
      if (result.data.length === 0) {
        await localStorage.setItem('ORDER-ADDED', 'NO')
        await localStorage.setItem('PLACE-ORDER-FILTER-CHANGED', 'NO')
      } else if (result.data.length > 0) {
        await localStorage.setItem('ORDER-ADDED', 'YES')
      }

     
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function getOrder(customerID) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    //body: JSON.stringify(customerID),
  }
  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/?customerId=` + customerID,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function getOrderDetail(orderID, customerID) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    //body: JSON.stringify(customerID),
  }
  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/` + orderID + '/' + customerID,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function getConwoodCategory(orderID, countryCode) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/metadata/` + countryCode + `/province`,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      if(result.status === 420) {
        const error = result.message;
        toast.error(result.message, {
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

      return result.data, orderID
    })
}

function getOrderCreditInfo(countryCode, customerId, data) {
  debugger
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(data),
  }
  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/` + countryCode + '/' + customerId,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        console.log('xadada', result)
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      console.log('returnedadada ' + result)
      return result.data
    })
}


function getCustomerPdpInfo(userId) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    // body: JSON.stringify(data),
  }
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/customer/getPDPDetails?userId=${userId}`,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        console.log('xadada', result)
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      return result.data
    })
}

function pdpConfirmed(data, userId) {
  debugger
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }
  return fetch(
    process.env.REACT_APP_MASTER_API_URL + `/customer/pdpConfirmed?pdpConfirmed=${data}&userid=${userId}`,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        console.log('xadada', result)
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      console.log('returnedadada ' + result)
      return result.data
    })
}





function getAllOrdersList(
  customerNumber,
  dateRange,
  dateRange2,
  orderId,
  plantId,
  productCategory,
  productCode,
  productSubCategory,
  searchByStatus,
  shipingCondition,
  shipTo,
  shipType,
  fromIndex,
  toIndex,
  rebateSalesOrder
) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  let apiEndPoint =
    `/order/getOrderSummaryByFilter?customerNumber=` +
    customerNumber +
    `&dateRangeFrom=` +
    dateRange +
    `&dateRangeTo=` +
    dateRange2 +
    `&orderId=` +
    orderId +
    `&plantId=` +
    plantId +
    `&productCategory=` +
    productCategory +
    `&productCode=` +
    productCode +
    `&productSubCategory=` +
    productSubCategory +
    `&searchByStatus=` +
    searchByStatus +
    `&shipingCondition=` +
    shipingCondition +
    `&shipTo=` +
    shipTo +
    `&shipType=` +
    shipType +
    `&fromIndex=` +
    fromIndex +
    `&toIndex=` +
    toIndex + 
    `&rebateSalesOrder=`+
    rebateSalesOrder

  return fetch(process.env.REACT_APP_API_URL_ORDER + apiEndPoint, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      if(result.status === 420) {
       
      
      return result.status
      }

      return result.data
    })
}

async function clearCart(customerId) {
  var userName = await localStorage.getItem('userData')

  console.log('MSXXXXX', userName)

  userName = JSON.parse(userName)

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }
  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/cart/` + customerId + '?userId=' + userName.userId,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function placeOrder(data) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
    body: JSON.stringify(data),
  }
  return fetch(process.env.REACT_APP_API_URL_ORDER + `/order`, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      if(result.status === 420) {
        const error = result.message;
        
        return Promise.reject(error);
      }

      return result.data
    })
}

function getShipToDetails(proID) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(process.env.REACT_APP_MASTER_API_URL + `/ship-to/shipTo/` + proID, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function raiseReleaseRequest(customerID, ponumber, sonumber) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(
    process.env.REACT_APP_API_URL_ORDER +
      `/order/raiseReleaseRequest/` +
      customerID +
      '/' +
      ponumber +
      '/' +
      sonumber,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function cancelSO(customerID, orderId) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/` + orderId + '/' + customerID,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      if(result.status === 420) {
       
        toast.error(
          result.message,
          {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
        return
      }

      return result.data
    })
}

async function deleteProductFormCart(customerId, productID) {
  var userName = await localStorage.getItem('userData')

  console.log('MSXXXXX', userName)

  userName = JSON.parse(userName)

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }
  return fetch(
    process.env.REACT_APP_API_URL_ORDER +
      `/cart/` +
      customerId +
      '/' +
      productID +
      '?userId=' +
      userName.userId,
    requestOptions
  )
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}

function handleResponse(response) {
  console.log('response ++++', response)
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}





function raiseReleaseRequestVN(data, upload) { debugger
  var langCode = localStorage.getItem('lancode') 
  const formData = new FormData();
  formData.append('raiseReleaseRequestVNReq', JSON.stringify(data));
  formData.append('file', upload);
  const requestOptions = {
    method: "POST",
    headers: { 
    'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
    body: formData,
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/raiseReleaseRequest/VN`, requestOptions)

    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      if (result.message === 'Success') {
        toast.success(`${langCode === 'en' ? "Your request has been sent to Alo INSEE." : 'Yêu cầu của quý khách đã được gửi tới Alo INSEE.' }`, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return result.data
      }
      return result.data;
    });


}

function orderUpdateVN(data) { debugger;
  var langCode = localStorage.getItem('lancode') 
  const requestOptions = {
    method: "PUT",
    headers: { 
      'Content-Type': 'application/json',
    'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
    'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber') },
    body: JSON.stringify(data),
  };

  return fetch(
    process.env.REACT_APP_API_URL_ORDER + `/order/update`, requestOptions)
    
    .then((res) => res.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText;
        return Promise.reject(error);
      }
      if (result.message === 'Success') {
        toast.success(`${langCode === 'en' ? "Your request has been sent to Alo INSEE. We will update and respond as soon as possible (Mon-Fri: Working time)" : 'Yêu cầu của quý khách đã được gửi tới Alo INSEE. Chúng tôi sẽ xử lý và phản hồi trong thời gian sớm nhất có thể. (Thứ 2 đến thứ 6: Giờ làm việc hành chính)         '  }`, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return result.data
      }
      
      return result.data;
    });


}


function changePaymentMethod(productPonumber, productSoNumber, shipToCodeNo) {
  var langCode = localStorage.getItem('lancode') 
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(process.env.REACT_APP_API_URL_ORDER + `/order/changePaymentMethod/${shipToCodeNo}/${productPonumber}/${productSoNumber}`, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }
      if (result.message === 'Success') {
        toast.success(`${langCode === 'en' ? "Your request has been sent to Alo INSEE. We will update and respond as soon as possible (Mon-Fri: Working time)" : 'Yêu cầu của quý khách đã được gửi tới Alo INSEE. Chúng tôi sẽ xử lý và phản hồi trong thời gian sớm nhất có thể. (Thứ 2 đến thứ 6: Giờ làm việc hành chính)'  }`, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return result.data
      }


      return result.data
    })
}

function getShippingCondForVn(sholdTo, plantName, shipToCodeNo) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(process.env.REACT_APP_MASTER_API_URL + `/pricemaster/getShippingCondition?plant=${plantName}&shipTo=${shipToCodeNo}&soldToNumber=${sholdTo}`, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}


function getShippingTypeForVn(sholdTo, plantName, shipToCodeNo) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
      'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    },
  }

  return fetch(process.env.REACT_APP_MASTER_API_URL + `/pricemaster/getShippingType?plant=${plantName}&shipTo=${shipToCodeNo}&soldToNumber=${sholdTo}`, requestOptions)
    .then((handleResponse) => handleResponse.json())
    .then((result) => {
      if (!result.status) {
        const error = (result && result.message) || result.statusText
        return Promise.reject(error)
      }

      return result.data
    })
}









