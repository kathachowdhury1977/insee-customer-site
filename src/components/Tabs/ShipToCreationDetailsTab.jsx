import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ShipToCreationAbout from "../../containers/Dashboard/ShipToCreation/ShipToCreationAbout";
import ShipToTabs from "../../containers/Dashboard/ShipToCreation/ShipToTabs/ShipToTabs";
import PlanDetailsCard from "../../components/PlanDetailsCard/PlanDetailsCard";


const ShipToCreationDetailsTab = (props) => {
    return (
        <div className="upcoming_detail_plan">
            <Tabs>
                <TabList>
                    <Tab>About</Tab>
                    <Tab>Contact</Tab>
                    <Tab>Ship-To</Tab>
                    <Tab>Retailer</Tab>
                    <Tab>Market Movement Data</Tab>
                    <Tab>Visit</Tab>
                </TabList>
                <PlanDetailsCard/>
                 <TabPanel>
                     <ShipToCreationAbout/>
                </TabPanel>
                  
                <TabPanel>
                  Contant
                </TabPanel>
            
               <TabPanel>
                  <ShipToTabs/>
                </TabPanel>

                <TabPanel>
                <ShipToTabs/>
                </TabPanel>

            </Tabs>
        </div>
    )
}

export default ShipToCreationDetailsTab