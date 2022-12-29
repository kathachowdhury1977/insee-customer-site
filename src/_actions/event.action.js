import { eventConstants } from '../_constants';
import { eventService } from '../_services';


export const eventActions = {
    createNewEvent,
    SelectShipToProduct,
    shipmentDetails,
    createDelivery,
    allEvent,
    filterShipmentManagment, 
    getAllVisitMode,
    getAllVisitObjective,
    ShipmentManagment,
    shipmentByFilter,
    filterMyShipments,
    CreatePickup,
    getPlantIdForShipment,
    getProductForShipment,
    getShipToForShipment,
    cancelShipment,
    deliveryUpdate,
    getShipmentStatus,
    getDivisionForCustomer,
    getSoldTosForDivision,
    fontSizeChanger,
    HeaderFontChanger,
    SmallFontChanger,
    addClasswithStype
};

function createNewEvent() {
      return dispatch => {
        dispatch(request());
        eventService.createEvent()
            .then(
                event => dispatch(success(event)),
                error => dispatch(failure(error.toString()))
            );
    };

    
    function request(event) { return { type: eventConstants.REGISTER_REQUEST, event } }
    function success(event) { return { type: eventConstants.REGISTER_SUCCESS, event } }
    function failure(error) { return { type: eventConstants.REGISTER_FAILURE, error } }
}


