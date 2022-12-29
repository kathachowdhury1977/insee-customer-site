import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormInput from "../FormInput/FormInput";
import './Delivery.scss'
import locationImage from '../../assets/img/map-dummy.png'
import { Link } from "react-router-dom";

const inputStyle = {
    "margin-bottom": "3%",
    "border-radius": "6px",
    padding: "6% 2%",
};
function DeliveryEdit(props) {
    const { t } = useTranslation();
    const [inputType] = useState(props.type);
    const [inputValue, setInputValue] = useState("");

    function handleChange(event, name) {
        //setNewvalue(event, name)
        console.log(event, "event target", name);
    }

    const blackButton = {
        textTransform: 'uppercase',
        marginTop: '8px',
        background: '#000000',
        fontWeight: '600',
        padding: '5px 20px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff',
            background: '#000000',
        }
    };

    const redButton = {
        textTransform: 'uppercase',
        marginTop: '8px',
        background: 'red',
        fontWeight: '600',
        padding: '5px 20px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff',
            background: 'red',
        }
    };


    return (
        <>
            <div className="form_section delivery-box">

                <div className="row">
                    {/* <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="inputBox mb-0">
                                    <label>{t("shipmentdetail.expecteddeliverydatetime")}</label>
                                    <FormInput
                                        type={"datetime-local"}
                                        class={"input"}
                                        name={"eventname"}
                                        onChange={handleChange}
                                        label={t("eventname.label")}
                                    />
                                </div>
                            </div>

                              <div className="col-12 text-center mb-3">
                                  <div className="arriving_date">
                                      <span>Arriving On</span>
                                      <p>12/12/2020</p>
                                  </div>
                              </div>
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="plain-Text">{t("shipmentdetail.trackingId")}</p>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                <p className="plain-Text">{props.trackingId}</p>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="plain-Text">{t("shipmentdetail.shipmentdate")}</p>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                <p className="plain-Text">{props.shipmentDate}</p>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="plain-Text">{t("pickupform.prefered_trucktype")}</p>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                <p className="plain-Text">{props.prefered_truck_type}</p>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="plain-Text">{t("pickupform.specialproject")}</p>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                <p className="plain-Text">{props.special_project}</p>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="plain-Text">{t("pickupform.contactname")}</p>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                <p className="plain-Text">{props.contact_name}</p>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="plain-Text">{t("pickupform.contactno")}</p>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                <p className="plain-Text">{props.contact_number}</p>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="plain-Text">{t("pickupform.transportername")}</p>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-right">
                                <p className="plain-Text">{props.transporter_name}</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <p className="blue-text">{t('Delivery by INSEE')} {props.plantName}</p>
                        <img alt="location" src={locationImage} />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-3 ml-3">
                        <div className="create_link">
                            <button className="cancel">{t("pickupform.cancelbtn")}</button>
                            <button className="create">{t("pickupform.updatebtn")}
                                <Link to="/"></Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DeliveryEdit;