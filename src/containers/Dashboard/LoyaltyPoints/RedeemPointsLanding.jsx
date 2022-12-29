import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./LoyaltyPoints.scss";

function RedeemPointsLanding() {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <div className="content-wrapper">
        <Header title="" />

        <div className="row">
          <div className="mainScroll">
            <div className="redeempoints-box">
              <div className="redeem-points-container">
                <p>Third Party Window</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(RedeemPointsLanding);
