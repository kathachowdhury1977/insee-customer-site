import React from "react";
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import StrategicLocationName from "./StrategicLocationName";
import InputSearch from '../../../../../components/InputSearch/InputSearch';

function StrategicVerticalTab(props) {
  return (
    <Tabs defaultTab="vertical-tab-one" vertical className="vertical-tabs">
      <TabList>
        <Tab tabFor="vertical-tab-one">REGION</Tab>
        <Tab tabFor="vertical-tab-two">PROVINACE / ASE TERRITORY</Tab>
        <Tab tabFor="vertical-tab-three">DISTRICT / DISTRIBUTOR TERRITORY</Tab>
      </TabList>

      <TabPanel tabId="vertical-tab-one">
         <InputSearch/>
        <div>
        <StrategicLocationName LocationName= "North Bangkok"/>
        <StrategicLocationName LocationName= "North Bangkok"/>
        <StrategicLocationName LocationName= "North Bangkok"/>
        </div>
      </TabPanel>

      <TabPanel tabId="vertical-tab-two">
        <p>Tab 2 content</p>
      </TabPanel>

      <TabPanel tabId="vertical-tab-three">
        <p>Tab 3 content</p>
      </TabPanel>
    </Tabs>
  );
}

export default StrategicVerticalTab;