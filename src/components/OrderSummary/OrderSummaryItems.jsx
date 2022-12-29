import React from 'react';
import "./OrderSummary.scss";
import Item from "../../assets/img/insee.jfif";
import { Link, useHistory } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { orderActions } from '../../_actions';


const OrderSummaryItems = (props) => {
    const { t } = useTranslation();
    let history = useHistory();
    const dispatch = useDispatch();
    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);
    // function navigateToOrderDetails(ponumber){

    // }
    const navigateToOrderDetails = () => {
        // console.log(ponumber);
        // dispatch(orderActions.getOrderDetail(props.porefnumber && props.porefnumber,userName.soldTo[0]));
        history.push({
            pathname: '/MyOrderDetails',
            state: { orderdetails: props.orderdata }
        })

    };

    return (
        <>

            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-2">
                <div className="shipmentList">
                    {/* <Link to= {{ pathname: props.src, state: { orderdetails: props.orderdata} }} > */}
                    <div className="order_item">
                        <div className="row item_sec">
                            <div className="col-sm-6">

                                <span className="text-dark">{t("porefno.itemid")} - {props.porefnumber && props.porefnumber ? props.porefnumber : 'NA'}</span>
                            </div>
                            <div className="col-sm-6 pl-0 text-right">
                                <span className="text-dark">{t("sostatus.status")} <span className="process">{props.sostatus && props.sostatus ? props.sostatus : 'NA'}</span></span>
                            </div>
                        </div>

                        {props.orderitems && props.orderitems
                            ? props.orderitems.map((item) => {
                                return (
                                    <div className="row mb-3">
                                        <div className="col-2">
                                            <img src={Item} />
                                        </div>
                                        <div className="col-6 pr-0">
                                            <div className="title_sec">
                                                <p className="text-dark">{item.MaterialName && item.MaterialName ? item.MaterialName : 'NA'}</p>
                                                <span>#{item.MaterialNumber}</span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="quantity_sec">
                                                <p>{item.OrderQuantity} {item.UnitOfMeasure}</p>
                                                <span>{t("quantity.qtytitle")}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            : null}






                        <div className="col-12">
                            <div className="row amount_sec">
                                <div className="col-sm-6 pl-0 text-left">
                                    <span className="text-dark"><strong>{t("totalamount.rate")} : {props.totalamount}</strong></span>
                                </div>
                                <div className="col-sm-6 pr-0 text-right">
                                    <span className="text-dark"><strong>{t("QTY")} : {props.totalqty && props.totalqty ? props.totalqty : 'NA'}</strong></span>
                                </div>
                            </div>
                        </div>

                        <div className="row billing">
                            <div className="col-6 text-left"><span className="text-dark">{t("sono.sonumber")}: {props.sonumber && props.sonumber ? props.sonumber : 'NA'}</span></div>
                            <div className="col-6 text-right"><span className="text-dark">{t("sodate.sodts")} : {props.sodate && props.sodate ? props.sodate : 'NA'}</span></div>
                            <div className="col-6 text-left"><span className="text-dark">{t("So Time")}: {props.sotime && props.sotime ? props.sotime : 'NA'}</span></div>
                            <div className="col-6 text-right"><span className="text-dark">{t("ordertype.credit")} : {props.ordertype && props.ordertype ? props.ordertype : 'NA'}</span></div>
                        </div>

                        <div className="row submit">
                            <div className="col-6"><button className="delivery">{t("deliveryinfo.button")}</button></div>
                            <div className="col-6"><button className="view" onClick={navigateToOrderDetails}>{t("viewdetails.button")}</button></div>
                        </div>

                    </div>
                    {/* </Link> */}
                </div>

            </div>


        </>
    );

}
export default withTranslation()(OrderSummaryItems);