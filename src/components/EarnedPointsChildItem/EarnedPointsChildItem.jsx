import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import "./EarnedPointsChildItem.scss";

function EarnedPointsChildItem(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();



    return (
        <>
            <div className="earned-points-childbox">
                <div className="card">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.activity_type")}</p>
                            <p className="small-label">{props.activity_type}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.expiration_date")}</p>
                            <p className="small-label">{props.expiration_date}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.billing_number")}</p>
                            <p className="small-label">{props.billing_number}</p>
                        </div>

                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.billing_date")}</p>
                            <p className="small-label">{props.billing_date}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.product_number")}</p>
                            <p className="small-label">{props.product_number}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.quantity_units")}</p>
                            <p className="small-label">{props.quantity}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.product_name")}</p>
                            <p className="small-label">{props.product_name}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.point_recieved")}</p>
                            <p className="small-label">{props.points_recieved}</p>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <p className="big-label">{t("label.remark")}</p>
                            <p className="small-label">{props.remark}</p>
                        </div>
                    </div>

                </div>




            </div>

        </>
    );
}

export default withTranslation()(EarnedPointsChildItem);
