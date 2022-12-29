import React from "react";
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import SimpleAccordion from '../../../components/Accordian/Accordian';
import LandingToggle from '../../../components/ToggleMenu/LandingToggle';

function ViewVisitPlan() {
  const { t } = useTranslation();
  const selectedDay = val => {
    console.log(val);
  };
  return (
    <>
    <div className="content-wrapper ">

    
      <Header />
      
      <div className="mt-2 mb-3 pages_toggle">
           <LandingToggle/>
       </div>
      
      <div className="view_visit_section pt-3 mt-5">
     
          <div className="accordian_sec">   
        
             <SimpleAccordion heading ={"01 Dec, 20"}  />
             <SimpleAccordion heading ={"10 Dec, 20"} />
             <SimpleAccordion heading ={"10 Jan, 20"} />
             <SimpleAccordion heading ={"21 Feb, 20"} />
             <SimpleAccordion heading ={"30 Feb, 20"} />
             <SimpleAccordion heading ={"31 Jul, 20"} />
      
          </div> 
      </div>
      </div>
    </>
  );
}

export default withTranslation()(ViewVisitPlan);
