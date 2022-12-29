import 'moment-timezone';
import React, { useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import InvoiceReportHeader from "../../../components/TaxInvoiceReport/TaxInvoiceReportHeader";
import InvoiceReportTable from "../../../components/TaxInvoiceReport/TaxInvoiceReportTable";
import TaxInvoiceReportTableConwood from '../../../components/TaxInvoiceReport/TaxInvoiceReportTableConwood'
import { reportActions } from "../../../_actions";
import moment from 'moment'
import Loading from '../../../components/Loader/Loading'
import 'moment-timezone'
// import "../CaseReports";

function TaxInvoiceReport() {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [dateRange, setDateRange] = React.useState('')
  const [pleaseSelectTransDate, setPleaseSelectTransDate] = React.useState('DD-MM-YYYY');
  const [loading, setLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [startdateFinalTransDate, setStartdateFinalTransDate] = React.useState('');
  const [enddateFinalTransDate, setEnddateFinalTransDate] = React.useState('');
  const [fromDateTransDate, setFromDateTransDate] = React.useState(new Date());
  const [toDateTransDate, setToDateTransDate] = React.useState(new Date());
  const [filterType, setfilterType] = React.useState('')
  const [filterDataValue, setfilterDataValue] = React.useState('')
  const [contractValue, setContractValue]= React.useState('');
  const [selectMetrailDisable, setselectMetrailDisable] = React.useState(false);
  const [contract, setContract] = React.useState('');
  const selectedLangCode = localStorage.getItem('lancode');
  const [materialName, setMaterialName] = React.useState('');
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  let custmerNo = userName && userName.soldTo ? userName.soldTo[0] : 0
  const countryCode = userName.countryCode;
  const [selectContractDisable, setselectContractDisable] = React.useState(false);
  const [division, setDivision] = React.useState(countryCode === 'TH' ? 'Cement' :  'DryMix');
  const [fromDate, setFromDate] = React.useState(moment().subtract(3, 'month').format('YYYY-MM-DD'));
  const [toDate, setTodate] = React.useState(moment().format('YYYY-MM-DD'));
  const [startIndex, setStartIndex] = React.useState(1);
  const [endIndex, setEndIndex] = React.useState(10);
  const contractbyAcc = useSelector((state) => state.getTaxInvoiceContracts)

  const getTaxInvoiceReportsData = useSelector((state) => state.getTaxInvoiceReports.getTaxInvoiceReports);

  const deliveryShipmentStatusList = useSelector((state) => state.getTaxInvoiceContracts.getTaxInvoiceContracts);
  const materialList = useSelector((state) => state.getTaxInvoiceMaterial.getTaxInvoiceMaterial);

  console.log("filterType",contract);
  // useEffect(() => {
  //   dispatch(reportActions.getTaxInvoiceMaterial(division));
  //   dispatch(reportActions.getTaxInvoiceContracts(division));
  // }, [division])

  useEffect(() => {
    setLoading(true)    
      dispatch(reportActions.getTaxInvoiceReports(custmerNo, 'Cement', 1, 10,
      filterData ? filterData : '',
      fromDate ? fromDate : '',
      toDate ? toDate : '',
      contractValue ? contractValue : '',
      filterDataValue ? filterDataValue : ''
    ));   
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])


  useEffect(() => {
    setLoading(true)
    if(division && division === "Conwood") {
      if (filterData.length > 2 || filterData.length == 0) {
      dispatch(reportActions.getTaxInvoiceReportsConwood(custmerNo, division, 1, 10,
      filterData ? filterData : '',
      fromDate ? fromDate : '',
      toDate ? toDate : '',
      contractValue ? contractValue : '',
      filterDataValue ? filterDataValue : ''

    ));
      }
    }
    else {
      if (filterData.length > 2 || filterData.length == 0) {
        dispatch(reportActions.getTaxInvoiceReports(custmerNo, division, 1, 10,
          filterData ? filterData : '',
          fromDate ? fromDate : '',
          toDate ? toDate : '',
          contractValue ? contractValue : '',
          filterDataValue ? filterDataValue : ''
        ));
    }
    

    }

    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [division, filterData])



  const onChangeSearch = (e) => {
    var searchText = e;
    setFilterData(searchText)
  }


  function handleTableSearch() {
    setStartIndex(1);
    dispatch(reportActions.getTaxInvoiceMaterial(division, fromDate, toDate));
    dispatch(reportActions.getTaxInvoiceContracts(division, fromDate, toDate));
    setEndIndex(10);
    setPage(1);
    if(division && division === "Conwood") {      
      dispatch(reportActions.getTaxInvoiceReportsConwood(custmerNo, division, startIndex, endIndex,
        filterData ? filterData : '',
        fromDate ? fromDate : '',
        toDate ? toDate : '',
        contractValue ? contractValue : '',
        filterDataValue ? filterDataValue : ''
  
      ));
    }else{
      dispatch(reportActions.getTaxInvoiceReports(custmerNo, division, startIndex, endIndex,
        filterData ? filterData : '',
        fromDate ? fromDate : '',
        toDate ? toDate : '',
        contractValue ? contractValue : '',
      filterDataValue ? filterDataValue : ''
      ));
    }
   
  }

  const handleContractChange = (event) => {
    
    if(event !=""){
    const data = deliveryShipmentStatusList.find((x) => x.key === event);
    if( selectedLangCode === 'en' || selectedLangCode === null){
      setContract(data.value);
  }
  else {
    setContract(data.value);
  }
  }
    
    setselectMetrailDisable(true)
    if (event && event.length > 0) {
      setfilterType('contract')
    } else {
      setfilterType('');
      setselectMetrailDisable(false);
    }
    var contractValue = event.split('-')[0]
    console.log("contractValue",contractValue);
    setContractValue(contractValue)

  }

  const handleMaterialChange = (event) => {
        console.log("event++",event);
    if(event !=""){
    const data = materialList.find((x) => x.code === event);
    if( selectedLangCode === 'en' || selectedLangCode === null){
      setMaterialName(data.name);
    }
    else {
      setMaterialName(data.nameInTH);
    }
   
  }
    setselectContractDisable(true)
    if (event && event.length > 0) {
      setfilterType('Material')
    }
    else {
      setfilterType('');
      setselectContractDisable(false);
    }
    setfilterDataValue(event)
  }

  const handlePagnation = (start, end, pageNo) => {
    setLoading(true)
    if(division && division === "Conwood") {
      dispatch(reportActions.getTaxInvoiceReportsConwood(custmerNo, division, start, end,
      filterData ? filterData : '',
      fromDate ? fromDate : '',
      toDate ? toDate : '',
      contractValue ? contractValue : '',
      filterDataValue ? filterDataValue : ''
    ));
    }
    else {
      if (filterData.length > 2 || filterData.length == 0) {
        dispatch(reportActions.getTaxInvoiceReports(custmerNo, division,start, end,
          filterData ? filterData : '',
          fromDate ? fromDate : '',
          toDate ? toDate : '',
          contractValue ? contractValue : '',
          filterDataValue ? filterDataValue : ''
        ));
    }
    

    }

    setTimeout(() => {
      setLoading(false)
    }, 1000);
    setPage(pageNo);
  }

  const handleDivision = (event) => {
    setDivision(event);
    setFilterData('');
    setfilterDataValue('');
    setfilterType('');
    setselectMetrailDisable(false);
    setselectContractDisable(false);
    setStartIndex(1);
    setEndIndex(10);
    setPage(1);
    setMaterialName('');
    setContract('');
    setContractValue('');
    
  }
  

  console.log(division, 'division---')

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
        <Header title="Tax Invoice" contractbyAcc={contractbyAcc.error}/>
        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="reports-landing-container">
              <InvoiceReportHeader
                onChangeSearch={event => setFilterData(event)}
                onFromDateChange={event => setFromDate(event)}
                onToDateChange={event => setTodate(event)}
                handleContractChange={handleContractChange}
                handleMaterialChange={handleMaterialChange}
                selectMetrailDisable={selectMetrailDisable}
                selectContractDisable={selectContractDisable}
                onChangeDivision={handleDivision}
                selectedDivision={division}
                onTableSearch={handleTableSearch}
                fromDate={fromDate}
                toDate={toDate}
                contract={contract}
                materialName={materialName}

              />
              {
                division && division === 'Conwood' ? 
                <TaxInvoiceReportTableConwood 
                loading={loading}
                getTaxInvoiceReportsData={getTaxInvoiceReportsData}
                onChangeStartAndEndIndex={handlePagnation}
                page={page}
                fromDate={fromDate}
                division={division}
                toDate={toDate}
                filterType = {filterType}
                filterData = {filterData}
                filterDataValue = {filterDataValue}
                setIsLoading={setIsLoading}
                />
                
                :
                <InvoiceReportTable
                loading={loading}
                getTaxInvoiceReportsData={getTaxInvoiceReportsData}
                onChangeStartAndEndIndex={handlePagnation}
                page={page}
                division={division}
                fromDate = {fromDate}
                toDate={toDate}
                filterData = {filterData}
                filterType = {filterType}
                filterDataValue = {filterDataValue}
                setIsLoading={setIsLoading}
              />

              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(TaxInvoiceReport);
