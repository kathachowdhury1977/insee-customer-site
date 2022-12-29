import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./ShipToCreationHeadingTab.scss";
import '../MMDC/ListingPage/Listing.scss'
import { Link } from "react-router-dom";

function ShipToCreationHeadingTab(props) {
const { t } = useTranslation();
const [showResults, setShowResults] = React.useState(false)
const onClick = () => setShowResults(true)



    return (
        <>
            <div className="container-fluid p-0">
                <div className="shipto-heading_section">
                    <div className="row">
                        <div className="col-6">
                            <p>Chettinad Enterprise</p>
                        </div>
                        <div className="col-6 text-right paddingRight">
                       
                            <button className="btn" type="button"><Link to="/CreateToNewShip" className="text-white">Create New Ship To</Link></button>
                            <i class="fa fa-bars" onClick={onClick} aria-hidden="true"></i>
                        </div>

                    </div>


                    { showResults ?
                    <div class="Listing">
                        <div className="list_tems">
                            <ul>
                                <li>
                                    <Link to="/">Pending</Link>
                                </li>
                                <li>
                                    <Link to="/">Approved</Link>
                                </li>
                                <li>
                                    <Link to="/">Rejected</Link>
                                </li>
                            </ul>
                        </div>
                    </div> : null }
                </div>



            </div>
        </>
    );
}

export default withTranslation()(ShipToCreationHeadingTab);