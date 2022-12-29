import React, { useEffect } from "react";
import FormInput from "../../../../../components/FormInput/FormInput";
import FormSelectbox from "../../../../../components/FormSelectbox/FormSelectbox";
import { eventActions } from "../../../../../_actions";
import Header from "../../../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "react-tabs/style/react-tabs.css";
import PlusIcon from '../../../../../assets/img/plus.png';
import DeleteImg from '../DeleteImg';
import "../ListingDetail.scss";

const MarketingActivityForm = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const event = useSelector((state) => state);

 // console.log(props.eventObjective, "eventmodeeventmode");
  function handleChange(event, name) {
    //setNewvalue(event, name)
    console.log(event, "event target", name);
  }

  function onSelectChange(event) {
    console.log(event);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(eventActions.createNewEvent());
  }


  return (
    <div className="content-wrapper product_form">
    <Header />
    <div className="form_section">
      <div className="container-fluid">
      <div className="">
        <div className="formBox">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="inputBox input_mb">
                  <label>{t("Compititor Product Brand")}</label>
                  <span className="add_more"><button><img src={PlusIcon}/></button></span>
                    <FormSelectbox
                            name={"visitobjective"}
                            class={"input"}
                            onSelectChange={onSelectChange}
                            label={t("PLC-Santha")}
                            data={"data"}
                        />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Promotion Type")}</label>
                        <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Text")}
                        />   
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Objective of Promotion")}</label>
                        <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Text")}
                        />   
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Promotion Budget")}</label>
                        <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Thai Baht")}
                        />   
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Start Date")}</label>
                        <FormInput
                          type={"date"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Thai Baht")}
                        />   
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("End Date")}</label>
                        <FormInput
                          type={"date"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Thai Baht")}
                        />   
                </div>
              </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="upload_document">
                       <label for="file-upload" class="custom-file-upload">
                          <i class="fa fa-cloud-upload"></i> Upload Images / File
                           </label>
                        <input id="file-upload" type="file"/>
                      </div>
                </div>

                <div className="col-12 mt-4 mb-4">
                          <DeleteImg/>
                </div>
            </div>

        

            <div className="row">
              <div className="col-sm-6 text-center">
                <input type="submit" class="button" value="Save" />
              </div>
              <div className="col-sm-6 text-center">
                <input type="submit" class="button cancel" value="Cancel" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default MarketingActivityForm;
