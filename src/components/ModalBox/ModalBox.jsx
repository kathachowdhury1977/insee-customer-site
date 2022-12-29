import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import Button from "../Button/Button";
import { useTranslation, withTranslation } from "react-i18next";

function ModalBox(props) {
  const [inputType] = useState(props.type);
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  function handleChange(event, name) {
    console.log(event, "event target", name);
  }
  function onSelectChange(event) {
    console.log(event);
  }
  function activeClass() {
    var element = document.getElementById("active");
    console.log(element, "?")
    element.classList.toggle("active");
 }
  const buttonwidth={
    width: "100%"
  }
  const data = [
    {
      id: "1",
      name: "One"
    },
    {
      id: "2",
      name: "Two"
    },
    {
      id: "3",
      name: "Three"
    },
    {
      id: "4",
      name: "Four"
    }
  ];

  return (
    <>
    
      <div class="modal fade user_popup" id="myModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{props.title}</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="tabbable-panel">
                <div class="tabbable-line">
                  <ul class="nav nav-tabs">
                    <h4>{t("visitfor.label")}</h4>
                    <li id="active"  onClick={activeClass}>
                      <a href="#tab_default_first" data-toggle="tab">
                      {t("event.label")} {" "}
                      </a>
                    </li>
                    <li id="active" onClick={activeClass}>
                      <a href="#tab_default_second" data-toggle="tab">
                      {t("mode.label")} / {t("nav.account")} / {t("market.label")}{" "}
                      </a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab_default_first">
                      <form>
                        <label>{t("eventname.label")}</label>
                        <FormInput
                          type={"text"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("eventname.label")}
                        />
                        <label>{t("eventlocation.label")}</label>
                        <FormInput
                          type={"text"}
                          name={"eventlocation"}
                          onChange={handleChange}
                          label={t("eventlocation.label")}
                        />
                        <label>{t("visittime.label")}</label>
                        <FormInput
                          type={"time"}
                          name={"eventtime"}
                          onChange={handleChange}
                          label={t("visittime.label")}
                        />
                        <label>{t("visitdate.label")}</label>
                        <FormInput
                          type={"date"}
                          name={"eventdate"}
                          onChange={handleChange}
                          label={t("visitdate.label")}
                        />
                        <div class="form-group">
                          <label>{t("visitobjective.label")}</label>
                          <FormSelectbox
                            name={"visitobjective"}
                            onSelectChange={onSelectChange}
                            label={t("visitobjective.label")}
                            data={data} 
                          />
                        </div>
                        <div class="form-group">
                          <label>{t("mode.label")}</label>
                          <FormSelectbox
                            name={"visitobjective"}
                            onSelectChange={onSelectChange}
                            label={t("mode.label")}
                            data={data} 
                          />
                        </div>
                      </form>
                    </div>
                    <div class="tab-pane" id="tab_default_second">
                      <form>
                        <div class="form-group">
                          <label>{t("mode.label")} / {t("nav.account")} / {t("market.label")}</label>
                          <FormSelectbox
                            name={"visitobjective"}
                            onSelectChange={onSelectChange}
                            label={t("mode.label")}
                            data={data} 
                          />
                        </div>

                        <div class="form-group">
                        <label>{t("visittime.label")}</label>
                        <FormInput
                          type={"time"}
                          name={"eventtime"}
                          onChange={handleChange}
                          label={t("visittime.label")}
                        />
                        </div>

                        <div class="form-group">
                        <label>{t("visitdate.label")}</label>
                        <FormInput
                          type={"date"}
                          name={"eventdate"}
                          onChange={handleChange}
                          label={t("visitdate.label")}
                        />
                        </div>

                        <div class="form-group">
                          <label>{t("visitobjective.label")}</label>
                          <FormSelectbox
                            name={"visitobjective"}
                            onSelectChange={onSelectChange}
                            label={t("visitobjective.label")}
                            data={data} 
                          />
                        </div>
                        <div class="form-group">
                        <label>{t("mode.label")}</label>
                          <FormSelectbox
                            name={"visitobjective"}
                            onSelectChange={onSelectChange}
                            label={t("mode.label")}
                            data={data} 
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
            <Button type={"submit"} class="btn btn-lg add_visit_btn" label={t("addvisit.button")} style={buttonwidth}/>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withTranslation()(ModalBox);
