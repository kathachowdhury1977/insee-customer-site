import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
import ExcelImage from "../../assets/img/Export-to-excel.png"
import { useDispatch, useSelector } from 'react-redux'
import Axios from "axios";
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from "../../constant";
import RadioButtonDivision from "../../containers/Dashboard/ReportManagement/RadioButtonDivision";
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import moment from 'moment'
import 'moment-timezone'

function OpenItemReportHeader(props) {
    const { t } = useTranslation();
    const [showResults, setShowResults] = React.useState(false);

    const [fromDate, setFromDate] = useState(props.fromDateDefault);
    const [toDate, setToDate] = useState(props.toDateDefault);

    useEffect(()=>{

        setFromDate(props.fromDateDefault);
        setToDate(props.toDateDefault);

    },[props.fromDateDefault,props.toDateDefault])

    const handleFromDate = (e) => {
        setFromDate(e.target.value);
        let previousDate = moment(e.target.value).format('DDMMYYYY');
        
        props.onFromDateChange(previousDate);
    }
    const handleToDate = (e) => {
        setToDate(e.target.value);
        let nextDate = moment(e.target.value).format('DDMMYYYY');
        
        props.onToDateChange(nextDate);
    }

    const onChangeProductCategory = (event) => {
        props.onChangeDivision(event);
    }
    const searchTable = () => {
        props.onTableSearch()
    }

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)



    return (
        <>

            <RadioButtonDivision onChangeDivision={onChangeProductCategory} />

            <div className="row headerSection" >

                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12" >
                    <h5 style={{fontSize: `${HeadingFontChange}px`}}><b>{t("list_of_receipt_report.lable")}</b></h5>
                </div>

                <div className="col-md-3 col-lg-3 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                    <div className="form_section">
                        <div className="formBox">
                            <div className="inputBox ">
                                <label style={{fontSize: `${FontChange}px`}}>{t("label.start_date")}</label>
                                <input
                                    type="date"
                                    name=""
                                    value={fromDate}
                                    placeholder="Enter"
                                    className="input"
                                    style={{ width: "100%",fontSize: `${FontChange}px` }}
                                    onChange={handleFromDate}
                                    onKeyDown={(event) => {
                                        event.preventDefault();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-lg-3 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                    <div className="form_section">
                        <div className="formBox">
                            <div className="inputBox ">
                                <label style={{fontSize: `${FontChange}px`}}>{t("label.end_date")}</label>
                                <input
                                    type="date"
                                    name=""
                                    value={toDate}
                                    placeholder="Enter"
                                    className="input"
                                    min={fromDate}
                                    style={{ width: "100%",fontSize: `${FontChange}px` }}
                                    onChange={handleToDate}
                                    onKeyDown={(event) => {
                                        event.preventDefault();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12">
                    <button className="blackButton" style={{fontSize: `${FontChange}px`}} onClick={searchTable}>{t("Search")}</button>

                </div>
                

            </div>
            <br></br>

        </>
    );
}
export default withTranslation()(OpenItemReportHeader);
