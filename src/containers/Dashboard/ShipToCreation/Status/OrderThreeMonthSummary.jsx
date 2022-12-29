import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import MonthChart from "./MonthChart";

function OrderThreeMonthSummary(props) {

    return (
         <>
                      <div className="main-box">
                                 <p className="heading">
                                   Last 3 Month Order Summary
                                 </p>
                                 <MonthChart Width = "400" Height= "200"/>
                            </div> 
        </>
    )

}

export default OrderThreeMonthSummary;