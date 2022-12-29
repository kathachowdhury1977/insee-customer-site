import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import FormInput from "../FormInput/FormInput";
import "./ShipmentDetailForm.scss";
import { Link } from "react-router-dom";



function ShipmentDetailFormDeliveryEdit(props) {

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
                        <label>{t("Choose Transportor")}</label>
                           <FormSelectbox
                              name={"visitobjective"}
                              class={"input"}
                              onSelectChange={onSelectChange}
                              label={t("Name Transportor")}
                              data={"data"}
                            />
                          </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("Preferred Truck Type")}</label>
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
                        <label>{t("Special Project")}</label>
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
                        <label>{t("Contact Name")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("Name")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("Contact Number")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("122342")}
                            />
                          </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="inputBox">
                        <label>{t("Sub Dealer")}</label>
                            <FormSelectbox
                              name={"visitobjective"}
                              class={"input"}
                              onSelectChange={onSelectChange}
                              label={t("Select Sub Dealer")}
                              data={"data"}
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

                </div>
            </div>
        </div>
        </>
    )
}

export default withTranslation() (ShipmentDetailFormDeliveryEdit);