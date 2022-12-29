import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import UpcomingPlan from "../../../../components/UpcomingPlan/UpcomingPlan";
import banger from "../../../../assets/img/banger.jpeg";

function OtherSoldPlan(props) {

    return (
         <>
            <div className="col-12 pl-1 pr-1">
                        <div className="row">
                        <div className="main-box">
                                 <p className="heading text-primary">
                                   Other Sold-to mapped to this ship-to
                                 </p>
                                   
                                   <div className="col-12">
                                   <div className="row">
                                    <UpcomingPlan
                                        image={banger}
                                        class={"col-sm-12 col-md-6 col-lg-6"}
                                        src={"/ShipToCreationDetail"}
                                        title={"Bungur Enterprises"}
                                        contact={"65478-79879"}
                                        amv={"3000 Tons"}
                                        inseeGrowth={"20%"}
                                        inseeSow={"50%"}
                                    />

                                    <UpcomingPlan
                                        image={banger}
                                        class={"col-sm-12 col-md-6 col-lg-6"}
                                        src={"/ShipToCreationDetail"}
                                        title={"Bungur Enterprises"}
                                        contact={"65478-79879"}
                                        amv={"3000 Tons"}
                                        inseeGrowth={"20%"}
                                        inseeSow={"50%"}
                                    />
                                    </div>
                                   </div>
                                   
                                 </div>
                        
                            </div>
                        </div>

        </>
    )

}

export default OtherSoldPlan;