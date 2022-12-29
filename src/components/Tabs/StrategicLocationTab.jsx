import React, { Component }  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MicroInformation from "../../containers/Dashboard/MMDC/ListingPage/MicroInformation/MicroInformation";
import UpcomingProjectLocation from "../../containers/Dashboard/MMDC/ListingPage/UpcomingProjectLocation/UpcomingProjectLocation";
import 'react-tabs/style/react-tabs.css';


const StrategicLocationTab = (props) => {
  return(
    <div className="upcoming_detail_plan">
         
         <div className="head_txt mt-3 mb-3"><h5><b>North Bangkok</b></h5></div>

        <Tabs>
            <TabList>
             <Tab>Micro Information</Tab>
             <Tab>Upcoming Project</Tab>
            </TabList>

            <div className="todo_sec">
                <TabPanel>
                   <MicroInformation/>
                </TabPanel>

                <TabPanel>
                  <UpcomingProjectLocation/>
                </TabPanel>
            </div> 
        </Tabs>
    </div>
  )
}

export default StrategicLocationTab;