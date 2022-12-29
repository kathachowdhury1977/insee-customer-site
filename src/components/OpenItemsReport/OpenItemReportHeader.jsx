import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
// import CaseReportDropdownCombo from '../CaseReportDropdownCombo/CaseReportDropdownCombo';
import { useDispatch, useSelector } from 'react-redux'
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from "../../constant";
import ExcelImage from "../../assets/img/Export-to-excel.png"
import { reportActions } from "../../_actions";
import { reportService } from "../../_services";

import Axios, { AxiosResponse } from 'axios';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import '../RadioButtonGroup/RadioButton.scss'
import RadioButtonDivision from "../../containers/Dashboard/ReportManagement/RadioButtonDivision";
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import moment from 'moment';

function OpenItemReportHeader(props) {
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [showResults, setShowResults] = React.useState(false);

    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)



    const downLoadPDFFile = (history = "history") => {
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/downloadPendingReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + props.division, responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/xlsx' });
                const fileURL = await URL.createObjectURL(file);
                const dateAndTime = moment().format("DD_MM_YYYY_HH_mm_ss");

                link.href = window.URL.createObjectURL(file);
                link.download = "OpenItem" + dateAndTime + ".xlsx";
                link.click();
                // setSetloading(false)
                return response.data;
            })

    }

    const showFilters = () => setShowResults(showResults => !showResults);

    const onChangeProductCategory = (event) => {
        props.onChangeDivision(event);
    }
    return (
        <>

            <RadioButtonDivision onChangeDivision={onChangeProductCategory} />

            <div className="row headerSection" >

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" >
                    <h5><b>{t("open_item_report.lable")}</b></h5>
                </div>

                <div className="col-xl-7 col-lg-8 col-md-6 col-sm-12"  >
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                    <button className="redButton" onClick={() => downLoadPDFFile()}>{t("export")}</button>

                </div>

            </div>

        </>
    );
}
export default withTranslation()(OpenItemReportHeader);
