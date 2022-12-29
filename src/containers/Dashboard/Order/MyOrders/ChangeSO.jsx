import React, { useEffect, useState } from "react";
import { masterActions, orderActions } from '../../../../_actions'
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import { useHistory } from 'react-router'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import RadioButtonItem from '../../../../components/RadioButtonGroup/RadioButtonItem'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import RadioButtonType from '../../../../components/RadioButtonGroup/RadioButtonType'
function ChangeSO(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let history = useHistory()
    const orderdetailsdata =
    props.location.state.orderdetails && props.location.state.orderdetails
    const soNumber = orderdetailsdata && orderdetailsdata.header1.salesOrderNumber
    const selectedLangCode = localStorage.getItem('lancode');
    const shipToNumberData = localStorage.getItem('SHIPTOCODE')
    const subCategory = localStorage.getItem('SUBCATEGORY')
    const [plantCode, setPlantCode] = useState('')
    const [shipToCode, setShipToCode] = useState('')
    const [shippingCond, setShippingCond] = useState('')
    const [materialName, setMaterialName] = useState('')
    const [plantCodeNo, setPlantCodeNo] = useState('')
    const [shipingTypeNo, setShipingTypeNo] = useState('')

    
    const [shipToNo, setShipToNo] = useState('')
    const [matchedSalesArea, setMatchedSalesArea] = useState('')
    const [shipingTypeData, setShipingTypeData] = useState('')
    const [shipingCondNo, setShipingCondNo] = useState('')
    const [productCode, setProductCode] = useState('')

    console.log(props.orderdetails, 'orderdetails4444')
    
    let userName = localStorage.getItem('userData')
    let shipToNumbers = []
    let plantData = []
    let shippingConditionData = []
    let productNameData = []
    let shipingType = []
    var categoryName = useSelector(
        (state) => state.getConwoodCategory.getConwoodCategory
      )
    userName = JSON.parse(userName)
    const customerNumberData = userName.soldTo[0]
    const plantbycount = useSelector((state) => state.plantbyCountryForVN.plantbyCountryForVN)
    const shiptobycount = useSelector((state) => state.shiptobycount)
    const allProduct = useSelector((state) => state.getallproduct)
    const shippingCondition = useSelector((state) => state.shippingcondition)
    const shippingtype = useSelector((state) => state.shippingtype)
    console.log('allProduct78', shippingtype)
    useEffect(()=> { debugger
        dispatch(masterActions.shiptobyCountryAccount('True', userName.soldTo[0]))
        dispatch(masterActions.getShippingCondition(userName.countryCode, categoryName ? categoryName : 'CMT', customerNumberData, customerNumberData))
        
        dispatch(
          masterActions.plantbyCountryForVN(
            userName.soldTo[0],
            ''
            
          )
        )
       
    },[0])

    useEffect(()=> {
      if(userName.countryCode === "VN") {            
        dispatch(
          masterActions.getShippingType(userName.countryCode, {
            customerNumber: customerNumberData,
            matchedSalesArea: matchedSalesArea === 'null' ? [] : matchedSalesArea,
            productCategory: localStorage.getItem('CATEGORY'),
            shipToCode:shipToNo,
            shippingCondition:shipingCondNo,
            subCategory: localStorage.getItem('SUBCATEGORY'),
            contractNumber:  '',
          }, userName.soldTo[0])
        )
          return
        }

    },[shipingCondNo])


     plantData = plantbycount
    ? plantbycount.map((plantData) => {
        return {
          id: plantData.plantCode,
          name: plantData.plantName,
        }
      })
    : [
        {
          id: '0',
          name: `${t('lable.norecordfound')}`,
        },
      ]

       shipToNumbers = shiptobycount.shiptobycount
    ? shiptobycount.shiptobycount.map((accountData) => {
      if(selectedLangCode === 'en' || selectedLangCode === null){
        return {
          id: accountData.shipToId,
          name: accountData.shipToId + '-' + accountData.shipToName,
        }
      }
      else {
        return {
          id: accountData.shipToId,
          name: accountData.shipToId + '-' + accountData.shipToNameInLocal,
        }
      }
        
      })
    : [
        {
          id: '0',
          name: `${t('lable.norecordfound')}`,
        },
      ]

       shippingConditionData = shippingCondition && shippingCondition.shippingcondition && shippingCondition.shippingcondition
      ? shippingCondition && shippingCondition.shippingcondition.map((shipCond) => { 
        if(selectedLangCode === 'en' || selectedLangCode === null){
          return {
            id: shipCond.key,
            name: shipCond.value 
          }
        }
        else {
          return {
            id: shipCond.key,
            name: shipCond.value 
          }
        }
          
        })
      : [
          {
            id: '0',
            name: `${t('lable.norecordfound')}`,
          },
        ]


        productNameData = allProduct && allProduct.getallproduct && allProduct.getallproduct
        ? allProduct && allProduct.getallproduct.map((product) => { 
          if(selectedLangCode === 'en' || selectedLangCode === null){
            return {
              id: product.matchedSalesAreaList,
              name: product.productName ,
              productCode:product.productCode
            }
          }
          else {
            return {
                id: product.matchedSalesAreaList,
                name: product.productName ,
                productCode:product.productCode
              }
          }
            
          })
        : [
            {
              id: '0',
              name: `${t('lable.norecordfound')}`,
            },
          ]

          console.log(allProduct && allProduct.getallproduct , 'allProduct')

          shipingType = shippingtype && shippingtype.shippingtype && 
          shippingtype.shippingtype && shippingtype.shippingtype
        ? shippingtype && shippingtype.shippingtype && 
        shippingtype.shippingtype && shippingtype.shippingtype.map((shippingtype) => { 
          if(selectedLangCode === 'en' || selectedLangCode === null){
            return {
              id: shippingtype.key,
              name: shippingtype.value 
            }
          }
          else {
            return {
                id: shippingtype.key,
                name: shippingtype.value 
              }
          }
            
          })
        : [
            {
              id: '0',
              name: `${t('lable.norecordfound')}`,
            },
          ]

      const onChangePlants = (event, value) => { debugger
        setPlantCode(value)
        setPlantCodeNo(value.id)
       
      }

      const onChangeShipTo = (event, value) => { 
        setShipToCode(value)
        setShipToNo(value.id)
        dispatch(
          masterActions.plantbyCountryForVN(
            userName.soldTo[0],
            value.id
            
          )
        )
      }

      const onChangeMaterialName = (event, value) => {
        setMaterialName(value)
        setMatchedSalesArea(value.id)
        setProductCode(value.productCode)
      }

      const onChangeShippingCond =  (event, value) => { 
        setShippingCond(value)
        setShipingCondNo(value.id)
        
            
        
      }

      const onChangeShippingType =(event, value) => {
        setShipingTypeData (value)
        setShipingTypeNo (value.id)
        // dispatch(
        //   orderActions.getAllProductCatalog(
        //     '',
        //     userName.soldTo[0],
        //     plantCodeNo ? plantCodeNo : '',
        //     shipToNo ? shipToNo : '',
        //     categoryName ? categoryName : 'CMT',
        //     subCategory ? subCategory : 'BAG',
        //     shipingCondNo ? shipingCondNo : '',
        //     shipingTypeNo ? shipingTypeNo : ''
        //   )
        // )
        dispatch(
          orderActions.getAllProductCatalog(
            '',
            userName.soldTo[0],
            plantCodeNo ? plantCodeNo : '',
            shipToNo ? shipToNo : '',
            '',
            '',
            shipingCondNo ? shipingCondNo : '',
            shipingTypeNo ? shipingTypeNo : ''
          )
        )
      }

      const defaultProps = {
        options: shipToNumbers,
        getOptionLabel: (option) => option && option.name.replace(/^0+/, ''),
      }

      const plantDataProps = {
        options: plantData,
        getOptionLabel: (option) => option && option.name,
      }

      const shippingCondProps = {
        options: shippingConditionData,
        getOptionLabel: (option) => option && option.name,
      }

      const productNameDataProps = {
        options: productNameData,
        getOptionLabel: (option) => option && option.name,
      }

      const shipingTypeProps = {
        options: shipingType,
        getOptionLabel: (option) => option && option.name,
      }

const orderUpdate = () => { 
  var data = {
    "customerId": customerNumberData,
    "materialNumber": productCode,
    "orderId": soNumber,
    "plantCode": plantCodeNo,
    "shipToCode": shipToNo,
    "shippingCondition": shipingCondNo,
    "shippingType": shipingTypeNo
  }
  dispatch(orderActions.orderUpdateVN(data))
  setTimeout(()=>{
    history.push("/MyOrder");
  },1500);
  
}
      
      
   

    console.log(shipingType, "??????????")
    return (
        <>
            <div className="content-wrapper">
                <Header />

                <div className="row">
                    <div className="mainScroll">


                        <div className="myorders-container col-12 mt-2">
                            <div className="card mt-0">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <p className="myorder-heading"> {t("changeso.button")}</p>
                                        <p className="fw-2">{t("pleaseselectconditionbelowtochangechangesso.label")}: {soNumber}</p>
                                        <div className="form_section">
                                            <div className="row">
                                            <div className="col-12">
                                                    <div className="inputBox">
                                                    <Autocomplete
                                                    {...defaultProps}
                                                    id='select-ship-to'
                                                    noOptionsText={t('lable.norecordfound')}
                                                    value={shipToCode}
                                                    onChange={onChangeShipTo}
                                                    style={{ width: 500 }}
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('Select Ship-To')}
                                                        variant='outlined'
                                                    />
                                                    )}
                                                />
                                                    
                                                    </div>
                                                </div>
                                            {/* <div className='col-12 mt-3'>
                                                <RadioButtonItem />
                                                </div> */}
                                                {/* <div className='col-12 mt-3'>
                                                {categoryName === undefined ||
                                                    categoryName === 'CMT' ||
                                                    categoryName === 'MORTAR' || categoryName === 'DM' ? (
                                                        <RadioButtonType categoryName = {categoryName}/>
                                                    ) : null}
                                                    </div> */}
                                                
                                                <div className="col-12">
                                                    <div className="inputBox">
                                                    <Autocomplete
                                                    {...plantDataProps}
                                                    id='select-plant'
                                                    noOptionsText={t('lable.norecordfound')}
                                                    value={plantCode}
                                                    onChange={onChangePlants}
                                                    style={{ width: 500 }}
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('selectshipment.plantname')}
                                                        variant='outlined'
                                                    />
                                                    )}
                                                />
                                                   
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="inputBox">
                                                    <Autocomplete
                                                    {...shippingCondProps}
                                                    id='select-shipping-cond'
                                                    noOptionsText={t('label.shipping_condition')}
                                                    value={shippingCond}
                                                    onChange={onChangeShippingCond}
                                                    style={{ width: 500 }}
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('label.shipping_condition')}
                                                        variant='outlined'
                                                    />
                                                    )}
                                                />
                                                   
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="inputBox">
                                                    <Autocomplete
                                                    {...shipingTypeProps}
                                                    id='select-shipping-type'
                                                    noOptionsText={t('label.shipping_condition')}
                                                    value={shipingTypeData}
                                                    onChange={onChangeShippingType}
                                                    style={{ width: 500 }}
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('shippingtype.label')}
                                                        variant='outlined'
                                                    />
                                                    )}
                                                />
                                                   
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="inputBox">
                                                    <Autocomplete
                                                    {...productNameDataProps}
                                                    id='select-material'
                                                    noOptionsText={t('lable.norecordfound')}
                                                    value={materialName}
                                                    onChange={onChangeMaterialName}
                                                    style={{ width: 500 }}
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label={t('material.label')}
                                                        variant='outlined'
                                                    />
                                                    )}
                                                />
                                                       
                                                    </div>
                                                </div>
                                                
                                                
                                                
                                                <div className="col-12">
                                                    <button className="cancel_btn">
                                                        {t("cancel.button")}
                                                    </button>
                                                    <button onClick={orderUpdate} className="create_btn">
                                                        {t("save.button")}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-6">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(ChangeSO);
