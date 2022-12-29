import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "./ShipmentList.scss";
import ShipmentProduct from "./ShipmentProduct";



function ShipmentTotal(props) {

const event = useSelector(state => state);
const { t } = useTranslation();
const dispatch = useDispatch();



  console.log(event, "??????????")

    return (
        <>
                <ul className="shipment_dtls col-12">
                    <li>
                        <span className="dtls_title">{props.sTitle}</span>
                        <span className="dtls_value">{props.sValue}</span>
                    </li>

                    <li>
                        <span className="dtls_title">{props.totalTitle}</span>
                        <span className="dtls_value">{props.totalQty} TON</span>
                    </li>

                    <li>
                        <span className="dtls_title">{props.remainshiptype}</span>
                        <span className="dtls_value">{props.remainshipvalue} TON</span>
                    </li>
                </ul>      

        </>
    )
}

export default withTranslation() (ShipmentTotal);