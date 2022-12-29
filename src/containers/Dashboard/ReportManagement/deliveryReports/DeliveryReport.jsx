import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import DeliveryReportHeader from "../../../../components/DeliveryReport/DeliveryReportHeader";
import DeliveryReportTable from "../../../../components/DeliveryReport/DeliveryReportTable";
import DeliveryReportTableConwood from "../../../../components/DeliveryReport/DeliveryReportTableConwood"
import Header from "../../../../components/Header/Header";
// import "../CaseReports";
import { reportActions } from "../../../../_actions";
//import { process.env.REACT_APP_API_URL_DMS } from "../../../../constant";
import moment from 'moment';
import Axios, { AxiosResponse } from 'axios';
import Loading from '../../../../components/Loader/Loading'
function DeliveryReport(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const countryCode = userData.countryCode;
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);
    const [fromDate, setFromDate] = React.useState( moment().subtract(3, 'months').format('YYYY-MM-DD'));
    const [toDate, setTodate] = React.useState(moment().format('YYYY-MM-DD'));
    const [orderStatus, setOrderStatus] = React.useState('');
    const [orderStatusName, setOrderStatusName] = React.useState('');
    const [contract, setContract] = React.useState('');
    const [contractName, setContractName] = React.useState('');
    const [material, setMaterial] = React.useState('');
    const [materialName, setMaterialName] = React.useState('');
    const [shipToName, setShipToName] = React.useState('');
    const [shipToNameName, setShipToNameName] = React.useState('');
    const [shippingCondition, setShippingCondition] = React.useState('');
    const [shippingConditionName, setShippingConditionName] = React.useState('');
    const [serachNumber, setSerachNumber] = React.useState('');
    const [serachNumberPlant, setSerachNumberPlant] = React.useState('');
    
    const [doNumber, setDONumber] = React.useState('');
    const [poNumber, setPONumber] = React.useState('');
    const [soNumber, setSONumber] = React.useState('');
    const [isExport, setIsExport] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [division, setDivision] = React.useState(countryCode === 'TH' ? 'CM' :  'DryMix');
    const selectedLangCode = localStorage.getItem('lancode');
    const [isLoading, setIsLoading] = React.useState(false);
    const contractbyAcc = useSelector((state) => state.getDeliveryContracts)

    useEffect(() => { debugger
        if(division && division === "CW") {
            dispatch(reportActions.getDeliveryReportConwod(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber));
        }
        else {
            dispatch(reportActions.getDeliveryReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber, serachNumberPlant != undefined ? serachNumberPlant : ''));
        
        }    
       
      }, [startIndex, endIndex, doNumber, poNumber, soNumber, division, serachNumberPlant])
  

    const handleTableSearch = () => {
        dispatch(reportActions.getDeliveryShipmentStatus(countryCode))
        // dispatch(masterActions.shipmentStatusFilterList())

        // dispatch(reportActions.getDeliveryStatus(props.countryCode,props.division));
        dispatch(reportActions.getDeliveryShippingCondition(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getDeliveryShipToName(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getDeliveryMaterialList(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getDeliveryContracts(countryCode, division, fromDate, toDate));
        setStartIndex(1);
        setEndIndex(10);
        setPage(1);
        if(  division && division === 'CW' ) {
            dispatch(reportActions.getDeliveryReportConwod(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber));
            
        }
        else {
            dispatch(reportActions.getDeliveryReport(contract, fromDate, toDate, isExport, startIndex, endIndex, material, orderStatus, doNumber, poNumber, soNumber, shippingCondition, shipToName, countryCode, division, serachNumber, serachNumberPlant));
        }
       

    }
    const handlePagnation = (start, end, pageNo) => {
        setStartIndex(start);
        setEndIndex(end);
        setPage(pageNo);
    }
    const handleDivision = (event) => {

        setShipToName('');
        setShippingCondition('');
        setMaterial('');
        setContract('');
        setOrderStatus('');
        setStartIndex(1);
        setEndIndex(10);
        setDivision(event);
        setOrderStatusName('')
        setContractName('')
        setMaterialName('')
        setShipToNameName('')
        setShippingConditionName('')
    }

    const exportPage = (isTrue) => {
        if (isTrue) {

            downLoadPDFFile();
        }

    }

    const downLoadPDFFile = (history = "history") => {
        setIsLoading(true)
        var thText = selectedLangCode && selectedLangCode === 'th' ? true : false
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_DMS + 'delivery-order/downloadDeliveryOrderReport?contract=' + contract + '&fromDate=' + fromDate + '&toDate=' + toDate
                + '&material=' + material + '&orderStatus=' + orderStatus + '&shipToName=' + shipToName + '&poNumber=' + poNumber+ '&textTH=' + thText
                + '&doNumber=' + doNumber + '&soNumber=' + soNumber + '&shippingCondition=' + shippingCondition + '&division=' + division + '&countryCode=' + countryCode + '&plantName=' + serachNumberPlant + '&soldToNumber=' + localStorage.getItem('CustomerNumber')+'&search=' + serachNumber
            , responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/xlsx' });
                const dateAndTime = moment().format("DD_MM_YYYY_HH_mm_ss");
                link.href = window.URL.createObjectURL(file);
                link.download = "DeliveryReport" + dateAndTime + ".xlsx";
                link.click();
                // setSetloading(false)
                return response.data;
            })
            setTimeout(() => {
                setIsLoading(false)
                  }, 4000);
        // return result.data;

    }
    
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);


    return (
        <>
            <div className="content-wrapper">
            {
                isLoading ? 
                <div className="firstLoading">
                <div className="progressLoding">
                <Loading />
                </div>
                
            </div> : ''
            }
                <Header title="Delivery Report"  contractbyAcc={contractbyAcc.error}/>
                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                            <DeliveryReportHeader
                                onFromDateChange={event => setFromDate(event)}
                                onToDateChange={event => setTodate(event)}
                                onMaterialChange={event => setMaterial(event)}
                                onContractChange={event => setContract(event)}
                                onShipToCondition={event => setShippingCondition(event)}
                                onShipToNameChange={event => setShipToName(event)}
                                onOrderStatusChange={event => setOrderStatus(event)}
                                onExportChange={event => setIsExport(event)}
                                onsearchHandleChange={event => setSerachNumber(event)}
                                onsearchHandleChangePlant={event => setSerachNumberPlant(event)}
                                
                                onTableSearch={handleTableSearch}
                                onChangeDivision={handleDivision}
                                division={division}
                                countryCode={countryCode}
                                fromDate={fromDate}
                                toDate={toDate}

                                setOrderStatusName={setOrderStatusName}
                                orderStatusName={orderStatusName}
                                setContractName={setContractName}
                                contractName={contractName}
                                setMaterialName={setMaterialName}
                                materialName={materialName}
                                setShipToNameName={setShipToNameName}
                                shipToNameName={shipToNameName}
                                shippingCondition={shippingCondition}
                                setShippingConditionName={setShippingConditionName}
                                shippingConditionName={shippingConditionName}


                            />
                            {
                                  division && division === 'CW' ? 
                                  <DeliveryReportTableConwood
                                    handleChangeExport={event => exportPage(event)}
                                    onChangeStartAndEndIndex={handlePagnation}
                                    division={division}
                                    page={page}
                                /> : 
                                <DeliveryReportTable
                                    handleChangeExport={event => exportPage(event)}
                                    onChangeStartAndEndIndex={handlePagnation}
                                    division={division}
                                    page={page}
                                />
                            }
                            

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(DeliveryReport);
