import React, { useEffect, useState } from "react";
import { eventActions,masterActions } from "../../../../_actions";
import { Link } from "react-router-dom";
import moment from 'moment';
import 'moment-timezone'
import { useLocation,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import 'react-tabs/style/react-tabs.css';
import "./ShipMent.scss"
import UpdateShipment from "../../../../components/CreateShipment/UpdateShipment";
import ShipmentNoDate from '../../../../components/ShipmentNoDate/ShipmentNoDate'
import ShipmentCondition from '../../../../components/ShipmentCondition/ShipmentCondition'
import ShipMentHeadingSection from "../../../../components/ShipMentHeadingSection/ShipMentHeadingSection";
import ShipmentDetailFormPickup from "../../../../components/ShipmentDetailForm/ShipmentDetailFormPickup";
import { eventConstants } from "../../../../_constants";

export function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
function ShipmentDetailPickup(props) {
    const query = useQuery();
    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);
    const countryCodeFinal = userName.countryCode
    const countryCode=query.get('countryCode');
    const inseeplusUID=query.get('inseeplusUID');
    ////const createpickupData=useSelector((state) => state.createpickup);
    const getShipmentDetails=useSelector((state) => state.getShipmentDetailsByInseePlusId);
    const getShipmentStatus=useSelector((state) => state.getShipmentStatus);
    const shipmentFilterList = useSelector((state) => state.shipmentStatusFilterList)
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(()=>{
      dispatch(eventActions.shipmentDetails(countryCode,inseeplusUID));
      dispatch(eventActions.getShipmentStatus(countryCode,inseeplusUID));
      dispatch(masterActions.shipmentStatusFilterList(countryCodeFinal));

    },[]);
    let createpickup='';
    if(getShipmentDetails && getShipmentDetails.getShipmentDetailsByInseePlusId!==undefined) 
    {
        createpickup=getShipmentDetails.getShipmentDetailsByInseePlusId;
    }
    let searchStatus=getShipmentStatus && getShipmentStatus.getShipmentStatus!==undefined?
    getShipmentStatus.getShipmentStatus:[];
    //console.log('getShipmentStatus====',getShipmentStatus);
    let ShipmentBarData=shipmentFilterList && shipmentFilterList.shipmentFilter!==undefined || null?
    shipmentFilterList.shipmentFilter:[];

    let shipmentFilterData=[
        ...ShipmentBarData.filter((data)=>data.key=='Shipment Created'),
        ...ShipmentBarData.filter((data)=>data.key!='Shipment Created')
    ];
    let filanlData=[...shipmentFilterData && shipmentFilterData!==undefined || null?
        shipmentFilterData.filter((data)=>{
            let searchData=data.key=='Checked In'?'Check In':data.key;
            let shipStatue=searchStatus.find((status)=>status.shipmentStatus==searchData);
                if(shipStatue!==undefined)
                {
                    
                    data['shipmentStatus']=shipStatue!==undefined || null?shipStatue.shipmentStatus:'';
                    data['shipmentLastUpdatedTime']=shipStatue!==undefined || null?shipStatue.shipmentLastUpdatedTime:'';
                    return data;
                }
               }
              )
        :[],...shipmentFilterData && shipmentFilterData!==undefined || null?
        shipmentFilterData.filter((data)=>{
            let searchData=data.key=='Checked In'?'Check In':data.key;
            let shipStatue=searchStatus.find((status)=>status.shipmentStatus==searchData);
              if(data.key!='All' && data.key!='Cancel' && data.key!='In progress' && shipStatue==undefined)
                {
                    
                    data['shipmentStatus']=shipStatue!==undefined || null?shipStatue.shipmentStatus:'';
                    data['shipmentLastUpdatedTime']=shipStatue!==undefined || null?shipStatue.shipmentLastUpdatedTime:'';
                    return data;
                }
               }
              )
        :[]];

        function convertUTCToTimezone(utcDt, utcDtFormat, timezone) {
            return moment.utc(utcDt, utcDtFormat).tz(timezone).format('DD-MM-YYYY HH:mm:ss');
          }

         

    // function ShipmentCreatedDate(expectedDeliveryDateAndTime)
    // {
        
    //   return convertUTCToTimezone(expectedDeliveryDateAndTime, null, 'Asia/Bangkok');
    // }
    console.log('getShipmentDetails',getShipmentStatus);
    console.log(shipmentFilterList, 'shipmentFilterList')
    let totalSelectedQty=0;
    // function getValues() {
    //     // array
    //     var selected = ms.getSelection();
    //     alert(selected.map(function(item) {
    //       return item.name;
    //     }).join(','));
    //   }

    const [disabled, setDisabled] = useState('disabled');
    const [enable,setEnable]=useState(false);
    const [updateShipmentBtn,setUpdateshipmentBtn]=useState(false);
    const [updateship, setUpdateShip] = useState(false)
    const [selectedQtyError, setSelectedQtyError] = useState('')
    const [selectedQty, setSelectedQty] = useState([]);
    let shipmentFilterStatus=getShipmentDetails?.getShipmentDetailsByInseePlusId?.shippingStatus;
    const shipmentEdit = async () => {
        ///console.log('shipmentEdit');
        let shipmentFilterStatus=getShipmentDetails.getShipmentDetailsByInseePlusId.shippingStatus;
        if((shipmentFilterStatus === "Shipment Created") || (shipmentFilterStatus === "Truck Allocated")){
          return {setEnable:setEnable(true),updateShipmentBtn:setUpdateshipmentBtn(true)} ;
        }
        if((shipmentFilterStatus === "Check In") || (shipmentFilterStatus === "In Plant") || (shipmentFilterStatus === "Dispatched") || (shipmentFilterStatus === "Delivered") || (shipmentFilterStatus === "Cancel")){
            return setDisabled('disabled');
         }
        setUpdateShip(true)
        setDisabled('')
      }
      var obj = {}

      const handleChange = (e, poNo) => { debugger
        var value = e.target.value
        const soiDataPo = createpickup && createpickup.products && createpickup.products.find((x) => x.inseePlusUID === poNo)
        
        if(soiDataPo.inseePlusUID === poNo) {
            if(selectedQty.length > 0 && value.length >= 0) {
                const selectedErrorQty = createpickup && createpickup.products && createpickup.products.find((x) => x.remainingQuantity)
                for (var j = 1; j <= selectedQty.length; j++) {
                    if(selectedQty[j-1].poNumber === poNo) {
                    if(value.length >= 0){
                        selectedQty.splice(selectedQty.indexOf(selectedQty[j-1]), 1)
                    }
                    else {
                        selectedQty.splice(selectedQty.indexOf(poNo), 1)
                    }
                     
                    }
                else {
                    if(selectedErrorQty.remainingQuantity < value){
                        setSelectedQtyError("Value should be less than remaining quantity")
                    }else {
                        obj["selectedQty"] = e.target.value;
                        obj["poNumber"] = poNo;
                        setSelectedQty([...selectedQty, obj])  
                        setSelectedQtyError("")
                    }
                    
                    
                }
                }
                
                if(selectedErrorQty.remainingQuantity < value){
                    setSelectedQtyError("Value should be less than remaining quantity")
                }else {
                    obj["selectedQty"] = e.target.value;
                    obj["poNumber"] = poNo;
                    setSelectedQty([...selectedQty, obj])  
                    setSelectedQtyError("")
                }
            }
            else {
                obj["selectedQty"] = e.target.value;
                obj["poNumber"] = poNo;
                setSelectedQty([...selectedQty, obj])  
            }
          
        }
        
        
      }

      console.log(selectedQty, 'selectedQty789')

      console.log(getShipmentDetails, 'filanlData78958')

      const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
      const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
      const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
      const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);


    return (
        <>
            <div className="content-wrapper">
                <Header title = "Shipment Detail Pickup" />
                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">
                        <div className="Shipment_managment mb-4 mt-2">
                            <Link to="/MyShipments"><button style={{paddingBottom:"0.4%",paddingTop:"0.4%",paddingLeft:"1%",paddingRight:"1%",border:"none",marginLeft:"2%",background:"#000",color:"#fff", fontSize: `${FontChange}px`}} class="update">{t("Back")}</button></Link>
                            <ShipMentHeadingSection title={t("shipmentdetails.heading")} />

                            {getShipmentDetails && getShipmentDetails.getShipmentDetailsByInseePlusId?
                            <>
                            <div className="row shipment_border m-2">
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                    <ShipmentNoDate
                                        title={t("shipmanagement.shipmentnumber")}
                                        number={getShipmentDetails.getShipmentDetailsByInseePlusId.shipmentNumber}
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                    
                                    <ShipmentNoDate
                                        title={t("shipment Date & Time")}
                                       
                                    //number={convertUTCToTimezone(getShipmentDetails.getShipmentDetailsByInseePlusId.shipmentCreatedDateAndTime, null, 'Asia/Bangkok')}
                                    //number={ moment(getShipmentDetails.getShipmentDetailsByInseePlusId.shipmentCreatedDateAndTime).format('DD-MM-YYYY, HH:mm')}
                                    //number={ convertUTCToTimezone(filanlData && filanlData[0] && filanlData[0].shipmentLastUpdatedTime, null, 'Asia/Bangkok')}
                                       number={moment(filanlData && filanlData[0] && filanlData[0].shipmentLastUpdatedTime).format('DD-MM-YYYY HH:mm:ss')}                                      
                                       
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                    <ShipmentNoDate
                                        title={t("Shipping Conditions")}
                                        number={createpickup && createpickup.shippingConditions ? createpickup && createpickup.shippingConditions.map((shipingCond, i)=> {
                                            return (
                                                shipingCond
                                            )
                                        }).join(',' +' '): ''}
                                        class="green"
                                    />
                                </div>
                                {
                                countryCodeFinal && countryCodeFinal === 'VN' ? '' :
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                    <ShipmentNoDate
                                        title={t("Shipment Status")}
                                        number={getShipmentDetails.getShipmentDetailsByInseePlusId.shippingStatus}
                                        class="green"
                                    />
                                </div>
                                }
                            </div>
                            {
                            countryCodeFinal && countryCodeFinal === 'VN' ? '' :
                            <div className="row m-2 mt-3">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <ShipmentCondition ShippingConditions="pickup" shipStatus={getShipmentDetails.getShipmentDetailsByInseePlusId.shippingStatus} searchStatus={searchStatus} getShipmentStatus={filanlData} doNumber={createpickup.deliveryNumberSap}/>
                            </div>
                            </div>
                            
                             }
                           
                             </>
                            :''
                            }
                            <div className="create_ship">
                                {createpickup && createpickup.products?createpickup.products.map((data,key)=>{
                                     ////console.log('datadatadata',data.selectedQuantity);
                                     totalSelectedQty=parseFloat(totalSelectedQty)+parseFloat(data.selectedQuantity);
                                     return (
                                     <UpdateShipment item={data}
                                     disabled={disabled}
                                     updateship={updateship}
                                     handleChange={handleChange}
                                     selectedQtyError={selectedQtyError}
                                     />
                                    )
                                  })
                                  :''
                                }
                            </div>
                            <div className="col-12">
                                {
                                   createpickup ?<ShipmentDetailFormPickup 
                                   setDisabled={setDisabled}
                                   shipmentEdit={shipmentEdit}
                                   setUpdateShip={setUpdateShip}
                                   disabled={disabled}
                                   shipmentFilterStatus={shipmentFilterStatus}
                                   updateShipmentBtn={updateShipmentBtn}
                                   enable={enable}
                                   selectedQty={selectedQty}
                                   updateship={updateship}
                                   totalSelectedQty={totalSelectedQty} data={createpickup} canceldo="buttonShow" />:''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default withTranslation()(ShipmentDetailPickup);