function allEvent() {
    return dispatch => {
      dispatch(request());

      eventService.getAllEvent()
          .then(
              event => dispatch(success(event)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request(event) { return { type: eventConstants.GETALL_REQUEST, event } }
  function success(event) { return { type: eventConstants.GETALL_SUCCESS, event } }
  function failure(error) { return { type: eventConstants.GETALL_FAILURE, error } }
}

function getAllVisitMode() {
    return dispatch => {
      dispatch(request());

      eventService.getAllVisitMode()
          .then(
              eventMode => dispatch(success(eventMode)),
              error => dispatch(failure(error.toString()))
          );
  };
  function request() { return { type: eventConstants.GETALL_REQUEST } }
    function success(eventMode) { return { type: eventConstants.GETALL_SUCCESS, eventMode } }
    function failure(error) { return { type: eventConstants.GETALL_FAILURE, error } }

}
function getAllVisitObjective() {
    return dispatch => {
      dispatch(request());

      eventService.getAllVisitObjective()
          .then(
            eventObjective => dispatch(success(eventObjective)),
              error => dispatch(failure(error.toString()))
          );
  };
  function request() { return { type: eventConstants.GETALL_REQUEST } }
    function success(eventObjective) { return { type: eventConstants.GETALL_SUCCESS, eventObjective } }
    function failure(error) { return { type: eventConstants.GETALL_FAILURE, error } }
}

function shipmentByFilter(shipmentId,country,customerId,shipingConditionValue,startIndex,status,endIndex) {
  return dispatch => {
      dispatch(request());
      eventService.shipmentByFilter(shipmentId,country,customerId,shipingConditionValue,startIndex,status,endIndex)
          .then(
            shipmentByFilter => dispatch(success(shipmentByFilter)),
              error => dispatch(failure(error.toString()))
          );
  };
  function request() { return { type: eventConstants.SHIPMENT_FILTER_REQUEST } }
  function success(shipmentByFilter) { return { type: eventConstants.SHIPMENT_FILTER_SUCCESS, shipmentByFilter } }
  function failure(error) { return { type: eventConstants.SHIPMENT_FILTER_FAILURE, error } }
}

//Filter MyShipments

function filterMyShipments(country,customerId,shipingConditionValue,startIndex,endIndex) {
  return dispatch => {
      dispatch(request());
      eventService.filterMyShipments(country,customerId,shipingConditionValue,startIndex,endIndex)
          .then(
            filterMyShipments => dispatch(success(filterMyShipments)),
              error => dispatch(failure(error.toString()))
          );
  };
  function request() { return { type: eventConstants.FILTER_SHIPMENT_REQUEST } }
  function success(filterMyShipments) { return { type: eventConstants.FILTER_SHIPMENT_SUCCESS, filterMyShipments } }
  function failure(error) { return { type: eventConstants.FILTER_SHIPMENT_FAILURE, error } }
}

///Select Ship To Product
function SelectShipToProduct(selectProd) {
   return dispatch =>{
    dispatch(request());
    ///console.log('Object.keys',typeof selectProd);
    if(typeof selectProd !== undefined)
    {
      dispatch(success(selectProd));
    }else
    {
      dispatch(failure("Something went wrong"))
    }
    
   }
  function request() { return { type: eventConstants.SELECTEDSHIP_PRODUCTS_REQUEST } }
  function success(selectProd) { return { type: eventConstants.SELECTEDSHIP_PRODUCTS_SUCCESS, selectProd } }
  function failure(error) { return { type: eventConstants.SELECTEDSHIP_PRODUCTS_FAILURE, error } } 
}

function filterShipmentManagment(CustomerNumber,productCategory, shipingConditionValue,startIndex,endIndex) {
  return dispatch => {
      dispatch(request());
      eventService.filterShipmentManagment(CustomerNumber,productCategory, shipingConditionValue,startIndex,endIndex)
          .then(
            createShipmentFilter => dispatch(success(createShipmentFilter)),
              error => dispatch(failure(error.toString()))
          );
  };
    function request() { return { type: eventConstants.CREATESHIPMENT_FILTER_REQUEST } }
    function success(createShipmentFilter) { return { type: eventConstants.CREATESHIPMENT_FILTER_SUCCESS, createShipmentFilter } }
    function failure(error) { return { type: eventConstants.CREATESHIPMENT_FILTER_FAILURE, error } }
}

function ShipmentManagment(CustomerNumber,filterarray) {
  return dispatch => {
      dispatch(request());
      eventService.ShipmentManagment(CustomerNumber,filterarray)
          .then(
            shipmentmanagment => dispatch(success(shipmentmanagment)),
              error => dispatch(failure(error.toString()))
          );
  };
    function request() { return { type: eventConstants.SHIPMENT_MANAGEMENT_REQUEST } }
    function success(shipmentmanagment) { return { type: eventConstants.SHIPMENT_MANAGEMENT_SUCCESS, shipmentmanagment } }
    function failure(error) { return { type: eventConstants.SHIPMENT_MANAGEMENT_FAILURE, error } }
}

//cancelShipment
function cancelShipment(countryCode,inseeplusUID) {
  return dispatch => {
    dispatch(request());
    eventService.cancelShipment(countryCode,inseeplusUID)
        .then(
          cancelShipment => dispatch(success(cancelShipment)),
            error => dispatch(failure(error.toString()))
        );
    };
  function request() { return { type: eventConstants.CANCELSHIPMENT_REQUEST } }
  function success(cancelShipment) { return { type: eventConstants.CANCELSHIPMENT_SUCCESS, cancelShipment} }
  function failure(error) { return { type: eventConstants.CANCELSHIPMENT_FAILURE, error } }
}
//getShipmentStatus
function getShipmentStatus(country, inseePlusUID) {
  return dispatch => {
    dispatch(request());
    eventService.getShipmentStatus(country, inseePlusUID)
        .then(
          getShipmentStatus => dispatch(success(getShipmentStatus)),
            error => dispatch(failure(error.toString()))
        );
    };
  function request() { return { type: eventConstants.GET_SHIPMENTSTATUS_REQUEST } }
  function success(getShipmentStatus) { return { type: eventConstants.GET_SHIPMENTSTATUS_SUCCESS, getShipmentStatus} }
  function failure(error) { return { type: eventConstants.GET_SHIPMENTSTATUS_FAILURE, error } }

}


//shipmentDetails

function shipmentDetails(country, inseePlusUID) {
  return dispatch => {
    dispatch(request());
    eventService.shipmentDetails(country, inseePlusUID)
        .then(
          shipmentDetails => dispatch(success(shipmentDetails)),
            error => dispatch(failure(error.toString()))
        );
    };
  function request() { return { type: eventConstants.SHIPMENTDETAILS_REQUEST } }
  function success(shipmentDetails) { return { type: eventConstants.SHIPMENTDETAILS_SUCCESS, shipmentDetails} }
  function failure(error) { return { type: eventConstants.SHIPMENTDETAILS_FAILURE, error } }

}



function createDelivery(countryCode,DeliveryData) {
  return dispatch => {
    dispatch(request());
    eventService.createDelivery(countryCode,DeliveryData)
        .then(
          createDelivery => 
          {
            if(createDelivery.status==200)
            {
             dispatch(success(createDelivery.data));
             
            }else
            {
             dispatch(failure(createDelivery.message))
            }
            
         },
          
         
        );
};
function request() { return { type: eventConstants.CREATE_DELIVERY_REQUEST } }
  function success(createDelivery) { return { type: eventConstants.CREATE_DELIVERY_SUCCESS, createDelivery } }
  function failure(error) { return { type: eventConstants.CREATE_DELIVERY_FAILURE, error } }

}

///delivery-order/update

function deliveryUpdate(countryCode,shipData) {
  return dispatch => {
    dispatch(request());
    eventService.deliveryUpdate(countryCode,shipData)
        .then(
          deliveryUpdate => dispatch(success(deliveryUpdate)),
            error => dispatch(failure(error.toString()))
        );
};
function request() { return { type: eventConstants.DELIVERYUPDATE_REQUEST } }
  function success(deliveryUpdate) { return { type: eventConstants.DELIVERYUPDATE_SUCCESS, deliveryUpdate } }
  function failure(error) { return { type: eventConstants.DELIVERYUPDATE_FAILURE, error } }

}

function CreatePickup(countryCode,shipData) {
  return dispatch => {
    dispatch(request());
    eventService.CreatePickup(countryCode,shipData)
        .then(
          createpickup => {
             if(createpickup.status==200)
             {
              dispatch(success(createpickup.data));
              
             }else
             {
              dispatch(failure(createpickup.message))
             }
             
          },
            error => dispatch(failure(error.toString()))
        );
};
function request() { return { type: eventConstants.CREATE_PICKUP_REQUEST } }
  function success(createpickup) { return { type: eventConstants.CREATE_PICKUP_SUCCESS, createpickup } }
  function failure(error) { return { type: eventConstants.CREATE_PICKUP_FAILURE, error } }

}


function getPlantIdForShipment(plantId) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(plantId))
  };

  function request(getPlantIdForShipment) {
    return { type: eventConstants.GET_PLANT_ID_SHIPMENT_REQUEST, getPlantIdForShipment };
  }
  function success(getPlantIdForShipment) {
    return { type: eventConstants.GET_PLANT_ID_SHIPMENT_SUCCESS, getPlantIdForShipment };
  }
  function failure(error) {
    return { type: eventConstants.GET_PLANT_ID_SHIPMENT_FAILURE, error };
  }
}

