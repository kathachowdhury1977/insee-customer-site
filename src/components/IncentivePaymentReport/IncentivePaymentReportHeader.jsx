import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
// import CaseReportDropdownCombo from '../CaseReportDropdownCombo/CaseReportDropdownCombo';
import { useDispatch, useSelector } from 'react-redux'

import ExcelImage from "../../assets/img/Export-to-excel.png"

function IncentivePaymentReportHeader(props) {
    const { t } = useTranslation();
    const [showResults, setShowResults] = React.useState(false);

    const [fromDate,setFromDate]=useState(''); 
    const [toDate,setToDate]=useState(''); 
    const [internalNote,setInternalNote]=useState(''); 
    const [status,setStatus]=useState(''); 
    const [plant,setPlant]=useState(''); 
    
    const redButton = {
        textTransform: "uppercase",
        marginTop: "8px",
        marginLeft: "40px",
        background: "#ef0000",
        padding: "5px 22px",
        border: "none",
        borderRadius: "4px",
        fontWeight: "600",
        width:"90%",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
        "&:hover": {
            color: "#fff",
            background: "#ef0000",
        },
    };


    function onSelectChange() {

    }

    function handleChange() { }

    const showFilters = () => setShowResults(showResults => !showResults);

    return (
        <>
            <div className="row" style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                {/* <div className="col-12" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h5><b>{t("Sales Order")}</b></h5>
                </div> */}


                <div className="col-xl-10 col-lg-6 col-md-6 col-sm-12" style={{ paddingTop: "10px", paddingBottom: "20px" }} >
                    <h5><b>{t("Incentive Payment Report")}</b></h5>
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                    <button style={redButton} onClick={""}>{t("Export")}</button>

                </div>
               

                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                    <div className="form_section">
                        <div className="formBox">
                            <div className="inputBox ">
                                <label>{t("Date From")}</label>
                                <input
                                    type="date"
                                    name=""
                                    // value={fromDate}
                                    placeholder="Enter"
                                    className="input"
                                    style={{ width: "100%" }}
                                    // onChange={fromDateHandler}
                                    onKeyDown={(event) => {
                                        event.preventDefault();
                                    }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                    <div className="form_section">
                        <div className="formBox">
                            <div className="inputBox ">
                                <label>{t("End Date")}</label>
                                <input
                                    type="date"
                                    name=""
                                    // value={toDate}
                                    placeholder="Enter"
                                    className="input"
                                    // min={fromDate}
                                    style={{ width: "100%" }}
                                    // onChange={toDateHandler}
                                    onKeyDown={(event) => {
                                        event.preventDefault();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                    <div className="form_section">
                        <div className="formBox">

                            <div className="inputBox ">

                                <label>{t("Internal Note")}</label>

                                <input type="text"
                                    name={"caseCategory"}
                                    class={"input"}
                                    onChange={""}
                                    label={t("Select")}
                                    displayedLabel={"description"}
                                    data={[]}
                                // onChangeValue={onChangeCaseCategoryHandler}
                                />
                            </div>
                        </div>

                    </div>
                </div>


                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                    <div className="form_section">
                        <div className="formBox">

                            <div className="inputBox ">

                                <label>{t("Status")}</label>

                                <FormSelectbox
                                    name={"caseCategory"}
                                    class={"input"}
                                    // onSelectChange={onSelectChange}
                                    label={t("Select")}
                                    displayedLabel={"description"}
                                    data={[]}
                                // onChangeValue={onChangeCaseCategoryHandler}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                    <div className="form_section">
                        <div className="formBox">
                            <div className="inputBox ">
                                <label>{t("Plant")}</label>
                                <FormSelectbox
                                    name={"caseCategory"}
                                    class={"input"}
                                    // onSelectChange={onSelectChange}
                                    label={t("Select")}
                                    displayedLabel={"description"}
                                    data={[]}
                                // onChangeValue={onChangeCaseCategoryHandler}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {/* {showResults ?
            <CaseReportDropdownCombo />
            : null } */}

        </>
    );
}
export default withTranslation()(IncentivePaymentReportHeader);
