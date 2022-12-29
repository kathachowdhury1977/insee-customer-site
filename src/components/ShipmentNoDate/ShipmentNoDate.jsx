import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import FormInput from "../FormInput/FormInput";
import "./ShipmentNoDate.scss";



function ShipmentNoDate(props) {

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
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);

    return (
        <>
            <div className="shipment-no-date text-left">
                    <p className="big-text" style={{fontSize: `${FontChange}px`}}>{props.title}</p>
                    <p className="small-text" style={{fontSize: `${FontChange}px`}}><span className={props.class}><span className={props.fontSize}>{props.number ? props.number : ''}</span></span></p>
            </div>
        </>
    )
}

export default withTranslation()(ShipmentNoDate);