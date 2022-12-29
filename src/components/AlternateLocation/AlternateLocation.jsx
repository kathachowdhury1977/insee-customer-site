import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "../AccountInformation/AccountInformation.scss";
import LocationDetails from "../LocationDetails/LocationDetails";


function AlternateLocation(Props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

  
    console.log(event, "??????????")
    return (
        <>

     <LocationDetails
         location = "alternate"
          mainHeading = {t("alternatelocation.formheading")}
          address = "250 Sukimvit Road, Thailand"
          region = "East"
          province = "Bangkok"
          district = "Submbit"
          postalCode = "+91"
          googleMap = "234,67678"
          />
        </>
    );
}

export default withTranslation()(AlternateLocation);
