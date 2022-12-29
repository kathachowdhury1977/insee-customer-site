import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from 'react-redux'
import Axios, { AxiosResponse } from 'axios';
//import { process.env.REACT_APP_API_URL_PAYMENTOFFLINE } from '../../constant'
import Loading from '../Loader/Loading'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import { reportActions } from "../../_actions";
import moment from 'moment'
import 'moment-timezone'

function DeliveryReportTableConwood(props) {
    const dispatch = useDispatch();
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0
    const { t } = useTranslation();
    const getDeliverReportDataConwood = useSelector((state) => state.getDeliveryReportConwod);
    const selectedLangCode = localStorage.getItem('lancode');

    // console.log(getDeliveryReportChildData, 'getDeliveryReportChildData')
    const [summaryOpen, setSummaryOpen] = useState({});
    let countryCode = userData.countryCode;
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);
    const [isThai, setIsThai] = useState(false);
    const isPageLoading = useSelector((state) => state.getDeliveryReportConwod.loading)

    const exportTable = () => {
        props.handleChangeExport(true)
    }
    const handleChangePage = (event, value) => {
        let start = 1;
        let end = 10;
        if (value === 1) {
            setStartIndex(1)
            setEndIndex(10)
        }
        else {
            start = ((value - 1) * 10) + 1;
            end = value * 10;
            setStartIndex(((value - 1) * 10) + 1);
            setEndIndex(value * 10);
        }
        setPage(value);
        props.onChangeStartAndEndIndex(start, end, value);
    }


    const modifyDate = (curDate) => {
        var b = [curDate.slice(6, 8), "-", curDate.slice(4, 6), "-", curDate.slice(0, 4)].join('');
        return b;
    }

    const modifyMaterialNumber = (number) => {
        var n = number = (number * 1).toString();
        return n;
    }
    const downloadDeliveryDms = (doNumber) => {
        // setSetloading(true)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/deliveryDms?customercode=${custmerNo}&donumber=${doNumber}`, responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                //setSetloading(false)
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/.pdf' });
                const fileURL = await URL.createObjectURL(file);
                link.href = window.URL.createObjectURL(file);
                link.download = "DeliveryReport_" + doNumber + ".pdf";
                link.click();
                // setIsLoadingDownload(false)
                return response.data;
            })

    }

    const modifyDecimal = (myNumber) => {
        if (myNumber.length > 0) {
            const n = parseFloat(myNumber).toFixed(3);
            return n;
        } else {
            return "";
        }

    }
    useEffect(() => {
        if (countryCode == "TH") {
            setIsThai(false);
        } else {
            setIsThai(true);
        }
    }, [])

    const summaryOpenToggle = (id) => {
        dispatch(reportActions.getDeliveryReportChild(custmerNo, deliveryDivision, id));
        if (summaryOpen[`childTable${id}`]) {
          setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: false });
        } else {
          setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: true });
        }
      
      };

    

      const decimalwithcoma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    const totalAmountForSummary = (totalSummaryAmount, currentValue) => {
        return decimalwithcoma( Number(
          parseFloat(totalSummaryAmount) +
            parseFloat(currentValue.quantityBag)
        ).toFixed(3))
      };

    const deliveryDivision = props.division;
    console.log("getDeliveryReportConwod++", getDeliverReportDataConwood);

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
    return (
        <>
            <div className="row mt-3 case-report-table">
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 pl-0 pr-0">
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                             <th scope="col">{t("")}</th> 
                         
                            <th scope="col">{t("")}</th>
                                {deliveryDivision === "CO" ?
                                 <th scope="col">{t("")}</th>
                                : 
                                <>
                                
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("PO No")}</th>
                                 <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Contract Number")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("contract_name")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("SO No")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("myshipmentlist.heading")}</th>
                                </> 
                                }
                               
                               {deliveryDivision === "CO" ? <>
                               <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Delivery Date")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Ticket Number")}</th> 
                                    </> : ''
                                }
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Ship To No.")}</th>
                               <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Ship-to Name")}</th>
                                  
                                {deliveryDivision === "CO" ? '' : 
                                <>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("shipmanagement.donumber")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("po_date")}</th>
                                {/* <th scope="col">{t("Shipment Status")}</th> */}
                               <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("label.shipping_condition")}</th>
                               <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("label.shipping_type")}</th>
                                </>
                            }
                                
                               
                                {isThai ? <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("material")}</th> : null}
                                {/* {deliveryDivision === "CO" ? 
                                 <th scope="col">{t("Plant Code")}</th>
                                : 
                                ''
                                } */}
                                {deliveryDivision === "CW" ? '' : 
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("plantname.label2")}</th>
                                }
                                {deliveryDivision === "CO" ? '' : 
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Truck Licence")}</th>
                                }
                                {isThai ? <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("trailerid")}</th> : null}
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>
                                {
                                 deliveryDivision === "CO" ?  t("Matrial Code") :
                                t("Product No.")
                                }
                                 </th>
                                 {
                                    deliveryDivision === "CO" ? '' :
                                    <>
                                     <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("label.product_name")}</th>
                                    </>
                                 }
                               
                                {isThai ? <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("qty_include_free")}</th> : null}
                                
                                {isThai ? <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("qty_exclude_free")}</th> : null}
                                {
                                    deliveryDivision === "CO" ? 
                                    <>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Slump")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("CU")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("CY")}</th>
                                    </>
                                    : '' 
                                }
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("qty")}</th>
                                {
                                    deliveryDivision === "CO" || deliveryDivision === "CW"? 
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("unit")}</th>
                                    : ''
                                }
                                {
                                    deliveryDivision === "CO" ? 
                                    <>
                                    
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Min Load Charge")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Amount Before Tax")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Tax")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Total Amount")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Truck Number")}</th>
                                    </>
                                    : '' 
                                }

                                {
                                    deliveryDivision === "CO" || deliveryDivision === "CW" ? '' : 
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("freegoods")}</th>

                                }

                                    {/* {
                                    deliveryDivision === "CW" ? 
                                    <>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("gate_in")} </th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Check In")}  </th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("weight_in")} </th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("weight_out")}</th>
                                    </>
                                    : ' ' 
                                    } */}

                                {
                                    deliveryDivision === "CO" ||  deliveryDivision === "CW"  ? '' :
                                <>
                                

                                {isThai ? <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("unit_price")}</th> : null}
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("gate_in")} </th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Check In")} </th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("weight_in")} </th>

                                {/* <th scope="col">{t("load_in")}</th> */}
                                {/* <th scope="col">{t("load_out")} </th> */}
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("weight_out")}</th>
                                {/* <th scope="col">{t("Weight Out Time")}</th> */}
                                {/* <th scope="col">{t("gate_out")} </th> */}

                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("time_spent_in_plant")}</th>
                                {isThai ? <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("internal_note")} </th> : null}
                                {isThai ? <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("do_note")} </th> : null}
                                </>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {getDeliverReportDataConwood && !isPageLoading ? (getDeliverReportDataConwood.getDeliveryReportConwod && getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO && getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO.results
                                ? getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO.results.map((item) => 
                                <>
                                <tr>
                                     {
                                            props.division && props.division === 'CW' ?
                                            <td style={{fontSize: `${SmallFontChanger}px`}}><span style={{ cursor: 'pointer' }} 
                                            onClick={() => summaryOpenToggle(item.doNumber)}
                                           >
                                              <i className="fa fa-plus" style={{fontSize: `${SmallFontChanger}px`}}></i>
                                          </span>
                                          </td>
                                             : <td></td>
                                        }

                                     {(item.preDoStatus == "Delivered" || item.preDoStatus == "Dispatched")
                                        ? <td style={{fontSize: `${SmallFontChanger}px`}}><span style={{ cursor: 'pointer',fontSize: `${SmallFontChanger}px` }} onClick={() => downloadDeliveryDms(item.doNumber)}>
                                            <i className="fa fa-download" style={{fontSize: `${SmallFontChanger}px`}}></i>
                                        </span></td> :
                                        <td></td>}
                                    
                                    {deliveryDivision === "CO" ? '' : 
                                    
                                    <>
                                   
                                    <td ><span style={{fontSize: `${SmallFontChanger}px`}}>{item.poNumber}</span></td>
                                     <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.contractNumber}</span></td>
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.contractName}</span></td>
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.soNumber}</span></td>
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.preDoNumber}</span></td>
                                    </>
                                    
                                    }
                                   {deliveryDivision === "CO" ? <>
                                   <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.deliveryTime}</span></td>
                                     <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.ticketNo}</span></td>
                                   </> : ''
                                    }
                                     <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.shipToNumber != null ? modifyMaterialNumber(item.shipToNumber) : ''}</span></td>
                                    
                                   
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{ item.shipToName ? selectedLangCode === 'en' || selectedLangCode === null ?
                                          item.shipToName.split(':')[1] : item.shipToName.split(':')[0] : item.shipToName}</span></td>
                                    
                                     {deliveryDivision === "CO" ? '' 
                                     : 
                                     <>
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.doNumber}</span></td>
                                     <td ><span style={{fontSize: `${SmallFontChanger}px`}}>{item.orderDate ? (item.orderDate) : ""}</span></td>
                                     {/* <td><span>{
                                          item.shipmentStatus ? selectedLangCode === 'en' || selectedLangCode === null ?
                                          item.shipmentStatus : item.shipmentStatusTH : item.shipmentStatus
                                     }</span></td>                                     */}
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.shippingCondition}</span></td>
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.shippingType}</span></td>
                                     </>
                                    }
                                   
                                    
                                    {isThai ? <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.material}</span></td> : null}
                                    {/* {deliveryDivision === "CO" ? 
                                    <td><span>{item.plantCode}</span></td>
                                    : 
                                    '' 
                                    } */}
                                    {deliveryDivision === "CW" ? '' : 
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.plant}</span></td>
                                    }
                                    {deliveryDivision === "CO" ? '' : 
                                    <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.truckLicence}</span></td> 
                                    }
                                    {isThai ? <td><span>{item.trailerId}</span></td> : null}
                                    <td align="right" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {/* <span>{modifyMaterialNumber(item.product)}</span> */}
                                        
                                        </td>
                                    {
                                    deliveryDivision === "CO" ? '' 
                                    :
                                    <>
                                    <td >
                                        {/* <span>{item.productName}</span> */}
                                        </td>
                                    </>
                                    }
                                    {isThai ? <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.quantityIncludeFree}</span></td> : null}
                                    {isThai ? <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.quantityExcludeFree}</span></td> : null}
                                    {
                                    deliveryDivision === "CO" ? 
                                    <>
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.slumpCc}</span></td>
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.cu}</span></td>
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.cy}</span></td>
                                    </>
                                    : '' 
                                     }
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>
                                    { item.childTableSummary.length > 0
                                        ? (
                                            item.childTableSummary.reduce(totalAmountForSummary, 0)
                                        )
                                        : ""
                                    }
                                    {/* {
                                         decimalwithcoma(parseFloat(item.quantityBag).toFixed(3))
                                    } */}
                                        
                                       </span></td>
                                    {
                                    deliveryDivision === "CO" || deliveryDivision === "CW" ? 
                                    <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.unit}</span></td>
                                    : '' 
                                    }
                                    {
                                    deliveryDivision === "CO" ? 
                                    <>
                                    
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.minimumLoadCharge}</span></td>
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.amountBeforeTax}</span></td>
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.tax}</span></td>
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.totalAmout}</span></td>
                                     <td align=""><span style={{fontSize: `${SmallFontChanger}px`}}>{item.truckNo}</span></td>
                                    </>
                                    : '' 
                                     }
                                    {
                                    deliveryDivision === "CO" || deliveryDivision === "CW" ? '' : 
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.freeBags}</span></td>

                                    }

                                    {/* {
                                    deliveryDivision === "CW" ? 
                                    <>
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.gateIn ? moment(item.gateIn).format('DD-MM-YYYY') +' '+ moment(item.gateIn).format('HH:mm') : item.gateIn}</span></td>
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.checkIn ? moment(item.checkIn).format('DD-MM-YYYY') +' '+ moment(item.checkIn).format('HH:mm') : item.checkIn}</span></td>
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.weightIn ? moment(item.weightIn).format('DD-MM-YYYY') +' '+ moment(item.weightIn).format('HH:mm') : item.weightIn}</span></td>
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.weightOut ? moment(item.weightOut).format('DD-MM-YYYY') +' '+ moment(item.weightOut).format('HH:mm') : item.weightOut}</span></td>
                                    </>
                                    : ' ' 
                                    } */}

                                    {
                                    deliveryDivision === "CO" ||  deliveryDivision === "CW" ? '' :
                                    <>
                                  
                                    {isThai ? <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.unitPrice}</span></td> : null}
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.gateIn ? moment(item.gateIn).format('DD-MM-YYYY') +' '+ moment(item.gateIn).format('HH:mm') : item.gateIn}</span></td>
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.checkIn ? moment(item.checkIn).format('DD-MM-YYYY') +' '+ moment(item.checkIn).format('HH:mm') : item.checkIn}</span></td>
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.weightIn ? moment(item.weightIn).format('DD-MM-YYYY') +' '+ moment(item.weightIn).format('HH:mm') : item.weightIn}</span></td>
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.weightOut ? moment(item.weightOut).format('DD-MM-YYYY') +' '+ moment(item.weightOut).format('HH:mm') : item.weightOut}</span></td>
                                    {/* <td align="right"><span>{item.weightOut}</span></td> */}
                                    {/* <td align="right"><span>{item.gateOut}</span></td> */}
                                    <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.timeSpentInPlant}</span></td>
                                    {isThai ? <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.internalNote}</span></td> : null}
                                    {isThai ? <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.doNote}</span></td> : null}
                                    </>
                                    }

                                </tr>
                                    {
                                        props.division && props.division === 'CW' ? 
                                        summaryOpen[`childTable${item.doNumber}`]
                                        ?
                                       <>
                                                <tr style={{background: '#999'}}>
                                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Product")}</th>
                                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Product Name")}</th>
                                                    <th style={{textAlign: "right", fontSize: `${SmallFontChanger}px`}} scope="col">{t("label.quantity")}</th>
                                                    <th scope="col"  style={{fontSize: `${SmallFontChanger}px`}}>{t("unit")}</th>
                                                    <th scope="col"  style={{fontSize: `${SmallFontChanger}px`}}>{t("gate_in")}  </th>
                                                    <th scope="col"  style={{fontSize: `${SmallFontChanger}px`}}>{t("Check In")}  </th>
                                                    <th scope="col"  style={{fontSize: `${SmallFontChanger}px`}}>{t("weight_in")} </th>
                                                    <th scope="col"  style={{fontSize: `${SmallFontChanger}px`}}>{t("weight_out")}</th>

                                                </tr>
                                               
                                                    {
                                                        item.childTableSummary &&
                                                        item.childTableSummary != null ? item.childTableSummary.map((item, index) => {
                                                            return (
                                                            <tr style={{background: '#cccccc'}}>
                                                                <td><span  style={{fontSize: `${SmallFontChanger}px`}}>{item.product}</span></td> 
                                                                <td><span  style={{fontSize: `${SmallFontChanger}px`}}>{  selectedLangCode === 'en' || selectedLangCode === null ?
                                                                item.productName.split(':')[1] : item.productName.split(':')[0]}</span></td> 
                                                                <td style={{textAlign: "right",fontSize: `${SmallFontChanger}px`}}><span>{decimalwithcoma(parseFloat(item.quantityBag).toFixed(3))}</span></td> 
                                                                <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.unit}</span></td> 
                                                                <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.gateIn}</span></td> 
                                                                <td style={{textAlign: "right"}}><span style={{fontSize: `${SmallFontChanger}px`}}>{item.checkIn}</span></td> 
                                                                <td style={{textAlign: "right"}}><span style={{fontSize: `${SmallFontChanger}px`}}>{item.weightIn}</span></td> 
                                                                <td style={{textAlign: "right"}}><span style={{fontSize: `${SmallFontChanger}px`}}>{item.weightOut}</span></td> 
                                                            </tr>  
            
                                                            );
                                                        }) : ''
                                                    }
                                                
                                                </>
                                          
                                                
                                                    
                                                
                                                
                                          
                                        
                                        
                                          : ""
                                        
                                        
                                        : ''
                                    }
                                    </>
                                
                                
                                
                                ) : getDeliverReportDataConwood.getDeliveryReportConwod && getDeliverReportDataConwood.getDeliveryReportConwod ?
                                    <div className="no_record_table">{t("lable.norecordfound")}</div> : null)
                                : <div className='loadingOne'>
                                    <Loading />
                                </div>}
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="row ">
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                    {getDeliverReportDataConwood && getDeliverReportDataConwood.getDeliveryReportConwod &&
                        getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO &&
                        getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO.totalCount ?
                        <Pagination count={Math.ceil(getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO.totalCount / 10)}
                            page={props.page} onChange={handleChangePage}
                        />
                        : null}
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                    {
                        getDeliverReportDataConwood.getDeliveryReportConwod && getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO && getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO.results
                        ? getDeliverReportDataConwood.getDeliveryReportConwod.paginationDTO.results.length > 0 ?
                        <button className="redButton" style={{fontSize: `${FontChange}px`}} onClick={exportTable}>{t("export")}</button> : '' : ''
                    }
                    
                </div>
            </div>

        </>
    );
}
export default withTranslation()(DeliveryReportTableConwood);
