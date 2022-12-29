import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function PurchaseHabits(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section">
                <div className="row">
                    <div className="col-12">
                        <div className="product_heading">Purchase Habits</div>
                    </div>

                </div>


                <div className="row">
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_CASH</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_CASH</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_NON_WEB_SALES</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_WEB_SALES</h6>
                            <h5>25%</h5>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_CASH</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_CASH</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_NON_WEB_SALES</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_WEB_SALES</h6>
                            <h5>25%</h5>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_CASH</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_CASH</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_NON_WEB_SALES</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="product_brand_item">
                            <h6>MTD_WEB_SALES</h6>
                            <h5>25%</h5>
                        </div>
                    </div>
                </div>




            </div>
        </>
    );
}

export default withTranslation()(PurchaseHabits);