import React, { Component }  from 'react';
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Navbar, Nav } from 'react-bootstrap';
import TodoStatus from '../../../components/Tabs/TodoStatus';

function Todos() {
  const { t } = useTranslation();
  const selectedDay = (val) => {
    console.log(val);
  };
  return (
    <>
    <div className="content-wrapper">
      <Header />
        <div className="todo_page_section">

           <div className="todo_section">
           <Tabs className="">
            <TabList>
                <Tab>Tasks</Tab><Tab>Cases</Tab>
            </TabList>
            <TabPanel>
            {/* <Navbar collapseOnSelect expand="lg" className="mb-3 todo">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link href="#pending">Pending</Nav.Link>
                    <Nav.Link href="#completed">Completed</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>  */}

            <TodoStatus/>
            </TabPanel>
            <TabPanel>
               <div className="ml-4">Cases</div>
            </TabPanel>
              </Tabs>

           </div>

        </div>
        </div>
    </>
  );
}

export default withTranslation()(Todos);
