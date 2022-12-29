import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import 'react-tabs/style/react-tabs.css';
import "./ShipMent.scss"
import UpdateShipment from "../../../../components/CreateShipment/UpdateShipment";
import ShipmentNoDate from '../../../../components/ShipmentNoDate/ShipmentNoDate';
import ShipMentHeadingSection from "../../../../components/ShipMentHeadingSection/ShipMentHeadingSection";
import ShipmentDetailFormDeliveryEdit from "../../../../components/ShipmentDetailForm/ShipmentDetailFormDeliveryEdit";
import DeliveryEdit from "../../../../components/Delivery/DeliveryEdit";

function ShipmentDetailsDeliveryEdit(props) {
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
                                <div className="col-sm-6 col-md-4 col-lg-2">
                                    <ShipmentNoDate
                                        title={t("shipmanagement.shipmentnumber")}
                                        number="1208767"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-2">
                                    <ShipmentNoDate
                                        title="วันที่และเวลาชิปเม้นท์"
                                        number="12 Oct 2020"
                                    />
                                </div>

                                <div className="col-sm-6 col-md-4 col-lg-2">
                                    <ShipmentNoDate
                                        title="Ship To: 234566"
                                        number="ABC Retailer, 413 R.A. De Mel Mawatha,Bangkok, Thailand"
                                        fontSize="fonts"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-2">
                                    <ShipmentNoDate
                                        title={t("Shipment Type")}
                                        number="XXXXXXXXXX"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-2">
                                    <ShipmentNoDate
                                        title={t("Shipping Conditions")}
                                        number="Delivery"
                                        class="green"
                                    />
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-2">
                                    <ShipmentNoDate
                                        title={t("Shipment Status")}
                                        number="In-Progress"
                                        class="green"
                                    />
                                </div>
                            </div>

                            <div className="create_ship">
                                <UpdateShipment
                                    title="INsee Rapid Flow Plus"
                                    sNumber="So. No. 45466"
                                    remQty="Quantity Left 20/30 Ton"
                                    value="20"
                                    qtyWeight="Ton"
                                />
                                <UpdateShipment
                                    title="INsee Extra"
                                    sNumber="So. No. 32345"
                                    remQty="Quantity Left 20/30 Ton"
                                    value="20"
                                    qtyWeight="Ton"
                                />
                            </div>
                            <div className="col-12">
                                <ShipmentDetailFormDeliveryEdit />
                            </div>

                            
                            <DeliveryEdit
                                plantName="Thailand Plant"
                                trackingId="8765145"
                                shipmentDate="Dec 20, 2020"
                                prefered_truck_type="Full Trailer"
                                special_project="Multi Lot"
                                contact_name="John Dore"
                                contact_number="+98542557556"
                                transporter_name="BAC"
                            />

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(ShipmentDetailsDeliveryEdit);
