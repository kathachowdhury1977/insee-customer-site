import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import "../MMDC/RetailBrand/ListingDetail.scss";
import ShipToCreationDetailsTab from '../../../components/Tabs/ShipToCreationDetailsTab';
import ShipToCreationHeadingTab from "./ShipToCreationHeadingTab";


function ShipToCreationDetail(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);
    const selectedDay = (val) => {
        console.log(val);
    };
    function onToggleChange(checked) {

        setValidate(checked)
    }

    function handleChange(event, name) {
        console.log(event, "event target", name);
    }
    function onSelectChange(event) {
        console.log(event);
    }

    return (
        <>
            <div className="content-wrapper">
                <Header />
                <div className="upcoming_detail_plan">
                
                    <div className="container-fluild mt-2 List_detail_page">
                      <ShipToCreationHeadingTab/>
                        <div className="row">
                            <ShipToCreationDetailsTab />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default withTranslation()(ShipToCreationDetail);