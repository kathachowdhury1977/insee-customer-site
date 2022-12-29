import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
import { masterActions } from "../../_actions";
import InputSearch from "../InputSearch/InputSearch";
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import 'moment-timezone'
// import CaseReportDropdownCombo from '../CaseReportDropdownCombo/CaseReportDropdownCombo';
import { useDispatch, useSelector } from 'react-redux'
import RadioButtonDivision from "../../containers/Dashboard/ReportManagement/RadioButtonDivision";
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import { reportActions } from "../../_actions";
function ReportHeader(props) {
    let shipmentStatusList = [];
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const [showResults, setShowResults] = React.useState(false);
    
    const [fromDate, setFromDate] = useState(props.fromDate);
    const [toDate, setToDate] = useState(props.toDate);
    const [searchByStore, setSearchByStore] = useState('');
    const [contract, setContract] = useState('');
    const [search, setSearch] = useState('');
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)

    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0

    const contractbyDivision = useSelector((state) => state.getTaxInvoiceContracts)

    const contractbyAccPageLoading = useSelector((state) => state.getTaxInvoiceContracts.loading)
    const materialList = useSelector((state) => state.getTaxInvoiceMaterial);
    const selectedLangCode = localStorage.getItem('lancode');
    const deliveryShipmentStatusList = useSelector((state) => state.getTaxInvoiceContracts);
    console.log("deliveryShipmentStatusList",shipmentStatusList);

    const blackButton = {
        textTransform: "uppercase",
        marginTop: "2px",
        marginLeft: "5px",
        background: "black",
        padding: "6px 22px",
        border: "none",
        borderRadius: "6px",
        fontWeight: "600",
        width: "98%",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
        "&:hover": {
            color: "#fff",
            background: "#ef0000",
        },
    };

    const clearSearch = () => {
        window.location.reload()
    }


    function searchTable() {
        props.onTableSearch()
    }
    useEffect(() => {
        dispatch(reportActions.resetTaxInvoiceContracts())
        dispatch(reportActions.getTaxInvoiceMaterial(props.selectedDivision, fromDate, toDate));
        dispatch(reportActions.getTaxInvoiceContracts(props.selectedDivision, fromDate, toDate));
    }, [props.selectedDivision])

    // useEffect(() => {
    //     dispatch(masterActions.getBusinessSegment(userData.countryCode))
    //     dispatch(masterActions.contractsbyAcc(userData.soldTo[0]))
    // }, [])



    const contractData = contractbyDivision.getTaxInvoiceContracts
        ? contractbyDivision.getTaxInvoiceContracts.map((element) => {
            return {
                id: element,
                name: element,
            };
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];

    const materialListData = materialList.getTaxInvoiceMaterial
        ? materialList.getTaxInvoiceMaterial.map((element) => {
            if( selectedLangCode === 'en' || selectedLangCode === null){
                return {
                    id: element.code,
                    name: element.name,
                };
            }
            else {
                return {
                    id: element.code,
                    name: element.nameInTH,
                };
            }
          
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];


        shipmentStatusList = deliveryShipmentStatusList &&
            deliveryShipmentStatusList.getTaxInvoiceContracts &&
            deliveryShipmentStatusList.getTaxInvoiceContracts ? 
            deliveryShipmentStatusList.getTaxInvoiceContracts.length > 0
            ? deliveryShipmentStatusList.getTaxInvoiceContracts.map((element) => {

                return {
                    id:element.key ?  element.key : '',
                    name: element.value ? element.key + '-' +element.value : '',
                };
            })
            : [
                {
                    id: "0",
                    name: "Data is not available",
                },
            ] :
            [
                {
                    id: "0",
                    name: "Loading...",
                },
            ] 


    const handleFromDate = (e) => {
        setFromDate(e.target.value);
        let previousDate = moment(e.target.value).format('YYYY-MM-DD');
        setToDate(moment(e.target.value).add(3, 'months').format('YYYY-MM-DD'))
        props.onToDateChange(moment(e.target.value).add(3, 'months').format('YYYY-MM-DD'));
        props.onFromDateChange(previousDate)
        // let DateFormat = moment(e.target.value).format('YYYY-MM-DD');

        // setFromDate(e.target.value);

        // props.onFromDateChange(DateFormat);
    }
    const handleToDate = (e) => {

        setToDate(e.target.value);
        // let nextDate = moment(e.target.value).add(1,'days').format('YYYY-MM-DD');
        props.onToDateChange(moment(e.target.value).format('YYYY-MM-DD'));
       
        // let DateFormat = moment(e.target.value).format('YYYY-MM-DD');
        // setToDate(e.target.value);

        // props.onToDateChange(DateFormat);
    }

    const handleSearch = (e) => {
        props.onChangeSearch(e.target.value);
    }
    const showFilters = () => setShowResults(showResults => !showResults);

    const onChangeProductCategory = (event) => {
        setContract('');
        props.onChangeDivision(event);
    }

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

    console.log(deliveryShipmentStatusList, 'deliveryShipmentStatusList')
   
    return (
        <>
            <div className="row">


                <RadioButtonDivision onChangeDivision={onChangeProductCategory} />

                <div className="row headerSection">

                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" >
                        <h5 style={{fontSize: `${HeadingFontChange}px`}}><b>{t("tax_invoice_report.lable")}</b></h5>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" >
                    <label style={{ marginBottom: 4, marginTop: 14, fontSize: 12, fontWeight: 600 }}>{t("")}</label>
                        <div className="form-group has-search" >
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control" style={{ fontSize: `${FontChange}px`, fontWeight: 500 }} onChange={handleSearch} placeholder={t("Search by Tax invoice, PO ,SO & DO Number")}></input>
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
                                        max={(moment(fromDate).add(3, 'months').format('YYYY-MM-DD'))}                                
                                        onChange={handleToDate}
                                        onKeyDown={(event) => {
                                            event.preventDefault();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>





                    {/* <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">

                                <div className="inputBox ">

                                    <label>{t("Search by Store")}</label>

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
                    </div> */}



                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">

                                <div className="inputBox ">

                                    <label style={{fontSize: `${FontChange}px`}}>{t("Contract")}</label>

                                    <FormSelectbox
                                        // disabledValue={props.selectContractDisable}
                                        name={"caseCategory"}
                                        class={"input"}
                                        defaultValue={props.contract}
                                        onSelectChange={props.handleContractChange}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={shipmentStatusList}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">

                                <div className="inputBox ">

                                    <label style={{fontSize: `${FontChange}px`}}>{t("Product")}</label>
                                    
                                    <FormSelectbox
                                        // disabledValue={props.selectMetrailDisable}
                                        name={"caseCategory"}
                                        class={"input"}
                                        onSelectChange={props.handleMaterialChange}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={materialListData}
                                        defaultValue ={props.materialName}

                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* <div className="col-sm-12 col-md-12 col-lg-2">
                        <label>{''}</label>
                        <span className='text-red' onClick={clearSearch}>
                            {t('Clear Search')}
                        </span>
                    </div> */}
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <button style={blackButton} onClick={searchTable}>{t("Search")}</button>

                    </div>



                </div>
            </div>


        </>
    );
}
export default withTranslation()(ReportHeader);