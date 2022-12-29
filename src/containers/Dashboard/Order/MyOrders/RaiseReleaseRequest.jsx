import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import { orderActions } from '../../../../_actions'
import './MyOrders.scss'
import { Checkbox, FormControl, FormControlLabel, FormLabel, ListItem, Radio, RadioGroup } from "@material-ui/core";
import FormInput from "../../../../components/FormInput/FormInput";
import PlusIcon from '../../../../assets/img/plusIcon.png'
import MinusIcon from '../../../../assets/img/minusIcon.png'
import Loading from '../../../../components/Loader/Loading'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
  
    loadingOne: {
        textAlign: 'center',
        margin: '5px 0'
    },

});
function RaiseReleaseRequest(props) {
    let history = useHistory()
    const classes = useStyles();
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [inputList, setInputList] = useState([{ paymentAmount: 0, paymentDate: "" }]);

    const [upload, setUpload] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [paymentPlan, setPaymentPlan] = React.useState(true);

    const customerId = localStorage.getItem('CustomerNumber')

    const orderdetailsdata =
    props.location.state.orderdetails && props.location.state.orderdetails

    const handleChange = (event) => {
        setChecked(!checked);
    };

   

    const handleChangeInputText = (e) => {
        setNotes(e)

    }
    console.log(notes, 'Notest')

    const uploadBankSlip = (e) => { 
        setUpload(e.target.files[0])
    }


      // handle input change
  const handleInputChange = (e, index) => {   
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);;
  };



  console.log(inputList, 'inputList')

     // handle click event of the Remove button
  const handleRemoveClick = index => { 
    const list = [...inputList];
    list.splice(list.indexOf(index), 1)
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { paymentAmount: 0, paymentDate: "" }]);
  };



  const totalAmountForSummary = (totalSummaryAmount, currentValue) => {
    return Number(
      parseFloat(totalSummaryAmount) +
        parseFloat(currentValue.paymentAmount)
    ).toFixed(2);
  };





  const decimalwithcoma = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  var paymentValue = inputList && inputList.find((payment) => payment.paymentAmount)

  console.log(paymentValue && paymentValue.paymentAmount,'paymentValue')

  const poNumber = orderdetailsdata && orderdetailsdata.header1.ponumber;
  const soNumber = orderdetailsdata && orderdetailsdata.header1.salesOrderNumber

  const raiseReleaseRequestVNReq= () => { 
    setLoading(true)
    var data = {
        "customerId":customerId,
        "note": notes ? notes : '',
        "paymentPlanFlag":paymentPlan,
        "poNumber":poNumber ? poNumber : '',
        "soNumber": soNumber ? soNumber : '',
        "totalPaymentPlanAmount":inputList.reduce(totalAmountForSummary, 0),
        "paymentPlans": inputList
        }

      dispatch(orderActions.raiseReleaseRequestVN(data, upload))
     
       setTimeout(()=>{
        setLoading(false)
    },1500);

    setTimeout(()=>{
         history.push("/MyOrder");
    },2000);
  }

  const cancelRaiseRequest = () => {
    history.push("/MyOrder");
  }

  const handlerPayment = (e) => {
    var targetValue = e.target.value
    var targetValueFilter = targetValue === 'paymentPlan' ? true : false
    setPaymentPlan(targetValueFilter)
  }

  console.log(paymentPlan, 'paymentPlan')

   

    return (
        <>
            <div className="content-wrapper">
                <Header />

                <div className="row">
                    <div className="mainScroll">
                        <div className="myorders-container col-12 mt-2">
                            <div className="card mt-0">
                                <div className="row">
                                    <div className="col-12">
                                    
                                        <p className="myorder-heading">{t("releaseraiserequest.button")}</p>
                                    </div>
                                    
                                    <FormControl component="fieldset" className="ml-0 col-12">
                                        <RadioGroup className="col-12 m-0" row aria-label="position" name="position" defaultValue={paymentPlan === true ? 'paymentPlan' : ''}>
                                            <div className="col-12">
                                            <div className="row">
                                                <div className="col-12">
                                                    {
                                                        loading ? <div className={classes.loadingOne}> <Loading /> </div> : ''
                                                    }
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 mr-5">
                                                    <FormControlLabel
                                                        value="paymentPlan"
                                                        control={<Radio color="primary" />}
                                                        label={t("paymentplan.label")}
                                                        onChange={handlerPayment}  

                                                    />
                                                </div> 
                                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                                <FormControlLabel
                                                    value="noPaymentPlan"
                                                    control={<Radio color="primary" />}
                                                    label={t("nopaymentplan.label")}
                                                    onChange={handlerPayment}  

                                                />
                                                </div>
                                                </div>
                                            </div>
                                           
                                           
                                        </RadioGroup>
                                    </FormControl>
                                    {
                                        paymentPlan === true ? 
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 mr-5">
                                    
                                       
                                        <div className="form_section ml-3">
                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ml-4">
                                                    <Checkbox
                                                        checked
                                                        onChange={handleChange}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    /><b>{t("bankslip.label")}</b>
                                                    <div className="upload_document ml-2">
                                                        {/* <label for="file-upload" class="custom-file-upload">
                                                            <i class="fa fa-cloud-upload"></i> {t("uploadimage&document.label")}
                                                        </label> */}
                                                        <input id="file-upload" type="file" onChange={uploadBankSlip}/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ml-4 mt-4">
                                                    <Checkbox
                                                        checked
                                                        onChange={handleChange}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    /><b>{t("planforpayment.label")}</b>
                                                </div>
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ml-4">
                                                    <div className="row planForPayment p-3 m-1 pt-0">
                                                        <div className="paymentBox">
                                                        {inputList.map((x, i) => {
                                                        return (
                                                        <div className="boxPayment">
                                                             <div className="col-12">
                                                             
                                                             <div className="inputBox mb-0 mt-1">
                                                                 <label>{t("paymentamount.label")}</label>
                                                                 <input
                                                                     type={"number"}
                                                                     class={"input"}
                                                                     name={"paymentAmount"}
                                                                     onChange={e => handleInputChange(e,i)}
                                                                     label={t("Amount")}
                                                                 />
                                                             </div>
                                                         </div>
                                                         <div className="col-12">
                                                             <div className="inputBox">
                                                                 <label>{t("paymentdate.label")}</label>
                                                                 <input
                                                                     type={"date"}
                                                                     class={"input"}
                                                                     name={"paymentDate"}
                                                                     onChange={e => handleInputChange(e,i)}
                                                                     label={t("eventname.label")}
                                                                 />
                                                             </div>
                                                         </div>
                                                            
                                                         <div className="btn-box addRemoveBtn">
                                                            {inputList.length > 1 && <button
                                                                className="mr10 iconButton"
                                                                onClick={() => handleRemoveClick(i)}>
                                                                    <img src={MinusIcon} />    
                                                                </button>}
                                                            {inputList.length - 1 === i && 
                                                            <button onClick={handleAddClick} className="iconButton">
                                                                    <img src={PlusIcon} />
                                                            </button>}
                                                            </div>
                                                           
                                                        </div>
                                                        );
                                                    })}

                                                        <div className="totalPayment">
                                                            <div className="col-12">
                                                                <div className="totalPaymentInner">
                                                                    <div className="totalPaymentBox">
                                                                        <h2>{t("Total Payment Plan Amount")}</h2>
                                                                        <h4>
                                                                            {
                                                                         
                                                                            decimalwithcoma(
                                                                                inputList.reduce(totalAmountForSummary, 0)
                                                                              ) 
                                                                            } VND</h4>
                                                                    </div>
                                                                
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                       
                                                        </div>
                                                       
                                                    </div>
                                                </div>

                                               
                                            </div>

                                        </div>
                                    </div> : 
                                         <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                                      
                                         <div className="form_section ml-3">
                                             <div className="row">
                                                 <div className="col-12">
                                                     <div className="inputBox">
                                                         <label>{t("note.label")}</label>
                                                         <FormInput
                                                             type={"text"}
                                                             class={"input"}
                                                             name={"note"}
                                                             onChange={handleChangeInputText}
                                                             label={t("Enter Text")}
                                                         />
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                    }
                                     <div className="col-12">
                                        <button className="cancel_btn" onClick={cancelRaiseRequest}>
                                            {t("cancel.button")}
                                        </button>
                                        <button className="create_btn" onClick={raiseReleaseRequestVNReq}>
                                            {t("submit.button")}
                                            
                                        </button>
                                        
                                        
                                    </div>
                                   
                                    
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(RaiseReleaseRequest);
