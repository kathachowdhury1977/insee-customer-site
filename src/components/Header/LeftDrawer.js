import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navmenu from '../Navmenu/Navmenu'
import { withTranslation, useTranslation } from 'react-i18next'
import SweetAlert from 'react-bootstrap-sweetalert'
import MainLogo from '../../assets/img/logo.png'
import CreatePlanImg from '../../assets/img/createplan.png'
import bottomLogo from '../../assets/img/bottom_logo.png'
import doc from '../../assets/img/doc.jpeg';
import { useDispatch, useSelector } from 'react-redux'

import TermPdf from '../../assets/pdf/term-con.pdf'
const btnSTyle = {
  background: '#f64028',
  color: '#fff',
  border: 'none',
  padding: '3%',
  'border-radius': '10px',
  margin: '10px',
}

function LeftDrawer(props) {
  const { t } = useTranslation()
  let history = useHistory()
  const [openmodal, setOpenmodal] = useState(false);
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const userRole = JSON.parse(localStorage.userData).userRole;
  const reportDropdown = [
    {
      label_src: '/Report',
      label_name: 'Report',
    },
    {
      label_src: '/Report-Dashboard',
      label_name: 'Report Dashboard',
    },
    {
      label_src: '/Agent-Performance',
      label_name: 'Agent Performance',
    },
  ]

  function onCreate(event) {
    history.push('/NextMonthPlan')
    setOpenmodal(false)
  }
  function onConfirm(event) {
    console.log("'''")
  }
  function openModal(event) {
    setOpenmodal(event)
    console.log(event, ':::::::')
    console.log("'''")
  }
  function onClose() {
    setOpenmodal(false)
  }

  const handleClick = () => {
    console.log('hello')
  }
  const termAndCond = (
    <a
      href={TermPdf}
      target='_blank'
      label={t('nav.termcondition')}
      onClick={handleClick}
    ></a>
  )



  let PlaceOrder = `<img src=${MainLogo}`
  return (
    <>
      <aside className={"main-sidebar  " + props.style}>
        <div className="main_logo">
          <img src={MainLogo} />
        </div>
        {userRole === "Retailer" ? (
          <section className="sidebar">
            <ul className="sidebar-menu" data-widget="tree">
              {((userName && userName.loyality === "Active") ||
              (userName && userName.loyality === null)) && process.env.REACT_APP_ENV !== "production" ? (
                <Navmenu
                  classmain={""}
                  src={"/subdealerloyalty"}
                  faIcon={"fa fa-home"}
                  label={t("nav.loyaltypoints")}
                />
              ) : (
                ""
              )}
            </ul>
          </section>
        ) : (
          <section className="sidebar">
            <ul className="sidebar-menu" data-widget="tree">
              {
                 userName && userName.performanceRole === "Active" ? 
                 <Navmenu
                classmain={""}
                src={"/Dashboard"}
                faIcon={"fa fa-home"}
                label={t("Home")}
              />
              : ""
              }
              
              {userName && userName.orderAndDeliverRole === "Active" ? (
                <>
                  <Navmenu
                    classmain={""}
                    src={"/PlaceOrder"}
                    faIcon={"fa fa-myOrder"}
                    label={t("Place Order")}
                  />

                  <Navmenu
                    classmain={""}
                    src={"/MyOrder"}
                    faIcon={"fa fa-place"}
                    label={t("nav.myorders")}
                  />
                  <Navmenu
                    classmain={""}
                    src={"/ShipmentManagement"}
                    faIcon={"fa fa-createShipment"}
                    label={t("Create Shipments")}
                  />
                  <Navmenu
                    classmain={""}
                    src={"/MyShipments"}
                    faIcon={"fa fa-myShipment"}
                    label={t("My Shipments")}
                  />
                </>
              ) : (
                ""
              )}

              {/* 

          <Navmenu
              classmain={" "}
              src={"/"}
              faIcon={"fa fa-home"}
              label={t("Case Report")}
              label_class="show-dropdowns"
              show_dropdown={reportDropdown}
            /> */}
              {userName && userName.paymentOfflineAndOnlineRole === "Active" ? (
                <Navmenu
                  classmain={""}
                  src={"/PaymentLanding"}
                  faIcon={"fa fa-paymentOffline"}
                  // label={t('nav.paymentoffline')}
                  label={t("Payment")}
                />
              ) : (
                ""
              )}

              {
                userName && userName.performanceRole === "Active" ? 
                <Navmenu
                classmain={""}
                src={"/CustomerProfile"}
                faIcon={"fa fa-viewProfile"}
                // label={t('nav.customerprofile')}
                label={t("My Profile")}
              />
              : ""
              }
             
              {
                userName && userName.performanceRole === "Active" ? 
                <Navmenu
                classmain={""}
                src={"/VehicleManagement"}
                faIcon={"fa fa-VehicleManagement"}
                label={t("Vehicle Management")}
              /> :
               ""
              }
              
              {((userName && userName.loyality === "Active") ||
              (userName && userName.loyality === null) ) && process.env.REACT_APP_ENV !== "production" ? (
                <Navmenu
                  classmain={""}
                  src={
                    userName.soldTo[0].startsWith("011")
                      ? "/loyaltypoints"
                      : "/SubDealerLoyalty"
                  }
                  faIcon={"fa fa-LoyaltyPoints"}
                  label={t("nav.loyaltypoints")}
                />
              ) : (
                ""
              )}
              {userName && userName.performanceRole === "Active" ? (
                <Navmenu
                  classmain={""}
                  src={"/ReportManagement"}
                  faIcon={"fa fa-ReportManagement"}
                  label={t("reports.lable")}
                />
              ) : (
                ""
              )}

              {/* <Navmenu
              classmain={""}
              src={"/CustomerPerformance"}
              faIcon={"fa fa-home"}
              label={t("label.performance")}
            /> */}
            </ul>
            <div className="bottom_left-logo">
              <img src={bottomLogo} height="17px" />
            </div>
            <ul className="sidebar-menu mt-2">
              <li
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 18,
                }}
              >
                <img src={doc} height="25px" />
                <a href={TermPdf} target="_blank">
                  {/* {t('nav.termcondition')} */}
                  {t("Terms & Condition")}
                </a>
              </li>
              {/* <Navmenu
              classmain={""}
              src={TermPdf}
              blank={"_blank"}
              faIcon={"fa fa-home"}
              label={t("nav.termcondition")}
            /> */}
            </ul>
          </section>
        )}
      </aside>
      {openmodal ? (
        <SweetAlert
          openAnim={{ name: "showSweetAlert", duration: 2000 }}
          closeAnim={{ name: "hideSweetAlert", duration: 2000 }}
          className="sweet_popup"
          customButtons={
            <React.Fragment>
              <span onClick={onClose}>
                <i class="fa fa-times" aria-hidden="true"></i>
              </span>
              <h6>
                <b>Choose step to create next month plan </b>
              </h6>
              <button>
                <img src={CreatePlanImg} /> {t("copylastmonthplan.button")}
              </button>
              <button onClick={onCreate}>
                {" "}
                <img src={CreatePlanImg} /> {t("createnextmonthplan.button")}
              </button>
            </React.Fragment>
          }
        />
      ) : null}
    </>
  );
}
export default withTranslation()(LeftDrawer)
