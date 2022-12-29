import React, { useEffect } from "react";
import { masterActions } from "../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import UserProfileCard from "../../../components/UserProfileCard/UserProfileCard";
import FormInput from "../../../components/FormInput/FormInput";
import addMore from "../../../assets/img/plus.png";
import "./CustomerProfile.scss";

function AlternateContactForm() {
  const getCustomerBySoldTo = useSelector(state => state.getCustomerBySoldTo);
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  ///console.log('userName',userName);
  useEffect(()=>{
    dispatch(masterActions.getCustomerBySoldTo(userName.soldTo[0]));
  },[]);
  console.log('userName',userName);
  const handleChange=()=>{
    
  }
  return (
    <>
      <div className="content-wrapper user_section">
        <Header />
        <div className="row">
          <div className="mainScroll">
          {getCustomerBySoldTo && getCustomerBySoldTo.customerDetailById!==undefined? 
            <div class="customer_profile">
              <div className="main-heading">
                <h5>{t("userprofile.heading")}</h5>
              </div>
              <UserProfileCard customerInfo={getCustomerBySoldTo.customerDetailById}/>
              <div className="row mt-3 form_information">
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h6 className="form_title">{t("alternativecontactinfo.heading")}</h6>
                  <div className="form_section">
                    <div className="inputBox ">
                      <label>{t("altcontactname.label")}</label>
                      <span className="add_more"><img height="30px" width="30px" src={addMore} /></span>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("Saurabh Kumar")}
                      />
                    </div>
                    <div className="inputBox ">
                      <label>{t("contactnumber.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("999854987")}
                      />
                    </div>

                    <div className="inputBox ">
                      <label>{t("EmailId.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("Surabh@email.com")}
                      />
                    </div>

                  </div>
                </div>

                <div className="col-12">
                  <div className="create_link">
                    <button className="cancel"> {t("cancel.button")}</button>
                    <button className="create" >{t("save.button")} </button>
                  </div>
                </div>

              </div>

            </div>:''
            }
          </div>

        </div>
      </div>
    </>
  );
}

export default withTranslation()(AlternateContactForm);
