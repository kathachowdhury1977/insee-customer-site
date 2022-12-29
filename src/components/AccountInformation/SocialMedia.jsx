import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "./AccountInformation.scss";

function SocialMedia(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);

  
    console.log(event, "??????????")
    return (
        <>
            <div className="row account_value">
            <div className="col-5 text-left">
                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{props.socialLabel}</h6>
                </div>
                <div className="col-4">
                </div>
                <div className="col-3 pl0">
                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{props.socialLink}</h6>
                </div>
            </div>

        </>
    );
}

export default withTranslation()(SocialMedia);
