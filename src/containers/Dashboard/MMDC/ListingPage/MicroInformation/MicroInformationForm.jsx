import React, { useEffect } from "react";
import FormInput from "../../../../../components/FormInput/FormInput";
import FormSelectbox from "../../../../../components/FormSelectbox/FormSelectbox";
import { eventActions } from "../../../../../_actions";
import Header from "../../../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "react-tabs/style/react-tabs.css";
import PlusIcon from '../../../../../assets/img/plus.png';
import "../../ListingPage/Listing.scss";

const MicroInformationForm = (props) => {
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
                <div className="inputBox ">
                  <label>{t("Market Potential")}</label>
                  {/* <span className="add_more"><button><img src={PlusIcon}/></button></span> */}
                     <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Value")}
                        />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Insee Market Share")}</label>
                     <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Value")}
                        />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Change in GOvernment Regulation")}</label>
                     <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Value")}
                        />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Average Rainfall (in mm)")}</label>
                     <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Value")}
                        />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Change in Tax Structure")}</label>
                     <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Value")}
                        />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Average Income per household")}</label>
                     <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Value")}
                        />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Additional Information")}</label>
                     <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("Enter Value")}
                        />
                </div>
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

export default MicroInformationForm;
