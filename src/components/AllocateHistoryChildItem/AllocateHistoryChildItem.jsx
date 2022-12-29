import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import "./AllocateHistoryChildItem.scss";

function AllocateHistoryChildItem(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();



    return (
        <>
            <div className="allocate-history-childbox">
                <div className="card">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.company")}</p>
                            <p className="small-label">{props.company}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.billing_month")}</p>
                            <p className="small-label">{props.billing_month}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.billing_year")}</p>
                            <p className="small-label">{props.billing_year}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.sub_dealer_number")}</p>
                            <p className="small-label">{props.sub_dealer_number}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.sub_dealer_name")}</p>
                            <p className="small-label">{props.sub_dealer_name}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.allocated")}</p>
                            <p className="small-label">{props.allocated}</p>
                        </div>

                    </div>

                </div>
            </div>

        </>
    );
}

export default withTranslation()(AllocateHistoryChildItem);
