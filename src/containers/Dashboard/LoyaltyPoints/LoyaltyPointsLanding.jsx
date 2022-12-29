import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {  masterActions } from '../../../_actions'
import Header from "../../../components/Header/Header";
import RedCardDealer from "../../../components/RedCardDealer/RedCardDealer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./LoyaltyPoints.scss";
import MyPointsTabContent from "../../../components/MyPointsTabContent/MyPointsTabContent";
import AllocateVolumeTabContent from "../../../components/AllocateVolumeTabContent/AllocateVolumeTabContent";
import AllocateHistoryTabContent from "../../../components/AllocateHistoryTabContent/AllocateHistoryTabContent";
//import { process.env.REACT_APP_API_URL_LOYALTY } from "../../../constant";

function toParams(obj) {
  let params = [];
  for (let [k, v] of Object.entries(obj))
    params.push(String(k) + "=" + String(v));
  return "?" + params.join("&");
}

function LoyaltyPointsLanding() {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userRole = JSON.parse(localStorage.userData).userRole
  const selectedLangCode = localStorage.getItem('lancode');

  const [data, setData] = React.useState({
    // points: 178,
    // expiry: { points: 500000000.0, date: "22-12-2020" },
    // credit: { points: 500000000.0, date: "22-12-2020" },
    // customerId: "840984040398",
    // customerName: "Gaurav S Arora",
  });

 const firstName = JSON.parse(localStorage.userData).firstName

  useEffect(() => {
    let customerId = localStorage.CustomerNumber,
      isDealer = userRole === 'Retailer' ? false : true,
      countryCode = JSON.parse(localStorage.userData).countryCode || "TH";
    fetch(
      process.env.REACT_APP_API_URL_LOYALTY +
      "myPoints" +
      toParams({
        customerId,
        isDealer,
        countryCode,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
        },
      }
    )
      .then((resp) => resp.json())
      // .then(resp=>{
      //   alert(JSON.stringify(resp))
      //   if (resp)
      //     return resp;
      // })
      .then(
        ({
          data: {
            customerId,
            customerName,
            totalPoints,
            expiryPoints,
            expiryDate,
            lastCreditedPoints,
            lastCreditedDate,
            customerNameInlocal
          },
        }) =>
          setData({
            points: totalPoints,
            expiry: { points: expiryPoints, date: expiryDate },
            credit: { points: lastCreditedPoints, date: lastCreditedDate },
            customerId,
            customerName,
            customerNameInlocal
          })
      )
      .catch(console.log);
  }, []);





  console.log(data, '1235874')
 
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

  return (
    <>
      <div className="content-wrapper">
        <Header title="Loyalty Points" />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="loyaltypoints-container mt-2">
              <h1 style={{fontSize: `${HeadingFontChange}px`}}>{t("label.insee_points")} </h1>
              <RedCardDealer
                customerId={data && data.customerId && data.customerId.replace(/^0+/, '')}
                customerName={firstName && data && userRole === 'Retailer' ? firstName : 
                selectedLangCode === 'en' || selectedLangCode === null || selectedLangCode === undefined ? 
                data.customerName : data.customerNameInlocal
              
              }
                totalPoints ={data && parseFloat(data.points).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            { userRole === 'Retailer' ? <MyPointsTabContent userData={data && data} /> :
              <Tabs>
                <TabList>
                  <Tab style={{fontSize: `${FontChange}px`}}>{t("label.my_points")}</Tab>
                  <Tab style={{fontSize: `${FontChange}px`}}>{t("label.allocate_volume")}</Tab>
                  <Tab style={{fontSize: `${FontChange}px`}}>{t("label.allocation_history")}</Tab>
                </TabList>

                <TabPanel>
                  <MyPointsTabContent  userData={data && data} />
                </TabPanel>
                <TabPanel>
                  <AllocateVolumeTabContent />
                </TabPanel>
                <TabPanel>
                  <AllocateHistoryTabContent />
                </TabPanel>
              </Tabs> }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(LoyaltyPointsLanding);
