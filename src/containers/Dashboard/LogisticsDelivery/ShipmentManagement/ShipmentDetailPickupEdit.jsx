import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import 'react-tabs/style/react-tabs.css';
import "./ShipMent.scss"
import CreateShipment from "../../../../components/CreateShipment/CreateShipment";
import CreateShipmentForm from "../../../../components/CreateShipmentForm/CreateShipmentForm";
import ShipmentNoDate from '../../../../components/ShipmentNoDate/ShipmentNoDate'
import ShipmentCondition from '../../../../components/ShipmentCondition/ShipmentCondition'
import ShipMentHeadingSection from "../../../../components/ShipMentHeadingSection/ShipMentHeadingSection";
import ShipmentDetailFormPickupEdit from "../../../../components/ShipmentDetailForm/ShipmentDetailFormPickupEdit";

function ShipmentDetailPickupEdit(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();



    console.log(event, "??????????")
    return (
        <>
            <div className="content-wrapper">
                <Header />

                <div className="row">
                    <div className="mainScroll">


                        <div className="Shipment_managment mb-4">
                            <ShipMentHeadingSection title={t("shipmentdetails.heading")} />

                            <div className="row shipment_border m-2">
                                <div className="col-sm-6 col-md-6 col-lg-3">
                                    <ShipmentNoDate
                                        title={t("shipmanagement.shipmentnumber")}
                                        number="1208767"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-3">
                                    <ShipmentNoDate
                                        title="วันที่และเวลาชิปเม้นท์"
                                        number="12 Oct 2020"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-3">
                                    <ShipmentNoDate
                                        title={t("shipmanagement.shipmentdate")}
                                        number="Pickup"
                                        class="green"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-3">
                                    <ShipmentNoDate
                                        title={t("Shipment Status")}
                                        number="Check In"
                                        class="green"
                                    />
                                </div>
                            </div>


                            <div className="row m-2 mt-3">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <ShipmentCondition
                                        title="Do number"
                                        number="1323987"
                                        progress="60"
                                        progressLocation="In Plant"
                                    />
                                </div>
                            </div>

                            <div className="create_ship">
                                <CreateShipment
                                    title="INsee Rapid Flow Plus"
                                    sNumber="So. No. 45466"
                                    remQty="Quantity Left 20/30 Ton"
                                    value="20"
                                    qtyWeight="Ton"
                                />
                                <CreateShipment
                                    title="INsee Extra"
                                    sNumber="So. No. 32345"
                                    remQty="Quantity Left 20/30 Ton"
                                    value="20"
                                    qtyWeight="Ton"
                                />
                            </div>
                            <div className="col-12">
                                <ShipmentDetailFormPickupEdit />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(ShipmentDetailPickupEdit);
