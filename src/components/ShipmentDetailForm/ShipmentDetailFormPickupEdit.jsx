import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import FormInput from "../FormInput/FormInput";
import "./ShipmentDetailForm.scss";
import { Link } from "react-router-dom";



function ShipmentDetailFormPickupEdit(props) {

const event = useSelector(state => state);
const { t } = useTranslation();
const dispatch = useDispatch();

function onSelectChange(event) {
    console.log(event);
  }

  function handleChange(event, name) {
    //setNewvalue(event, name)
    console.log(event, "event target", name);
  }



  console.log(event, "??????????")

    return (
        <>
        <div className="select_shipment">
            <div className="form_section">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.expected_arrival_date")}</label>
                        <FormInput
                              type={"date"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("eventname.label")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.expected_arrival_time")}</label>
                        <FormInput
                              type={"time"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("eventname.label")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.track_licence_no")}</label>
                           <FormInput
                              type={"time"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("License")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.track_capacity")}</label>
                            <FormInput
                              type={"number"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("20 Tons")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.track_type")}</label>
                            <FormSelectbox
                              name={"visitobjective"}
                              class={"input"}
                              onSelectChange={onSelectChange}
                              label={t("Select")}
                              data={"data"}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.driver_name")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("Name")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.driver_license_no")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("122342")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.driver_mobile_no")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("+91 33546443")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("pickupform.frequency")}</label>
                           <FormInput
                              type={"number"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("5")}
                            />
                          </div>
                    </div>

                    <div className="col-12">
                        <div className="inputBox">
                        <label>{t("pickupform.remark")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("some comments")}
                            />
                          </div>
                    </div>

                   <div className="create_link">
                       <button className="cancel">{t("pickupform.cancelbtn")}</button>
                       <button className="create">{t("pickupform.updatebtn")}
                       <Link to ="/"></Link>
                       </button>
                   </div> 

                </div>
            </div>
        </div>
        </>
    )
}

export default withTranslation() (ShipmentDetailFormPickupEdit);