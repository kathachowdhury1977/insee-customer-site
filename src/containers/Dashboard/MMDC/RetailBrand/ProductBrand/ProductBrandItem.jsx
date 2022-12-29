
import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../ListingDetail.scss";
import {Link} from 'react-router-dom';


function ProductBrandItem(props) { 
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
                        <div className="product_heading">PLC-Santha</div>
                    </div>
                    <div className="col-4 text-right pr-4">
                        <div className="action">
                            <span><Link to="/ProductBrandForm"><i className="fa fa-pencil"></i></Link></span>
                            <span><i className="fa fa-trash"></i></span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Avg Monthly Volume</h6>
                            <h5>3000 Ton</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Current Stock</h6>
                            <h5>35000 Ton</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Purchage Price</h6>
                            <h5>3000 per Ton</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Payment Term</h6>
                            <h5>Less than 7 Days</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Cash Discount</h6>
                            <h5>3000 per Bag</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Retailer From Discributor End Customer</h6>
                            <h5>3000 per Bag</h5>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="product_brand_item">
                            <h6>Branding program</h6>
                            <h5>Retailer Board:20 POSM: 20 Standees: 20</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Supply Location</h6>
                            <h5>Bangkok</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>Buying from Distributor</h6>
                            <h5>Warehouse</h5>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="product_brand_item">
                            <h6>Customer Feedback</h6>
                            <h5>sdfmvls sdfmlm dfgmsdlm asdasf sfmksn</h5>
                        </div>
                    </div>
                </div>
                
            </div>     
    </>
  );
}

export default withTranslation()(ProductBrandItem);