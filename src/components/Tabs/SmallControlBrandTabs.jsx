import React, { Component }  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProductBrand from '../../containers/Dashboard/MMDC/RetailBrand/ProductBrand/ProductBrand';
import MarketingActivity from '../../containers/Dashboard/MMDC/RetailBrand/MarketingActivity/MarketingActivity';
import FleetInformation from '../../containers/Dashboard/MMDC/RetailBrand/FleetInformation/FleetInformation';
import FeedbackMarket from '../../containers/Dashboard/MMDC/RetailBrand/FeedbackMarketIntelligence/FeedbackMarketIntelligence';
import UpcomingProjectLocation from "../../containers/Dashboard/MMDC/ListingPage/UpcomingProjectLocation/UpcomingProjectLocation";

const SmallControlBrandTab = (props) => {
  return(
    <div className="upcoming_detail_plan">
        <Tabs>
            <TabList>
             <Tab>Product Brand</Tab>
             <Tab>Project Information</Tab>
             <Tab>Market  Activity</Tab>
             <Tab>Feedback / Market Intelligence Information</Tab>
            </TabList>

            <div className="todo_sec">
                <TabPanel>
                   <ProductBrand/>
                </TabPanel>

                <TabPanel>
               <UpcomingProjectLocation/>
                </TabPanel>
                  
                <TabPanel>
                 <MarketingActivity/>
                </TabPanel>

                <TabPanel>
                  <FeedbackMarket/>
                </TabPanel>

            </div>      
        
        </Tabs>
    </div>
  )
}

export default SmallControlBrandTab;