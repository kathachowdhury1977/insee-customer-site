
import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../ListingPage/Listing.scss";
import {Link} from 'react-router-dom';


function UpcomingProjectLocationItem(props) { 
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
         <div className="product_brand_section">
                <div className="row mb-3">
                    <div className="col-5">
                        <div className="product_heading">Infrastructure</div>
                    </div>
                    <div className="col-7 text-right pr-4">
                        <div className="location_area">
                            <span className="city">Bangkok</span>
                            <span className="resident">Residential</span>
                        </div>
                        <div className="action">
                            <span><Link to="/UpcomingProjectLocationForm"><i className="fa fa-pencil"></i></Link></span>
                            <span><i className="fa fa-trash"></i></span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Start to end date</h6>
                            <h5>20/10/2020 to 20/10/2020</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Project Duration</h6>
                            <h5>24 Month(5)</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Investor</h6>
                            <h5>- RK Shikla</h5>
                            <h5>- SK Shikla</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Architect / Designer</h6>
                            <h5>- RK Shikla</h5>
                            <h5>- SK Shikla</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Consultant</h6>
                            <h5>- RK Shikla</h5>
                            <h5>- SK Shikla</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Engineer</h6>
                            <h5>- RK Shikla</h5>
                            <h5>- SK Shikla</h5>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="product_brand_item">
                            <h4><b>Insee Potential</b></h4>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Cement</h6>
                            <h5>3000 Tons</h5>
                          
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Mortar</h6>
                            <h5>3000 Tons</h5>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Conwood</h6>
                            <h5>3000 Sq. Mrts.</h5>
                          
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Mortar</h6>
                            <h5>2000 Cum</h5>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="product_brand_item">
                            <h6>Additional project Information</h6>
                            <h5>dfksnfk sdfmksfkkos snfknasfn sldmf dnkadnknna sndfafklka fnklsandfk snfnkajfk</h5>
                        </div>
                    </div>
             
                </div>
                
            </div>     
    </>
  );
}

export default withTranslation()(UpcomingProjectLocationItem);