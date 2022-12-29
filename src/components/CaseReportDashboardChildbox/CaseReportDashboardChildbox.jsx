import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
import "./CaseReportDashboardChildbox.scss";

function CaseReportDashboardChildbox(props) {
    const { t } = useTranslation();

    function onSelectChange() {

    }

    function handleChange() { }


    return (
        <>
            {/* <div className="case-report-childbox-container">
                <div className="card">
                    <div className="form_section"> */}
                        <div className="row mb-2">
                            <div className="col-sm-3 col-md-3 col-lg-3 pl-1 pr-1">

                                <div className="inputBox">
                                    <label>{t("Business")}</label>
                                    <FormSelectbox
                                        name={"businessegment"}
                                        class={"input"}
                                        onSelectChange={onSelectChange}
                                        label={t("Select")}
                                        data={"data"}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3 pl-1 pr-1">
                                <div className="inputBox">
                                    <label>{t("Case Type")}</label>
                                    <FormSelectbox
                                        name={"businessegment"}
                                        class={"input"}
                                        onSelectChange={onSelectChange}
                                        label={t("Select")}
                                        data={"data"}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3 pl-1 pr-1">
                                <div className="inputBox">
                                    <label>{t("Start Date")}</label>
                                    <FormInput
                                        type={"date"}
                                        class={"input"}
                                        name={"eventname"}
                                        onChange={handleChange}
                                        label={t("eventname.label")}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3 pl-1 pr-1">
                                <div className="inputBox">
                                    <label>{t("End Date")}</label>
                                    <FormInput
                                        type={"date"}
                                        class={"input"}
                                        name={"eventname"}
                                        onChange={handleChange}
                                        label={t("eventname.label")}
                                    />
                                </div>
                            </div>
                        </div>
                    {/* </div>

                </div>
            </div> */}
      
        </>
    );
}
export default withTranslation()(CaseReportDashboardChildbox);
