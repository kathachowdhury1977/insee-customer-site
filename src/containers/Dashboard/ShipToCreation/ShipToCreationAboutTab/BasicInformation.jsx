import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function BasicInformation(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section">
                <div className="row">
                    <div className="col-12">
                        <div className="product_heading">Basic Information</div>
                    </div>

                </div>


                <div className="row">
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>CORPORATE REGISTRATION</h6>
                            <h5>TH02CNH02157</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>COMMERCIAL REGISTRATION</h6>
                            <h5>C2514CV15578</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>TAX NUMBER</h6>
                            <h5>12516842145</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>DISTRIBUTION CHANNEL</h6>
                            <h5>Agent</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>TERMS OF PAYMENT</h6>
                            <h5>Credit</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>CONTACT PHONE</h6>
                            <h5>0124 5841258</h5>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-12 borderBottom marginBottom10">
                    </div>
                </div>
                <div className="row">

                    <div className="col-12">                   
                        <div className="product_bottom_item">                       
                          <p>
                          <span><i class="fa fa-map-marker location-style" aria-hidden="true"></i></span>
                              <span className="lightText"> &nbsp;1177 Pearl Bangkok Building, 23rd Floor, Phaholyothin Road, Phayathai Sub District, Phayathai District, Bangkok 10400</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(BasicInformation);