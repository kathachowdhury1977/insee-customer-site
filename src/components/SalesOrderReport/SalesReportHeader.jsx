import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from '../FormSelectbox/FormSelectbox';
import FormInput from '../FormInput/FormInput';
import { useDispatch, useSelector } from 'react-redux'
import { masterActions, orderActions, reportActions } from '../../_actions'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import RadioButtonDivision from "../../containers/Dashboard/ReportManagement/RadioButtonDivision";
import moment from 'moment'
import 'moment-timezone'

function SalesOrderReportHeader(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    let contractData = []
    let accountData = []
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0

    const [showResults, setShowResults] = React.useState(false);
    const [fromDate, setFromDate] = useState(props.fromDate);
    const [toDate, setToDate] = useState(props.toDate);
    const [searchByStore, setSearchByStore] = useState('');
    // const [orderStatus, setOrderStatus] = useState('');
    // const [shippingCondition, setShippingCondition] = useState('');
    // const [contract, setContract] = useState('');
    // const [material, setMaterial] = useState('');
    // const [shipToName, setShipToName] = useState('');
    const [search, setSearch] = useState('');

    const selectedLangCode = localStorage.getItem('lancode');
    const contractbyAcc = useSelector((state) => state.getSalesOrderContracts)
    const shiptobycount = useSelector((state) => state.getSalesOrderShipToName)
    const shipmentStatus = useSelector((state) => state.getSalesOrderStatus.getSalesOrderStatus)
    const shipToMyOrder = useSelector((state) => state.shipToMyOrder.shipToMyOrder)
    const shippingConditionDropDown = useSelector((state) => state.getSalesOrderShippingCondition.getSalesOrderShippingCondition)
    const materialList = useSelector((state) => state.getSalesOrderMaterialList.getSalesOrderMaterialList);
    const businesSegment = useSelector((state) => state.getBusinessSegment);
    



    useEffect(() => {
        dispatch(reportActions.getSalesReportMaterial());
    }, [])
    useEffect(() => {
        try {
            // dispatch(masterActions.getShipmentStatus(userData.countryCode))
            // dispatch(masterActions.getShippingCondition(userData.countryCode, '', '', custmerNo))
            // dispatch(masterActions.getShippingTypeMyOrder(userData.countryCode))
            // dispatch(masterActions.shipToMyOrder(custmerNo))
            // dispatch(masterActions.contractsbyAcc(userData.soldTo[0]))
            // dispatch(reportActions.getSalesAndDeliverContracts(props.division));
            // dispatch(masterActions.shiptobyCountryAccount('True', userData.soldTo[0]))

            dispatch(reportActions.getSalesOrderStatus(props.countryCode, props.division, props.fromDate, props.toDate));
            dispatch(reportActions.getSalesOrderShippingCondition(props.countryCode, props.division, props.fromDate, props.toDate));
            dispatch(reportActions.getSalesOrderShipToName(props.countryCode, props.division, props.fromDate, props.toDate));
            dispatch(reportActions.getSalesOrderMaterialList(props.countryCode, props.division, props.fromDate, props.toDate));
            dispatch(reportActions.getSalesOrderContracts(props.countryCode, props.division, props.fromDate, props.toDate));


        } catch (err) {
            console.log('err' + err)
        }
    }, [props.countryCode, props.division])


    contractData = contractbyAcc.getSalesOrderContracts && contractbyAcc.getSalesOrderContracts.length > 0
        ? contractbyAcc.getSalesOrderContracts.map((contractData) => {
            return {
                id: contractData.contractNumber,
                name: contractData.contractNumber + '-' + contractData.contractName,
            }
        })
        : []

    accountData = shiptobycount.getSalesOrderShipToName && shiptobycount.getSalesOrderShipToName.length>0
        ? shiptobycount.getSalesOrderShipToName.map((accountData) => {

            // Change the logic to country wise
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
               
            
           

        })
        : [
            {
                id: '0',
                name: `${t('lable.norecordfound')}`,
            },
        ]




    const shipmentStatusData = shipmentStatus && shipmentStatus.length > 0
        ? shipmentStatus.map((element) => {
            if(selectedLangCode === 'en' || selectedLangCode === null){
                return {
                    id: element.value,
                    name: element.key ? element.key.split('-')[1] : '' ,
                }
            }
            else {
                return {
                    id: element.value,
                    name:element.key ? element.key.split('-')[0] : '',
                }
            }
           
        })
        : [
            {
                id: '0',
                name: 'Data is not available',
            },
        ]


        const productNames = materialList && materialList.length > 0
        ? materialList.map((element) => {
            if(selectedLangCode === 'en' || selectedLangCode === null){
                return {
                    id: element.materialNumber,
                    name: element.materialName ? element.materialName.split(':')[1]  : '',
                   
                }
            }
            else {
                return {
                    id: element.materialNumber,
                    name: element.materialName ? element.materialName.split(':')[0]  : '',
                  
                }
            }
           
        })
        : [
            {
                id: '0',
                name: 'Data is not available',
            },
        ]




    const shippingConditionData = shippingConditionDropDown && shippingConditionDropDown.length > 0
        ? shippingConditionDropDown.map((element) => {
            if(selectedLangCode === 'en' || selectedLangCode === null){ 
                return {
                    id: element.key,
                    name: element.value ? element.value.split('-')[1]  : '',
                };
            }
            else {
                return {
                    id: element.key,
                    name: element.value ? element.value.split('-')[0]  : '',
                };
            }
        })
        : [
            {
                id: '0',
                name: 'Data is not available',
            },
        ]




    const onChangeProductCategory = (event) => {
        props.onChangeDivision(event);
    }
    const handleSearch = (e) => {
        props.onSearchChange(e.target.value);
    }
    const handleFromDate = (e) => {
        setFromDate(e.target.value);
        let previousDate = moment(e.target.value).format('YYYY-MM-DD');
        setToDate(moment(e.target.value).add(3, 'months').format('YYYY-MM-DD'))
        props.onToDateChange(moment(e.target.value).add(3, 'months').format('YYYY-MM-DD'));
        props.onFromDateChange(previousDate);
    }
    const handleToDate = (e) => {
        setToDate(e.target.value);
        // let nextDate = moment(e.target.value).add(1,'days').format('YYYY-MM-DD');
        props.onToDateChange(moment(e.target.value).format('YYYY-MM-DD'));
     
    }
    const handleOrderStatus = (e) => {
        debugger
        if(e !=""){
            const data = shipmentStatusData && shipmentStatusData.find((x) => x.id === e);
            props.setOrderStatusName(data.name);
            props.onOrderStatusChange(e);
        }
        else {
            props.onOrderStatusChange(e);
        }
      
    }
    const handleMaterial = (e) => {
        if(e !=""){
        const data = productNames && productNames.find((x) => x.id === e);
        props.setMaterialName(data.name)
        props.onMaterialChange(e);
        }

        else {
            props.onMaterialChange(e);
        }
    }
    const handleContract = (e) => {
        if(e !=""){
        props.onContractChange(e)
        const data = contractData && contractData.find((x) => x.id === e);
        props.setContractName(data.name)
        }
        else {
            props.onContractChange(e)
        }
    }
    const handleShipTo = (e) => {
        if(e !=""){
        props.onShipToNameChange(e);
        const data = accountData && accountData.find((x) => x.id === e);
        props.setShipToNameName(data.name)
        }
        else {
            props.onShipToNameChange(e);
        }
    }
    const handleShipToCondition = (e) => {
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

  


    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
    return (
        <>
            <div className="row">

                <RadioButtonDivision isSales={true} onChangeDivision={onChangeProductCategory} />

                <div className="row headerSection" >

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12" >
                        <h5 style={{fontSize: `${HeadingFontChange}px`}}><b>{t("sales_order.lable")}</b></h5>
                    </div>

                    <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12" >
                    <label style={{ marginBottom: 4, marginTop: 14, fontSize: 14, fontWeight: 600 }}>{t("")}</label>
                        <div className="form-group has-search" >
                            <span className="fa fa-search form-control-feedback"></span>
                            <input style={{fontSize: `${FontChange}px`}} type="text" className="form-control" onChange={handleSearch} placeholder={t("Search by PO & SO No.")}></input>
                        </div>

                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("label.start_date")}</label>
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
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" style={{ top: '-36px' }}>
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
                                    <label style={{fontSize: `${FontChange}px`}}>{t("order_status.lable")}</label>
                                    <FormSelectbox
                                        name={"Order Status"}
                                        class={"input"}
                                        defaultValue={props.orderStatusName}
                                        onSelectChange={handleOrderStatus}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={shipmentStatusData}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Shipping Condition")}</label>
                                    <FormSelectbox
                                        name={"shippingCondition"}
                                        class={"input"}
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

                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Contract")}</label>
                                    <FormSelectbox
                                        name={"contract"}
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

                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("ProductNameReport")}</label>
                                    
                                    <FormSelectbox
                                        name={"material"}
                                        class={"input"}
                                        defaultValue={props.materialName}
                                        onSelectChange={handleMaterial}
                                        label={t("Select")}
                                        displayedLabel={"description"}
                                        data={productNames}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12" style={{ top: '-36px' }}>
                        <div className="form_section">
                            <div className="formBox">
                                <div className="inputBox ">
                                    <label style={{fontSize: `${FontChange}px`}}>{t("Ship-to Name")}</label>
                                    <FormSelectbox
                                        name={"shipToName"}
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

                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <button className="blackButton" onClick={searchTable} style={{fontSize: `${FontChange}px`}}>{t("Search")}</button>
                    </div>

                </div>
            </div>

        </>
    );
}
export default withTranslation()(SalesOrderReportHeader);