function getProductForShipment(productId) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(productId))
  };

  function request(getProductForShipment) {
    return { type: eventConstants.GET_PRODUCT_ID_SHIPMENT_REQUEST, getProductForShipment };
  }
  function success(getProductForShipment) {
    return { type: eventConstants.GET_PRODUCT_ID_SHIPMENT_SUCCESS, getProductForShipment };
  }
  function failure(error) {
    return { type: eventConstants.GET_PRODUCT_ID_SHIPMENT_FAILURE, error };
  }
};
function getShipToForShipment(shipToId) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(shipToId))
  };

  function request(getShipToForShipment) {
    return { type: eventConstants.GET_SHIP_TO_SHIPMENT_REQUEST, getShipToForShipment };
  }
  function success(getShipToForShipment) {
    return { type: eventConstants.GET_SHIP_TO_SHIPMENT_SUCCESS, getShipToForShipment };
  }
  function failure(error) {
    return { type: eventConstants.GET_SHIP_TO_SHIPMENT_FAILURE, error };
  }
}





function getDivisionForCustomer(userId, soldTo) {
  return (dispatch) => {
    dispatch(request());

    eventService.getDivisionForCustomer(userId, soldTo).then(
      (getDivisionForCustomer) => dispatch(success(getDivisionForCustomer)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getDivisionForCustomer) {
    return { type: eventConstants.GET_DIVISION_REQUEST, getDivisionForCustomer };
  }
  function success(getDivisionForCustomer) {
    return { type: eventConstants.GET_DIVISION_SUCCESS, getDivisionForCustomer };
  }
  function failure(error) {
    return { type: eventConstants.GET_DIVISION_FAILURE, error };
  }
}

function getSoldTosForDivision(division,userId, soldTo) {
  return (dispatch) => {
    dispatch(request());

    eventService.getSoldTosForDivision(division,userId, soldTo).then(
      (getSoldTosForDivision) => dispatch(success(getSoldTosForDivision)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(getSoldTosForDivision) {
    return { type: eventConstants.GET_SOLDTO_DIVISION_REQUEST, getSoldTosForDivision };
  }
  function success(getSoldTosForDivision) {
    return { type: eventConstants.GET_SOLDTO_DIVISION_SUCCESS, getSoldTosForDivision };
  }
  function failure(error) {
    return { type: eventConstants.GET_SOLDTO_DIVISION_FAILURE, error };
  }
}

function fontSizeChanger(fontsize) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(fontsize))
  };

  function request(fontsizechanger) {
    return { type: eventConstants.FONT_SIZE_CHANGER_REQUEST, fontsizechanger };
  }
  function success(fontsizechanger) {
    return { type: eventConstants.FONT_SIZE_CHANGER_SUCCESS, fontsizechanger };
  }
  function failure(error) {
    return { type: eventConstants.FONT_SIZE_CHANGER_FAILURE, error };

  }
}

function HeaderFontChanger(fontsize) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(fontsize))
  };

  function request(headerfontchanger) {
    return { type: eventConstants.HEADER_FONT_CHANGER_REQUEST, headerfontchanger };
  }
  function success(headerfontchanger) {
    return { type: eventConstants.HEADER_FONT_CHANGER_SUCCESS, headerfontchanger };
  }
  function failure(error) {
    return { type: eventConstants.HEADER_FONT_CHANGER_FAILURE, error };

  }
}

function SmallFontChanger(fontsize) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(fontsize))
  };

  function request(smallfontchanger) {
    return { type: eventConstants.SMALL_FONT_CHANGER_REQUEST, smallfontchanger };
  }
  function success(smallfontchanger) {
    return { type: eventConstants.SMALL_FONT_CHANGER_SUCCESS, smallfontchanger };
  }
  function failure(error) {
    return { type: eventConstants.SMALL_FONT_CHANGER_FAILURE, error };

  }
}


function addClasswithStype(styleClass) {
  return (dispatch) => {
    dispatch(request());
    dispatch(success(styleClass))
  };

  function request(addclasswithstyle) {
    return { type: eventConstants.ADD_CLASS_WITH_STYLE_REQUEST, addclasswithstyle };
  }
  function success(addclasswithstyle) {
    return { type: eventConstants.ADD_CLASS_WITH_STYLE_SUCCESS, addclasswithstyle };
  }
  function failure(error) {
    return { type: eventConstants.ADD_CLASS_WITH_STYLE_FAILURE, error };

  }
}


