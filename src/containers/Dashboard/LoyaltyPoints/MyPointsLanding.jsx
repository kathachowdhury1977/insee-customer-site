import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./LoyaltyPoints.scss";
import RedemptionHistoryTabContent from "../../../components/RedemptionHistoryTabContent/RedemptionHistoryTabContent";
import EarnedPointsTabContent from "../../../components/EarnedPointsTabContent/EarnedPointsTabContent";

function MyPointsLanding() {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

  return (
    <>
      <div className="content-wrapper">
        <Header title="My Point List" />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="loyaltypoints-container mt-2">
              <h1>{t("label.my_points")} </h1>

              <Tabs>
                <TabList>
                  <Tab>{t("label.redemption_history")}</Tab>
                  <Tab>{t("label.activity_points")}</Tab>
                </TabList>

                <TabPanel>
                  <RedemptionHistoryTabContent />
                </TabPanel>
                <TabPanel>
                  <EarnedPointsTabContent />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(MyPointsLanding);
