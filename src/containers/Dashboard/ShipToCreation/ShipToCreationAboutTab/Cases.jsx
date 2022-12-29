import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function Cases(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section">
                <div className="row">
                    <div className="col-12">
                        <div className="product_heading">Cases (23)</div>
                    </div>
                    
                </div>

                <div className="row blueBoxContainer">
                    <div className="col-3 blueBoxCase marginBottom10">
                       <p className="blueBoxCase-text-top">08 </p>
                       <p className="blueBoxCase-text-bottom">Open </p>
                    </div>
                    <div className="col-3 blueBoxCase marginBottom10">
                       <p className="blueBoxCase-text-top">05 </p>
                       <p className="blueBoxCase-text-bottom">Escalated </p>
                    </div>
                    <div className="col-3 blueBoxCase marginBottom10">
                       <p className="blueBoxCase-text-top">08 </p>
                       <p className="blueBoxCase-text-bottom">Closed </p>
                    </div>
                    
                    <div className="col-3 blueBoxCase">
                       <p className="blueBoxCase-text-top">08 </p>
                       <p className="blueBoxCase-text-bottom">Enquiry </p>
                    </div>
                    <div className="col-3 blueBoxCase">
                       <p className="blueBoxCase-text-top">05 </p>
                       <p className="blueBoxCase-text-bottom">Complain </p>
                    </div>
                    <div className="col-3 blueBoxCase">
                       <p className="blueBoxCase-text-top">08 </p>
                       <p className="blueBoxCase-text-bottom">Request </p>
                    </div>
                </div>
                <div className="row">
                     <div className="col-12 borderBottom marginBottom10">
                    </div>
                </div>
                <div className="row">
                     <div className="col-12">
                        <div className="product_bottom_item">
                           <p><span className="lightText">Last added on</span> <span className="darkText">20-11-2020</span> | <span className="lightText">by</span> <span className="darkText">John Smith</span> &nbsp; <a href="#">View All Case</a></p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(Cases);