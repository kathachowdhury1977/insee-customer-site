import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "../AccountInformation/AccountInformation.scss";


function UserInfo(props) {
     const { t } = useTranslation();
     const dispatch = useDispatch();
     const userInfo=props.userInfo;
     console.log('userInfo',userInfo);
     const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
     const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
     const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
    return (
        <>
            <div className="user_information bg-light">
                <div className="head">
                  <h5 style={{fontSize: `${HeadingFontChange}px`}}>{t("userinfo.heading")}</h5>
                </div>
               <div className="co-12 mt-3">
                    <div className="row account_title">
                        <div className="col-3 text-center">
                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("username.label")} </h6>
                        </div>
                        <div className="col-4 text-center">
                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("title.label")}</h6>
                        </div>
                        {/*
                        <div className="col-3">
                        <h6>{t("mobileno.label")} </h6>
                        </div>
                        */}

                        <div className="col-5 text-center">
                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("EmailId.label")}</h6>
                        </div>
                    </div>
                    <div  className="row account_value">
                        <div className="col-3 text-center">
                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{userInfo.firstName}</h6>
                        </div>
                        <div className="col-4 text-center">
                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{userInfo.userId}</h6>
                        </div>
                        {/*
                        <div className="col-3">
                        <h6>*userInfo.userId</h6>
                        </div>
                        */}
                        <div className="col-5 text-center">
                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{userInfo.email}</h6>
                        </div>
                    </div>
                </div>

                

            </div>
        </>
    );
}
export default withTranslation()(UserInfo);