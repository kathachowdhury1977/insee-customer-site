import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./PaymentHistoryChildBoxes.scss";

function PaymentHistoryChildBoxes(props) {
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
            <div className="p-0 invoice_debit_box_container">
                <div className="row ml-2 mr-2 mt-2">
                    <div className="col-sm-6 col-md-6 col-lg-6 p-0 mb-3 mt-2">
                        <span className={props.status_class}><span>{props.invoice_status}</span></span>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 p-0 mb-3 mt-2 text-right">
                        <span className="textDark"> {t("label.download")}
                                </span>
                    </div>
                </div>

                <div className="row ml-2 mr-2 mt-2">
                    <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <p className="textLight">{t("label.payment_ref_no")}</p>
                                <p className="textDark">{props.pay_ref_number}</p>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <p className="textLight">{t("label.trans_datetime")}</p>
                                <p className="textDark">{props.trans_date_time}</p>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <p className="textLight">{t("label.amount")}</p>
                                <p className="textDark">{props.total_amt}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <p className="textLight">{t("label.bank")}</p>
                                <p className="textDark">{props.bank}</p>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <p className="textLight">{t("label.type")}</p>
                                <p className="textDark">{props.type}</p>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(PaymentHistoryChildBoxes);