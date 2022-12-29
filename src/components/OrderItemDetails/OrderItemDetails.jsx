import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import './OrderItemDetails.scss'
import OrderItemSummary from "../OrderItemSummary/OrderItemSummary";

function OrderItemDetails(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    function handleChange(event, name) {
        //setNewvalue(event, name)
        console.log(event, "event target", name);
    }


    return (
        <>
            <div className="order-item-details ml-4">
                <div className="row mb-4 borderLine">
                    {props.orderItemData && props.orderItemData
                        ? props.orderItemData.items.map((order) => {
                            return (
                                <OrderItemSummary title={order.MaterialName} 
                                orderid={order.MaterialNumber} 
                                tonQty={order.OrderQuantity +' '+ order.UnitOfMeasure} 
                                Amount={props.orderItemData ? props.orderItemData.orderItemListObject[0].Price_List_Amount__c : 'NA'}
                                DiscountAmount={props.orderItemData ? props.orderItemData.orderItemListObject[0].Discount_Amount__c : 'NA'}
                                FreightChargeAmount={props.orderItemData ? props.orderItemData.orderItemListObject[0].Freight_Charge_Amount__c : 'NA'}
                                price="true" showextra="false" />
                            );
                        })
                        : null}
                </div>

                <div className="row mb-4">
                    <div className="col-6 mb-3">
                        <p className="light-text"> {t("label.po_number")}</p>
                        <p className="dark-text">{props.orderItemData.header1.ponumber ? props.orderItemData.header1.ponumber : 'NA'}</p>
                    </div>
                    <div className="col-6 mb-3">
                        <p className="light-text">{t("sostatus.status")}</p>
                        <p className="dark-text">{props.orderItemData.header1.salesOrderStatus ? props.orderItemData.header1.salesOrderStatus : 'NA'}</p>
                    </div>
                    <div className="col-6 mb-3">
                        <p className="light-text">{t("sono.sonumber")}</p>
                        <p className="dark-text">{props.orderItemData.orderListObject.ccrz__OrderId__c ? props.orderItemData.orderListObject.ccrz__OrderId__c : 'NA'}</p>
                    </div>
                    <div className="col-6 mb-3">
                        <p className="light-text">{t("sodate.sodts")}</p>
                        <p className="dark-text">{props.orderItemData.header1.requestDeliveryDate ? props.orderItemData.header1.requestDeliveryDate : 'NA'}</p>
                    </div>
                    <div className="col-6 mb-3">
                        <p className="light-text"> {t("plant.plantaddress")}</p>
                        <p className="dark-text">{props.orderItemData.items[0].Plant ? props.orderItemData.items[0].Plant : 'NA'}</p>
                    </div>

                    <div className="col-6 mb-3">
                        <p className="light-text">{t("ordertype.credit")}</p>
                        <p className="dark-text">{props.orderItemData.header1.salesOrderType ? props.orderItemData.header1.salesOrderType : 'NA'}</p>
                    </div>
                    <div className="col-6 mb-3">

                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <p className="dark-text mb-2">{t("shipto.label")}</p>
                    </div>
                    <div className="col-12">
                        <div className="yellow-box p-2">
                            <p className="top-text">{props.orderItemData.partnerFunction.name1 ? props.orderItemData.partnerFunction.name1 : 'NA'} | #{props.orderItemData.partnerFunction.contractNumber ? props.orderItemData.partnerFunction.contractNumber : 'NA'}</p>
                            <p className="bottom-text">{props.orderItemData.partnerFunction.shiToAddress ? props.orderItemData.partnerFunction.shiToAddress.address : 'NA'}</p>
                        </div>
                    </div>
                </div>


                <div className="row mb-4">
                    <div className="col-6 mb-3">
                        <p className="light-text">{t("shippingcondition.label")}</p>
                        <p className="dark-text">{props.orderItemData.header1.shippingCondition ? props.orderItemData.header1.shippingCondition : 'NA'}</p>
                    </div>
                    <div className="col-6 mb-3">
                        <p className="light-text">{t("special_shipping_condition")}</p>
                        <p className="dark-text">{props.orderItemData.header1.salesOrderType ? props.orderItemData.header1.salesOrderType : 'NA'}</p>
                    </div>

                    <div className="col-6 mb-3">
                        <p className="light-text">{t("shippingtype.label")}</p>
                        <p className="dark-text">{props.orderItemData.header1.shippingType ? props.orderItemData.header1.shippingType : 'NA'}</p>
                    </div>
                    <div className="col-6 mb-3">
                        <p className="light-text">{t("Contract Number")}</p>
                        <p className="dark-text">{props.orderItemData.partnerFunction.contractNumber ? props.orderItemData.partnerFunction.contractNumber : 'NA'}</p>
                    </div>
                    <div className="col-12 mb-3">
                        <p className="light-text">{t("subdealername.label")}</p>
                        <p className="dark-text">{props.orderItemData.header1.subDealerName ? props.orderItemData.header1.subDealerName : 'NA'}</p>
                    </div>
                    {/* <div className="col-12 mb-3">
                        <p className="light-text">{t("remark.label")}</p>
                        <p className="dark-text">{props.remarks}</p>
                    </div> */}
                </div>



            </div>
        </>
    );
}

export default withTranslation()(OrderItemDetails);
