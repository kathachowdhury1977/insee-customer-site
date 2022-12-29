import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../../MMDC/ListingPage/Listing.scss";
import { Link } from 'react-router-dom';
import "../ShipToCreationAboutTab/QuickSummary.scss"
import { Avatar } from "@material-ui/core";
import userlogo from '../../../../assets/img/men.jpg';


function Contact(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);


    return (
        <>
            <div className="product_brand_section reailer-box">
                <div className="row">
                    <div className="col-12">
                        <div className="product_heading">Contacts</div>
                        <div className="contactBox">
                            <div className="contactBoxLeft">
                                <Avatar alt="Remy Sharp" src={userlogo} />

                            </div>
                            <div className="contactBoxRight">
                                <div className="boxLeft">
                                    <span className="spanFrst">Kumar Cement</span>  <br />
                                    <span className="spanSecond">Engineer</span>

                                </div>
                                <div className="boxRight">
                                    <span className="spanThird">
                                        <i class="fa fa-envelope" aria-hidden="true"></i> johnd@gmail.com
                                    </span>
                                    <br />
                                    <span className="spanThird">
                                        <i class="fa fa-phone" aria-hidden="true"></i> +1 8100 528 20
                                    </span>
                                </div>


                            </div>
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
                            <p><span className="lightText">Last added on</span> <span className="darkText">20-11-2020</span> | <span className="lightText">by</span> <span className="darkText">John Smith</span> &nbsp; <a href="#">View All Stakeholders</a></p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default withTranslation()(Contact);