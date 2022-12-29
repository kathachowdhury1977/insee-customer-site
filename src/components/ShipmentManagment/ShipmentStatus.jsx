import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
function ShipmentStatus(props) {
    const shipmentFilterList = useSelector((state) => state.shipmentStatusFilterList);
    console.log('shipmentFilterListshipmentFilterList',shipmentFilterList);
    let shipmentStatusData=shipmentFilterList && shipmentFilterList.shipmentFilter!==undefined || null?
          shipmentFilterList.shipmentFilter:[];
    let getStatusName=shipmentStatusData.find((data)=>data.key==props.status);     
    return (
        <>
          {getStatusName!==undefined?getStatusName.value:props.status}
        </>
    )
}
export default ShipmentStatus;