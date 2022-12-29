import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "../AccountInformation/AccountInformation.scss";
import LocationDetails from "../LocationDetails/LocationDetails";


function MainLocation(Props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

 
    return (
        <>
         <LocationDetails
          mainHeading = {t("location.heading")}
          address = "250 Sukimvit Road, Bangkok, Thailand"
          region = "North"
          province = "Bangkok"
          district = "Submbit"
          postalCode = "+85"
          googleMap = "234,67678"
          />
        </>
    );
}

export default withTranslation()(MainLocation);
