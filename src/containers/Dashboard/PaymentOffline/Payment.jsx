import React, { useEffect, useState } from "react";
import { paymentofflineActions, masterActions } from "../../../_actions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../../../components/Header/Header";
import "./Payment.scss";
import PaymentHeader from "../../../components/PaymentHeader/PaymentHeader";
import PaymentChildTabs from "../../../components/Tabs/PaymentChildTab";
import MakePaymentBox from "../../../components/MakePaymentBox/MakePaymentBox";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "moment-timezone";
function Payment(props) {
  const [tab, setTab] = useState("INV");
  let history = useHistory();

  const getpendingpay = useSelector((state) => state.getpendingpay);

  const getselectedPaymentData = useSelector(
    (state) => state.totalCheckedData.totalCheckedData
  );

  const getsapaging = useSelector((state) => state.getsapaging);
  const paymentsummaryList = useSelector((state) => state.paymentsummaryupdate);
  const pamentTypeCat = useSelector(
    (state) => state.offlinegetPaymentStatus.offlinegetPaymentStatus
  );
  useEffect(() => {
    dispatch(paymentofflineActions.PaymentSummaryUpdate());
  }, []);

  console.log(pamentTypeCat, "pamentTypeCat789");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [totalamt, setTotalAmt] = useState(0);

  const [totalcount, setTotalCount] = useState(0);
  const [paymentid, setPaymentId] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [isCheckedData, setIsCheckedData] = useState([]);
  const [finalArray, setFinalArray] = useState([]);

  const [paymentDocDate, setPaymentDocDate] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [filterData, setFilterData] = useState("");
  var addPaymentTable = useSelector(
    (state) => state.paymentStatus.paymentStatus
  );
  const [paymentData, setPaymentData] = useState([]);
  let custmerNo = localStorage.getItem("CustomerNumber");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [page, setPage] = React.useState(1);
  const getpendingpaydata =
    getpendingpay.getpendingpay && getpendingpay.getpendingpay;
  const getPendingPaymentStatusData = useSelector(
    (state) => state.getPendingPaymentStatus.getPendingPaymentStatus
  );

  const getPandingDataResult =
    getpendingpay.getpendingpay && getpendingpay.getpendingpay.results;
  const getPaymentCat = useSelector(
    (state) => state.getCatForFilter.getCatForFilter
  );

  const defaultCat =
    getPaymentCat && getPaymentCat ? getPaymentCat && getPaymentCat : "Cement";
  let startIndex = getpendingpaydata && getpendingpaydata.startIndex;
  let endIndex = getpendingpaydata && getpendingpaydata.endIndex;

  var filterDataValue;
  const [filterDataValueData, setFilterDataValueData] = React.useState([]);
  const [pleaseSelect, setPleaseSelect] = useState("DD-MM-YYYY");
  const [pleaseSelectDue, setPleaseSelectDue] = useState("DD-MM-YYYY");
  const [startdateFinal, setStartdateFinal] = React.useState(moment().subtract(3, 'months').format('YYYY-MM-DD'));
  const [enddateFinal, setEnddateFinal] = React.useState(moment().format('YYYY-MM-DD'));
  const [docType, setDocType] = React.useState("due");

  const [startDuedateFinal, setStartDuedateFinal] = React.useState("");
  const [endDuedateFinal, setEndDuedateFinal] = React.useState("");
  const [duedocType, setDueDocType] = React.useState("");

  const [fromDueDate, setFromDueDate] = useState('');
  const [toDateDue, setToDateDue] = useState('');

  const [fromDueDateSetteld, setFromDueDateSetteld] = useState(moment().subtract(3, 'months').format('YYYY-MM-DD'));
  const [toDateDueSetteld, setToDateDueSettled] = useState(moment().format('YYYY-MM-DD'));
  const [dateDisable, setDateDisable] = React.useState(false);
  const [sortDocumentDateFilter, setSortDocumentDateFilter] = React.useState(false);
  const [sortDueDateFilter, setSortDueDateFilter] = React.useState(false);
  const [dateDueDisable, setDateDueDisable] = React.useState(false);
  const [noOfDueDaysFilter, setNoOfDueDaysFilter] = React.useState(false);

  const [ischeckedSoi, setIscheckedSoi] = useState([]);
  const [objArray, setObjArray] = useState([]);

  var totalAmt = 0;
  var count = 0;
  var totalSummaryAmount = 0;
  var mainCheck = [];
  var obj = {};

 

  // useEffect(() => {
  //   dispatch(paymentofflineActions.getPendingPayment("pendingnew",  1, 10, custmerNo, defaultCat, '', '', '', ''));

  // }, [])

  useEffect(() => {
    if (addPaymentTable != undefined) {
      setPaymentData([...paymentData, addPaymentTable]);
    }
  }, [addPaymentTable]);

  useEffect(() => {
    if (isChecked != []) {
      dispatch(paymentofflineActions.totalCheckedPandingData(isChecked));
      dispatch(paymentofflineActions.totalCheckedData(isCheckedData));
    }
  }, [isChecked, isCheckedData]);

  const handleChangePage = async (event, value) => {
    await dispatch(masterActions.paginationValue(value));
    if (value === 1) {
      startIndex = 1;
      endIndex = 10;
    } else {
      startIndex = (value - 1) * 10 + 1;
      endIndex = value * 10;
    }
    setPage(value);
    dispatch(
      paymentofflineActions.getPendingPayment(
        "pendingnew",
        startIndex,
        endIndex,
        custmerNo,
        defaultCat,
        filterDataValueData,
        startDuedateFinal ? startDuedateFinal : "",
        endDuedateFinal ? endDuedateFinal : "",
        docType ? docType : "",
        sortDueDateFilter ? sortDueDateFilter === true ? 'asc' : 'desc' : '',
        sortDocumentDateFilter ? sortDocumentDateFilter === true ? 'asc' : 'desc': '',
        noOfDueDaysFilter ? noOfDueDaysFilter === true ? 'asc' : 'desc': ''
      )
    );
  };

  const handleChangePageSattled = async (event, value) => {
    await dispatch(masterActions.paginationValue(value));
    if (value === 1) {
      startIndex = 1;
      endIndex = 10;
    } else {
      startIndex = (value - 1) * 10 + 1;
      endIndex = value * 10;
    }
    setPage(value);
    dispatch(
      paymentofflineActions.getSettledPayment(
        "setllednew",
        pamentTypeCat,
        startIndex,
        endIndex,
        custmerNo,
        defaultCat,
        filterDataValue,
        startdateFinal ? startdateFinal : "",
        enddateFinal ? enddateFinal : "",
        duedocType ? duedocType : ""
      )
    );
  };

  const refresPendingData = () => {
    dispatch(
      paymentofflineActions.getPendingPayment(
        "pendingnew",
        startIndex,
        endIndex,
        custmerNo,
        defaultCat,
        filterDataValueData,
        startDuedateFinal ? startDuedateFinal : "",
        endDuedateFinal ? endDuedateFinal : "",
        duedocType ? duedocType : "",
        sortDueDateFilter ? sortDueDateFilter === true ? 'asc' : 'desc' : '',
        sortDocumentDateFilter ? sortDocumentDateFilter === true ? 'asc' : 'desc': '',
        noOfDueDaysFilter ? noOfDueDaysFilter === true ? 'asc' : 'desc': ''
      )
    );
  };

  const removeData = (arrayData, invoiceDoc) => {
    for (var t = 0; t < arrayData.length; t++) {
      if (arrayData[t].invoiceDoc === invoiceDoc) {
        return t;
      }
    }
  };



  const handleSelectAll = (e, row, payment) => {
    var chaeckedvalidation = document.getElementById(e.target.id).checked;
    setPaymentId([...paymentid, e.target.id]);
    localStorage.setItem("paymentid", JSON.stringify(paymentid));
    if (chaeckedvalidation == true) {
      if (ischeckedSoi.length === 0) {
        setIscheckedSoi([...ischeckedSoi, e.target.id]);
      } else if (!ischeckedSoi.includes(e.target.id)) {
        setIscheckedSoi([...ischeckedSoi, e.target.id]);
      }

      for (let i = 0; i < row.summary.length; i++) {
        mainCheck.push(row.summary[i]);
        isCheckedData.push(row.summary[i]);
        isChecked.push(row.summary[i].invoiceDoc);
        totalSummaryAmount =
          parseFloat(totalSummaryAmount) +
          parseFloat(row.summary[i].amountDocCurrency);
        totalAmt = totalSummaryAmount + totalamt;
        setTotalAmt(totalAmt);
      }
      const soiData = objArray.find((x) => x.soiNumber === e.target.id);
      if (soiData != undefined && soiData != null) {
        soiData.value = mainCheck;
        mainCheck = [];
      } else {
        obj["soiNumber"] = e.target.id;
        obj["value"] = mainCheck;
        setObjArray([...objArray, obj]);
        mainCheck = [];
      }

      count = parseInt(totalcount) + row.summary.length;
      dispatch(
        paymentofflineActions.totalMakePaymentData(parseFloat(totalAmt), count)
      );
      setTotalAmt(totalAmt);
      setTotalCount(count);
    } else {
      const soiDataMainValue = objArray.find(
        (x) => x.soiNumber === e.target.id
      );
      if (soiDataMainValue != null && soiDataMainValue != undefined) {
        count = parseInt(totalcount) - soiDataMainValue.value.length;
        soiDataMainValue.value = [];
      }
      ischeckedSoi.splice(ischeckedSoi.indexOf(e.target.id), 1);
      for (let i = 0; i < row.summary.length; i++) {
        if (isChecked.indexOf(row.summary[i].invoiceDoc) !== -1) {
          isCheckedData.splice(
            removeData(isCheckedData, row.summary[i].invoiceDoc),
            1
          );
          // isCheckedData.splice(isCheckedData.indexOf(row.summary[i]), 1)
          isChecked.splice(isChecked.indexOf(row.summary[i].invoiceDoc), 1);
          totalSummaryAmount =
            parseFloat(totalSummaryAmount) +
            parseFloat(row.summary[i].amountDocCurrency);
          totalAmt = totalamt - totalSummaryAmount;
          setTotalAmt(totalAmt);
        }
      }

      dispatch(
        paymentofflineActions.totalMakePaymentData(parseFloat(totalAmt), count)
      );
      setTotalAmt(totalAmt);
      setTotalCount(count);
    }
  };


  const handleCheckPayment = async (e, row, payment, soiNumber, index) => {

    var chaeckedvalidation = document.getElementById(e.target.id).checked;
    setPaymentId([...paymentid, e.target.id]);
    localStorage.setItem("paymentid", JSON.stringify(paymentid));
    if (chaeckedvalidation == true) {
      if (ischeckedSoi.length === 0) {
        setIscheckedSoi([...ischeckedSoi, soiNumber]);
      } else if (!ischeckedSoi.includes(soiNumber)) {
        setIscheckedSoi([...ischeckedSoi, soiNumber]);
      }

      setIsCheckedData([...isCheckedData, row]);

      setIsChecked([...isChecked, e.target.id]);

      totalAmt = parseFloat(totalamt) + parseFloat(payment);
      count = parseInt(totalcount) + 1;
      dispatch(
        paymentofflineActions.totalMakePaymentData(parseFloat(totalAmt), count)
      );
      setTotalAmt(totalAmt);
      setTotalCount(count);
      if (soiNumber != null) {
        const soiDataMain = objArray.find((x) => x.soiNumber === soiNumber);
        if (soiDataMain != undefined && soiDataMain != null) {
          soiDataMain.value.push(row);
        } else {
          mainCheck.push(row);
          obj["soiNumber"] = soiNumber;
          obj["value"] = mainCheck;
          objArray.push(obj);

          mainCheck = [];
        }
      }
    } else {
      isChecked.indexOf(e.target.id) !== -1 &&
        isChecked.splice(isChecked.indexOf(e.target.id), 1);
      isCheckedData.splice(removeData(isCheckedData, row.invoiceDoc), 1);
      totalAmt = parseFloat(totalamt) - parseFloat(payment);
      count = parseInt(totalcount) - 1;
      dispatch(
        paymentofflineActions.totalMakePaymentData(parseFloat(totalAmt), count)
      );
      setTotalAmt(totalAmt);
      setTotalCount(count);
      const soiDataMain = objArray.find((x) => x.soiNumber === soiNumber);
      if (
        soiDataMain != null &&
        soiDataMain.value != null &&
        soiDataMain.value.length > 0
      ) {
        soiDataMain.value.splice(soiDataMain.value.indexOf(row), 1);
        if (soiDataMain.value.length === 0) {
          ischeckedSoi.splice(ischeckedSoi.indexOf(soiNumber), 1);
          // ischeckedSoi.indexOf(soiNumber) !== -1 && ischeckedSoi.splice(ischeckedSoi.indexOf(soiNumber), 1)
        }
      } else if (soiDataMain != null && soiDataMain.value.length === 0) {
        isChecked.indexOf(e.target.id) !== -1 &&
          ischeckedSoi.splice(ischeckedSoi.indexOf(soiNumber), 1);
        // ischeckedSoi.indexOf(soiNumber) !== -1 && ischeckedSoi.splice(ischeckedSoi.indexOf(soiNumber), 1)
      }
  
    }
  };

  const makePayment = () => {
    if (totalcount === 0) {
      toast.error(t("No Invoice is Selected"), {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (totalamt <= 0) {
      toast.error(t("Total Amount can not be negative"), {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      history.push("/PaymentSummary");
      dispatch(paymentofflineActions.makePaymentData(paymentData));
    }
  };

  

  const onChangeSearch = (e) => {
    dispatch(paymentofflineActions.serachValue(e));
    var searchText = e;

    setFilterData(searchText);
  };

  const handleDateChange = (event, name) => {
    if (name === "doc_date") {
      setPaymentDocDate(event);
    } else {
      setPaymentDueDate(event);
    }
  };

  const handleEvent = (event, picker) => {
    console.log(picker.startDate, "dateEvent");
  };

  useEffect(() => {
    filterDataValue = [
      { search: filterData },
      { docdate: paymentDocDate },
      { duedate: paymentDueDate },
    ];
    if (pamentTypeCat === "Receipt") {
      dispatch(
        paymentofflineActions.getSettledPayment(
          "setllednew",
          pamentTypeCat,
          1,
          10,
          custmerNo,
          defaultCat,
          filterDataValue,
          startdateFinal ? startdateFinal : "",
          enddateFinal ? enddateFinal : "",
          docType ? docType : ""
        )
      );
    }
    else if(pamentTypeCat === "In-Progress" || pamentTypeCat === "Processing"){
      dispatch(
        paymentofflineActions.getSettledPayment(
          "setllednew",
          pamentTypeCat,
          1,
          10,
          custmerNo,
          defaultCat,
          filterDataValue,
          startDuedateFinal ? startDuedateFinal : "",
          endDuedateFinal ? endDuedateFinal : "",
          duedocType ? duedocType : ""
        )
      );
    } else {
      dispatch(
        paymentofflineActions.getPendingPayment(
          "pendingnew",
          1,
          10,
          custmerNo,
          defaultCat,
          filterDataValue,
          startDuedateFinal ? startDuedateFinal : "",
          endDuedateFinal ? endDuedateFinal : "",
          duedocType ? duedocType : "",
          sortDueDateFilter ? sortDueDateFilter === true ? 'asc' : 'desc' : '',
          sortDocumentDateFilter ? sortDocumentDateFilter === true ? 'asc' : 'desc': '',
          noOfDueDaysFilter ? noOfDueDaysFilter === true ? 'asc' : 'desc': ''
        )
      );
    }
   
  }, [filterData, paymentDocDate, paymentDueDate, pamentTypeCat,startdateFinal, enddateFinal, docType,startDuedateFinal, endDuedateFinal, duedocType, sortDueDateFilter, sortDocumentDateFilter, noOfDueDaysFilter]);



  
 

  const handleCallback = (start, end, label) => {
    setDateDueDisable(true);
    var startDateBefore = moment(start._d);
    var startdatebeforeDate = startDateBefore.subtract(1, "days");
    var endDateAfter = moment(end._d);
    var enddateAfterDate = endDateAfter.add(1, "days");
   
    if(pamentTypeCat === "Receipt") {
      setEnddateFinal(enddateAfterDate.format("YYYY-MM-DD"));
      setStartdateFinal(startdatebeforeDate.format("YYYY-MM-DD"));
    }else {
      setStartDuedateFinal(startdatebeforeDate.format("YYYY-MM-DD"))
      setEndDuedateFinal(enddateAfterDate.format("YYYY-MM-DD"))
    }
    
   
  
  
    setDueDocType("doc");
    var startDate = start._d;
    var endDate = end._d;
    const fromStartDate =
      startDate.getFullYear() +
      "-" +
      ("0" + (startDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + startDate.getDate()).slice(-2);
    const fromEndDate =
      endDate.getFullYear() +
      "-" +
      ("0" + (endDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + endDate.getDate()).slice(-2);
    setPleaseSelect(fromStartDate);
    setFromDate(fromStartDate);
    setToDate(fromEndDate);
  };

 



  const handleCallbackDueDate = (start, end, label) => {
    setDateDisable(true);
    var startDateBefore = moment(start._d);
    var startdatebeforeDate = startDateBefore.subtract(1, "days");
    var endDateAfter = moment(end._d);
    var enddateAfterDate = endDateAfter.add(1, "days");
    if(pamentTypeCat === "Receipt") {
      setEnddateFinal(enddateAfterDate.format("YYYY-MM-DD"));
      setStartdateFinal(startdatebeforeDate.format("YYYY-MM-DD"));
    }else {
      setStartDuedateFinal(startdatebeforeDate.format("YYYY-MM-DD"))
      setEndDuedateFinal(enddateAfterDate.format("YYYY-MM-DD"))
    }
   
  
    setDueDocType("due");
    var startDate = start._d;
    var endDate = end._d;
    const fromStartDate =
      startDate.getFullYear() +
      "-" +
      ("0" + (startDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + startDate.getDate()).slice(-2);
    const fromEndDate =
      endDate.getFullYear() +
      "-" +
      ("0" + (endDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + endDate.getDate()).slice(-2);
    setPleaseSelectDue(fromStartDate);
    setFromDueDate(fromStartDate);
    setToDateDue(fromEndDate);
    setFromDueDateSetteld(fromStartDate)
    setToDateDueSettled(fromEndDate)
  };

  const sortDocumentDate = () => {debugger
    setSortDocumentDateFilter(!sortDocumentDateFilter)
    setSortDueDateFilter('')
    setSortDueDateFilter('')
  }

  const sortDueDate = () => {
    setSortDueDateFilter(!sortDueDateFilter)
    setSortDocumentDateFilter('')
    setSortDueDateFilter('')
  }

  const sortNoOfDueDate = () => {
    setNoOfDueDaysFilter(!noOfDueDaysFilter)
    setSortDocumentDateFilter('')
    setSortDueDateFilter('')
  }
  console.log(startdateFinal, enddateFinal, 'Ram789')
  console.log(sortDocumentDateFilter,sortDueDateFilter, 'sortDocumentDateFilter');
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

  return (
    <>
      <div className="content-wrapper">
        <Header />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="col-12">
              <div className="payment-container card">
                <PaymentHeader
                  heading={t("Payment")}
                  onChangeSearch={onChangeSearch}
                  handleDateChange={handleDateChange}
                  handleEvent={handleEvent}
                  handleCallback={handleCallback}
                  pleaseSelect={pleaseSelect}
                  handleCallbackDueDate={handleCallbackDueDate}
                  fromDate={fromDate}
                  toDate={toDate}
                  pleaseSelectDue={pleaseSelectDue}
                  fromDueDate={fromDueDate}
                  toDateDue={toDateDue}
                  dateDisable={dateDisable}
                  dateDueDisable={dateDueDisable}
                  pamentTypeCat={pamentTypeCat}
                  fromDueDateSetteld={fromDueDateSetteld}
                  toDateDueSetteld={toDateDueSetteld}
                />
                
                <Tabs>
                  <TabPanel>
                    <PaymentChildTabs
                      handleCheck={handleCheckPayment}
                      handleCheckAll={handleSelectAll}
                      totalPayment={totalamt}
                      totalChecked={totalcount}
                      checkedValue={isChecked}
                      ischeckedSoiValue={ischeckedSoi}
                      getpendingpaydata={getpendingpaydata}
                      handleChangePage={handleChangePage}
                      handleChangePageSattled={handleChangePageSattled}
                      refresPendingData={refresPendingData}
                      page={page}
                      sortDocumentDate={sortDocumentDate}
                      sortDueDate={sortDueDate}
                      sortNoOfDueDate={sortNoOfDueDate}
                    />
                    
                    {pamentTypeCat === "Receipt" ||
                    pamentTypeCat === "In-Progress" ||
                    pamentTypeCat === "Processing" ? (
                      ""
                    ) : (
                      <div className="makePaymentFooter">
                      <div className="col-12 mt-5">
                       
                        <MakePaymentBox
                          label={t("payment.make_pay")}
                          onClick={makePayment}
                          totalPayment={totalamt}
                          totalChecked={totalcount}
                          docCurrencyData={
                            getpendingpaydata &&
                            getpendingpaydata.results.length > 0
                              ? getpendingpaydata.results[0].docCurrency
                              : ""
                          }
                        />
                        </div>
                      </div>
                    )}
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(Payment);
