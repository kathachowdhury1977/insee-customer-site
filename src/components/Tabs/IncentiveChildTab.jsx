import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IncentiveChargeBox from '../IncentiveChargeBox/IncentiveChargeBox';
import "./PaymentChildTabs.scss"
import RedBox from "../RedBox/RedBox";
import OrangeOutlineBox from "../OrangeOutlineBox/OrangeOutlineBox";
import IncentivePayment from '../../components/RadioButtonGroup/IncentivePayment'
import OffInvoiceCharge from '../Table/OffInvoiceTable'

const IncentiveChildTab = (props) => {
    return (
        <div className="col-12 p-0">
        <div className="row">
        <div className="col-md-8">
        <IncentivePayment
        
        />
        
        </div>
         
         
         </div>
         {
             <OffInvoiceCharge />
         }
          {/* {isPaymentTableDisplayed ? props.getpendingpaydata != undefined  ? <PaymentTable handleChangePage={props.handleChangePage} page={props.page}
             Pending={props.getpendingpaydata} isChecked={props.checkedValue} ischeckedSoiValue={props.ischeckedSoiValue} handleCheckPayment ={props.handleCheck} handleCheckAllPayment={props.handleCheckAll}/> : <div className="loading"> <Loading /></div>
         : getSettledPaymentTable ? <SattledTable handleChangePageSattled={props.handleChangePageSattled} page={props.page} getSettledPaymentTable={getSettledPaymentTable} />:<div className="loading"> <Loading /></div>} */}

                    <div className="row mr-3 mt-5">
                            <div className="col-sm-4 col-md-4 col-lg-4 p-0">
                                <OrangeOutlineBox
                                    heading="Total payment amount"
                                    total_amt="vnd 50400000"
                                />
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4 p-0">
                                <OrangeOutlineBox
                                    heading="Total order qty"
                                    total_amt="1271000"
                                />
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4 p-0">
                                <OrangeOutlineBox
                                    heading="Total remaining amount"
                                    total_amt="1176000"
                                />
                            </div>
                            
                        </div>
                     </div>
      
   
    )
}




export default IncentiveChildTab;