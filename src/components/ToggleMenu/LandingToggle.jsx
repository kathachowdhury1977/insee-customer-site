import React, { useState } from "react";
import {Link} from 'react-router-dom';

const LandingToggle = () => {
    
  const text ="Lorem ipsum!";
  const [collapse, setCollapse] = useState(true);
  const [title, setTitle] = useState("+");
  const [icon, setIcon] = useState("fa fa-chevron-right");
  const collapseAll = () => {
    setCollapse(!collapse);
    // setIcon((state) => {
    //   return state === "fa fa-chevron-right"
    //     ? "fa fa-chevron-down"
    //     : "fa fa-chevron-right";
    // });
    setTitle((state) => {
      return state === "+" ? "×" : "+";
    });
  };

    return (
        <div className="toggle_section">
      <button
        type="button"
        className="btn-danger"
        onClick={collapseAll}
      >
       {title}
      </button>
      {title === "×" ? (
        <> 
        <div className="toggle_menu_items">
            <Link to ="/NextMonthPlan">Create next Month plan</Link>
            <Link to ="/ViewSubmittedPlan">View submitted plan</Link>
            <Link to ="/VisitGuidelineMatrix">Suggested visit guideline matrix</Link>
            <Link to ="/ViewVisitPlan">My visit plan</Link>
        </div>
            
          {" "}
        </>
      ) : null}
    </div>
    )
}

export default LandingToggle;