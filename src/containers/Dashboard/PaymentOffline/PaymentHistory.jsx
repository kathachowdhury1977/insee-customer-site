import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { eventActions, masterActions } from "../../../_actions";
import Header from "../../../components/Header/Header";
import "./Payment.scss"
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader"
// import paymentHistroryTable from "../../../components/Table/paymentHistroryTable";
import PaymentHistoryTable from "../../../components/Table/PaymentHistoryTable";
import { paymentofflineActions } from "../../../_actions/paymentoffline.action";
import { Link } from "react-router-dom";
import Loading from '../../../components/Loader/Loading'
import moment from 'moment'
import 'moment-timezone'

function PaymentHistory(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [pleaseSelectTransDate, setPleaseSelectTransDate] = useState('DD-MM-YYYY');
    const [startdateFinalTransDate, setStartdateFinalTransDate] = React.useState('');
    const [enddateFinalTransDate, setEnddateFinalTransDate] = React.useState('');
    const [fromDateTransDate, setFromDateTransDate] = useState(new Date());
  const [toDateTransDate, setToDateTransDate] = useState(new Date());
    const [page, setPage] = React.useState(1);
    const [paymentHistTranDate, setPaymentHistTranDate] = useState('');
    const [filterData, setFilterData] = useState('');
    const [filterCatValue, setFilterCatValue] = useState('');
	let userName = localStorage.getItem("userData");
    const [popupId, setPopupId] = React.useState(false);
	userName = JSON.parse(userName);
    const paymentHistory = useSelector((state) => state.paymentHistoryData.paymentHistoryData);
    let startIndex = paymentHistory && paymentHistory.startIndex;
    let endIndex = paymentHistory && paymentHistory.endIndex;
    const getPaymentCat =localStorage.getItem('paymentCatName')
    
  const defaultCat = getPaymentCat && getPaymentCat ? getPaymentCat && getPaymentCat : "Cement"
    const [open, setOpen] = React.useState(false);
    let filterDataValue;
useEffect(() => {
    if(filterData.length > 2 || filterData.length == 0){
     filterDataValue = [{ refno: filterData }, {transdate: paymentHistTranDate}, {status:filterCatValue === 'all' ? '' : filterCatValue}];
    dispatch(paymentofflineActions.paymentHistoryData(userName.soldTo[0], 1, 10, filterDataValue, defaultCat, startdateFinalTransDate, enddateFinalTransDate));
    }
    else {
        
    }
}, [filterData, filterCatValue, paymentHistTranDate, startdateFinalTransDate ? startdateFinalTransDate : '', enddateFinalTransDate ? enddateFinalTransDate : ''])

const onChangeSearchHistory = (e) => {
    dispatch(paymentofflineActions.serachValue(e));
    var searchText = e
   setFilterData(searchText)
   
    
   }

   const paymentHisDateChange = (event) => {
    setPaymentHistTranDate (event)``
   }
   const handleEvent = (event, picker) => {
    console.log(picker.startDate, 'dateEvent')
  }

   const handleCallbackTransactionDate = (start, end, label) => {
    var startDateBefore = moment(start._d);
    var startdatebeforeDate = startDateBefore.subtract(1, "days");
    setStartdateFinalTransDate (startdatebeforeDate.format("YYYY-MM-DD"))
    var endDateAfter = moment(end._d);
    var enddateAfterDate = endDateAfter.add(1, "days");
    setEnddateFinalTransDate(enddateAfterDate.format("YYYY-MM-DD"))
    var startDate = start._d;
    var endDate = end._d;
   const fromStartDate =  startDate.getFullYear()+ '-' + ('0' + (startDate.getMonth()+1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2);
    const fromEndDate = endDate.getFullYear()+ '-' + ('0' + (endDate.getMonth()+1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2);
    setPleaseSelectTransDate(fromStartDate)
    setFromDateTransDate(fromStartDate)
    setToDateTransDate(fromEndDate)
    
   

  }

   const handleChangeCat = (event) => {
    console.log(event.target.value)
    var filterCat =event.target.value
    setFilterCatValue (filterCat)
   

   }

   

   const handleChangePage = async(event, value) => { 
    await dispatch(masterActions.paginationValue(value));
    if (value === 1) {
        startIndex = 1;
        endIndex = 10
    }
    else {
        startIndex = ((value-1)*10)+1;
        endIndex = value*10;
    }
    setPage(value);
    filterDataValue = [{ refno: filterData }, {transdate: paymentHistTranDate}, {status:filterCatValue === 'all' ? '' : filterCatValue}];
   dispatch(paymentofflineActions.paymentHistoryData(userName.soldTo[0], startIndex, endIndex, filterDataValue, defaultCat, startdateFinalTransDate, enddateFinalTransDate));

    
  
};



const deleteData = () => { debugger
    dispatch(paymentofflineActions.paymentHistoryDataDelete(popupId))
    setOpen(false);
    filterDataValue = [{ refno: filterData }, {transdate: paymentHistTranDate}, {status:filterCatValue === 'all' ? '' : filterCatValue}];
    dispatch(paymentofflineActions.paymentHistoryData(userName.soldTo[0], startIndex, endIndex, filterDataValue, defaultCat, startdateFinalTransDate, enddateFinalTransDate));
    setTimeout(() => {
        dispatch(paymentofflineActions.paymentHistoryData(userName.soldTo[0], startIndex, endIndex, filterDataValue, defaultCat, startdateFinalTransDate, enddateFinalTransDate));
      }, 2000);
}




const refresPendingData= () => {
    dispatch(paymentofflineActions.paymentHistoryData(userName.soldTo[0], startIndex, endIndex, filterDataValue, defaultCat, startdateFinalTransDate, enddateFinalTransDate));
}

const handleClose = () => {
    setOpen(false);
};
const handleOpen = (id) => {
    setOpen(true);
    setPopupId(id)
};

console.log(paymentHistory, 'paymentHistory44444')
const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

    return (
        <>
            <div className="content-wrapper">
                <Header title={t("Payment History")} />

                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">

                        <div className="col-12">
                            <div className="payment-history card">
                                <PaymentHeader onChangeSearch= {onChangeSearchHistory}
                                  fromDateTransDate={fromDateTransDate} toDateTransDate={toDateTransDate}
                                  pleaseSelectTransDate={pleaseSelectTransDate}
                                     handleEvent ={handleEvent} handleChangeCat={handleChangeCat} paymentHisDateChange= {handleCallbackTransactionDate}
                                    heading={t("label.payment_history")}
                                />
                                {
                                    paymentHistory && paymentHistory ?
                                    <PaymentHistoryTable paymentHistory={paymentHistory} open={open} handleChangePage= {handleChangePage} page={page} deleteData={deleteData} refresPendingData={refresPendingData}handleClose={handleClose}handleOpen={handleOpen}/> :
                                    <div className="loading"> <Loading /></div>
                                }
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(PaymentHistory);
