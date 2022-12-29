import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "./AccountInformation.scss";
import GroupCompaniesList from "./GroupCompaniesList";
import SocialMedia from "./SocialMedia";
import { Link } from "react-router-dom";

function AccountInformation(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const cotactList = props.cotactList;
    console.log("cotactList", cotactList)
    const selectedLangCode = localStorage.getItem('lancode');
    let contactListArr = [];
    let contactListObj = {};
    if (cotactList !== undefined && cotactList !== undefined && cotactList.cotactList !== undefined && cotactList.cotactList !== null) {
        contactListObj["Owner"] = cotactList !== undefined || null && cotactList.cotactList !== undefined || null ? cotactList.cotactList.filter((data) => data.relation = 'Owner') : [];
        contactListObj["Alternet"] = cotactList !== undefined || null && cotactList.cotactList !== undefined || null ? cotactList.cotactList.filter((data) => data.relation != 'Owner') : [];
        contactListArr.push(contactListObj);
    } else {
        console.log("hjbhbjhb")
    }

    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

    ////console.log('contactListArr',contactListArr);
    return (
        <>
            <div className="user_information">
                <div className="head">
                    <h5 style={{fontSize: `${HeadingFontChange}px`}}>{t("accountinformation.label")}</h5>
                    <span style={{fontSize: `${HeadingFontChange}px`}}>{t("taxno.label")} : {cotactList.taxNumber}</span>
                </div>

                <div className="row account_title acc_border">
                    <div className="col-5 text-left"><h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("label.account_name")}</h6></div>
                    <div className="col-5"><h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("label.account_number")}</h6> </div>
                    {/* <div className="col-4 pl-0"><h6>{t("Sales Organization")}</h6></div> */}
                </div>
                {
                    cotactList && cotactList.companyList !== undefined ? cotactList.companyList.map((cname, index) => {
                        ///console.log('indexindex',index);
                        return (
                            <GroupCompaniesList accountName={
                                
                                    selectedLangCode === 'en' || selectedLangCode === null ? cotactList.accountName : cotactList.accountNameLocal
                               
                                } companyList={cname} />
                        );
                    }) : ''
                }
                {!!cotactList && cotactList.salesAreaList && (
                    <div className="co-12 pt-3 detais_border">
                        <div className="row account_title">
                            <div className="col-4 text-center">
                                <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("label.sales_organization")}</h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6 style={{fontSize: `${SmallFontChanger}px`}}> {t("label.distribution_channel")}</h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("label.division")}</h6>
                            </div>
                        </div>
                        {cotactList && cotactList.salesAreaList ? cotactList.salesAreaList.map(eachItem => {
                            return (
                                <div className="row account_value pt-2">
                                    <div className="col-4 text-center">
                                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{eachItem.salesOrganization}</h6>
                                    </div>
                                    <div className="col-4 text-center">
                                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{eachItem.distributionChannel}</h6>
                                    </div>
                                    <div className="col-4 text-center">
                                        <h6 style={{fontSize: `${SmallFontChanger}px`}}>{eachItem.division}</h6>
                                    </div>
                                </div>
                            )
                        }) : ''}
                    </div>
                )}

                {contactListArr && contactListArr !== undefined ?
                    contactListArr.map((data, key) => {
                        if (Object.keys(data).indexOf('Owner') != -1) {
                            return (
                                <div className="co-12 pt-3 detais_border">
                                    <div className="row account_title">
                                        <div className="col-5 text-left">
                                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("ownername.label")}</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("contactnumber.label")}</h6>
                                        </div>
                                        <div className="col-3 pl-0">
                                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("EmailId.label")}</h6>
                                        </div>
                                    </div>
                                    {data && data.Owner !== undefined ? data.Owner.map((contact) => {
                                        return (
                                            <div className="row account_value pt-2">
                                                <div className="col-5 text-left">
                                                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{contact.firstName + ' ' + contact.lastName}</h6>
                                                </div>
                                                <div className="col-4">
                                                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{contact.alternateMobileNumber}</h6>
                                                </div>
                                                <div className="col-3 pl-0">
                                                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{contact.emailId}</h6>
                                                </div>
                                            </div>
                                        )
                                    }) : ''
                                    }
                                </div>
                            );
                        } else {
                            return (
                                <div className="co-12 pt-3 detais_border">
                                    <div className="row account_title">
                                        <div className="col-5 text-left">
                                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("Alt. Contact Name")}</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("contactnumber.label")}</h6>
                                        </div>
                                        <div className="col-3 pl-0">
                                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("EmailId.label")}</h6>
                                        </div>
                                    </div>
                                    {data && data.Alternet !== undefined ? data.Alternet.map((contact) => {
                                        return (
                                            <div className="row account_value pt-2">
                                                <div className="col-5 text-left">
                                                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{contact.firstName + ' ' + contact.lastName}</h6>
                                                </div>
                                                <div className="col-4">
                                                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{contact.alternateMobileNumber}</h6>
                                                </div>
                                                <div className="col-3 pl-0">
                                                    <h6 style={{fontSize: `${SmallFontChanger}px`}}>{contact.emailId}</h6>
                                                </div>
                                            </div>
                                        )
                                    }) : ''
                                    }
                                </div>
                            );
                        }
                    }
                    ) : ''
                }
                <div className="co-12 pt-3 detais_border">
                    <div className="text-right pencil-icon w-100"><Link to="/UpdateSocialMedia"><i className="fa fa-pencil"></i></Link></div>
                    <div className="row account_title">
                        <div className="col-5 text-left">
                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("socialmedia.label")} </h6>
                        </div>
                        <div className="col-4">

                        </div>
                        <div className="col-3 pl0">
                            <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t("link.label")} </h6>
                        </div>
                    </div>
                    {cotactList.socialMedia !== null ? Object.entries(cotactList.socialMedia).map((data) => {
                        const [key, value] = data;
                        if (key != 'id' && key != 'soldToNumber') {
                            return (
                                <SocialMedia socialLabel={key.toUpperCase()} socialLink={value} />
                            )
                        }
                    }) : ''
                    }
                </div>

            </div>
        </>
    );
}

export default withTranslation()(AccountInformation);