import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import './RedCardDealer.scss';
import menImg from "../../assets/img/INSEE-life-Logo.jpg";
import { DataFormat, handleZero } from "../../_helpers";

function RedCardDealer({customerId, customerName,totalPoints}) {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userRole = JSON.parse(localStorage.userData).userRole;
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);

  return (
    <>
    <div className="redcard-dealer-container">
        <div className="row ">
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-4">
                <img src={menImg}/>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-9 col-sm-8 col-xs-8 pt-2">
                <p style={{marginBottom:'10px', fontSize: `${FontChange}px`}}>{t("label.account_number")} &nbsp;:&nbsp;<strong>{DataFormat(customerId)}</strong></p>
                <p style={{marginBottom:'10px', fontSize: `${FontChange}px`}}>{t("label.account_name")} &nbsp;:&nbsp; <strong>{customerName}</strong></p>
                {/* { userRole === 'Retailer' ? null : <p>{t("label.total_points")} &nbsp;:&nbsp; <strong>{totalPoints}</strong></p> } */}
                <p style={{fontSize: `${FontChange}px`}}>{t("label.total_points")} &nbsp;:&nbsp; <strong>{totalPoints}</strong></p>
            </div>
        </div>
    </div>
    </>
  );
}

export default withTranslation()(RedCardDealer);
