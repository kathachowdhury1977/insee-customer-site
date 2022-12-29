import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import "./TotalBox.scss";

function TotalBox(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();



    return (
        <>
            <div className="total-box">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <p>{t("label.total")}: {parseFloat(props.total).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(TotalBox);
