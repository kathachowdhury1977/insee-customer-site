import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Ambuja from "../../../../../assets/img/ambuja.jpg"
import navigate from '../../../../../assets/img/add_map.svg';
import phone from '../../../../../assets/img/phone.svg';
import "./Influencer.scss";
import {Link} from 'react-router-dom';


function InfluencerItem(props) { 
  const { t } = useTranslation();
  const [validate, setValidate] = useState(false);
  const selectedDay = (val) => {
    console.log(val);
  };
  function onToggleChange(checked) {
   
    setValidate(checked)
    }

  function handleChange(event, name) {
    console.log(event, "event target", name);
  }
  function onSelectChange(event) {
    console.log(event);
  }
 
  return (
    <>
      {/* <div className="influncer-section">
         <div className="col-12">
             <div className="row">
                 <div className="col-10">
                     <div className="infunce_dtls">
                         <h4><b>John Miller</b></h4>
                          <span> <img src={navigate}/> Bangkok | Masons</span>
                     </div>
                 </div>
                 <div className="col-2 text-center">
                     <div className="call_sec"> 
                         <img src={phone}/>
                        <span>CALL</span>  
                     </div>
                 </div>
             </div>

             <div className="row">
                 <div className="col-12">
                   <div class="status">Last Captured on <span>20-11-2020</span> by <span>Jhon Smith</span></div>
                 </div>
             </div>
         </div>
      </div> */}

          <div className="product_brand_section influncer-section">
                <div className="row mb-3">
                    <img className="influnce_bg" src={Ambuja}/>
                    <div className="col-5">
                        <div className="product_heading">Ambuja Cement</div>
                    </div>
                    <div className="col-7 text-right pr-4">
                        <div className="location_area">
                            {/* <span className="city">Bangkok</span> */}
                            <span className="resident">Residential</span>
                        </div>
                        <div className="action">
                            <span><Link to="/InfluencerForm"><i className="fa fa-pencil"></i></Link></span>
                            <span><i className="fa fa-trash"></i></span>
                        </div>
                    </div>
                </div>

                <div className="cement_sec">
                    <span className="scg_bgcolor">SCG Cement</span>
                    <span className="thai_bgcolor">Thai Pride Cement</span>
                    <span className="ambuja_bgcolor">Ambuja Cement</span>
                
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Total Requirment</h6>
                            <h5>3000 Tons</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Total Volume Consumed</h6>
                            <h5>2000 Tons</h5>
                        </div>
                    </div>
                    
                    <div className="col-12">
                        <div className="product_brand_item">
                            <h6>Additional project Information</h6>
                            <h5>dfksnfk sdfmksfkkos snfknasfn sldmf dnkadnknna sndfafklka fnklsandfk snfnkajfk</h5>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="product_brand_item">
                            <h6>Feedback</h6>
                            <h5>dfksnfk sdfmksfkkos snfknasfn</h5>
                        </div>
                    </div>
             
                </div>
                
            </div> 
    </>
  );
}

export default withTranslation()(InfluencerItem);