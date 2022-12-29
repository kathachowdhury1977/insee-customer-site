import React, { useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import Button from "../Button/Button";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AddVisitTabs = (props) => {
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

  // const data = props.eventMode.length > 0
  // ? props.eventMode.map(function (modedata) {
  //    return  <option key={modedata.id} value={modedata.id}>
  //       {modedata.modeName}
  //     </option>
  // })
  // : null
  // const objectiveEvent = props.eventObjective.length > 0
  // ? props.eventObjective.map(function (objectiveData) {
  //    return  <option key={objectiveData.id} value={objectiveData.id}>
  //       {objectiveData.objectiveName}
  //     </option>
  // })
  // : null

// console.log(props.eventMode, "?????aaa????????", props.eventObjective)

  return (
    <div className="todo_status">
      <Tabs>
        <TabList>
          <Tab>Events</Tab>
          <Tab>Accounts</Tab>
          <Tab>Leads</Tab>
          <Tab>Market</Tab>
          <Tab>Influencer</Tab>
        </TabList>

        <div className="visit_dtls">
          <TabPanel>
            <div className="form_section">
              <div className="container-fluid">
                <div className="">
                  <div className="formBox">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="inputBox ">
                            <label>{t("eventname.label")}</label>

                            <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventname"}
                              onChange={handleChange}
                              label={t("eventname.label")}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="inputBox">
                            <label>{t("eventlocation.label")}</label>
                            <FormInput
                              type={"text"}
                              class={"input"}
                              name={"eventlocation"}
                              onChange={handleChange}
                              label={t("eventlocation.label")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="inputBox">
                            <label>{t("visittime.label")}</label>
                            <FormInput
                              type={"time"}
                              class={"input"}
                              name={"eventtime"}
                              onChange={handleChange}
                              label={t("visittime.label")}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="inputBox">
                            <label>{t("visitobjective.label")}</label>
                            <FormSelectbox
                              name={"visitobjective"}
                              class={"input"}
                              onSelectChange={onSelectChange}
                              label={t("visitobjective.label")}
                              data={"data"}
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="inputBox">
                            <label>{t("mode.label")}</label>
                            <FormSelectbox
                              name={"visitmode"}
                              class={"input"}
                              onSelectChange={onSelectChange}
                              label={t("mode.label")}
                              data={"data"}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 text-center">
                          {/* <Button type={"submit"} class="button"
                         label={t("addvisit.button")} handleSubmit={handleSubmit} /> */}
                          <input type="submit" class="button" value="Add" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="form_section">
              <div className="container-fluid">
                <div className="container">
                  <div className="formBox">
                    <form>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="inputBox ">
                            <label>Account Name</label>
                            <input
                              type="text"
                              name=""
                              placeholder="Type"
                              className="input"
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="inputBox">
                            <label>Visit Objective</label>
                            <select className="input">
                              <option value="">Select Objective</option>
                              <option value="">Objective</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div className="inputBox">
                            <label>Visit Time</label>
                            <input type="time" name="" className="input" />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="inputBox">
                            <label>Interaction Mode</label>
                            <select className="input">
                              <option value="">Offline</option>
                              <option value="">Online</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 text-center">
                          <input
                            type="submit"
                            name=""
                            className="button"
                            value="Add Visit"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>3</TabPanel>
          <TabPanel>4</TabPanel>
          <TabPanel>5</TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default AddVisitTabs;
