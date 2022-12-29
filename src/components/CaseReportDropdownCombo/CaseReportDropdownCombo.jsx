import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';

function CaseReportDropdownCombo(props) {
    const { t } = useTranslation();

    function onSelectChange() {

    }

    function handleChange() { }

    return (
        <>
            <div className="row case-dropdown-combo-container">
                <div className="col-sm-12 col-md-12 col-lg-12 mt-2 mb-2">
                    <div className="form_section d-flex">
                        <div className="inputBox">
                            <label>{t("Case Owner")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("Created By")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("Star Rating")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("Category")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("caseorigin.label")}</label>
                            <FormSelectbox
                                name={"Sub Category"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("Priority")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("casetype.label")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("Age")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("caseorigin.boxtype")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("status.label")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                        &nbsp;
                        <div className="inputBox">
                            <label>{t("label.description")}</label>
                            <FormSelectbox
                                name={"businessegment"}
                                class={"input"}
                                onSelectChange={onSelectChange}
                                label={t("Select")}
                                data={"data"}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default withTranslation()(CaseReportDropdownCombo);
