import React, { useEffect } from "react";
import { eventActions } from "../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import UserProfileCard from "../../../components/UserProfileCard/UserProfileCard";
import FormInput from "../../../components/FormInput/FormInput";
import addMore from "../../../assets/img/plus.png";
import "./CustomerProfile.scss";
function AlternateLocationForm() {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  function handleChange(event, name) {
    //setNewvalue(event, name)
    ///console.log(event, "event target", name);
  }
  return (
    <>
      <div className="content-wrapper user_section">
        <Header />
        <div className="row">
          <div className="mainScroll">
            <div class="customer_profile">
              <div className="main-heading">
                <h5>{t("userprofile.heading")}</h5>
              </div>
              <UserProfileCard />
              <div className="row mt-3 form_information">
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h6 className="form_title">{t("alternatelocation.formheading")}</h6>
                  <div className="form_section">
                    <div className="inputBox ">
                      <label>{t("address.label")}</label>
                      <span className="add_more"><img height="30px" width="30px" src={addMore} /></span>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("address.label")}
                      />
                    </div>

                    <div className="inputBox ">
                      <label>{t("region.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("North")}
                      />
                    </div>

                    <div className="inputBox ">
                      <label>{t("province.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("Bangkok")}
                      />
                    </div>
                    <div className="inputBox ">
                      <label>{t("district.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("Sukumbit")}
                      />
                    </div>
                    <div className="inputBox ">
                      <label>{t("postalcode.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("+85")}
                      />
                    </div>
                    <div className="inputBox ">
                      <label>{t("googlemapcordinates.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"eventname"}
                        onChange={handleChange}
                        label={t("2315 5678")}
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

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
export default withTranslation()(AlternateLocationForm);
