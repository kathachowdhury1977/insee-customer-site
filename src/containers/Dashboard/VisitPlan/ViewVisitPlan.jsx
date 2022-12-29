import React, {useState} from "react";
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import SimpleAccordion from '../../../components/Accordian/Accordian';
import MyVisitPlanPopup from '../../../components/ModalPopup/MyVisitPlanPopup';
import MyVisitCheckoutPopup from '../../../components/ModalPopup/MyVisitCheckoutPopup';
import LandingToggle from '../../../components/ToggleMenu/LandingToggle';


function ViewVisitPlan() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation();
  const selectedDay = val => {
    console.log(val);
  };
  return (
    <>
    <div className="content-wrapper">
      <Header />

      <div className="mt-2 mb-5 pages_toggle">
           <LandingToggle/>
       </div>
      <div className="view_visit_section pt-3">
     
        <div className="container-fluid">
        {/* <div className="main_heading">
            My Visit Plan
            </div> */}
          <div className="visit_head_sec">
              <div className="row">
                  <div className="col-6">
                  
                  </div>
                  <div className="col-6 text-right">
                      <span className="visit_type">
                          <select name="" id="">
                              <option value="">All Visits</option>
                          </select>
                      </span>
                  </div>
              </div>
              </div>
          </div> 
          <div className="accordian_sec">   
        
             <SimpleAccordion heading ={"01 Dec, 20"}  />
             <SimpleAccordion heading ={"10 Dec, 20"} />
             <SimpleAccordion heading ={"10 Dec, 20"} />
             <SimpleAccordion heading ={"10 Dec, 20"} />
             <SimpleAccordion heading ={"10 Dec, 20"} />
             <SimpleAccordion heading ={"10 Dec, 20"} />
      
          </div> 
      </div>
      </div>
      <MyVisitPlanPopup show ={"true"} handleClose = {handleClose}/>
      <MyVisitCheckoutPopup  show ={"true"} handleClose = {handleClose}/>
    </>
  );
}

export default withTranslation()(ViewVisitPlan);
