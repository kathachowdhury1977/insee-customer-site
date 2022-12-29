import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Map from "../../../../assets/img/map.png"

function StatusMap(props) {

    return (
         <>
           <div className="main-box">
                 <img className="map-img" src= {Map}/>  
            </div> 

        </>
    )

}

export default StatusMap;