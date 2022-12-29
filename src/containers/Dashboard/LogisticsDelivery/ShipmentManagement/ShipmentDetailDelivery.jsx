import React, { useEffect } from "react";
import { eventActions,masterActions } from "../../../../_actions";
import { Link } from "react-router-dom";
import moment from 'moment';
import { useLocation,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import 'react-tabs/style/react-tabs.css';
import "./ShipMent.scss"
import UpdateShipment from "../../../../components/CreateShipment/UpdateShipment";
import ShipmentNoDate from '../../../../components/ShipmentNoDate/ShipmentNoDate'
import ShipmentCondition from '../../../../components/ShipmentCondition/ShipmentCondition'
import Delivery from "../../../../components/Delivery/Delivery";
import ShipMentHeadingSection from "../../../../components/ShipMentHeadingSection/ShipMentHeadingSection";
import ShipmentDetailFormDelivery from "../../../../components/ShipmentDetailForm/ShipmentDetailFormDelivery";
export function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
 let countryList=[
  {countryCode:'TH',countryName:"Thailand"},{countryCode:'LK',countryName:"Sri Lanka"},
  {countryCode:'VN',countryName:"Vietnam"},
  {countryCode:'KH',countryName:"Cambodia"}
 ]; 
function ShipmentDetailDelivery(props) {
    const query = useQuery();
    const countryCode=query.get('countryCode');
    const inseeplusUID=query.get('inseeplusUID');
    const createDelivery=useSelector((state) => state.getShipmentDetailsByInseePlusId);
    const getShipmentStatus=useSelector((state) => state.getShipmentStatus);
    const shipmentFilterList = useSelector((state) => state.shipmentStatusFilterList)
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let userName = localStorage.getItem('userData');
    const selectedLangCode = localStorage.getItem('lancode');
    userName = JSON.parse(userName);
    const countryCodeFinal = userName.countryCode
    useEffect(()=>{
        dispatch(eventActions.shipmentDetails(countryCode,inseeplusUID));
        dispatch(eventActions.getShipmentStatus(countryCode,inseeplusUID));
        dispatch(masterActions.shipmentStatusFilterList(countryCodeFinal));
       },[]);
     
       let searchStatus=getShipmentStatus && getShipmentStatus.getShipmentStatus!==undefined?
    getShipmentStatus.getShipmentStatus:[];
    ///console.log('getShipmentStatus====',getShipmentStatus);
    ///console.log(searchStatus,'shipmentFilterList',shipmentFilterList);
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
                data['shipmentLastUpdatedTime']=shipStatue!==undefined || null?shipStatue.creationDate:'';
                return data;
            }
           }
          )
    :[]];
    function convertUTCToTimezone(utcDt, utcDtFormat, timezone) {
        return moment.utc(utcDt, utcDtFormat).tz(timezone).format('DD-MM-YYYY HH:mm:ss');
    }

    function ShipmentCreatedDate(expectedDeliveryDateAndTime,shipmentDate)
    {
        convertUTCToTimezone(shipmentDate==''?expectedDeliveryDateAndTime:shipmentDate, null, 'Asia/Bangkok');
    }

    const displayAddress=(address)=>{
        return address!==null?address:'';
    }
    const getcountryName=(countryCode)=>{
       let country_name=countryList.find((code)=>code.countryCode==countryCode);
       return country_name && country_name ? country_name.countryName : '';
    }
    function formatDate(date) {
        let currentDate=new Date(date);
        var day = currentDate.getDate() + "";
        var month = (currentDate.getMonth() + 1) + "";
        var year = currentDate.getFullYear() + "";
        var hour = currentDate.getHours() + "";
      var minutes = currentDate.getMinutes() + "";
      var seconds = currentDate.getSeconds() + "";
      return (day<=9 ? '0' + day : day) + "-" + (month<=9 ? '0' + month : month) + "-" + year+' '+(hour<=9 ? '0' + hour : hour)+":"+(minutes<=9 ? '0' + minutes : minutes);
    }

    console.log('createDelivery789',createDelivery.error);
    console.log('filanlData89',filanlData);
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
    return (
        <>
            <div className="content-wrapper">
                <Header title = "Shipment Detail Delivery" />
                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">
                        {
                            createDelivery && createDelivery!= null && createDelivery != undefined && createDelivery.error != 'No data for this id' &&  
                            createDelivery.getShipmentDetailsByInseePlusId && createDelivery.getShipmentDetailsByInseePlusId != null && 
                            createDelivery.getShipmentDetailsByInseePlusId != undefined ? 
                            <div className="Shipment_managment mb-4">
                            <Link to="/MyShipments"><button style={{paddingBottom:"0.4%",paddingTop:"0.4%",paddingLeft:"1%",paddingRight:"1%",border:"none",marginLeft:"2%",background:"#000",color:"#fff"}} class="update">{t("Back")}</button></Link>
                                <ShipMentHeadingSection title={t("shipmanagement.shipmentdetails")} />
                                {createDelivery && createDelivery.getShipmentDetailsByInseePlusId?
                                <>
                                <div className="row shipment_border m-2">
                                    <div className="col-sm-6 col-md-4 col-lg-2">
                                        <ShipmentNoDate
                                            title={t("shipmanagement.shipmentnumber")}
                                            number={createDelivery.getShipmentDetailsByInseePlusId.shipmentNumber}
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2">
                                        <ShipmentNoDate
                                            title={t("shipment Date & Time")}
                                            // number={ convertUTCToTimezone(filanlData && filanlData[0] && filanlData[0].shipmentLastUpdatedTime, null, 'Asia/Bangkok')
                                            // }
                                            number={moment(filanlData && filanlData[0] && filanlData[0].shipmentLastUpdatedTime).format('DD-MM-YYYY HH:mm:ss')}                                      
                                          //  number={convertUTCToTimezone(createDelivery.getShipmentDetailsByInseePlusId.shipmentCreatedDateAndTime, null, 'Asia/Bangkok')}
                                        />
                                    </div>
                                    {
                                       createDelivery.getShipmentDetailsByInseePlusId.shipTo!==undefined?
                                    <div className="col-sm-6 col-md-4 col-lg-2">
                                        <ShipmentNoDate
                                            title={`${t('Ship To')}: 
                                            ${
                                                selectedLangCode === 'en' || selectedLangCode === null ?
                                                createDelivery.getShipmentDetailsByInseePlusId.shipTo.shipToCode !=null ? createDelivery.getShipmentDetailsByInseePlusId.shipTo.shipToCode.replace(/^0+/, '')+' '+ 
                                           
                                            createDelivery.getShipmentDetailsByInseePlusId.shipTo.shipToName 
                                             : '' :
                                             createDelivery.getShipmentDetailsByInseePlusId.shipTo.shipToCode !=null ? createDelivery.getShipmentDetailsByInseePlusId.shipTo.shipToCode.replace(/^0+/, '')+' '+ 
                                           
                                            createDelivery.getShipmentDetailsByInseePlusId.shipTo.shipToNameInLocal 
                                             : ''
                                            }
                                            `}
                                            // number={
                                            //     displayAddress(createDelivery.getShipmentDetailsByInseePlusId.shipTo.address != null ? createDelivery.getShipmentDetailsByInseePlusId.shipTo.address.address : '')+' '
                                            //     +displayAddress(createDelivery.getShipmentDetailsByInseePlusId.shipTo.address!= null ? createDelivery.getShipmentDetailsByInseePlusId.shipTo.address.street : '')+' '
                                            //     +displayAddress(createDelivery.getShipmentDetailsByInseePlusId.shipTo.address!= null ?createDelivery.getShipmentDetailsByInseePlusId.shipTo.address.districtId : '')+' '
                                            //     +displayAddress(createDelivery.getShipmentDetailsByInseePlusId.shipTo.address!= null ?createDelivery.getShipmentDetailsByInseePlusId.shipTo.address.subDistrictId : '')+' '
                                            //     +displayAddress(createDelivery.getShipmentDetailsByInseePlusId.shipTo.address!= null ?createDelivery.getShipmentDetailsByInseePlusId.shipTo.address.provinceId: '')+' '
                                            //     +displayAddress(createDelivery.getShipmentDetailsByInseePlusId.shipTo.address!= null ?createDelivery.getShipmentDetailsByInseePlusId.shipTo.address.postalCode:'')+' '
                                            //     +displayAddress(getcountryName(createDelivery.getShipmentDetailsByInseePlusId.shipTo.address!= null ?createDelivery.getShipmentDetailsByInseePlusId.shipTo.address.countryId: ''))
                                            //     }
                                            fontSize="fonts"
                                        />
                                    </div> :''
                                    }
                                    <div className="col-sm-6 col-md-4 col-lg-2">
                                        <ShipmentNoDate
                                            title={t("Shipping Type")}
                                            number={createDelivery.getShipmentDetailsByInseePlusId.shippingType}
                                        />
                                    </div>
                                    <div className="col-sm-6 col-md-4 col-lg-2">
                                        <ShipmentNoDate
                                            title={t("Shipping Conditions")}
    
                                            number={createDelivery && createDelivery.getShipmentDetailsByInseePlusId ?createDelivery &&  createDelivery.getShipmentDetailsByInseePlusId.shippingConditions.map((shipingCond, i)=> {
                                                return (
                                                    shipingCond
                                                )
                                            }).join(',' +' '): ''}
                                           // number={createDelivery.getShipmentDetailsByInseePlusId.shippingCondition}
                                            class="green"
                                        />
                                    </div>
                                    {
                                    countryCodeFinal && countryCodeFinal === 'VN' ? '' :
                                    <div className="col-sm-6 col-md-4 col-lg-2">
                                        <ShipmentNoDate
                                            title={t("Shipment Status")}
                                            number={createDelivery.getShipmentDetailsByInseePlusId.shippingStatus}
                                            class="green"
                                        />
                                    </div>
                                    }
                                </div>
                                {
                                    countryCodeFinal && countryCodeFinal === 'VN' ? '' :
                                 <div className="row m-2 mt-3">
                                 <div className="col-sm-12 col-md-12 col-lg-12">
                                     {
                                         createDelivery && createDelivery.getShipmentDetailsByInseePlusId?
                                         <ShipmentCondition ShippingConditions="delivery" shipStatus={createDelivery.getShipmentDetailsByInseePlusId.shippingStatus} getShipmentStatus={filanlData} doNumber={createDelivery.getShipmentDetailsByInseePlusId.deliveryNumberSap} />
                                         :''
                                     }
                                     
                                 </div>
                                </div>
                            }
                                </>
                                :''
                                }
                               
                                {createDelivery &&
                                <div className="create_ship">
                                 {createDelivery.getShipmentDetailsByInseePlusId && createDelivery.getShipmentDetailsByInseePlusId.products!==undefined?createDelivery.getShipmentDetailsByInseePlusId.products.map((prod,key)=>{
                                         return (
                                         <UpdateShipment item={prod}/>
                                        )
                                      })
                                      :''
                                    }
                                </div>
                                }
                                <div className="col-12">
                                {
                                  createDelivery && createDelivery.getShipmentDetailsByInseePlusId!==undefined ?<ShipmentDetailFormDelivery data={createDelivery.getShipmentDetailsByInseePlusId} canceldo="buttonShow" />:''
                                }
                                </div>
                                {/*
                                   <Delivery
                                    plantName="Thailand Plant"
                                    trackingId="8765145"
                                    shipmentDate="Dec 20, 2020"
                                    prefered_truck_type="Full Trailer"
                                    special_project="Multi Lot"
                                    contact_name="John Dore"
                                    contact_number="+98542557556"
                                    transporter_name="BAC"
                                />
                                */}
                                
                            </div> : 
                            <div className="createDel">
                                {createDelivery.error}
                            </div>
                        }
                       

                    </div>
                </div>

            </div>
        </>
    );
}
export default withTranslation()(ShipmentDetailDelivery);