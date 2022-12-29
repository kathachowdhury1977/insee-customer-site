import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import "./TonCircle.scss";

function TonCircle() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return (
        <>
            <div className="circle_section">
                <ul>
                    <li>
                        <label>Bangkok</label>
                        <div className="list_item">
                            <h6>5000</h6>
                            <span>{t("ton.weighttype")}</span>
                        </div>
                    </li>
                    <li>
                        <label>Bangkok</label>
                        <div className="list_item">
                            <h6>5000</h6>
                            <span>{t("ton.weighttype")}</span>
                        </div>
                    </li>
                    <li>
                        <label>Bangkok</label>
                        <div className="list_item">
                            <h6>5000</h6>
                            <span>{t("ton.weighttype")}</span>
                        </div>
                    </li>
                    <li>
                        <label>Bangkok</label>
                        <div className="list_item">
                            <h6>5000</h6>
                            <span>{t("ton.weighttype")}</span>
                        </div>
                    </li>
                    <li>
                        <label>Bangkok</label>
                        <div className="list_item">
                            <h6>5000</h6>
                            <span>{t("ton.weighttype")}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default withTranslation()(TonCircle);
