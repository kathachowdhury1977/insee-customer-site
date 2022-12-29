import React, { useState } from "react";
import FormInput from "../../../../../components/FormInput/FormInput";
import FormSelectbox from "../../../../../components/FormSelectbox/FormSelectbox";
import { eventActions } from "../../../../../_actions";
import Header from "../../../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Increase from '../../../../../assets/img/increase.png';
import Decrease from '../../../../../assets/img/decrease.png';
import "../ListingDetail.scss";

const FleetInformationForm = (props) => {
  const [track, setTrack] = useState(0); 
  const [berge, setBerge] = useState(0);  
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


  const handleIncrement = () => {
    setTrack(prevCount => prevCount + 1);
  };


  const handleDecrement = () => {
    setTrack(prevCount => prevCount - 1);
  };

    const handleIncrement1 = () => {
        setBerge(prevCount => prevCount + 1);
      };
    

    const handleDecrement1 = () => {
        setBerge(prevCount => prevCount - 1);
     };


  return (
    <div className="content-wrapper product_form">
    <Header />
    <div className="form_section">
      <div className="container-fluid">
      <div className="">
        <div className="formBox">
          <form onSubmit={handleSubmit}>
           
           
           <div className="container-fluid">
              <div className="fleet_sec">
              < div className="fleet_heading">
                   <h4><b>Number of Own Tracks</b></h4>

                   <div className="count_sec">
                      <button onClick={handleDecrement}><img src={Decrease}/></button>
                           <span>{track}</span>
                        <button onClick={handleIncrement}><img src={Increase}/></button>     
                   </div>
               </div>
                <div  className="row">
                     <div className="col-6">
                     <div className="inputBox">
                        <label>{t("Capacity of Track 1")}</label>
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("Value")}
                          />
                        </div>
                     </div>
                    <div className="col-6">
                    <div className="inputBox">
                    <label>{t("Capacity of Track 1")}</label>
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("Value")}
                          />
                        </div>
                    </div>
                 </div>
              </div>

              <div className="fleet_sec">
              < div className="fleet_heading">
                   <h4><b>Number of Own Barges</b></h4>

                   <div className="count_sec">
                      <button onClick={handleDecrement1}><img src={Decrease}/></button>
                           <span>{berge}</span>
                        <button onClick={handleIncrement1}><img src={Increase}/></button>     
                   </div>
               </div>
                <div  className="row">
                     <div className="col-6">
                     <div className="inputBox">
                        <label>{t("Capacity of Barge 1")}</label>
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("Value")}
                          />
                        </div>
                     </div>
                    <div className="col-6">
                    <div className="inputBox">
                    <label>{t("Capacity of Barge 1")}</label>
                        <FormInput
                            type={"text"}
                            class={"input"}
                            name={"eventname"}
                            onChange={handleChange}
                            label={t("Value")}
                          />
                        </div>
                    </div>
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

export default FleetInformationForm;
