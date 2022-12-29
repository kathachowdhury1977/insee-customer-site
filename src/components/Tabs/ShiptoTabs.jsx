import React, { Component }  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AboutTabs from '../ShipToCreation/AboutTabs';
import Shipto from '../ShipToCreation/Shipto';



const ShiptoTabs = (props) => {
  return(
    <Tabs>
    <TabList>
           <Tab>About</Tab>
           <Tab>Contact</Tab>
           <Tab>Ship - to</Tab>
            <Tab>Retailer</Tab>
          <Tab>Market Movement Data</Tab>
    </TabList>

    <TabPanel>
        <AboutTabs/>
    </TabPanel>

    <TabPanel>      
       <div className="text-center m-5"><h1>Work in Progress</h1></div>
    </TabPanel>
    <TabPanel>
      <Shipto/>
    </TabPanel>
    <TabPanel>
      <h2>Any content 4</h2>
    </TabPanel>
  </Tabs>
  )
}

 


export default ShiptoTabs;