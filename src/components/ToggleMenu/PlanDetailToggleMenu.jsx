import React, { useState } from "react";
import {Link} from 'react-router-dom';

const PlanDetailToggleMenu = () => {
    
  const text ="Lorem ipsum!";
  const [collapse, setCollapse] = useState(true);
  const [title, setTitle] = useState("+");
  const [icon, setIcon] = useState("fa fa-chevron-right");
  const collapseAll = () => {
    setCollapse(!collapse);
    setTitle((state) => {
      return state === "+" ? "×" : "+";
    });
  };

    return (
      <>
        <div className="plan_detail_toggle">
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
            <div className="item_value">
            <Link to ="/ListingDetail"> Capture Market Movement Data <i class="fa fa-camera-retro" aria-hidden="true"></i></Link>
            <Link to ="/AccountDetail">Go to Account <i class="fa fa-user" aria-hidden="true"></i></Link>
            <Link to ="/ShipToCreationDetail">Ship To / Retailer Creation <i class="fa fa-ship" aria-hidden="true"></i></Link>
            <Link to ="/CaseList">Create Case <i class="fa fa-briefcase" aria-hidden="true"></i></Link>
            </div>
        </div>
            
          {" "}
        </>
      ) : null}
    </div>
    </>
    )
}

export default PlanDetailToggleMenu;