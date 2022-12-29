import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./IncentiveChargeBox.scss";

function IncentiveChargeBox(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);
    const [showResults, setShowResults] = React.useState(false);
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

    const onClick = () => setShowResults(showResults => !showResults);

    return (
        <>
            <div className="invoice_charge_box_container">
                <div className="row ml-2 mr-2">
                    <div className="col-sm-6 col-md-6 col-lg-6 p-0 mb-3">
                        <span className={props.status_class}><span>{props.invoice_status}</span></span>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 p-0 text-right">


                        {showResults ?
                            <span className="angleDown">
                                <i class="fa fa-angle-down" onClick={onClick} aria-hidden="true"></i>
                            </span>
                            :
                            <span className="angleRight">
                                <i class="fa fa-angle-right" onClick={onClick} aria-hidden="true"></i>
                            </span>
                        }

                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
                        <div className="row mb-2">
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
                                <p className="textLight">{t("label.payment_date")}</p>
                                <p className="textDark">{props.doc_number}</p>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
                                <p className="textLight">{t("label.payment_method")}</p>
                                <p className="textDark">{props.doc_number}</p>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
                                <p className="textLight">{t("label.amt_before_vat")}</p>
                                <p className="textDark">{props.doc_number}</p>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
                                <p className="textLight">{t("label.amt_after_vat")}</p>
                                <p className="textDark">{props.doc_number}</p>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
                                <p className="textLight">{t("label.billing_no")}</p>
                                <p className="textDark">{props.doc_number}</p>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
                                <p className="textLight">{t("label.so_number")}</p>
                                <p className="textDark">{props.doc_number}</p>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-2 col-md-2 col-lg-2">
                                <p className="textLight">{t("label.internal_note")}</p>
                                <p className="textDark">{props.doc_number}</p>
                            </div>
                            <div className="col-sm-10 col-md-10 col-lg-10">

                            </div>
                        </div>
                        {showResults ?
                            <div className="row bottomLine mt-2 pt-2">
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.material")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.shiptoname")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.plant")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.shipping_condition")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.shipping_type")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.order_qty")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.dispatch_qty")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3">
                                    <p className="textLight">{t("label.open_do_qty")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <p className="textLight">{t("label.remain_qty")}</p>
                                    <p className="textDark">{props.doc_number}</p>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6">

                                </div>

                            </div>

                            : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(IncentiveChargeBox);