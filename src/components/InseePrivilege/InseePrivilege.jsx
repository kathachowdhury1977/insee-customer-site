import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "../AccountInformation/AccountInformation.scss";
import { Link } from "react-router-dom";
function InseePrivilege(props) {
    const selectedLangCode = localStorage.getItem('lancode');
    const { t } = useTranslation();
    const inseePrivilage = props.inseePrivilage;
    console.log(inseePrivilage, 'inseePrivilage')
    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
     const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
     const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
    return (
        <>

            <div className="user_information">
                <div className="head">
                    <h5 style={{fontSize: `${HeadingFontChange}px`}}>{props.mainHeading}</h5>
                </div>

                <div className="co-12 mt-3">
                    <div className="row account_title">
                        <div className="col-4">
                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("nextyearstatus.label")} </h6>
                        </div>

                        <div className="col-4">
                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("inseecoins.label")} </h6>
                        </div>

                        <div className="col-4">
                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("coinssalesvolperiod.label")}</h6>
                        </div>

                    </div>
                    {inseePrivilage &&
                        <div className="row account_value">
                            <div className="col-4">
                                <h6 style={{fontSize: `${SmallFontChanger}px`}}>{inseePrivilage.nextYearStatus}</h6>
                            </div>
                            <div className="col-4">
                                <h6 style={{fontSize: `${SmallFontChanger}px`}}>{
                                
                                inseePrivilage.customerInseeCoin}</h6>
                            </div>
                            <div className="col-4">
                                <h6 style={{fontSize: `${SmallFontChanger}px`}}>{
                                selectedLangCode === 'en' || selectedLangCode === null ?
                                inseePrivilage.coinSalesVolumePeriod_EN : inseePrivilage.coinSalesVolumePeriod_TH
                            
                            }</h6>
                            </div>
                        </div>
                    }
                </div>


                <div className="co-12 mt-3">
                    <div className="row account_title">
                        <div className="col-12">
                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("remark.label")}</h6>
                        </div>

                    </div>
                </div>

                {inseePrivilage &&
                    <div className="co-12">
                        <div className="row account_value">
                            <div className="col-12">
                                <h6 style={{fontSize: `${SmallFontChanger}px`}}>{
                                selectedLangCode === 'en' || selectedLangCode === null ?
                                inseePrivilage.soldToRemark_EN
                            : inseePrivilage.soldToRemark_TH
                            }</h6>
                            </div>

                        </div>
                    </div>
                }

            </div>
        </>
    );
}

export default withTranslation()(InseePrivilege);
