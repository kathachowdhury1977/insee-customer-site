import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
import CaseReportDropdownCombo from '../CaseReportDropdownCombo/CaseReportDropdownCombo';

function CaseReportHeader(props) {
    const { t } = useTranslation();
    const [showResults, setShowResults] = React.useState(false);

    function onSelectChange() {

    }

    function handleChange() { }

    const showFilters = () => setShowResults(showResults => !showResults);

    return (
        <>
            <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4 mt-2">
                    <p>Case Report</p>
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 d-flex">
                            <div className="form_section">
                                <div className="inputBox">
                                    <label>{t("caseorigin.label")}</label>
                                    <FormSelectbox
                                        name={"businessegment"}
                                        class={"input"}
                                        onSelectChange={onSelectChange}
                                        label={t("Select")}
                                        data={"data"}
                                    />
                                </div>
                            </div>
                            <div className="form_section">
                                <div className="inputBox">
                                    <label>{t("label.start_date")}</label>
                                    <FormInput
                                        type={"date"}
                                        class={"input"}
                                        name={"eventname"}
                                        onChange={handleChange}
                                        label={t("eventname.label")}
                                    />
                                </div>
                            </div>
                            <div className="form_section">
                                <div className="inputBox">
                                    <label>{t("label.end_date")}</label>
                                    <FormInput
                                        type={"date"}
                                        class={"input"}
                                        name={"eventname"}
                                        onChange={handleChange}
                                        label={t("eventname.label")}
                                    />
                                </div>
                            </div>
                            <div className="form_section">
                                <i class="fa fa-bars mt-3" onClick={showFilters} aria-hidden="true"></i>
                            </div>
                            <div className="form_section">
                                <button className="btn blk-btn mt-2">Export</button>
                            </div>
                        </div>

                    </div>
                </div>
               
                  
            </div>
            {showResults ?
            <CaseReportDropdownCombo />
            : null }

        </>
    );
}
export default withTranslation()(CaseReportHeader);
