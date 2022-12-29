import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function MarketMovementData(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section">
                <div className="row">
                    <div className="col-12">
                        <div className="product_heading">Market Movement Data</div>
                    </div>

                </div>

                <div className="row blueBoxContainer">
                    <div className="col-3 blueBoxMMD marginBottom10">
                        <p className="blueBoxMMD-text-top">SSG Cement </p>
                    </div>
                    <div className="col-3 blueBoxMMD marginBottom10">
                        <p className="blueBoxMMD-text-top">Thai Pride Cement </p>
                    </div>
                    <div className="col-3 blueBoxMMD marginBottom10">
                        <p className="blueBoxMMD-text-top">Asia Cement </p>
                    </div>

                    
                </div>

                <div className="row">
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>MARKET SHARE</h6>
                            <h5>40%</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>NUMERIC REACH</h6>
                            <h5>20</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="product_brand_item">
                            <h6>MARKET PRICE</h6>
                            <h5>1200 Thai Baht</h5>
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
                            <p><span className="lightText">Last added on</span> <span className="darkText">20-11-2020</span> | <span className="lightText">by</span> <span className="darkText">John Smith</span> &nbsp; <a href="#">View Operational Data</a></p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(MarketMovementData);