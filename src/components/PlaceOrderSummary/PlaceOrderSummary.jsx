import React from 'react';
import OrderSummaryItems from "../../components/OrderItemSummary/OrderItemSummary";
import TotalNetPrice from "../../components/TotalNetPrice/TotalNetPrice";
import ConfirmOrderPopup from "../../components/ModalPopup/ConfirmOrderPopup";
import { withTranslation, useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import "./PlaceOrderSummary.scss";

const PlaceOrderSummary = (props) => {
    const orderCreditInfo = useSelector((state) => state.getOrderCreditInfo);
    const { t } = useTranslation();
    console.log('ORDER CREDIT INFO');
    console.log(orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo);
    // console.log(Object.entries(orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo));
    // console.log(Object.keys(orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo));
    return (
        <>
            <div className="order_summary product_brand_section col-12 pt-2 pb-2">
                <h6 className="product_heading mb-3">{t("pricedetail.label")}</h6>

                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        {orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem
                            ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem.map((order) => {
                                return (
                                    <OrderSummaryItems
                                        title={order.productName}
                                        orderid={order.MaterialNumber}
                                        tonQty={order.Quantity +' '+ 'TON'}
                                        price="true"
                                        vat="tax"
                                        withouttax="LKR 1800"
                                        withtax="LKR 2000"
                                        Amount={order.Amount}
                                        DiscountAmount={order.DiscountAmount}
                                        FreightChargeAmount={order.FreightChargeAmount}
                                    />
                                );
                            })
                            : null}


                        {/* <p className="text-black font-weight-bold">{t("availablecredit.creditlimit")} - THB 2047 | {t("outstanding.outsandingamount")} - THB 100</p> */}

                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <div className="d-flex w-100">
                            <div className="credit-outstandingbox">
                                <p className="top-line mb-1">Available Credit</p>
                                <p className="bottom-line mb-1">บาท {orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.creditInfoResponse.RES_Records ? orderCreditInfo.getOrderCreditInfo.creditInfoResponse.RES_Records[0].CreditLimitAvailable : 'NA'}</p>
                            </div>
                            <div className="credit-outstandingbox">
                                <p className="top-line mb-1">Outstanding</p>
                                <p className="bottom-line mb-1">บาท {orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.creditInfoResponse.RES_Records ? orderCreditInfo.getOrderCreditInfo.creditInfoResponse.RES_Records[0].OutstandARBalance : 'NA'}</p>
                            </div>
                        </div>
                        <TotalNetPrice
                            total_price={orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing.NetPrice : 'NA'}
                            total_freight={orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing.totalFreight : 'NA'}
                            total_weight="222.00"
                            total_tax={orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing.Tax : 'NA'}
                            currency="THB"
                            total_discount={orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing.totalDiscount : 'NA'}
                            total={orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.Pricing.Net_Price : 'NA'}
                            cash_discount="10.00"
                            type="currency"
                        />
                    </div>
                </div>

            </div>

        </>
    );

}
export default withTranslation()(PlaceOrderSummary);