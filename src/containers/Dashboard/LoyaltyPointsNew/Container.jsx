import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import { Tab, Tabs } from "@material-ui/core";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RedeenHistoryList from "./RedemptionHistory/RedeenHistoryList";
import ActivityPointsList from "./ActivityPoints/ActivityPointsList";
import AllocationHistory from "./AllocationHistory/AllocationHistory";
import MyPoints from "./MyPoints/MyPoints";
import HeaderText from "./HeaderText";
import AllocationVolume from "./AllocationVolume/AllocationVolume";

const LinkTab = (props) => {
  const { t } = useTranslation();
  return (
    <Button
      target="_blank"
      href={process.env.REACT_APP_INSEE_LIFE_REDEEM_POINTS_URL}
      endIcon={<OpenInNewIcon />}
    >
      {t("label.redeem_points")}
    </Button>
  );
};
function LoyaltyPointsNewContainer(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <div className="content-wrapper">
        <Header title={t("nav.loyaltypoints")} />
        <div className="row ipad_css ">
          <div className="mainScroll">
            <div className="col-12 mt-2">
              <HeaderText />
              <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label={t("label.my_points")} />
                <Tab label={t("label.allocate_volume")} />
                <Tab label={t("label.allocation_history")} />
                <Tab label={t("label.activity_points")} />
                <Tab label={t("label.redemption_history")} />
                <LinkTab
                  value={5}
                />
              </Tabs>
              {selectedTab === 4 && <RedeenHistoryList />}
              {selectedTab === 3 && <ActivityPointsList />}
              {selectedTab === 2 && <AllocationHistory />}
              {selectedTab === 1 && <AllocationVolume />}

              {selectedTab === 0 && <MyPoints />}

              {/* coming soon */}
              {/* <SubDealerList /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(LoyaltyPointsNewContainer);
