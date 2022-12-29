import React, { useEffect } from "react";
import FormInput from "../../../../../components/FormInput/FormInput";
import FormSelectbox from "../../../../../components/FormSelectbox/FormSelectbox";
import { eventActions } from "../../../../../_actions";
import Header from "../../../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PlusIcon from '../../../../../assets/img/plus.png';
import "../ListingDetail.scss";

const ProductBrandForm = (props) => {
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
                  <label>{t("Product Brand")}</label>
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
                  <label>{t("Average Monthly Volume")}</label>
                  <div className="row select_input">
                      <div className="col-6">
                       <FormSelectbox
                            name={"visitobjective"}
                            class={"input"}
                            onSelectChange={onSelectChange}
                            label={t("Bag, ton")}
                            data={"data"}
                        />
                      </div>
                      <div className="col-6 input_mb">
                        <FormInput
                          type={"text"}
                          class={"input"}
                          name={"eventname"}
                          onChange={handleChange}
                          label={t("3000")}
                        />
                      </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Purchage Price")}</label>
                  <div className="row select_input">
                      <div className="col-6">
                       <FormSelectbox
                            name={"visitobjective"}
                            class={"input"}
                            onSelectChange={onSelectChange}
                            label={t("Per Ton")}
                            data={"data"}
                        />
                      </div>
                      <div className="col-6 input_mb">
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("3000")}
                          />
                      </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Current Stock")}</label>
                  <div className="row select_input">
                      <div className="col-6">
                       <FormSelectbox
                            name={"visitobjective"}
                            class={"input"}
                            onSelectChange={onSelectChange}
                            label={t("Per Ton")}
                            data={"data"}
                        />
                      </div>
                      <div className="col-6 input_mb">
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("40000")}
                          />
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Retailer Payment Term")}</label>
                  <FormSelectbox
                    name={"visitobjective"}
                    class={"input"}
                    onSelectChange={onSelectChange}
                    label={t("less then 7 Days")}
                    data={"data"}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Cash Discount")}</label>
                  <div className="row">
                      <div className="col-6">
                       <FormSelectbox
                            name={"visitobjective"}
                            class={"input"}
                            onSelectChange={onSelectChange}
                            label={t("Select")}
                            data={"data"}
                        />
                      </div>
                      <div className="col-6 input_mb">
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("100")}
                          />
                      </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox">
                  <label>{t("Retailer Selling Price to End Customer")}</label>
                  <div className="row select_input">
                      <div className="col-6">
                       <FormSelectbox
                            name={"visitobjective"}
                            class={"input"}
                            onSelectChange={onSelectChange}
                            label={t("Select")}
                            data={"data"}
                        />
                      </div>
                      <div className="col-6 input_mb">
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("600")}
                          />
                      </div>
                  </div>
                </div>
              </div>

             <div className="col-12 mb-3">
                <h5 className><b>Branding Program</b></h5>
             </div>

             <div className="col-sm-6">
                <div className="inputBox ">
                  <label>{t("Retailer Brand (Count)")}</label>

                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"eventname"}
                    onChange={handleChange}
                    label={t("20")}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox ">
                  <label>{t("POSM (Count)")}</label>

                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"eventname"}
                    onChange={handleChange}
                    label={t("20")}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox ">
                  <label>{t("Other (Name)")}</label>

                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"eventname"}
                    onChange={handleChange}
                    label={t("20")}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox ">
                  <label>{t("Count")}</label>
                  <span className="add_more"><button><img src={PlusIcon}/></button></span>
                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"eventname"}
                    onChange={handleChange}
                    label={t("20")}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox ">
                  <label>{t("Supply Location")}</label>

                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"eventname"}
                    onChange={handleChange}
                    label={t("warehouse")}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="inputBox ">
                  <label>{t("Buying from Distributor")}</label>
                  <span className="add_more"><button><img src={PlusIcon}/></button></span>
                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"eventname"}
                    onChange={handleChange}
                    label={t("Warehouse")}
                  />
                </div>
              </div>


              <div className="col-sm-6">
                <div className="inputBox ">
                  <label>{t("Additional Information")}</label>

                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"eventname"}
                    onChange={handleChange}
                    label={t("Enter Text")}
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

export default ProductBrandForm;
