import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function QuickSummary(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section">
                <div className="row">
                    <div className="col-6">
                        <div className="product_heading">Quick Summary</div>
                    </div>
                    <div className="col-6 text-right pr-4">
                        <div className="product_headingTwo">
                            <span className="spanOne">Customer Tier :</span> <span className="spanTwo">Diamond</span>
                        </div>
                    </div>
                </div>

                <div className="row blueBoxContainer">
                    <div className="col-3 blueBox">
                       <p className="blueBox-text-top">20 </p>
                       <p className="blueBox-text-bottom">Total Stakeholders </p>
                    </div>
                    <div className="col-3 blueBox">
                       <p className="blueBox-text-top">20 </p>
                       <p className="blueBox-text-bottom">Total Stakeholders </p>
                    </div>
                    <div className="col-3 blueBox">
                       <p className="blueBox-text-top">20 </p>
                       <p className="blueBox-text-bottom">Total Stakeholders </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>CREDIT LIMIT</h6>
                            <h5>3000 Thai Baht</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>BG VALUE</h6>
                            <h5>5000 Thai Baht</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>TOTAL REWARD POINT</h6>
                            <h5>500</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>TOTAL OPEN CASES</h6>
                            <h5>20</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>TOTAL CLOSED CASES</h6>
                            <h5>5000 Thai Baht</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>TOTAL ESCALATED CASES</h6>
                            <h5>10</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>ACCOUNT OWNER</h6>
                            <h5>Kumar Gautam</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>SHIPPING CONDITION</h6>
                            <h5>Delivery</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>CONTACT PERSON</h6>
                            <h5>John Ober</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="product_brand_item">
                            <h6>CONTACT MOBILE</h6>
                            <h5>+1 800 521 625</h5>
                        </div>
                    </div>
                    <div className="col-6 borderBottom">
                        <div className="product_brand_item">
                            <h6>EMAIL</h6>
                            <h5>ober@gmail.com</h5>
                        </div>
                    </div>
                    <div className="col-6 borderBottom">
                        <div className="product_brand_item">
                            <h6>BIRTHDAY</h6>
                            <h5>02/12/2020</h5>
                        </div>
                    </div>
                    
                    <div className="col-12">
                        <div className="product_bottom_item">
                           <p><span className="lightText">Last visited on</span> <span className="darkText">20-11-2020</span> | <span className="lightText">by</span> <span className="darkText">John Smith</span></p>
                           <p><span className="lightText">Last market movement data captured on</span> <span className="darkText">20-11-2020</span> | <span className="lightText">by</span> <span className="darkText">John Smith</span></p>
                           <p><span className="lightText">Last order placed on </span> <span className="darkText">1st Dec 2020</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(QuickSummary);