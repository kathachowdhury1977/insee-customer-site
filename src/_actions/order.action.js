import { orderConstants } from "../_constants";
import { orderService } from "../_services";

export const orderActions = {
  getAllProductCatalog,
  getProduct,
  addToCart,
  getCartData,
  getOrder,
  getOrderDetail,
  getConwoodCategory,
  isShipToSelected,
  isPlantsSelected,
  ShipingCondSelected,
  placeOrderFilterSearchClicked,
  getOrderCreditInfo,
  getAllOrdersList,
  clearCart,
  placeOrder,
  getShipToDetails,
  raiseReleaseRequest,
  cancelSO,
  getSelectedOrderInCheckout,
  deleteProductFormCart,
  getCustomerPdpInfo,
  pdpConfirmed,
  raiseReleaseRequestVN,
  orderUpdateVN,
  changePaymentMethod,
  getShippingCondForVn,
  getShippingTypeForVn,
  ShipingTypeSelected
};

function getAllProductCatalog(contractno,accountNumber,plantcode,shiptocode,productcategory,productsubcategory, shippingCondVn, shippingTypedVn) {
  return (dispatch) => {
    dispatch(request());

    orderService.getAllProductCatalog(contractno,accountNumber,plantcode,shiptocode,productcategory,productsubcategory, shippingCondVn, shippingTypedVn).then(
      (getallproduct) => dispatch(success(getallproduct)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getallproduct) {
    return { type: orderConstants.GET_ALL_PRODUCT_REQUEST, getallproduct };
  }
  function success(getallproduct) {
    return { type: orderConstants.GET_ALL_PRODUCT_SUCCESS, getallproduct };
  }
  function failure(error) {
    return { type: orderConstants.GET_ALL_PRODUCT_FAILURE, error };
  }
}





function getProduct(proID, CustomerNumber) {
  return (dispatch) => {
    dispatch(request());

    orderService.getProduct(proID, CustomerNumber).then(
      (getproduct) => dispatch(success(getproduct)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getproduct) {
    return { type: orderConstants.GET_PRODUCT_REQUEST, getproduct };
  }
  function success(getproduct) {
    return { type: orderConstants.GET_PRODUCT_SUCCESS, getproduct };
  }
  function failure(error) {
    return { type: orderConstants.GET_PRODUCT_FAILURE, error };
  }
}


function addToCart(proData) {
  return (dispatch) => {
    dispatch(request());

    orderService.addToCart(proData).then(
      (addtocart) => dispatch(success(addtocart)),
      (error) => dispatch(failure(error))
    );
  };

  function request(addtocart) {
    return { type: orderConstants.ADD_TO_CART_REQUEST, addtocart };
  }
  function success(addtocart) {
    return { type: orderConstants.ADD_TO_CART_SUCCESS, addtocart };
  }
  function failure(error) {
    return { type: orderConstants.ADD_TO_CART_FAILURE, error };
  }
}

function getCartData(customerID) {
  return (dispatch) => {
    dispatch(request());

    orderService.getCartData(customerID).then(
      (cartdata) => dispatch(success(cartdata)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(cartdata) {
    return { type: orderConstants.CART_DATA_REQUEST, cartdata };
  }
  function success(cartdata) {
    return { type: orderConstants.CART_DATA_SUCCESS, cartdata };
  }
  function failure(error) {
    return { type: orderConstants.CART_DATA_FAILURE, error };
  }
  
}


function getOrder(customerID) {
  console.log(customerID, "ON Action")
  return (dispatch) => {
    dispatch(request());

    orderService.getOrder(customerID).then(
      (orderdata) => dispatch(success(orderdata)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(orderdata) {
    return { type: orderConstants.ORDER_REQUEST, orderdata };
  }
  function success(orderdata) {
    return { type: orderConstants.ORDER_SUCCESS, orderdata };
  }
  function failure(error) {
    return { type: orderConstants.ORDER_FAILURE, error };
  }
}

function getOrderDetail(orderID,customerID) {
  return (dispatch) => {
    dispatch(request());

    orderService.getOrderDetail(orderID,customerID).then(
      (orderdetail) => dispatch(success(orderdetail)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(orderdetail) {
    return { type: orderConstants.ORDER_DETAIL_REQUEST, orderdetail };
  }
  function success(orderdetail) {
    return { type: orderConstants.ORDER_DETAIL_SUCCESS, orderdetail };
  }
  function failure(error) {
    return { type: orderConstants.ORDER_DETAIL_FAILURE, error };
  }
}


function getConwoodCategory(orderID,countryCode) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(orderID))
  };

  function request(getConwoodCategory) {
    return { type: orderConstants.GET_CONWOOD_CATEGORY_REQUEST, getConwoodCategory };
  }
  function success(getConwoodCategory) {
    return { type: orderConstants.GET_CONWOOD_CATEGORY_SUCCESS, getConwoodCategory };
  }
  function failure(error) {
    return { type: orderConstants.GET_CONWOOD_CATEGORY_FAILURE, error };
  }
}

function getSelectedOrderInCheckout(order) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(order))
  };

  function request(getSelectedOrderInCheckout) {
    return { type: orderConstants.GET_SELECTED_ORDER_CHECKOUT_REQUEST, getSelectedOrderInCheckout };
  }
  function success(getSelectedOrderInCheckout) {
    return { type: orderConstants.GET_SELECTED_ORDER_CHECKOUT_SUCCESS, getSelectedOrderInCheckout };
  }
  function failure(error) {
    return { type: orderConstants.GET_SELECTED_ORDER_CHECKOUT_FAILURE, error };
  }
}

function isShipToSelected(isSelected) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(isSelected))
  };

  function request(isShipToSelected) {
    return { type: orderConstants.CHECK_SHIPTO_SELECTED_REQUEST, isShipToSelected };
  }
  function success(isShipToSelected) {
    return { type: orderConstants.CHECK_SHIPTO_SELECTED_SUCCESS, isShipToSelected };
  }
  function failure(error) {
    return { type: orderConstants.CHECK_SHIPTO_SELECTED_FAILURE, error };
  }
}

function isPlantsSelected(isSelected) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(isSelected))
  };

  function request(isPlantsSelected) {
    return { type: orderConstants.CHECK_PLANT_SELECTED_REQUEST, isPlantsSelected };
  }
  function success(isPlantsSelected) {
    return { type: orderConstants.CHECK_PLANT_SELECTED_SUCCESS, isPlantsSelected };
  }
  function failure(error) {
    return { type: orderConstants.CHECK_PLANT_SELECTED_FAILURE, error };
  }
}

function ShipingCondSelected(data) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(data))
  };

  function request(ShipingCondSelected) {
    return { type: orderConstants.CHECK_SHIPPING_COND_SELECTED_REQUEST, ShipingCondSelected };
  }
  function success(ShipingCondSelected) {
    return { type: orderConstants.CHECK_SHIPPING_COND_SELECTED_SUCCESS, ShipingCondSelected };
  }
  function failure(error) {
    return { type: orderConstants.CHECK_SHIPPING_COND_SELECTED_FAILURE, error };
  }
}

