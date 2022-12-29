import React from 'react';
import "../ShipToCreationAbout.scss";
import BarGraph from "./BarGraph";
import NewShipToConfirmBox from "../Status/NewShipToConfirmBox";

const ShipToTabs = (props) => {
    return (
        <>
           <div className="ship_to_about">
           <div className="plan-detail-card-container">
                        </div>
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-6">
                                <BarGraph 
                                 src= "/Pending"
                                 title="West Bangkok Plant"
                                 monthsummary="Last 3 Month Order Summary"
                                 status = "pending"
                                 class ="status pending"
                                 />
                            </div>
                            <div className="col-6">
                              <BarGraph 
                                 src= "/Approval"
                                 title="East Bangkok Plant"
                                 monthsummary="Last 3 Month Order Summary"
                                 status = "Approved"
                                 class ="status approved"
                                 />

                            </div>
                            <div className="col-6">
                               <BarGraph 
                                src= "/RejectedStatus"
                                 title="North Bangkok Plant"
                                 monthsummary="Last 3 Month Order Summary"
                                 status = "Rejected"
                                 class ="status rejected"
                                 reject = "true"
                                 />
                            </div>
                        </div>
                    </div>

                    <NewShipToConfirmBox/>

           </div>
               
        </>
    ); 

}
   export default ShipToTabs;