import React, { Component }  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



const TodoStatus = (props) => {
  return(
    <div className="todo_status">
        <Tabs>
            <TabList>
            <Tab>Pending</Tab>
            <Tab>Completed</Tab>
            </TabList>

            <div className="todo_sec">
            <TabPanel>
                <div className="visit_report mt-4 mb-2">
                  <p className="visit_head">Visit Reporting</p>
                  <span className="number">10</span>
              </div>
            
            </TabPanel>
            <TabPanel>
            <div className="visit_report mt-4 mb-2">
                  <p className="visit_head">Visit Reporting</p>
                  <span className="number">5</span>
              </div>
           </TabPanel>

            </div>

            
        
        </Tabs>
    </div>
  )
}

 


export default TodoStatus