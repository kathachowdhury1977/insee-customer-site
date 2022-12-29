import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import FormInput from "../FormInput/FormInput";
import "./ShipmentDeliveryShipto.scss";
function ShipmentDeliveryShipto(props) {
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

    return (
        <>
            <div className="shipment-delivery-shipto m-3 p-2">
                <div className="row m-0">
                    <div className="col-sm-3 col-md-3 col-lg-2 col-xl-3">
                        <p className="big-text">{t("createdelivery.shipto")}</p>
                        <p className="small-text">{props.shipto}</p>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <p className="big-text">{t("createdelivery.shiptoaddress")}</p>
                        <p className="small-text">{props.shiptoname}</p>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <p className="big-text">{t("createdelivery.shiptocode")}</p>
                        <p className="small-text">{props.shiptocode}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withTranslation()(ShipmentDeliveryShipto);