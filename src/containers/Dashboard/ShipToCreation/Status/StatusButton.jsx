import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";

function StatusButton(props) {

    return (
         <>
           <div className="col-12 p-0 approval">
                <button className={props.class}>{props.status}</button>
            </div>

        </>
    )

}

export default StatusButton;