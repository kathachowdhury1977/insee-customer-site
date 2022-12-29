import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import SalesReportHeader from "../../../../components/SalesOrderReport/SalesReportHeader";
import SalesReportTable from "../../../../components/SalesOrderReport/SalesOrderTable";
import Header from "../../../../components/Header/Header";
import { reportActions } from "../../../../_actions";
import { reportService } from "../../../../_services";
import Axios, { AxiosResponse } from 'axios';
//import { process.env.REACT_APP_API_URL_ORDER } from "../../../../constant";
import moment from 'moment';
import Loading from '../../../../components/Loader/Loading'
function SalesOrderReport() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const countryCode = userData.countryCode;
    const selectedLangCode = localStorage.getItem('lancode');
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(2);
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
    const [search, setSearch] = React.useState('');
    const [isExport, setIsExport] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const contractbyAcc = useSelector((state) => state.getSalesOrderContracts)
    console.log(contractbyAcc, 'contractbyAcc++')
    const [isSearch, setIsSearch] = React.useState(false);

    const [division, setDivision] = React.useState(countryCode === 'TH' ? 'CM' :  'DryMix');

    useEffect(() => {debugger
        dispatch(reportActions.getSalesOrderReport(contract, fromDate, toDate, isExport, startIndex, '', material, orderStatus, search, shippingCondition, shipToName, division, countryCode));

    }, [startIndex, endIndex, division])

    const handlePagnation = (start, end, page) => {
        setPage(page);
        setStartIndex(start);
        setEndIndex(end);
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
            method: "GET", url: process.env.REACT_APP_API_URL_ORDER + '/order/downloadSalesOrderReport?contract=' + contract + '&dateRangeFrom=' + fromDate + '&dateRangeTo=' + toDate
                + '&material=' + material + '&orderstatus=' + orderStatus + '&shipToName=' + shipToName + '&searchKey=' + search + '&shipingCondition=' + shippingCondition + '&division=' + division + '&textInTH=' + thText + '&countryCode=' + countryCode + '&soldToNumber=' + localStorage.getItem('CustomerNumber')
            , responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            .then(async (response) => {
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/xlsx' });
                const dateAndTime = moment().format("DD_MM_YYYY_HH_mm_ss");
                link.href = window.URL.createObjectURL(file);
                link.download = "SalesReport" + dateAndTime + ".xlsx";
                link.click();
                // setSetloading(false)
                return response.data;
                
            })
            setTimeout(() => {
                setIsLoading(false)
                  }, 4000);
            

    }


    const handleTableSearch = () => {

        setStartIndex(1);
        setEndIndex(2);
        setPage(1);
        dispatch(reportActions.getSalesOrderStatus(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getSalesOrderShippingCondition(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getSalesOrderShipToName(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getSalesOrderMaterialList(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getSalesOrderContracts(countryCode, division, fromDate, toDate));
        dispatch(reportActions.getSalesOrderReport(contract, fromDate, toDate, isExport, startIndex, '', material, orderStatus, search, shippingCondition, shipToName, division, countryCode));

    }
    const handleDivision = (event) => {
        setShipToName('');
        setShippingCondition('');
        setMaterial('');
        setContract('');
        setOrderStatus('');
        setStartIndex(1);
        setEndIndex(2);
        setDivision(event);
        setOrderStatusName('')
        setContractName('')
        setMaterialName('')
        setShipToNameName('')
        setShippingConditionName('')
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
                <Header title="Sales Report" contractbyAcc={contractbyAcc.error}/>
                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                            <SalesReportHeader
                                onFromDateChange={event => setFromDate(event)}
                                onToDateChange={event => setTodate(event)}
                                onMaterialChange={event => setMaterial(event)}
                                onContractChange={event => setContract(event)}
                                onShipToCondition={event => setShippingCondition(event)}
                                onShipToNameChange={event => setShipToName(event)}
                                onOrderStatusChange={event => setOrderStatus(event)}
                                onExportChange={event => setIsExport(event)}
                                onSearchChange={event => setSearch(event)}
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
                                setShippingConditionName={setShippingConditionName}
                                shippingConditionName={shippingConditionName}

                            />  
                            
                            <SalesReportTable
                                handleChangeExport={event => exportPage(event)}
                                page={page}
                                division={division}
                                onChangeStartAndEndIndex={handlePagnation}
                            />
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(SalesOrderReport);
