
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./OrangeOutlineBox.scss"

function OrangeOutlineBox(props) {
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
            <div className="row orangeoutline_box_container">
                <div className="col-12 text-center">
                    <p className="orangeText m-0">{props.heading}</p>
                    <p className="blackText m-0">{props.total_amt}</p>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(OrangeOutlineBox);