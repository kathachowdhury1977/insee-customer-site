import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import "./RedemptionHistoryChildItem.scss";

function RedemptionHistoryChildItem(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();





    function dateFormatting(input) {

        if (input) {
            var date_arr = input.split(" ");
            var date_aar2 = date_arr[0].split("-");
            var new_date = date_aar2[2] + "-" + date_aar2[1] + "-" + date_aar2[0] + " " + date_arr[1];

            return new_date;
        } else {
            return "";
        }
    }

    return (
        <>
            <div className="redemption-history-childbox">
                <div className="card">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.redemption_order")}</p>
                            <p className="small-label text-red">{props.redemption_order}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.redemption_date")}</p>
                            <p className="small-label">{dateFormatting(props.redemption_date)}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.product_name")}</p>
                            <p className="small-label">{props.product_name}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.quantity_units")}</p>
                            <p className="small-label">{props.quantity}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.points_redeemed")}</p>
                            <p className="small-label">{props.points_redeemed}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.delivery_status")}</p>
                            <p className="small-label">{props.delivery_status}</p>
                        </div>

                    </div>

                </div>




            </div>

        </>
    );
}

export default withTranslation()(RedemptionHistoryChildItem);
