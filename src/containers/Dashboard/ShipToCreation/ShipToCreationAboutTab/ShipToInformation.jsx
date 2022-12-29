import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function ShipToInformation(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section ShipToInfoBox">
                <div className="row">
                    <div className="col-12">
                        <div className="product_heading">Ship To Information</div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-12">

                        <p>
                            <span><i class="fa fa-map-marker location-style" aria-hidden="true"></i></span>
                            <span className="lightText"> &nbsp;1177 Pearl Bangkok Building, 23rd Floor, Phaholyothin Road, Phayathai Sub District, Phayathai District, Bangkok 10400</span>
                        </p>


                    </div>

                </div>

                <div className="row">
                    <div className="col-12 borderBottom marginBottom10">
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="product_bottom_item">
                            <p><span className="lightText">Last added on</span> <span className="darkText">20-11-2020</span> | <span className="lightText">by</span> <span className="darkText">John Smith</span> &nbsp; <a href="#">View Reward History</a></p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(ShipToInformation);