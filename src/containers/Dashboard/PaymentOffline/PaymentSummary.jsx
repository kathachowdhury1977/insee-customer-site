import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import  { useHistory } from 'react-router-dom'
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from "../../../components/Header/Header";
import "./Payment.scss"
import InvoiceDebitCreditBoxes from "../../../components/InvoiceDebitCreditBoxes/InvoiceDebitCreditBoxes";
import { Link, useLocation } from "react-router-dom";
import FormSelectbox from "../../../components/FormSelectbox/FormSelectbox";
import FormInput from "../../../components/FormInput/FormInput";
import MakePaymentBox from "../../../components/MakePaymentBox/MakePaymentBox";
import TotalPaymentBox from "../../../components/TotalPaymentBox/TotalPaymentBox";
import { paymentofflineActions } from "../../../_actions/paymentoffline.action";
import MakeTable from "../../../components/Table/MakeTable";
import PaymentSummaryConfirmPopup from "../../../components/ModalPopup/PaymentSummaryConfirmPopup";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "moment-timezone";
import Loading from "../../../components/Loader/Loading";
const THBText = require('thai-baht-text')
function PaymentSummary(props) {
    const event = useSelector(state => state);
    const paymentModeDropdown = useSelector((state) => state.getpaymentmode);
    const paymentTypeDropdown = useSelector((state) => state.getpaymenttype);
    const paymentBankDropdown = useSelector((state) => state.getpaymentbank);
    const makePaymentDataFinal = useSelector((state) => state.makePaymentData.makePaymentData);
    const totalMakePayment = useSelector((state) => state.totalMakePaymentData.totalMakePaymentData);
    const totalCount = useSelector((state) => state.totalMakePaymentData.totalCount);
    const [open, setOpen] = useState(false)
    let history = useHistory();

    const [paymentid, setPaymentId] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [isCheckedData, setIsCheckedData] = useState([]);
    const [c_payment_mode, setCpaymentMode] = useState('');
    const [c_payment_type, setPaymenttype] = useState('');
    const [c_bank_name, setBankName] = useState('');

    const [c_payment_date, setPaymentDate] = useState(moment().format('YYYY-MM-DD'));
      
    const[errors,setError]=useState({});
    const[bankDisable,setBankDisable]=useState(false);
    const[loading,setLoading]=useState(false);
    const[loadingOne,setLoadingOne]=useState(false);
    const confirmPaymentNo = useSelector((state) => state.confirmPaymentButton.confirmPaymentButton);
    const confirmPaymentError = useSelector((state) => state.confirmPaymentButton);
    const checkedInvoiveData = useSelector((state) => state.totalCheckedPandingData.totalCheckedPandingData);
    const paymentrefnoconfirm = confirmPaymentNo && confirmPaymentNo.paymentrefno
    const getPendingPaymentStatusData = useSelector(state => state.getPendingPaymentStatus.getPendingPaymentStatus)
    const confirmPaymentButtonOnlineDataURL = useSelector(state => state.confirmPaymentButtonOnline.confirmPaymentButtonOnline)

    console.log(confirmPaymentButtonOnlineDataURL, 'confirmPaymentButtonOnlineDataURL')
    
    const getselectedPaymentData = useSelector((state) => state.totalCheckedData.totalCheckedData);
    let custmerNo = localStorage.getItem('CustomerNumber');
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const getPaymentCat = useSelector((state) => state.getCatForFilter.getCatForFilter);
    const defaultCat = getPaymentCat && getPaymentCat ? getPaymentCat && getPaymentCat : "Cement"

    const totalMakePaymentValue = parseFloat(totalMakePayment).toFixed(2)
    const selectedLangCode = localStorage.getItem('lancode');
    const customerName = localStorage.getItem('CustomerName')
    const customerNameTh = localStorage.getItem('CustomerNameTh')
console.log(confirmPaymentError, 'confirmPaymentNo')
    useEffect(() => {
        dispatch(paymentofflineActions.getPaymentMode());
    }, []);

    useEffect(() => {debugger
        dispatch(paymentofflineActions.getPaymentType(c_payment_mode));
    }, [c_payment_mode]);

    useEffect(() => {
        dispatch(paymentofflineActions.getPaymentBank());
    }, []);

    const handleClose = () => {
        setOpen (false)
    }

  


    useEffect(() => {
        if(isChecked != []){
          dispatch(paymentofflineActions.totalCheckedData(getselectedPaymentData));
        }
      }, [isCheckedData])

    useEffect(() => {
        if(confirmPaymentButtonOnlineDataURL && confirmPaymentButtonOnlineDataURL != undefined && confirmPaymentButtonOnlineDataURL && confirmPaymentButtonOnlineDataURL != null)
        window.location.href = confirmPaymentButtonOnlineDataURL && confirmPaymentButtonOnlineDataURL.url
    }, [confirmPaymentButtonOnlineDataURL])

  

    const handleCheckPaymentSummary = (e, row, payment, type) => {
        getselectedPaymentData.indexOf(row) !== -1 && getselectedPaymentData.splice(getselectedPaymentData.indexOf(row), 1)
        let totalAmt = parseFloat(totalMakePayment) - parseFloat(payment);
        let count = parseInt(totalCount) - 1;
        dispatch(paymentofflineActions.totalMakePaymentData(totalAmt, count));
     
    }


    const paymentModeData = paymentModeDropdown.getpaymentmode
        ? paymentModeDropdown.getpaymentmode.map((element) => {
            console.log(element, 'index')
            return {
                id: element.paymentmode,
                name: element.paymentmode === "Online" || element.paymentmode === "online" ? "ออนไลน์ (การชำระเงินโดยการหักบัญชีผ่านอินเตอร์เน็ต) - Online" : 
                element.paymentmode === "Offline" || element.paymentmode === "offline" ? "ออฟไลน์ (การชำระเงินโดยใบนำฝากพิเศษ) - Offline" : element.paymentmode
                ,
            };
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];

    const paymentTypeData = paymentTypeDropdown.getpaymenttype
        ? paymentTypeDropdown.getpaymenttype.map((element) => {
            return {
                id: element.paymenttype,
                name: element.paymenttypeInTh,
            };
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];


    const paymentBankData = paymentBankDropdown.getpaymentbank
        ? paymentBankDropdown.getpaymentbank.map((element) => {
            return {
                id: element.bankname,
                name: element.bankNameInTh,
            };
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];


        function onChangeHandle(event, name) {
            switch(name)
            {
              case "payment_mode":
                setCpaymentMode(event);
                setPaymenttype('');
                if(event === "Offline" || event === "offline"){
                    setBankDisable(true)
                    
                }
                else {
                    setBankDisable(false)
                }
                break;
              case "payment_type":
                setPaymenttype(event);
                break;
                case "bank_name":
                setBankName(event);  
                break;
                case "payment_date":
                    setPaymentDate(event);  
                break;
            
            }
          }


  

    const confirmPayment = (e) => { debugger
        e.preventDefault();
        if(totalCount === 0){
            toast.error(t("No Invoice is Selected"), {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            return;
          }
          else if (totalMakePayment <= 0) {
            toast.error(t("Total Amount can not be negative"), {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            return
          }
        if(c_payment_mode=='')
        {
          setError({"payment_mode":t("Please Select Payment Mode")})
          ////errors["expected_arrival_date"] = "Cannot be empty";
        }else if(c_payment_type===''){
          setError({"payment_type":t("Please select Payment type")})
        }
        
        else if(c_bank_name==''){
            if (c_payment_mode === "Offline" || c_payment_mode === "offline" ) {
                if(c_payment_date==='') {
                    setError({"payment_date":t("Please enter payment date")})   
                }
                else {
                    var invoiceId = []
                for(var i=0; i< getPendingPaymentStatusData.length; i++){
                    var dataId = getPendingPaymentStatusData[i].id
                    invoiceId.push(dataId)
                }
                const data = {
                    
                    "customerName": customerNameTh,
                    "division": defaultCat,
                    "invoiceId": getselectedPaymentData,
                    // "docCurrency": getPendingPaymentStatusData && getPendingPaymentStatusData ? getPendingPaymentStatusData && getPendingPaymentStatusData[0].docCurrency : '',
                    "paymentamount": String(totalMakePaymentValue),
                    "paymentbank": c_bank_name,
                    "paymentmode": c_payment_mode,

                    "paymentstatus": "active",
                    "paymentamountwords" : THBText(String(totalMakePaymentValue)),
                    "paymenttype": c_payment_type,
                    "soldtoNumber": localStorage.getItem("CustomerNumber"),
                    "transationdate": c_payment_date
                  }
                dispatch(paymentofflineActions.confirmPaymentButton(data));
                setOpen(true) 
                }
                
            }
            else {
                setError({"bank_name": t("Please Select Bank Name")})
            }
         
        }else if(c_payment_date===''){
          setError({"payment_date": t("Please enter payment date")})
        }
        else {
            var invoiceId = []
            for(var i=0; i< getPendingPaymentStatusData.length; i++){
                var dataId = getPendingPaymentStatusData[i].id
                invoiceId.push(dataId)
            }
            const data = {
                "customerName": customerNameTh,
                "division": defaultCat,
                "invoiceId": getselectedPaymentData,
                // "docCurrency": getPendingPaymentStatusData && getPendingPaymentStatusData ? getPendingPaymentStatusData && getPendingPaymentStatusData[0].docCurrency : '',
                "paymentamount": String(totalMakePaymentValue),
                "paymentbank": c_bank_name,
                "paymentmode": c_payment_mode,
                "paymentamountwords" : THBText(String(totalMakePaymentValue)),
                "paymentstatus": "active",
                "paymenttype": c_payment_type,
                "soldtoNumber": localStorage.getItem("CustomerNumber"),
                "transationdate": c_payment_date
              }
            dispatch(paymentofflineActions.confirmPaymentButton(data));
            setOpen(true)
        }
       
    }

    const confirmOnlinePayment = (e) => { debugger
        
        e.preventDefault();
        if(totalCount === 0){
            toast.error(t("No Invoice is Selected"), {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            return;
          }
          else if (totalMakePayment <= 0) {
            toast.error(t("Total Amount can not be negative"), {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            return
          }
        if(c_payment_mode=='')
        {
          setError({"payment_mode":t("Please Select Payment Mode")})
          ////errors["expected_arrival_date"] = "Cannot be empty";
        }else if(c_payment_type===''){
          setError({"payment_type":t("Please select Payment type")})
        }
        
        else if(c_bank_name==''){
            if (c_payment_mode === "Offline" || c_payment_mode === "offline" ) {
                if(c_payment_date==='') {
                    setError({"payment_date":t("Please enter payment date")})   
                }
                else {
                    setLoadingOne(true)
                    var invoiceId = []
                for(var i=0; i< getPendingPaymentStatusData.length; i++){
                    var dataId = getPendingPaymentStatusData[i].id
                    invoiceId.push(dataId)
                }
                const data = {
                    
                    "customerName": customerNameTh,
                    "division": defaultCat,
                    "invoiceId": getselectedPaymentData,
                    // "docCurrency": getPendingPaymentStatusData && getPendingPaymentStatusData ? getPendingPaymentStatusData && getPendingPaymentStatusData[0].docCurrency : '',
                    "paymentamount": String(totalMakePaymentValue),
                    "paymentbank": c_bank_name,
                    "paymentmode": c_payment_mode,

                    "paymentstatus": "active",
                    "paymentamountwords" : THBText(String(totalMakePaymentValue)),
                    "paymenttype": c_payment_type,
                    "soldtoNumber": localStorage.getItem("CustomerNumber"),
                    "transationdate": c_payment_date
                  }
                
                dispatch(paymentofflineActions.confirmPaymentButtonOnline(data));
                // setTimeout(() => {
                //     // window.location.href = confirmPaymentButtonOnlineDataURL && confirmPaymentButtonOnlineDataURL.url;
                //     //history.push(confirmPaymentButtonOnlineDataURL && confirmPaymentButtonOnlineDataURL.url)
                   
                //   }, 2000);
                }
                
            }
            else {
                setError({"bank_name": t("Please Select Bank Name")})
            }
         
        }else if(c_payment_date===''){
          setError({"payment_date": t("Please enter payment date")})
        }
        else {
            var invoiceId = []
            for(var i=0; i< getPendingPaymentStatusData.length; i++){
                var dataId = getPendingPaymentStatusData[i].id
                invoiceId.push(dataId)
            }
            const data = {
                "customerName": customerNameTh,
                "division": defaultCat,
                "invoiceId": getselectedPaymentData,
                // "docCurrency": getPendingPaymentStatusData && getPendingPaymentStatusData ? getPendingPaymentStatusData && getPendingPaymentStatusData[0].docCurrency : '',
                "paymentamount": String(totalMakePaymentValue),
                "paymentbank": c_bank_name,
                "paymentmode": c_payment_mode,
                "paymentamountwords" : THBText(String(totalMakePaymentValue)),
                "paymentstatus": "active",
                "paymenttype": c_payment_type,
                "soldtoNumber": localStorage.getItem("CustomerNumber"),
                "transationdate": c_payment_date
              }
            dispatch(paymentofflineActions.confirmPaymentButtonOnline(data));
            // setTimeout(() => {
            //     window.location.href = confirmPaymentButtonOnlineDataURL && confirmPaymentButtonOnlineDataURL.url;
            //     // history.push(confirmPaymentButtonOnlineDataURL && confirmPaymentButtonOnlineDataURL.url)
            //   }, 2000);
            
        }
        setTimeout(() => {
            setLoadingOne(false)
          }, 2000)
        
    }

    console.log(c_bank_name, 'c_bank_name789')

    const  decimalwithcoma = (num) => 
    {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    }

    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
 
 
    return (
        <>
            <div className="content-wrapper">
                <Header title= {t("label.payment_summary")} />

                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">


                        <div className="payment-summary col-12">
                            <div className="row">
                                <div className="col-12 mb-2 mt-2">
                                    <p className="bigHeading">{t("label.payment_summary")}</p>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                                            
                                            <MakeTable 
                                            decimalwithcoma={decimalwithcoma}
                                             docCurrencyData={ getselectedPaymentData != undefined &&
                                                 getselectedPaymentData && getselectedPaymentData.length > 0  ? getselectedPaymentData && getselectedPaymentData[0].docCurrency : ''}
                                            makePaymentDataFinal={getselectedPaymentData && getselectedPaymentData} checkPaymentSummary={handleCheckPaymentSummary} 
                                            totalPayment={totalMakePayment && totalMakePayment}
                                            totalChecked={totalCount && totalCount}
                                            checkedValue={checkedInvoiveData}
                                            loading={loading}/>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="">
                                                <div className="col-12 mb-5">
                                                    <TotalPaymentBox  decimalwithcoma={decimalwithcoma}  docCurrencyData={getselectedPaymentData && getselectedPaymentData.length > 0 ? getselectedPaymentData && getselectedPaymentData[0].docCurrency : ''} totalMakePayment={totalMakePayment}/>
                                                </div>
                                                <div className="col-12 pb-5">
                                                    <div className="form_section p-0">
                                                        <div className="row">
                                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                                <div className="inputBox">
                                                                    <label>{t("label.paymentmode")}</label>

                                                        

                                                                    <FormSelectbox
                                                                        name={"payment_mode"}
                                                                        class={"input"}
                                                                        onSelectChange={onChangeHandle}
                                                                        label={t("Select")}
                                                                        data={paymentModeData}
                                                                    />
                                                                    {errors && errors['payment_mode']?<span style={{color: "red"}}>{errors['payment_mode']}</span>:''}
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                                <div className="inputBox">
                                                                    <label>{t("label.paymenttype")}</label>
                                                                    <FormSelectbox
                                                                        name={"payment_type"}
                                                                        class={"input"}
                                                                        onSelectChange={onChangeHandle}
                                                                        label={t("Select")}
                                                                        data={paymentTypeData}
                                                                    />
                                                                    {errors && errors['payment_type']?<span style={{color: "red"}}>{errors['payment_type']}</span>:''}
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                                <div className="inputBox">
                                                                    <label>{t("label.bankname")}</label>
                                                                    <FormSelectbox
                                                                        disabledValue={bankDisable}
                                                                        name={"bank_name"}
                                                                        class={"input"}
                                                                        onSelectChange={onChangeHandle}
                                                                        label={t("Select")}
                                                                        data={paymentBankData}
                                                                    />
                                                                    {errors && errors['bank_name']?<span style={{color: "red"}}>{errors['bank_name']}</span>:''}
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                                                <div className="inputBox">
                                                                    <label>{t("label.payment_date")}</label>
                                                                    <FormInput
                                                                        type={"date"}
                                                                        required="required"
                                                                        class={"input"}
                                                                        value={c_payment_date}
                                                                        name={"payment_date"}
                                                                        onChange={onChangeHandle}
                                                                        label={t("eventname.label")}
                                                                        min={new Date().toISOString().split('T')[0]}
                                                                        />
                                                                        {errors && errors['payment_date']?<span style={{color: "red"}}>{errors['payment_date']}</span>:''}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-12 p-0 mt-5"></div>
                                                <div className="col-12 p-0 mt-5"></div> 
                                                <div className="col-12 p-0 mt-5"></div>
                                                <div className="col-12 p-0 mt-5"></div> */}
                                                {
                                                    loadingOne && loadingOne ? 
                                                    <div style={{ textAlign: 'center', paddingTop: '0', paddingBottom:'10px' }}>
                                                    <Loading />
                                                  </div> : ''
                                                }
                                                <div className="col-12 mt-0">
                                                    <MakePaymentBox
                                                        label={t("payment.confirm_pay")}
                                                        navigateurl="/"
                                                        totalPayment = {totalMakePayment && totalMakePayment}
                                                        totalChecked = {totalCount && totalCount}
                                                        onClick={c_payment_mode === "Online" ? confirmOnlinePayment : confirmPayment}
                                                        docCurrencyData={getselectedPaymentData && getselectedPaymentData.length > 0 ? getselectedPaymentData && getselectedPaymentData[0].docCurrency : ''}
                                                    />

                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            
                <PaymentSummaryConfirmPopup
                open={open && paymentrefnoconfirm}

                done={t("pickupform.yes")}
                paymentrefno={paymentrefnoconfirm}
                paymentDate={c_payment_date}
               handleClose={handleClose}
              />
                
                

            </div>
        </>
    );
}

export default withTranslation()(PaymentSummary);
