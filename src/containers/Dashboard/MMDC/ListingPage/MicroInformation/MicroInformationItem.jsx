
import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../ListingPage/Listing.scss";
import {Link} from 'react-router-dom';


function MicroInformationItem(props) { 
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
                    <div className="col-8">
                        {/* <div className="product_heading">PLC-Santha</div> */}
                    </div>
                    <div className="col-4 text-right pr-4">
                        <div className="action">
                            <span><Link to="/MicroInformationForm"><i className="fa fa-pencil"></i></Link></span>
                            <span><i className="fa fa-trash"></i></span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Market Potential</h6>
                            <h5>6000</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Insee Market Share</h6>
                            <h5>50%</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Change in Goverment Regulation</h6>
                            <h5>6000</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Average Rainfall (IN MM)</h6>
                            <h5>5</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Change in tax  structure</h6>
                            <h5>6000</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Average Income per Household</h6>
                            <h5>5</h5>
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

export default withTranslation()(MicroInformationItem);