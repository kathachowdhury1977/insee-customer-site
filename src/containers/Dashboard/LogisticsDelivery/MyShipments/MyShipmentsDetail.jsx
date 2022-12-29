import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import 'react-tabs/style/react-tabs.css';
import CreateShipment from "../../../../components/CreateShipment/CreateShipment";
import ShipmentNoDate from '../../../../components/ShipmentNoDate/ShipmentNoDate'
import ShipMentHeadingSection from "../../../../components/ShipMentHeadingSection/ShipMentHeadingSection";
import ShipmentDetailFormPickup from "../../../../components/ShipmentDetailForm/ShipmentDetailFormPickup";
import BlockedReasion from "../../../../components/BlockedReasion/BlockedReasion";
import MyShipmentBlockStepper from "../../../../components/MyShipmentDetailBlockStepper/MyShipmentBlockStepper";

function MyShipmentsDetail(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    console.log(event, "??????????")
    return (
        <>
            <div className="content-wrapper">
                <Header />
                <div className="row ipad_css">
                    <div className="mainScroll">
                        <div className="Shipment_managment mb-4">
                            <ShipMentHeadingSection title={t("shipmentdetails.heading")} />

                            <div className="row m-2">
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <ShipmentNoDate
                                        title={t("shipmanagement.shipmentnumber")}
                                        number="1208767"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">
                                    <ShipmentNoDate
                                        title={t("shipmanagement.shipmentdate")}
                                        number="12 Oct 2020"
                                    />
                                </div>
                            </div>

                            <div className="mt-2 mb-3">
                                <div className="col-12 ship_heading">
                                     <span>{t("shipmanagement.shipmentcondition")} - <span className="pick-color">Pickup</span></span>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12 block_stepper">
                                    <MyShipmentBlockStepper />
                                </div>
                            </div>

                            <div className="row m-2 mt-3">
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <BlockedReasion />
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
                            <ShipmentDetailFormPickup type="ButtonUpdate"
                            />
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default withTranslation()(MyShipmentsDetail);
