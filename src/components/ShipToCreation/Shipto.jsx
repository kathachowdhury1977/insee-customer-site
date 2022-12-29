import React from "react";
import { withTranslation, useTranslation } from "react-i18next";
import './Shiptocreation.scss';
import Navigate from '../../assets/img/map.svg';
import Graph from './Graph';
import {Link} from 'react-router-dom';

function Shipto(props) {
  const { t } = useTranslation();
  const selectedDay = val => {
    console.log(val);
  };
  return (
    <>
    <div className="ship_about_tab_section">
       <div className="container-fluid">
           <div className="row">
               <div className="col-6"> <h3>West  Bangkok Plant</h3></div>
               <div className="col-6 text-right"><Link>Last 3 month Order Summary</Link></div>
           </div>
           <div className="row">
               <div>
                <Graph/>
               </div>
           </div>
 
               <div className="shipto_update mt-4">
               <div className="row">
                 <div className="col-8">
                    <p>Last Visited on <span>20-11-2020</span> ! by <span>Jhon Smith</span></p>
                    <p>Last order placed on <span>01st Dec2020</span></p>
                 </div>
                   <div className="col-4 text-right ship_status pending"><Link>Pending</Link></div>
               </div>
           </div>
       </div>
    </div>
   
    </>
  );
}

export default withTranslation()(Shipto);
