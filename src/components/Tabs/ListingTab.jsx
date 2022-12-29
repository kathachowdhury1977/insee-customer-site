import React, { Component }  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UpcomingPlan from "../../components/UpcomingPlan/UpcomingPlan";
import banger from "../../assets/img/banger.jpeg";
import Strategic from "../../containers/Dashboard/MMDC/ListingPage/Strategic/Strategic";
import Influencer from "../../containers/Dashboard/MMDC/ListingPage/Influencer/Influencer";


const ListingTab = (props) => {
  return(
    <div className="upcoming_detail_plan">
        <Tabs>
            <TabList>
             <Tab>Operational</Tab>
             <Tab>Strategic</Tab>
             <Tab>Influencer</Tab>
            </TabList>

            <div className="todo_sec">
                <TabPanel>
                    <div class="row"  style ={{marginTop: "-15px"}}>
                    <UpcomingPlan
                        image={banger}
                        class={"col-sm-12 col-md-6 col-lg-6"}
                        src={"/ListingDetail"}
                        title={"Bungur Enterprises"}
                        contact={"65478-79879"}
                        amv={"3000 Tons"}
                        inseeGrowth={"20%"}
                        inseeSow={"50%"}
                    />
                    <UpcomingPlan
                        image={banger}
                        class={"col-sm-12 col-md-6 col-lg-6"}
                        src={"/ListingDetail"}
                        title={"For test"}
                        contact={"+91-9045106630"}
                        amv={"500 Tons"}
                        inseeGrowth={"50%"}
                        inseeSow={"30%"}
                    />

                      <UpcomingPlan
                        image={banger}
                        class={"col-sm-12 col-md-6 col-lg-6"}
                        src={"/PlanDetail"}
                        title={"Bungur Enterprises"}
                        contact={"65478-79879"}
                        amv={"3000 Tons"}
                        inseeGrowth={"20%"}
                        inseeSow={"50%"}
                    />
                    <UpcomingPlan
                        image={banger}
                        class={"col-sm-12 col-md-6 col-lg-6"}
                        src={"/PlanDetail"}
                        title={"For test"}
                        contact={"+91-9045106630"}
                        amv={"500 Tons"}
                        inseeGrowth={"50%"}
                        inseeSow={"30%"}
                    />
                    </div>
                </TabPanel>

                <TabPanel>
                  <Strategic/>
                </TabPanel>
            
               <TabPanel>
                <Influencer/>
                </TabPanel>

            </div>

            
        
        </Tabs>
    </div>
  )
}

export default ListingTab