import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
import { useDispatch, useSelector } from 'react-redux'
import { masterActions } from "../../_actions";
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import RadioButtonDivision from "../../containers/Dashboard/ReportManagement/RadioButtonDivision";
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import 'moment-timezone'

function CreditNoteHeader(props) {
    const { t } = useTranslation();
    const [showResults, setShowResults] = React.useState(false);

    const dispatch = useDispatch()
    const [fromDate, setFromDate] = useState(props.fromDateDefault);
    const [toDate, setToDate] = useState(props.toDateDefault);
    const [searchByStore, setSearchByStore] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [shippingCondition, setShippingCondition] = useState('');
    const [contract, setContract] = useState('');
    const [material, setMaterial] = useState('');
    const [shipToName, setShipToName] = useState('');
    const [search, setSearch] = useState('');

    const statusFilterList = [
        {
            id: "Used",
            name: "Used-ใช้"
        }, {
            id: "Available",
            name: "Available-ยังไม่ใช้"
        }
    ]

    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0

    useEffect(()=>{

        setFromDate(props.fromDateDefault);
        setToDate(props.toDateDefault);

    },[props.fromDateDefault,props.toDateDefault])
    const searchTable = () => {
        props.onTableSearch()
    }
    const handleSearch = (e) => {
        props.onSearchChange(e.target.value);
    }
    const handleFromDate = (e) => {
        setFromDate(e.target.value);
        props.onFromDateChange(ChangeFormateDate(e.target.value));
    }
    const handleToDate = (e) => {
        setToDate(e.target.value);
        props.onToDateChange(ChangeFormateDate(e.target.value));
    }

    const ChangeFormateDate = (oldDate) => {
        return oldDate.toString().split("-").reverse().join("");
    }


    const handleStatus = (e) => {
        props.onStatusChange(e)
    }

    const onChangeProductCategory = (event) => {
        props.onChangeDivision(event);
    }

    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

    return (
        <>
            <div className="col-12">

                <RadioButtonDivision onChangeDivision={onChangeProductCategory} />

                <div className="row headerSection" >

                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" >
                        <h5 style={{fontSize: `${HeadingFontChange}px`}}><b>{t("creditnote.lable")}</b></h5>
                    </div>
                    <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12" >
                        <label style={{ marginBottom: 4, marginTop: 14, fontSize: `${FontChange}px`, fontWeight: 600 }}>{t("")}</label>
                        <div className="form-group has-search" >
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control" style={{ fontSize: `${FontChange}px`, fontWeight: 500 }} onChange={handleSearch} placeholder={t("Search by Document Number,Description,Tax Invoice Number")}></input>
                        </div>
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
                                        style={{ width: "100%", fontSize: `${FontChange}px` }}
                                        onChange={handleToDate}
                                        onKeyDown={(event) => {
                                            event.preventDefault();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Status")}</label>
                                    <FormSelectbox
                                        name={"status"}
                                        class={"input"}
                                        onSelectChange={handleStatus}
                                        label={t("Select")}
                                        data={statusFilterList}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <button className="blackButton" tyle={{fontSize: `${FontChange}px`}} onClick={searchTable}>{t("Search")}</button>
                    </div>


                </div>
            </div>


        </>
    );
}
export default withTranslation()(CreditNoteHeader);
