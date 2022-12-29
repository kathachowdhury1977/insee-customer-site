import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../ListingDetail.scss";
import {Link} from 'react-router-dom';


function FleetInformationItem(props) { 
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
                <div className="row mb-2">
                    <div className="col-8">
                        <div className="product_heading">No. of Own  Track: 2</div>
                    </div>
                    <div className="col-4 text-right pr-4">
                        <div className="action">
                            <span><Link to="/FleetInformationForm"><i className="fa fa-pencil"></i></Link></span>
                            <span><i className="fa fa-trash"></i></span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Capcity of track 1</h6>
                            <h5>50 KG</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Capcity of track 2</h6>
                            <h5>50 KG</h5>
                        </div>
                    </div>
                   
                </div>

                <div className="row mb-3 mt-3">
                    <div className="col-12">
                        <div className="product_heading">No. of Own  Track: 2</div>
                    </div>   
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Capcity of Barges 1</h6>
                            <h5>50 KG</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Capcity of Barges 2</h6>
                            <h5>50 KG</h5>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Shiping Condition</h6>
                            <h5>Labor</h5>
                        </div>
                    </div>
                   
                </div>
                
            </div>   

    </>
  );
}

export default withTranslation()(FleetInformationItem);