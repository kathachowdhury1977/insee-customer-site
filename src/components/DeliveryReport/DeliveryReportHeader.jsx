import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
// import CaseReportDropdownCombo from '../CaseReportDropdownCombo/CaseReportDropdownCombo';
import { useDispatch, useSelector } from 'react-redux'
import { masterActions, orderActions, reportActions } from '../../_actions'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import RadioButtonDivision from "../../containers/Dashboard/ReportManagement/RadioButtonDivision";
import moment from 'moment'
import 'moment-timezone'
function DeliveryReportHeader(props) {
    const { t } = useTranslation();
    const [showResults, setShowResults] = React.useState(false);

    const dispatch = useDispatch()
    const [fromDate, setFromDate] = useState(props.fromDate);
    const [toDate, setToDate] = useState(props.toDate);
    const [searchByStore, setSearchByStore] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [shippingCondition, setShippingCondition] = useState('');
    const [contract, setContract] = useState('');
    const [material, setMaterial] = useState('');
    const [shipToName, setShipToName] = useState('');
    const [search, setSearch] = useState('');


    const deliveryShipmentStatusList = useSelector((state) => state.getDeliveryShipmentStatusReducer);

    const materialList = useSelector((state) => state.getDeliveryMaterialList.getDeliveryMaterialList);
    const contractbyAcc = useSelector((state) => state.getDeliveryContracts.getDeliveryContracts)
    const shiptobycount = useSelector((state) => state.getDeliveryShipToName.getDeliveryShipToName)

    const selectedLangCode = localStorage.getItem('lancode');
    const shippingConditionDropDown = useSelector(
        (state) => state.getDeliveryShippingCondition.getDeliveryShippingCondition
    )

    const businesSegment = useSelector((state) => state.getBusinessSegment);

    let contractData = []
    let accountData = []

    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let userName = localStorage.getItem('userData')
    userName = JSON.parse(userName)
    let custmerNo = userName && userName.soldTo ? userName.soldTo[0] : 0


    useEffect(() => {
        // dispatch(masterActions.getBusinessSegment('TH'))
    }, [])

    useEffect(() => {
        // dispatch(reportActions.getDeliveryReportMaterial());
    }, [])

    useEffect(() => {
        // dispatch(reportActions.getSalesAndDeliverContracts());
    }, [])
    useEffect(() => {
        try {
            // dispatch(masterActions.getShipmentStatus(userData.countryCode))
            // dispatch(masterActions.getShippingCondition(userData.countryCode, '', '', custmerNo))
            // dispatch(masterActions.getShippingTypeMyOrder(userData.countryCode))
            // dispatch(masterActions.shipToMyOrder(custmerNo))
            // dispatch(masterActions.contractsbyAcc(userData.soldTo[0]))
            // dispatch(masterActions.shiptobyCountryAccount('True', userData.soldTo[0]))
            dispatch(reportActions.getDeliveryShipmentStatus(userData.countryCode))
            // dispatch(masterActions.shipmentStatusFilterList())

            // dispatch(reportActions.getDeliveryStatus(props.countryCode,props.division));
            dispatch(reportActions.getDeliveryShippingCondition(props.countryCode, props.division, props.fromDate, props.toDate));
            dispatch(reportActions.getDeliveryShipToName(props.countryCode, props.division, props.fromDate, props.toDate));
            dispatch(reportActions.getDeliveryMaterialList(props.countryCode, props.division, props.fromDate, props.toDate));
            dispatch(reportActions.getDeliveryContracts(props.countryCode, props.division, props.fromDate, props.toDate));


        } catch (err) {
            console.log('err' + err)
        }
    }, [props.countryCode, props.division])


    const onChangeProductCategory = (event) => {
        props.onChangeDivision(event);
    }
    const materialData = materialList && materialList && materialList.length > 0
        ? materialList.map((element) => {
            if(props.division === 'CO' || props.division === 'CW'){
                if(selectedLangCode === 'en' || selectedLangCode === null){ 
                    return {
                        id: element.key,
                        name: element.value ? element.value.split(':')[1]  : '',
                    };
                }
                else {
                    return {
                        id: element.key,
                        name: element.value ? element.value.split(':')[0]  : '',
                    };
                }
            }
            else {
                if(selectedLangCode === 'en' || selectedLangCode === null){ 
                    return {
                        id: element.key,
                        name: element.value ? element.value.split(':')[1]  : '',
                    };
                }
                else {
                    return {
                        id: element.key,
                        name: element.value ? element.value.split(':')[0]  : '',
                    };
                }
            }
            
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];

    const shipmentStatusList = deliveryShipmentStatusList &&
        deliveryShipmentStatusList.getDeliveryShipmentStatus &&
        deliveryShipmentStatusList.getDeliveryShipmentStatus.length > 0
        ? deliveryShipmentStatusList.getDeliveryShipmentStatus.map((element) => {
            if(selectedLangCode === 'en' || selectedLangCode === null){
                return {
                    id: element.value,
                    name: element.value,
                }
            }else {
                return {
                    id: element.value,
                    name: element.key,
                }
            }
          
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];

    contractData = contractbyAcc && contractbyAcc.length > 0
        ? contractbyAcc.map((contractData) => {
            return {
                id: contractData.key,
                name: contractData.key + '-' + contractData.value,
            }
        })
        : []

    accountData = shiptobycount && shiptobycount.length > 0
        ? shiptobycount.map((accountData) => {

            // Change the logic to country wise
            if (2 > 1) {
                if(selectedLangCode === 'en' || selectedLangCode === null){
                    return {
                        id: accountData.key,
                        name: accountData.key.replace(/^0+/, '') + '-' + accountData.value.split(':')[1],
                    }
                }else {
                    return {
                        id: accountData.key,
                        name: accountData.key.replace(/^0+/, '') + '-' + accountData.value.split(':')[0],
                    }
                }
                   
              
            }
            else {
                if(selectedLangCode === 'en' || selectedLangCode === null){
                    return {
                        id: accountData.value,
                        name: accountData.key.replace(/^0+/, '') + '-' + accountData.value.split(':')[1],
                    }
                }else {
                    return {
                        id: accountData.value,
                        name: accountData.key.replace(/^0+/, '') + '-' + accountData.value.split(':')[0],
                    }
                }
               
            }

        })
        : [
            {
                id: '0',
                name: `${t('lable.norecordfound')}`,
            },
        ]





    const shippingConditionData = shippingConditionDropDown && shippingConditionDropDown.length > 0
        ? shippingConditionDropDown.map((element) => {
            if(selectedLangCode === 'en' || selectedLangCode === null){
                return {
                    id: element.key,
                    name: element.value.split('-')[1],
                }
            }else {
                return {
                    id: element.key,
                    name: element.value.split('-')[0],
                }
            }
           
        })
        : [
            {
                id: '0',
                name: 'Data is not available',
            },
        ]



    const showFilters = () => setShowResults(showResults => !showResults);
    const handleSearch = (e) => {
        props.onsearchHandleChange(e.target.value);
    }

    const handleSearchPlant = (e) => {
        props.onsearchHandleChangePlant(e.target.value);
    }
    // const handleDO = (e) => {
    //     props.onDOChange(e.target.value);
    // }
    // const handlePO = (e) => {
    //     props.onPOChange(e.target.value);
    // }
    // const handleSO = (e) => {
    //     props.onSOChange(e.target.value);
    // }
    const handleFromDate = (e) => {
        setFromDate(e.target.value);
        let previousDate = moment(e.target.value).format('YYYY-MM-DD');
        setToDate(moment(e.target.value).add(3, 'months').format('YYYY-MM-DD'))
        props.onToDateChange(moment(e.target.value).add(3, 'months').format('YYYY-MM-DD'));
        props.onFromDateChange(previousDate);
    }
    const handleToDate = (e) => {debugger
        setToDate(e.target.value);
        // let nextDate = moment(e.target.value).add(1, 'days').format('YYYY-MM-DD');

        props.onToDateChange(moment(e.target.value).format('YYYY-MM-DD'));
    }
    const handleOrderStatus = (e) => {
        if(e !=""){
        const data = shipmentStatusList && shipmentStatusList.find((x) => x.id === e);
        props.setOrderStatusName(data.name);
        props.onOrderStatusChange(e);
        }
        else {
            props.onOrderStatusChange(e);
        }
    }
    const handleMaterial = (e) => {
        if(e !=""){
        const data = materialData && materialData.find((x) => x.id === e);
        props.setMaterialName(data.name)
        props.onMaterialChange(e);
        }
        else {
            props.onMaterialChange(e);
        }
    }
    const handleContract = (e) => {
        
        if(e !=""){
        const data = contractData && contractData.find((x) => x.id === e);
        props.setContractName(data.name)
        var contractValue = e.split('-')[0]
        props.onContractChange(contractValue)
        }

        else {
            props.onContractChange(e)
        }
    }
    const handleShipTo = (e) => {
        if(e !=""){
        const data = accountData && accountData.find((x) => x.id === e);
        props.setShipToNameName(data.name)
        props.onShipToNameChange(e);
        }
        else {
            props.onShipToNameChange(e);
        }
    }
    const handleShipToCondition = (e) => {
        debugger
        if(e !=""){
        const data = shippingConditionData && shippingConditionData.find((x) => x.id === e);
        props.setShippingConditionName(data.name);
        props.onShipToCondition(e);
        }
        else {
            props.onShipToCondition(e);
        }
    }
    const searchTable = () => {
        props.onTableSearch()
    }

    const deliveryDivision = props.division;
    console.log("deliveryDivision",deliveryDivision);

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
    return (
        <>
            <div className="row">

                <RadioButtonDivision deliveryDivision ={deliveryDivision} isSales={true} onChangeDivision={onChangeProductCategory} />

                <div className="row headerSection" >

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12" >
                        <h5 style={{fontSize: `${HeadingFontChange}px`}}><b>{t("delivery_report.lable")}</b></h5>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-3" >
                    <label style={{ marginBottom: 4, marginTop: 14, fontSize: 12, fontWeight: 600 }}>{t("")}</label>
                        <div className="form-group has-search" >
                            <span className="fa fa-search form-control-feedback"></span>
                            <input style={{fontSize: `${FontChange}px`}}  type="text" className="form-control" onChange={handleSearch} placeholder={t("Search by DO / PO / SO")}></input>
                        </div>
                    </div>
                    {
                        deliveryDivision && deliveryDivision === 'CO' ? 
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-3" >
                        <label style={{ marginBottom: 4, marginTop: 14, fontSize: 12, fontWeight: 600 }}>{t("")}</label>
                            <div className="form-group has-search" >
                                <span className="fa fa-search form-control-feedback"></span>
                                <input type="text" style={{fontSize: `${FontChange}px`}} className="form-control" onChange={handleSearchPlant} placeholder={t("Search by Plant")}></input>
                            </div>
                        </div>
                        :
                        ''
                    }

                    {/* <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 mb-3" >
                        <div className="form-group has-search" >
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control" onChange={handlePO} placeholder={t("Search by PO No.")}></input>
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12" >
                        <div className="form-group has-search" >
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control" onChange={handleSO} placeholder={t("Search by SO")}></input>
                        </div>
                    </div> */}

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Weight out date From")}</label>
                                    <input
                                        type="date"
                                        name=""
                                        min="2021-01-01" 
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

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Weight out date To")}</label>
                                    <input
                                        type="date"
                                        name=""
                                        value={toDate}
                                        placeholder="Enter"
                                        className="input"
                                        min={fromDate}
                                        max={(moment(fromDate).add(3, 'months').format('YYYY-MM-DD'))}
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
                    {
                        props.division && props.division === 'CW' ? '' :
                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Shipment Status")}</label>
                                    <FormSelectbox
                                        class={"input"}
                                        defaultValue={props.orderStatusName}
                                        onSelectChange={handleOrderStatus}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={shipmentStatusList}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                   
                    
                    {
                        deliveryDivision && deliveryDivision === 'CO' ? '' :
                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">

                                <div className="inputBox ">

                                    <label style={{fontSize: `${FontChange}px`}}>{t("Shipping Condition")}</label>

                                    <FormSelectbox
                                        class={"input"}
                                        name= {"shippingCondition"}
                                        defaultValue={props.shippingConditionName}
                                        onSelectChange={handleShipToCondition}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={shippingConditionData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    }

                    
                    {
                        props.division && props.division === 'CO' ? '' :
                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Contract")}</label>
                                    <FormSelectbox
                                        class={"input"}
                                        defaultValue={props.contractName}
                                        onSelectChange={handleContract}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={contractData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    }
                   

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("label.product_name")}</label>
                                    <FormSelectbox
                                        class={"input"}
                                        defaultValue={props.materialName}
                                        onSelectChange={handleMaterial}
                                        label={t("Select")}
                                        data={materialData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                  
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Ship To Name")}</label>
                                    <FormSelectbox
                                        name={'shipToName'}
                                        class={"input"}
                                        defaultValue={props.shipToNameName}
                                        onSelectChange={handleShipTo}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={accountData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12">
                        <button className="blackButton" onClick={searchTable} style={{fontSize: `${HeadingFontChange}px`}}>{t("Search")}</button>
                    </div>

                </div>
            </div>

        </>
    );
}
export default withTranslation()(DeliveryReportHeader);
