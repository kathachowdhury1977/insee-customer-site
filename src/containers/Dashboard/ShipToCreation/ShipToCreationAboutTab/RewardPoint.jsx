import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"



function RewardPoint(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section">
                <div className="row">
                    <div className="col-8">
                        <div className="product_heading">Reward Point</div>

                        <div className="row">
                            <div className="col-6">
                                <div className="product_brand_item_reward">
                                    <h6>TOTAL REWARD POINT</h6>
                                    <h5>2512</h5>
                                </div>
                                
                            </div>
                            <div className="col-6">
                            <div className="product_brand_item_reward">
                                    <h6>LAST EARNED REWARD POINT</h6>
                                    <h5>10</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <span><i class="fa fa-gift rewardRed" aria-hidden="true"></i></span>
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

export default withTranslation()(RewardPoint);