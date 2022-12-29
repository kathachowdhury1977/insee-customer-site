
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./TotalAmountWhiteBox.scss"

function TotalAmountWhiteBox(props) {
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
            <div className="card totalamount_box">
                <div className="row">
                    <div className="col-3">
                        <p className="smallText mb-0">{t("label.amount")}</p>
                        <p className="bigText mb-0">{props.total_amt}</p>
                    </div>
                    <div className="col-6 text-center">
                        <p className="smallText mb-0">{t("label.payment_datetime")}</p>
                        <p className="bigText mb-0">{props.date_time}</p>
                    </div>
                    <div className="col-3 text-right">
                        <span className={props.style_class}>{props.status}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(TotalAmountWhiteBox);