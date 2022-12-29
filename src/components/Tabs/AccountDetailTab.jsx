import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ImageTitle from "../AccountDetail/ImageTitle/ImageTitle";
import ShipToCreationAbout from "../../containers/Dashboard/ShipToCreation/ShipToCreationAbout";
import Case from "../../containers/Dashboard/CaseCreation/CaseList/Case";

const ListingDetailTabs = (props) => {
  return (
    <div className="upcoming_detail_plan">
      <Tabs>
        <TabList>
          <Tab>About</Tab>
          <Tab>Contact</Tab>
          <Tab>Ship-to</Tab>
          <Tab>Cases</Tab>
          <Tab>Schemes & Promotions</Tab>
          <Tab>Visits</Tab>
        </TabList>
        <ImageTitle />

        <div className="todo_sec">
          <TabPanel>
            <ShipToCreationAbout type ="account"/>
          </TabPanel>

          <TabPanel>

          </TabPanel>

          <TabPanel>

          </TabPanel>

          <TabPanel>
            <Case/>
            </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default ListingDetailTabs;
