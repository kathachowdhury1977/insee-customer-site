import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./OutstandingAmount.scss";

function OutstandingAmount(props) {
  const { t } = useTranslation();
 
console.log(props.outstangamt, "outstangamtoutstangamt")
  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-12 p-0 outstanding_amt_container">
        <div className="row ml-2 mr-2">
          <div className="col-sm-12 col-md-12 col-lg-12 p-0">
            <p className="mt-2 out_standing_amt_heading">
              {t("payment.outstanding_amt")}
            </p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                <p className="textLight">{t("payment.below_30days")}</p>
                <p className="textDark">{props.outstangamt? props.outstangamt.below30Amount: "NA"}</p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                <p className="textLight">{t("payment.30-45days")}</p>
                <p className="textDark">{props.outstangamt? props.outstangamt.below30to45Amount: "NA"}</p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12 mt-2">
                <p className="textLight">{t("payment.45-50days")}</p>
                <p className="textDark">{props.outstangamt? props.outstangamt.below45to60Amount: "NA"}</p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12"></div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12"></div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12"></div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 pb-3 bottom-line">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                <p className="textLight">{t("payment.60-90days")}</p>
                <p className="textDark">{props.outstangamt? props.outstangamt.below60to90Amount: "NA"}</p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                <p className="textLight">{t("payment.more_than_90days")}</p>
                <p className="textDark">{props.outstangamt? props.outstangamt.above90Amount: "NA"}</p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12"></div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12"></div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12"></div>
              <div className="col-sm-2 col-md-2 col-lg-2"></div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
            <p className="textLight mt-2">
              {t("payment.as_on")} &nbsp;<span>04-01-2021, 10:45 AM</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(OutstandingAmount);
