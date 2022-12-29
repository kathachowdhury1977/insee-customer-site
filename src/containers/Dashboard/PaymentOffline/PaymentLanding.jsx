import React, { useEffect, useState } from "react";
import { paymentofflineActions } from "../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Header from "../../../components/Header/Header";
import AccountInfoHeader from "../../../components/AccountInfoHeader/AccountInfoHeader";
import "./Payment.scss";
import RadioButtonPaymentGroup from "../../../components/RadioButtonGroup/RadioButtonPaymentGroup";
import { Link } from "react-router-dom";
import PaymentDetailBox from "../../../components/PaymentDetailBox/PaymentDetailBox";
import OutstandingAmount from "../../../components/OutstandingAmount/OutstandingAmount";
import InvoiceBoxes from "../../../components/InvoiceBoxes/InvoiceBoxes";
import PaymentGraph from "../../../components/PaymentGraph/PaymentGraph";
import MakePaymentBox from "../../../components/MakePaymentBox/MakePaymentBox";
import moment from "moment";
import "moment-timezone";
import Loading from '../../../components/Loader/Loading'
function PaymentLanding(props) {
  const getavailablity = useSelector((state) => state.getavailablity);
  const getsapaging = useSelector((state) => state.getsapaging);
  const { t } = useTranslation();
  
  const dispatch = useDispatch();
  const todayDat = new Date();
  const [tab, setTab] = useState("ACCOUNT");
  let userName = localStorage.getItem('userData');
  const [loading, setLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  userName = JSON.parse(userName);

 const soldToNo = userName.soldTo[0]
 const getPaymentCat = useSelector((state) => state.getCatForFilter.getCatForFilter);
 const chartFilterData = useSelector((state) => state.getPaymentOfflineChartData.getPaymentOfflineChartData);
  let onlyDateGet = todayDat.getFullYear() + '-' + ('0' + (todayDat.getMonth()+1)).slice(-2) + '-' + ('0' + todayDat.getDate()).slice(-2);
  const paymentCategory = getPaymentCat ? getPaymentCat : 'Cement'
    useEffect(()=> {
      setLoading(true)
      setLoadingOne(true)
      dispatch(
          paymentofflineActions.getAvailablity({
            grahpType: "current",
            graphcurrentdate: onlyDateGet,
            openKeyDate: onlyDateGet,
            soldtomuber: soldToNo,
            type: paymentCategory, 
            fromdate: "", 
            todate: "",
            
          })
        );
        dispatch(
          paymentofflineActions.getSapAging(soldToNo, paymentCategory)
        );

        dispatch(
           paymentofflineActions.loadcacheData(soldToNo)
        );
        setTimeout(() => {
          setLoading(false)
        }, 4000)
        setTimeout(() => {
          setLoadingOne(false)
        }, 2000)
  }, [getPaymentCat])



  const handleChangeCat = (event) => {
    setLoading(true)
    localStorage.setItem('paymentCatName', event.target.value)
  dispatch(
      paymentofflineActions.getCatForFilter(event.target.value)
    );
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }


  function handlechange(key) {
    if (key === 1) {
      setTab("AGING");
    }
    if (key === 0) {
      setTab("ACCOUNT");
    }
  }

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

  return (
    <>
      <div className="content-wrapper">
        <Header title={t("payment.pay_btn")} />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
          

            <div className="col-12">
              <div className="payment-container card p-0">
                <RadioButtonPaymentGroup handleChangeCat={handleChangeCat}/>

                <div className="">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="offlineTab">
                      <Tabs defaultActiveKey={0} onSelect={handlechange}>
                        <TabList>
                          <Tab style={{fontSize:`${HeadingFontChange}px`}}> <i class="fa fa-calculator" aria-hidden="true"></i> {t("payment.tab_accounts")}</Tab>
                          {/* <Tab><i class="fa fa-clock-o" aria-hidden="true"></i> {t("payment.tab_aging")}</Tab> */}
                        </TabList>
                        <TabPanel>
                          <div className="row mb-5">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <PaymentDetailBox
                              loading= {loading}
                                getavailablity={
                                  getavailablity.getavailablity
                                    ? getavailablity.getavailablity
                                    :  []
                                }

                              />
                            </div>
                            {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <PaymentGraph
                                graph={getavailablity.getavailablity
                                  ? getavailablity.getavailablity.graph
                                  : []}
                              />
                            </div> */}
                         
                           
                          </div>
                          <div className="row">
                            <div className="col-12 mb-4">
                              <Link className="create_btn mb-3" to="/Payment" style={{fontSize:`${SmallFontChanger}px`}}>
                                {" "}
                                {t("payment.pay_btn")}
                              </Link>
                              {
                                 userName.countryCode === "VN" || userName.countryCode === "LK" ? '' :
                                 <Link
                                 className="create_btn mb-3"
                                 to="/PaymentHistory"
                                 style={{fontSize:`${SmallFontChanger}px`}}
                               >
                                 {" "}
                                 {t("payment.pay_history_btn")}
                               </Link>

                              }
                             
                              {/* {
                               userName.countryCode === "VN" ? 
                              <Link
                                className="create_btn mb-3"
                                to="/IncentivePayment"
                              >
                                {" "}
                                {t("Incentive payment")}
                              </Link> 
                              : ''
                                } */}
                             
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>
                        {
                              loadingOne ? <div className="loading"> <Loading /></div> : 
                          <div className="row  mb-5">

                           
                            
                            <div className="payment-detail-box">
                              <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                <div className="row bottom-line pb-0 bg-gray">
                                  <div className="col-sm-4 col-md-4 col-lg-4 pt-3 pb-3">
                                    <p className="textLight"> <strong>{t("OUTSTANDING AMOUNT")}</strong></p>
                                  </div>

                                </div>
                              </div>
                              <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                <div className="row row-cols-5 bottom-line pb-2 pt-2">
                                  <div className="col">
                                    <p className="textLight">{t("1-30DAYS")}</p>
                                    <p className="textDark"><strong>{getsapaging.getsapaging && getsapaging.getsapaging.below30Amount}</strong></p>
                                  </div>
                                  <div className="col">
                                    <p className="textLight">{t("31-45DAYS")}</p>
                                    <p className="textDark"><strong>{getsapaging.getsapaging && getsapaging.getsapaging.below30to45Amount}</strong></p>
                                  </div>

                                  <div className="col">
                                    <p className="textLight">{t("46-60DAYS")}</p>
                                    <p className="textDark"><strong>{getsapaging.getsapaging && getsapaging.getsapaging.below45to60Amount}</strong></p>
                                  </div>
                                  <div className="col">
                                    <p className="textLight">{t("61-90DAYS")}</p>
                                    <p className="textDark"><strong>{getsapaging.getsapaging && getsapaging.getsapaging.below60to90Amount}</strong></p>
                                  </div>
                                  <div className="col">
                                    <p className="textLight">{t("MORE THAN 90 DAYS")}</p>
                                    <p className="textDark"><strong>{getsapaging.getsapaging && getsapaging.getsapaging.above90Amount}</strong></p>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="paymentInfo">
                                        <p>{t("Payment information is prior to last 2 days")}</p>
                                    </div>

                                  </div>
                                </div>

                              </div>


                            </div>
                            
                            <div className="payment_sec">
                              <div className="payment_header">
                                <div className="row">
                                  <div className="col-sm-6 col-md-6 col-lg-6">
                                    <strong><h6>{t("1-30DAYS")} ({getsapaging.getsapaging && getsapaging.getsapaging.below30Amount})</h6></strong>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                   {/* <p>Invoices After : <span className="text-red">06/12/2020</span></p> */}
                                  </div>
                                </div>
                              </div>

                              <div className="payment-detail-box mt-0">
                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  <div className="row row-cols-5 bottom-line pb-0 bg-gray">
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document No.")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document Date")}</strong></p>
                                    </div>
                                    {/* <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Ship-To Name")}</strong></p>
                                    </div> */}
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Numbers of Due Days")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Amount")}({getsapaging.getsapaging && getsapaging.getsapaging.doccurrency})</strong></p>
                                    </div>

                                  </div>
                                </div>

                                {getsapaging.getsapaging && getsapaging.getsapaging.below30.length > 0 ? getsapaging.getsapaging && getsapaging.getsapaging.below30.map((below30item) => {
                                  return (
                                    <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                      <div className="row row-cols-5 bottom-line pb-2 pt-2">
                                        <div className="col">
                                          <p className="textDark">{below30item.invoiceDoc}</p>
                                        </div>
                                        <div className="col">
                                          <p className="textDark">{moment(below30item.documentDate).format('DD-MM-YYYY')} </p>
                                        </div>

                                        {/* <div className="col">
                                          <p className="textDark">{(below30item.customerCode).replace(/^0+/, '')}</p>
                                        </div> */}
                                        <div className="col overdueDays">
                                          <p className="textDark">{below30item.overdueDays}</p>
                                        </div>
                                        <div className="col right-align">
                                          <p className="textDark">{below30item.amountDocCurrency}</p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                                  :  <p className="noBankFound">{t('Data not available')}</p>
                                }
                              </div>
                            </div>


                            <div className="payment_sec">
                              <div className="payment_header">
                                <div className="row">
                                  <div className="col-sm-6 col-md-6 col-lg-6">
                                    <strong><h6> {t("31-45DAYS")} ({getsapaging.getsapaging && getsapaging.getsapaging.below30to45Amount})</h6></strong>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                   {/* <p>Invoices After : <span className="text-red">06/12/2020</span></p> */}
                                  </div>
                                </div>
                              </div>

                              <div className="payment-detail-box mt-0">


                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  <div className="row row-cols-5 bottom-line pb-0 bg-gray">
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document No.")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document Date")}</strong></p>
                                    </div>
                                    {/* <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Ship-To Name")}</strong></p>
                                    </div> */}
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Numbers of Due Days")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Amount")}({getsapaging.getsapaging && getsapaging.getsapaging.doccurrency})</strong></p>
                                    </div>
                                  </div>
                                </div>


                                
                                    <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                      {
                                        getsapaging.getsapaging && getsapaging.getsapaging.below30to45.length > 0 ? getsapaging.getsapaging && getsapaging.getsapaging.below30to45.map((below30to45) => {
                                          return (
                                            <div className="row row-cols-5 bottom-line pb-2 pt-2">
                                           <div className="col">
                                              <p className="textDark">{below30to45.invoiceDoc}</p>
                                            </div>
                                            <div className="col">
                                              <p className="textDark">{moment(below30to45.documentDate).format('DD-MM-YYYY')} </p>
                                            </div>

                                            {/* <div className="col">
                                              <p className="textDark">{(below30to45.customerCode).replace(/^0+/, '')}</p>
                                            </div> */}
                                            <div className="col overdueDays">
                                              <p className="textDark">{below30to45.overdueDays}</p>
                                            </div>
                                            <div className="col right-align">
                                              <p className="textDark">{below30to45.amountDocCurrency}</p>
                                            </div>
                                          </div>
                                          )
                                        }) : <p className="noBankFound">{t('Data not available')}</p>
                                      }
                                    

                                    </div>

                                 
                              </div>
                            </div>

                            <div className="payment_sec">
                              <div className="payment_header">
                                <div className="row">
                                  <div className="col-sm-6 col-md-6 col-lg-6">
                                    <strong><h6> {t("46-60DAYS")} ({getsapaging.getsapaging && getsapaging.getsapaging.below45to60Amount})</h6></strong>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                   {/* <p>Invoices After : <span className="text-red">06/12/2020</span></p> */}
                                  </div>
                                </div>
                              </div>

                              <div className="payment-detail-box mt-0">
                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  <div className="row row-cols-5 bottom-line pb-0 bg-gray">
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document No.")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document Date")}</strong></p>
                                    </div>
                                    {/* <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Ship-To Name")}</strong></p>
                                    </div> */}
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Numbers of Due Days")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Amount")}({getsapaging.getsapaging && getsapaging.getsapaging.doccurrency})</strong></p>
                                    </div>

                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  
                                    {
                                      getsapaging.getsapaging && getsapaging.getsapaging.below45to60.length  ? getsapaging.getsapaging && getsapaging.getsapaging.below45to60.map((below45to60) => {
                                        return (
                                          <div className="row row-cols-5 bottom-line pb-2 pt-2">
                                            <div className="col">
                                              <p className="textDark">{below45to60.invoiceDoc}</p>
                                            </div>
                                            <div className="col">
                                              <p className="textDark">{moment(below45to60.documentDate).format('DD-MM-YYYY')} </p>
                                            </div>

                                            {/* <div className="col">
                                              <p className="textDark">{(below45to60.customerCode).replace(/^0+/, '')}</p>
                                            </div> */}
                                            <div className="col overdueDays">
                                              <p className="textDark">{below45to60.overdueDays}</p>
                                            </div>
                                            <div className="col right-align">
                                              <p className="textDark">{below45to60.amountDocCurrency}</p>
                                            </div>  
                                          </div>
                                        )
                                      }) : <p className="noBankFound">{t('Data not available')}</p>
                                    }
                                    
                                  </div>


                                
                              </div>
                            </div>


                            <div className="payment_sec">
                              <div className="payment_header">
                                <div className="row">
                                  <div className="col-sm-6 col-md-6 col-lg-6">
                                    <strong><h6>{t("61-90DAYS")} ({getsapaging.getsapaging && getsapaging.getsapaging.below60to90Amount})</h6></strong>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                   {/* <p>Invoices After : <span className="text-red">06/12/2020</span></p> */}
                                  </div>
                                </div>
                              </div>

                              <div className="payment-detail-box mt-0">
                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  <div className="row row-cols-5 bottom-line pb-0 bg-gray">
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document No.")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document Date")}</strong></p>
                                    </div>
                                    {/* <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Ship-To Name")}</strong></p>
                                    </div> */}
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Numbers of Due Days")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Amount")}({getsapaging.getsapaging && getsapaging.getsapaging.doccurrency})</strong></p>
                                    </div>

                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  {
                                    getsapaging.getsapaging && getsapaging.getsapaging.below60to90.length > 0 ? getsapaging.getsapaging && getsapaging.getsapaging.below60to90.map((below60to90) => {
                                      return (
                                        <div className="row row-cols-5 bottom-line pb-2 pt-2">
                                        <div className="col">
                                          <p className="textDark">{below60to90.invoiceDoc}</p>
                                        </div>
                                        <div className="col">
                                          <p className="textDark">{moment(below60to90.documentDate).format('DD-MM-YYYY')} </p>
                                        </div>

                                        {/* <div className="col">
                                          <p className="textDark">{(below60to90.customerCode).replace(/^0+/, '')}</p>
                                        </div> */}
                                        <div className="col overdueDays">
                                          <p className="textDark">{below60to90.overdueDays}</p>
                                        </div>
                                        <div className="col right-align">
                                          <p className="textDark">{below60to90.amountDocCurrency}</p>
                                        </div>  
                                      </div>
                                      )
                                    }) : <p className="noBankFound">{t('Data not available')}</p>
                                  }
                                  

                                </div>

                                
                              </div>
                            </div>

                            <div className="payment_sec">
                              <div className="payment_header">
                                <div className="row">
                                  <div className="col-sm-6 col-md-6 col-lg-6">
                                    <strong><h6> {t("MORE THAN 90 DAYS")}({getsapaging.getsapaging && getsapaging.getsapaging.above90Amount})</h6></strong>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                  </div>
                                </div>
                              </div>

                              <div className="payment-detail-box mt-0">
                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  <div className="row row-cols-5 bottom-line pb-0 bg-gray">
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document No.")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Document Date")}</strong></p>
                                    </div>
                                    {/* <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Ship-To Name")}</strong></p>
                                    </div> */}
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Numbers of Due Days")}</strong></p>
                                    </div>
                                    <div className="col pt-3 pb-3">
                                      <p className="textLight"> <strong>{t("Amount")}({getsapaging.getsapaging && getsapaging.getsapaging.doccurrency})</strong></p>
                                    </div>

                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12 p-0">
                                  {
                                    getsapaging.getsapaging && getsapaging.getsapaging.above90.length > 0 ? getsapaging.getsapaging && getsapaging.getsapaging.above90.map((above90)=> {
                                      return (
                                        <div className="row row-cols-5 bottom-line pb-2 pt-2">
                                        <div className="col">
                                          <p className="textDark">{above90.invoiceDoc}</p>
                                        </div>
                                        <div className="col">
                                          <p className="textDark">{moment(above90.documentDate).format('DD-MM-YYYY')} </p>
                                        </div>

                                        {/* <div className="col">
                                          <p className="textDark">{(above90.customerCode).replace(/^0+/, '')}</p>
                                        </div> */}
                                        <div className="col overdueDays">
                                          <p className="textDark">{above90.overdueDays}</p>
                                        </div>
                                        <div className="col right-align">
                                          <p className="textDark">{above90.amountDocCurrency}</p>
                                        </div>  
                                      </div>
                                      )
                                    }) :<p className="noBankFound">{t('Data not available')}</p>
                                  }
                                  

                                </div>

                               
                              </div>
                            </div>
                         
                          </div>
                          }
                        
                     
                          <MakePaymentBox
                            label={t("payment.make_pay")}
                            navigateurl="/Payment"
                            totalPayment={"0"}
                            totalChecked={"0"}
                            tab = {tab}
                          />
                          
                        
                          
                        </TabPanel>
                      </Tabs>
                    </div>
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

export default withTranslation()(PaymentLanding);