function ShipingTypeSelected(data) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(data))
  };

  function request(ShipingTypeSelected) {
    return { type: orderConstants.CHECK_SHIPPING_TYPE_SELECTED_REQUEST, ShipingTypeSelected };
  }
  function success(ShipingTypeSelected) {
    return { type: orderConstants.CHECK_SHIPPING_TYPE_SELECTED_SUCCESS, ShipingTypeSelected };
  }
  function failure(error) {
    return { type: orderConstants.CHECK_SHIPPING_TYPE_SELECTED_FAILURE, error };
  }
}






function placeOrderFilterSearchClicked(isSelected) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(isSelected))
  };

  function request(placeOrderFilterSearchClicked) {
    return { type: orderConstants.PLACE_ORDER_SEARCH_CLICKED_REQUEST, placeOrderFilterSearchClicked };
  }
  function success(placeOrderFilterSearchClicked) {
    return { type: orderConstants.PLACE_ORDER_SEARCH_CLICKED_SUCCESS, placeOrderFilterSearchClicked };
  }
  function failure(error) {
    return { type: orderConstants.PLACE_ORDER_SEARCH_CLICKED_FAILURE, error };
  }
}


function getOrderCreditInfo(countryCode,customerId,data) {
  return (dispatch) => {
    dispatch(request());

    orderService.getOrderCreditInfo(countryCode,customerId,data).then(
      (getOrderCreditInfo) => dispatch(success(getOrderCreditInfo)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getOrderCreditInfo) {
    return { type: orderConstants.GET_ORDER_CREDITINFO_REQUEST, getOrderCreditInfo };
  }
  function success(getOrderCreditInfo) {
    return { type: orderConstants.GET_ORDER_CREDITINFO_SUCCESS, getOrderCreditInfo };
  }
  function failure(error) {
    return { type: orderConstants.GET_ORDER_CREDITINFO_FAILURE, error };
  }
}


function getCustomerPdpInfo(userId) {
  return (dispatch) => {
    dispatch(request());

    orderService.getCustomerPdpInfo(userId).then(
      (getCustomerPdpInfo) => dispatch(success(getCustomerPdpInfo)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getCustomerPdpInfo) {
    return { type: orderConstants.GET_PDP_INFO_REQUEST, getCustomerPdpInfo };
  }
  function success(getCustomerPdpInfo) {
    return { type: orderConstants.GET_PDP_INFO_SUCCESS, getCustomerPdpInfo };
  }
  function failure(error) {
    return { type: orderConstants.GET_PDP_INFO_FAILURE, error };
  }
}

function pdpConfirmed(data, userId) {
  return (dispatch) => {
    dispatch(request());

    orderService.pdpConfirmed(data, userId).then(
      (pdpConfirmed) => dispatch(success(pdpConfirmed)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(pdpConfirmed) {
    return { type: orderConstants.GET_PDP_CONFIRMED_REQUEST, pdpConfirmed };
  }
  function success(pdpConfirmed) {
    return { type: orderConstants.GET_PDP_CONFIRMED_SUCCESS, pdpConfirmed };
  }
  function failure(error) {
    return { type: orderConstants.GET_PDP_CONFIRMED_FAILURE, error };
  }
}




function getAllOrdersList(customerNumber,dateRange,dateRange2,orderId,plantId,productCategory,productCode,productSubCategory,searchByStatus,shipingCondition,shipTo,shipType, fromIndex, toIndex, rebateSalesOrder) {
  return (dispatch) => {
    dispatch(request());

    orderService.getAllOrdersList(customerNumber,dateRange,dateRange2,orderId,plantId,productCategory,productCode,productSubCategory,searchByStatus,shipingCondition,shipTo,shipType, fromIndex, toIndex, rebateSalesOrder).then(
      (getAllOrdersList) => dispatch(success(getAllOrdersList)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getAllOrdersList) {
    return { type: orderConstants.GET_ALL_ORDER_LIST_REQUEST, getAllOrdersList };
  }
  function success(getAllOrdersList) {
    return { type: orderConstants.GET_ALL_ORDER_LIST_SUCCESS, getAllOrdersList };
  }
  function failure(error) {
    return { type: orderConstants.GET_ALL_ORDER_LIST_FAILURE, error };
  }
}

function clearCart(customerId) {
  return (dispatch) => {
    dispatch(request());

    orderService.clearCart(customerId).then(
      (clearCart) => dispatch(success(clearCart)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(clearCart) {
    return { type: orderConstants.CLEAR_CART_REQUEST, clearCart };
  }
  function success(clearCart) {
    return { type: orderConstants.CLEAR_CART_SUCCESS, clearCart };
  }
  function failure(error) {
    return { type: orderConstants.CLEAR_CART_FAILURE, error };
  }
}




function placeOrder(customerId) {
  return (dispatch) => {
    dispatch(request());

    orderService.placeOrder(customerId).then(
      (placeOrder) => dispatch(success(placeOrder)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(placeOrder) {
    return { type: orderConstants.PLACE_ORDER_REQUEST, placeOrder };
  }
  function success(placeOrder) {
    return { type: orderConstants.PLACE_ORDER_SUCCESS, placeOrder };
  }
  function failure(error) {
    return { type: orderConstants.PLACE_ORDER_FAILURE, error };
  }
}

function getShipToDetails(customerId) {
  return (dispatch) => {
    dispatch(request());

    orderService.getShipToDetails(customerId).then(
      (getShipToDetails) => dispatch(success(getShipToDetails)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getShipToDetails) {
    return { type: orderConstants.GET_SHIPTO_DETAILS_REQUEST, getShipToDetails };
  }
  function success(getShipToDetails) {
    return { type: orderConstants.GET_SHIPTO_DETAILS_SUCCESS, getShipToDetails };
  }
  function failure(error) {
    return { type: orderConstants.GET_SHIPTO_DETAILS_FAILURE, error };
  }
}

function raiseReleaseRequest(customerId,ponumber,sonumber) {
  return (dispatch) => {
    dispatch(request());

    orderService.raiseReleaseRequest(customerId,ponumber,sonumber).then(
      (raiseReleaseRequest) => dispatch(success(raiseReleaseRequest)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(raiseReleaseRequest) {
    return { type: orderConstants.RAISE_RELEASE_REQUEST_REQUEST, raiseReleaseRequest };
  }
  function success(raiseReleaseRequest) {
    return { type: orderConstants.RAISE_RELEASE_REQUEST_SUCCESS, raiseReleaseRequest };
  }
  function failure(error) {
    return { type: orderConstants.RAISE_RELEASE_REQUEST_FAILURE, error };
  }
}

function cancelSO(customerId,orderid) {
  return (dispatch) => {
    dispatch(request());

    orderService.cancelSO(customerId,orderid).then(
      (cancelSO) => dispatch(success(cancelSO)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(cancelSO) {
    return { type: orderConstants.CANCEL_SO_REQUEST, cancelSO };
  }
  function success(cancelSO) {
    return { type: orderConstants.CANCEL_SO_SUCCESS, cancelSO };
  }
  function failure(error) {
    return { type: orderConstants.CANCEL_SO_FAILURE, error };
  }
}


function deleteProductFormCart(customerId, productid) {
  return (dispatch) => {
    dispatch(request());

    orderService.deleteProductFormCart(customerId,productid).then(
      (deleteProductFormCart) => dispatch(success(deleteProductFormCart)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(deleteProductFormCart) {
    return { type: orderConstants.DELETE_PRODUCT_FROM_CART_REQUEST, deleteProductFormCart };
  }
  function success(deleteProductFormCart) {
    return { type: orderConstants.DELETE_PRODUCT_FROM_CART_SUCCESS, deleteProductFormCart };
  }
  function failure(error) {
    return { type: orderConstants.DELETE_PRODUCT_FROM_CART_FAILURE, error };
  }
}

function raiseReleaseRequestVN(data, upload) {
  return (dispatch) => {
    dispatch(request());

    orderService.raiseReleaseRequestVN(data, upload).then(
      (raiseReleaseRequestVN) => dispatch(success(raiseReleaseRequestVN)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(raiseReleaseRequestVN) {
    return { type: orderConstants.RAISE_RELEASE_VN_REQUEST, raiseReleaseRequestVN };
  }
  function success(raiseReleaseRequestVN) {
    return { type: orderConstants.RAISE_RELEASE_VN_SUCCESS, raiseReleaseRequestVN };
  }
  function failure(error) {
    return { type: orderConstants.RAISE_RELEASE_VN_FAILURE, error };
  }
}


function orderUpdateVN(data) {
  return (dispatch) => {
    dispatch(request());

    orderService.orderUpdateVN(data).then(
      (orderUpdateVN) => dispatch(success(orderUpdateVN)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(orderUpdateVN) {
    return { type: orderConstants.ORDER_UPDATE_VN_REQUEST, orderUpdateVN };
  }
  function success(orderUpdateVN) {
    return { type: orderConstants.ORDER_UPDATE_VN_SUCCESS, orderUpdateVN };
  }
  function failure(error) {
    return { type: orderConstants.ORDER_UPDATE_VN_FAILURE, error };
  }
}

function changePaymentMethod(productPonumber, productSoNumber, shipToCodeNo) {
  return (dispatch) => {
    dispatch(request());

    orderService.changePaymentMethod(productPonumber, productSoNumber, shipToCodeNo).then(
      (changePaymentMethod) => dispatch(success(changePaymentMethod)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(changePaymentMethod) {
    return { type: orderConstants.CHANGE_PAYMENT_METHOD_REQUEST, changePaymentMethod };
  }
  function success(changePaymentMethod) {
    return { type: orderConstants.CHANGE_PAYMENT_METHOD_SUCCESS, changePaymentMethod };
  }
  function failure(error) {
    return { type: orderConstants.CHANGE_PAYMENT_METHOD_FAILURE, error };
  }
}

function getShippingCondForVn(sholdTo, plantName, shipToCodeNo) {
  return (dispatch) => {
    dispatch(request());

    orderService.getShippingCondForVn(sholdTo, plantName, shipToCodeNo).then(
      (getShippingCondForVn) => dispatch(success(getShippingCondForVn)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getShippingCondForVn) {
    return { type: orderConstants.GET_SHIPPING_VN_REQUEST, getShippingCondForVn };
  }
  function success(getShippingCondForVn) {
    return { type: orderConstants.GET_SHIPPING_VN_SUCCESS, getShippingCondForVn };
  }
  function failure(error) {
    return { type: orderConstants.GET_SHIPPING_VN_FAILURE, error };
  }
}

function getShippingTypeForVn(sholdTo, plantName, shipToCodeNo) {
  return (dispatch) => {
    dispatch(request());

    orderService.getShippingTypeForVn(sholdTo, plantName, shipToCodeNo).then(
      (getShippingTypeForVn) => dispatch(success(getShippingTypeForVn)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getShippingTypeForVn) {
    return { type: orderConstants.GET_SHIPPING_TYPE_VN_REQUEST, getShippingTypeForVn };
  }
  function success(getShippingTypeForVn) {
    return { type: orderConstants.GET_SHIPPING_TYPE_VN_SUCCESS, getShippingTypeForVn };
  }
  function failure(error) {
    return { type: orderConstants.GET_SHIPPING_TYPE_VN_FAILURE, error };
  }
}









