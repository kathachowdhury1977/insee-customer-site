import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import FormInput from "../FormInput/FormInput";
import "./ShipmentDetailForm.scss";



function ShipmentDetailForm(props) {

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
                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Expected Arrival date to Plant")}</label>
                        <FormInput
                              type={"date"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("eventname.label")}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Expected Arrival time to Plant")}</label>
                        <FormInput
                              type={"time"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("eventname.label")}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Track License No.")}</label>
                           <FormInput
                              type={"time"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("License")}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Track Capacity")}</label>
                            <FormInput
                              type={"number"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("20 Tons")}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Track Type")}</label>
                            <FormSelectbox
                              name={"visitobjective"}
                              class={"input"}
                              onSelectChange={onSelectChange}
                              label={t("Select")}
                              data={"data"}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Driver Name")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("Name")}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Driver License No.")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("122342")}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Driver Mobile No.")}</label>
                           <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("+91 33546443")}
                            />
                          </div>
                    </div>

                    <div className="col-4">
                        <div className="inputBox">
                        <label>{t("Frequency")}</label>
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
                        <label>{t("Remark")}</label>
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
                       <button className="cancel">Cancel Do</button>
                       {/* <button className="create">Create</button> */}
                   </div> 

                </div>
            </div>
        </div>
        </>
    )
}

export default withTranslation() (ShipmentDetailForm);