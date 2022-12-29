import React, { Component }  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import planImage from '../../assets/img/logos.png';
import planTypeImage from  '../../assets/img/plantype.png';
import { Navbar, Nav } from 'react-bootstrap';



const Tabing = (props) => {
  return(
      <>
    <Tabs>
    <TabList>
      <Tab>Suggested Plan</Tab>
      <Tab>My Beats</Tab>
      <Tab>Leads</Tab>
      <Tab>Accounts</Tab>
    </TabList>

    <TabPanel>
      <div className="container-fluid p-0">
          <div className="row">
              <div className="col-12 mb-3">
                  <div className="suggest_sec">
                  <div className="row">
                      <div className="col-1"><div className="img_logo"> <img src ={planImage}/></div></div>
                      <div className="col-10">
                          <div className="row plan_sec">
                            <span className="col-3 plan_head">B.S Enterprises</span>
                            <div className="plan_txt col-6">
                            <img className="plan_image" src={planTypeImage}/>
                                <span className="plan_type">Focus</span>
                                  <select name="" id="" data-toggle="modal" disabled>
                                    <option value="">Visit Time & Obejective</option>
                                </select>
                                </div>
                          </div>
                        </div>
                      <div className="col-1 submit_check">
                      <div class="form-group">
                        <input type="checkbox"/>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>

              <div className="col-12 mb-3">
                  <div className="suggest_sec">
                  <div className="row">
                      <div className="col-1"><div className="img_logo"> <img src ={planImage}/></div></div>
                      <div className="col-10">
                          <div className="row plan_sec">
                            <span className="col-3 plan_head">B.S Enterprises</span>
                            <div className="plan_txt col-6">
                            <img className="plan_image" src={planTypeImage}/>
                                <span className="plan_type">Focus</span>
                                <select name="" id="" disabled>
                                    <option value="">Visit Time & Obejective</option>
                                </select>
                                </div>
                          </div>
                        </div>
                      <div className="col-1 submit_check">
                      <div class="form-group">
                        <input type="checkbox"/>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>
              <div className="col-12 mb-3">
                  <div className="suggest_sec">
                  <div className="row">
                      <div className="col-1"><div className="img_logo"> <img src ={planImage}/></div></div>
                      <div className="col-10">
                          <div className="row plan_sec">
                            <span className="col-3 plan_head">B.S Enterprises</span>
                            <div className="plan_txt col-6">
                            <img className="plan_image" src={planTypeImage}/>
                                <span className="plan_type">Focus</span>
                                <select name="" id="" disabled>
                                    <option value="">Visit Time & Obejective</option>
                                </select>
                                </div>
                          </div>
                        </div>
                      <div className="col-1 submit_check">
                      <div class="form-group">
                        <input type="checkbox"/>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>
              <div className="col-12 mb-3">
                  <div className="suggest_sec">
                  <div className="row">
                      <div className="col-1"><div className="img_logo"> <img src ={planImage}/></div></div>
                      <div className="col-10">
                          <div className="row plan_sec">
                            <span className="col-3 plan_head">B.S Enterprises</span>
                            <div className="plan_txt col-6">
                            <img className="plan_image" src={planTypeImage}/>
                                <span className="plan_type">Focus</span>
                                <select name="" id="" disabled>
                                    <option value="">Visit Time & Obejective</option>
                                </select>
                                </div>
                          </div>
                        </div>
                      <div className="col-1 submit_check">
                      <div class="form-group">
                        <input type="checkbox"/>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>
              
          </div>
       
          
      </div>
      
    </TabPanel>
    <TabPanel>
          
    <div className="container-fluid p-0">
          <div className="row">
              <div className="col-12 mb-3">
                  <div className="suggest_sec">
                  <div className="row">
                      <div className="col-1"><div className="img_logo"> <img src ={planImage}/></div></div>
                      <div className="col-10">
                          <div className="row plan_sec">
                            <span className="col-3 plan_head">S.S Enterprises</span>
                            <div className="plan_txt col-6">
                            <img className="plan_image" src={planTypeImage}/>
                                <span className="plan_type">Hunting</span>
                                <select name="" id="" disabled>
                                    <option value="">Visit Time & Obejective</option>
                                </select>
                                </div>
                          </div>
                        </div>
                      <div className="col-1 submit_check">
                      <div class="form-group">
                        <input type="checkbox"/>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>

              <div className="col-12 mb-3">
                  <div className="suggest_sec">
                  <div className="row">
                      <div className="col-1"><div className="img_logo"> <img src ={planImage}/></div></div>
                      <div className="col-10">
                          <div className="row plan_sec">
                            <span className="col-3 plan_head">S.S Enterprises</span>
                            <div className="plan_txt col-6">
                            <img className="plan_image" src={planTypeImage}/>
                                <span className="plan_type">Hunting</span>
                                <select name="" id="" disabled>
                                    <option value="">Visit Time & Obejective</option>
                                </select>
                                </div>
                          </div>
                        </div>
                      <div className="col-1 submit_check">
                      <div class="form-group">
                        <input type="checkbox"/>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>
              
          </div>
       
          
      </div>
    </TabPanel>
    <TabPanel>
      <h2>Any content 3</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 4</h2>
    </TabPanel>
  </Tabs>
   
   
   </>

  )
}

 


export default Tabing