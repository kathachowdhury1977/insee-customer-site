import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import './MyOrders.scss'

function RebateSalesOrder(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    function handleChange(event, name) {
        //setNewvalue(event, name)
        console.log(event, "event target", name);
    }

   

    console.log(event, "??????????")
    return (
        <>
        </>
    );
}

export default withTranslation()(RebateSalesOrder);
