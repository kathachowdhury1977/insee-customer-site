import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function VisitInformation(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section visitInfoBox">
            <div className="row">
                    <div className="col-6">
                        <div className="product_heading">Visit Information</div>
                    </div>
                    <div className="col-6 text-right">
                       <a href="#" className="font-12">View Details Info</a>
                    </div>
                    <div className="col-12">
                        <div className="product_headingTwo ">
                            <span className="spanOne">Visit Objective :</span> <span className="spanTwo">NEW PRODUCT LAUNCH</span><br />
                            <span className="spanOne">Next Step :</span> <span className="spanTwo">NEED TO GIVE DEMO</span>
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
                            <p><span className="lightText">Last captured on</span> <span className="darkText">20-11-2020</span> | <span className="lightText">by</span> <span className="darkText">John Smith</span> </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(VisitInformation);