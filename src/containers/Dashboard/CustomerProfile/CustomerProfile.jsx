import React, { useEffect } from "react";
import { eventActions, masterActions, orderActions } from "../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import UserProfileCard from "../../../components/UserProfileCard/UserProfileCard";
import AccountInformation from "../../../components/AccountInformation/AccountInformation";
import UserInfo from "../../../components/UserInfo/UserInfo";
import MainLocation from "../../../components/MainLocation/MainLocation";
import AlternateLocation from "../../../components/AlternateLocation/AlternateLocation";
import InseePrivilege from "../../../components/InseePrivilege/InseePrivilege";
import PdpaAgreement from "../../../components/PdpaAgreement/PdpaAgreement";
import { Link } from "react-router-dom";
import Loading from '../../../components/Loader/Loading';
import Location from '../../../components/Location/Location';
import "./CustomerProfile.scss";
import { shiptobycount } from "../../../_reducers/shiptobycount.reducer";


function CustomerProfile() {

  ///const getSocialMedia = useSelector(state => state.getSocialMediaUsingGet);
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  console.log('userName', userName);
  const shipToDetails = useSelector((state) => state.getShipToDetails);
  useEffect(() => {
    dispatch(masterActions.getCustomerBySoldTo(localStorage.getItem('CustomerNumber')));
    dispatch(orderActions.getShipToDetails(localStorage.getItem('CustomerNumber')));
  }, []);
  const getCustomerBySoldTo = useSelector(state => state.getCustomerBySoldTo);
  const pdpConfirmedCustomer = useSelector(state => state.getCustomerPdpInfo.getCustomerPdpInfo);
  console.log('getCustomerBySoldTo', getCustomerBySoldTo && getCustomerBySoldTo.customerTierStatusObj && getCustomerBySoldTo.customerTierStatusObj.customerTierStatus);

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  return (
    <>
      <div className="content-wrapper user_section">
        <Header title={t("viewProfileDetail")} />
        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            {getCustomerBySoldTo && getCustomerBySoldTo.loading ? <span  style={{ marginLeft: "30%" }}>
            <div className='loading'>
              <Loading />
              </div>
              </span> : ''}
            {getCustomerBySoldTo && getCustomerBySoldTo.customerDetailById !== undefined ?
              <div class="customer_profile">
                <div className="main-heading">
                  <h5 style={{fontSize: `${HeadingFontChange}px`}}>{t("userprofile.heading")}</h5>
                </div>
                <UserProfileCard 
                customerInfo={getCustomerBySoldTo.customerDetailById} 
                shipToDetails={shipToDetails} />
                <div className="col-12 p-2">
                  <div className="row">
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-2">
                      <AccountInformation cotactList={getCustomerBySoldTo.customerDetailById} />
                      <UserInfo userInfo={userName} />

                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-2">
                      {/* <Location locationInfo={getCustomerBySoldTo.customerDetailById} /> */}
                      {
                        userName && userName.countryCode === 'VN' || userName && userName.countryCode === 'LK' ? 
                        '':
                        <InseePrivilege inseePrivilage={getCustomerBySoldTo.customerDetailById.inseePrivilage} mainHeading={t("inseeprivilage.heading")} />

                      }
                      

                      <PdpaAgreement pdpConfirmedCustomer={pdpConfirmedCustomer} mainHeading={t("pdpaagreement.heading")} />
                    </div>
                  </div>
                  {/*
                <div className="row">  
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-2">
                      <MainLocation/>
                      <AlternateLocation/>
                  </div>
                </div>
                */}
                </div>

                <div className="row mt-2 mb-3 pb-5">
                  <div className="create_link" >
                    <Link to="/ViewRetailers" className=" mr-2"><button className="viewretailersButton" style={{ padding: '7px 15px', fontSize: `${FontChange}px` }}>{t("viewretailers.button")}</button></Link>
                    <Link to="/ViewShipTo"><button className="viewshiptoButton" style={{fontSize: `${FontChange}px`}}> {t("viewshipto.button")}</button></Link>
                  </div>
                </div>
              </div> : ''
            }
          </div>

        </div>
      </div>
    </>
  );
}

export default withTranslation()(CustomerProfile);