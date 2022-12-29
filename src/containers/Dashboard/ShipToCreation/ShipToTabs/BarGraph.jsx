import React from 'react';
import "../ShipToCreationAbout.scss";
import BarChart from "./BarChart";
import { Link } from  "react-router-dom";



const BarGraph = (props) => {
    return (
        <>
           <div className="bar_graph">
               <Link to={props.src}>
               <div className="col-12">
                    <div className="row pt-2 pb-2 head_sec">
                    <div className="col-4 pr-0">
                        <h5>{props.title}</h5>
                    </div>
                    <div className="col-6">
                        <span className="order_summry">
                            {props.monthsummary}
                        </span>
                    </div>
                    <div className="col-2 pl-0">
                        <span className={props.class}>
                            {props.status}
                        </span>
                    </div>
                    </div>  
               </div>
                 
                  <BarChart Width="500" Height="200"/>

                  <div className="col-12">
                    <div className="row pt-2 pb-2 bottom_sec">
                            <div className="col-6 text-left">
                               <span>Created on <b>20-11-2020</b> | by <b>Jhon Smith</b></span>
                            </div>

                            <div className="col-6 text-right pl-0">
                               <span>Last Visited on <b>20-11-2020</b> | by <b>Jhon Smith</b></span>
                            </div>
                    </div>
                  </div>
                  
                  {props.reject === "true" ? 
                  (<div className="col-12 reject_section">
                      <div className="row p-2">
                         <div className="reject_head_sec">
                           <h6>Rejection Reason</h6>
                            <i className="fa fa-pencil"></i>
                         </div>
                         <p className="text-dark">Incomplete data such as too small a sample size or missing or poor controls. poor analysis such as using 
                             inappropriate statistical test or lack of statistics altogether.
                         </p>
                      </div>
                  </div>) :null
                  }
                    
               </Link>
           </div>
               
        </>
    ); 

}
   export default BarGraph;