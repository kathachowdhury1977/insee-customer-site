import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
import { useDispatch, useSelector } from 'react-redux'
import Axios, { AxiosResponse } from 'axios';
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from "../../constant";
import ExcelImage from "../../assets/img/Export-to-excel.png"
import RadioButtonDivision from "../../containers/Dashboard/ReportManagement/RadioButtonDivision";
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import 'moment-timezone'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'

function CustomerReportHeader(props) {
    const { t } = useTranslation();
    const [showResults, setShowResults] = React.useState(false);

    const [fromDate, setFromDate] = useState(props.fromDateDefault);
    const [toDate, setToDate] = useState(props.toDateDefault);

    const handleFromDate = (e) => {
        setFromDate(e.target.value);
        props.onFromDateChange(e.target.value);
    }
    const handleToDate = (e) => {
        setToDate(e.target.value);
        props.onToDateChange(e.target.value);
    }

    const searchTable = () => {
        props.onTableSearch()
    }
    const onChangeProductCategory = (event) => {
        props.onChangeDivision(event);
    }
    useEffect(()=>{
        setFromDate(props.fromDateDefault);
        setToDate(props.toDateDefault)

    },[props.fromDateDefault,props.toDateDefault])
    const downLoadPDFFile = (history = "history") => {
        // setSetloading(true)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/downloadCustomerReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + props.division + '&fromdate=' + fromDate + '&todate=' + toDate, responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/xlsx' });

                const dateAndTime = moment().format("DD_MM_YYYY_HH_mm_ss");
                link.href = window.URL.createObjectURL(file);
                link.download = 'CustomerStatementReport' + dateAndTime + '.xlsx';
                link.click();
                // setSetloading(false)
                return response.data;
            })
    }

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
      const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
      const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)


    return (
        <>

            <RadioButtonDivision onChangeDivision={onChangeProductCategory} />

            <div className="row headerSection" >

                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12" >
                    <h5><b style={{fontSize: `${HeadingFontChange}px`}}>{t("customer_statement.lable")}</b></h5>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" style={{ top: '-36px' }}>
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
                <div className="col-md-3 col-lg-4 col-md-6 col-sm-12" style={{ top: '-36px' }}>
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

                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                    <button className="blackButton" style={{fontSize: `${FontChange}px`}} onClick={searchTable}>{t("Search")}</button>
                </div>
                {
                    props.countryCode === 'VN' ?
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                    <button className="redButton" style={{fontSize: `${FontChange}px`}} onClick={() => downLoadPDFFile()}>{t("export")}</button>
                </div> : ''
                }
               

            </div>

        </>
    );
}
export default withTranslation()(CustomerReportHeader);
