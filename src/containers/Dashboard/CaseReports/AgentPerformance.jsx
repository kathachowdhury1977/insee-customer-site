import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import "./Reports.scss";

function AgentPerformance() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();


    return (
        <>
            <div className="content-wrapper">
            <Header title = "Dashboard"/>
                <div className="row">
                    <div className="mainScroll"></div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(AgentPerformance);
