import React, { useEffect, useState, useRef } from 'react'
import { masterActions, orderActions, eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import FormSelectbox from '../FormSelectbox/FormSelectbox'
import './SelectShipment.scss'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import {MultiSelectBox, MultiSelectBoxDelivery} from '../FormSelectbox/MultiSelect'

function SelectShipment(props) {
  const inputRefs = useRef()
  const productShipment = useSelector((state) => state.productForShipment)
  const shippingType = useSelector((state) => state.shippingtypemyorder)
  const shiptoShipment = useSelector((state) => state.shipToForShipment)
  const plantbycount = useSelector((state) => state.plantbycount)
  const plantbycountVt = useSelector((state) => state.plantbyCountryForVN.plantbyCountryForVN)
  const shiptobycount = useSelector((state) => state.shiptobycount)

  const isShipToSelected = useSelector(
    (state) => state.isShipToSelected.isShipToSelected
  )
  const selectedLangCode = localStorage.getItem('lancode');
  const [plant_name_id, setPlantNameId] = useState('')
  const [ship_type, setShipType] = useState('')
  const [select_product_id, setProductId] = useState('')
  const [selectshipment_shipto, setSelectShiptoId] = useState('')
  const [shipping_condition, setshippingCondition] = useState('')

  
  const [shipToCode, setShipToCode] = useState('')
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  let shiptoShipmentData = []
  let productShipmentData = []
  console.log('productShipment', productShipment)
  const customerId = userName ? userName.soldTo[0] : 0
  const countryCode = userName ? userName.countryCode : ''
  const onSelectFilter = (event, name) => {
    props.setFilterarray({ ...props.filterarray, [name]: event })
  }
  useEffect(() => {
    if (props.filterarray['shipingCondition'] == 'Delivery') {
      console.log(
        'inputRefsinputRefs',
        inputRefs.current !== undefined ? inputRefs.current.value : ''
      )
      props.setFilterarray({
        ...props.filterarray,
        ['shipType']: inputRefs.current.value,
      })
    } else {
      props.setFilterarray({ ...props.filterarray, ['shipType']: '' })
    }
  }, [props.filterarray['shipingCondition']])

  useEffect(() => {
    if(countryCode && countryCode !== "VN") {
      dispatch(masterActions.shiptobyCountryAccount('True', userName.soldTo[0]))
    }
   
  },[0])
  const onShipToChange = (event) => { debugger
    if (event.target.name == 'shipTo') {
      props.setShipToId(event.target.value)
    }
    props.setFilterarray({

      ...props.filterarray,
      [event.target.name]: event.target.value,
    })
  }

  const plantIdShipment = useSelector(
    (state) => state.getPlantIdForShipment.getPlantIdForShipment
  )
  const productIdShipment = useSelector(
    (state) => state.getProductForShipment.getProductForShipment
  )
  const shipToShipment = useSelector(
    (state) => state.getShipToForShipment.getShipToForShipment
  )

  const clearallShipFilter = () => {
    window.location.reload()
  }
  const plantnameDataShip =
  userName.countryCode === "VN" ? 
  plantbycountVt && plantbycountVt
    ? plantbycountVt && plantbycountVt.map((plantData) => {
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
      :
  plantbycount.plantbycount
  ? plantbycount.plantbycount.map((plantData) => {
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

  productShipmentData =
    productShipment && productShipment.productForShipment !== undefined
      ? productShipment &&
        productShipment.productForShipment.map((product) => {
          ///console.log('productNameproductName',product.productName.toLowerCase().indexOf("conwood"));
          if(selectedLangCode === 'en' || selectedLangCode === null){
            return {
              id: product.productId,
              name:
              
                product.productId.replace(/^0+/, '') + '-' + product.productName ? product.productName.split(':')[0] : '',
            }
          }
          else {
            return {
              id: product.productId,
            name:
              product.productId.replace(/^0+/, '') + '-' + product.productName ? product.productName.split(':')[1] : '',
            }
          }
        
        })
      : [
          {
            id: '0',
            name: 'Data is not available',
          },
        ]

  shiptoShipmentData =
  shiptobycount.shiptobycount
  ? shiptobycount.shiptobycount.map((accountData) => {
    if(selectedLangCode === 'en' || selectedLangCode === null){
      return {
        id: accountData.shipToId,
        name: accountData.shipToId.replace(/^0+/, '') + '-' + accountData.shipToName,
      }
    }
    else {
      return {
        id: accountData.shipToId,
        name: accountData.shipToId.replace(/^0+/, '') + '-' + accountData.shipToNameInLocal,
      }
    }
      
    })
  : [
      {
        id: '0',
        name: `${t('lable.norecordfound')}`,
      },
    ]

  const shippingTypeData = shippingType.shippingtypemyorder
    ? shippingType.shippingtypemyorder.map((element) => {
        return {
          id: element.key,
          name: element.value,
        }
      })
    : [
        {
          id: '0',
          name: 'Data is not available',
        },
      ]
  let shippingConditionData = [
    { id: 'D1', name: 'Delivery' },
    { id: 'D2', name: 'Delivery+Labor' },
    { id: 'D3', name: 'Delivery+MHE' },
  ]




  const onChangeShipTo = async (event, value) => {
    setShipToCode(value)
    props.setShipToId(value.id)
    props.setFilterarray({
      ...props.filterarray, ["shipTo"]: value.id,
    })
  }

  const getprovince = useSelector((state) => state.getprovince.getprovince);
  const getdistrictLsit = useSelector((state) => state.getdistrict.getdistrict);
  const getDateRangeMasterData  = useSelector((state) => state.getDateRangeMaster.getDateRangeMaster);
  const getShipToForVnData  = useSelector((state) => state.getShipToForVn.getShipToForVn);

  
  useEffect(() => {
    if( countryCode && countryCode === "VN" ){
      dispatch(masterActions.getProvince(countryCode));
      dispatch(masterActions.getDateRangeMaster());
      dispatch(masterActions.getShipToForVn(userName.soldTo[0], '', '')) 
    } 
    else{
      return
    }
  
  }, [0])

  console.log(getShipToForVnData, 'getShipToForVnData')

  const provinceData = getprovince && getprovince!==undefined
  ? getprovince && getprovince.map((Data) => {
      return {
        id: Data.provinceCode,
        name: Data.province,
      };
    })
  : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

    const getDistData=getdistrictLsit && getdistrictLsit!==undefined?  getdistrictLsit && getdistrictLsit.map((data)=>{
      return {
        id: data.disctrictCode,
        name: data.district,
      };
    }):[
      {
        id: "0",
        name: "Data is not available",
      },
    ];


    const getDateRangeMasterDataValue = getDateRangeMasterData && getDateRangeMasterData!==undefined?  getDateRangeMasterData && getDateRangeMasterData.map((data)=>{
      return {
        id: data.value,
        name: data.key,
      };
    }):[
      {
        id: "0",
        name: "Data is not available",
      },
    ];


    const getShipToForVnDataValue = getShipToForVnData && getShipToForVnData!==undefined
  ? getShipToForVnData && getShipToForVnData.map((Data) => {
      return {
        value: Data.shipToId,
        label: Data.shipToId + '-' + Data.shipToName,
      };
    })
  : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

    const onSelectChangeProvince = (event, name) => {
      console.log(event, "value", name);
      props.setProvince(event)
      dispatch(masterActions.getDistrict(countryCode,event));

      
    }

    const onSelectChangeDistrict = (event, name) => { 
      console.log(event, "value", name);
      dispatch(masterActions.getShipToForVn(userName.soldTo[0], props.province, event))     
      
    }

    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  return (
    <>
      <div className='select_shipment'>
        <div className='form_section'>
          {props.filterarray['shipingCondition'] == 'Delivery' ? (
            <div className='row'>
              {
                countryCode && countryCode === "VN" ? 
                <>
                <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className='inputBox'>
                      <label style={{fontSize: `${FontChange}px`}}>{t('Province')}</label>
                      <FormSelectbox
                        name={'province'}
                        class={'input'}
                        onSelectChange={onSelectChangeProvince}
                        label={t('Select')}
                        data={provinceData}
                        
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className='inputBox'>
                      <label style={{fontSize: `${FontChange}px`}}>{t('district.label')}</label>
                      <FormSelectbox
                        name={'district'}
                        class={'input'}
                        onSelectChange={onSelectChangeDistrict}
                        label={t('Select')}
                        data={getDistData}
                      />
                    </div>
                  </div> 
                  <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className='inputBox'>
                      <label style={{fontSize: `${FontChange}px`}}>{t('Date')}</label>
                      <select
                        ref={inputRefs}
                        name='dateRange'
                        id='date'
                        className='input'
                        onChange={onShipToChange}
                        style={{fontSize: `${FontChange}px`}}
                      >
                        <option disabled selected value='' style={{fontSize: `${FontChange}px`}}>{t('Select')}</option>
                        {getDateRangeMasterDataValue.map((data) => {
                          return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{t(data.name)}</option>
                        })}
                      </select>
                     
                    </div>
                  </div> 
                </> : ''
              }
              <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                <div className='inputBox'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.plantname')}</label>
                  <FormSelectbox
                    name={'plantId'}
                    class={'input'}
                    onSelectChange={onSelectFilter}
                    label={t('Select')}
                    data={plantnameDataShip}
                  />
                </div>
              </div>

              <div className='col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                <div className='inputBox'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.product')}</label>
                  <select
                    name='productCode'
                    className='input'
                    onChange={onShipToChange}
                    style={{fontSize: `${FontChange}px`}}
                  >
                    <option value='' style={{fontSize: `${FontChange}px`}}>{t('selectshipment.product')}</option>
                    {productShipmentData.map((data) => {
                      if (props.filterarray['productCode'] == data.id) {
                        return (
                          <option selected='selected' value={data.id} style={{fontSize: `${FontChange}px`}}>
                            {data.name}
                          </option>
                        )
                      } else {
                        return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{data.name}</option>
                      }
                    })}
                  </select>
                </div>
              </div>
                
                {
                  countryCode && countryCode === "VN" ? 
                  <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12'>
                    <div className='inputBox'>
                      {console.log('shiptoShipmentData', shiptoShipmentData)}
                      <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.shipto')}</label>
                    <MultiSelectBox  
                    setFilterarray={props.setFilterarray}
                    filterarray={props.filterarray}
                    setShipToId={props.setShipToId}
                    name='shipTo' 
                    placeholder={t('Select')}
                    getShipToForVnDataValue = {getShipToForVnDataValue}/>
                    </div>
                  </div>
                  : 
                  <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                  <div className='inputBox'>
                    {console.log('shiptoShipmentData', shiptoShipmentData)}
                    <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.shipto')}</label>
                    <select
                      name='shipTo'
                      className='input'
                      onChange={onShipToChange}
                      style={{fontSize: `${FontChange}px`}}
                    >
                      <option value='' style={{fontSize: `${FontChange}px`}}>{t('selectshipment.shipto')}</option>
                      {shiptoShipmentData.map((data) => {
                        return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{data.name}</option>
                      })}
                    </select>
                  </div>
                </div>
                }
              
              {
                countryCode && countryCode === "VN" ? '' :
                <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12 pl-0'>
                <div className='inputBox'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('Shipping Condition')}</label>
                  <select
                    name='deliveryType'
                    className='input'
                    onChange={onShipToChange}
                    style={{fontSize: `${FontChange}px`}}
                  >
                    {shippingConditionData.map((data) => {
                      return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{t(data.name)}</option>
                    })}
                  </select>
                </div>
              </div>
              }
              
              {
                countryCode && countryCode === "VN" ? 
                <div className='col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                <div className='inputBox'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('Shipping Type')}</label>
                  <select
                    ref={inputRefs}
                    name='shipType'
                    id='shipType'
                    className='input'
                    onChange={onShipToChange}
                    style={{fontSize: `${FontChange}px`}}
                  >
                     <option value='' style={{fontSize: `${FontChange}px`}}>{t('Select')}</option>
                    {shippingTypeData.map((data) => {
                      return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{t(data.name)}</option>
                    })}
                  </select>
                </div>
              </div>
                :
              <div className='col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                <div className='inputBox'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('Shipping Type')}</label>
                  <select
                    ref={inputRefs}
                    name='shipType'
                    id='shipType'
                    className='input'
                    onChange={onShipToChange}
                    style={{fontSize: `${FontChange}px`}}
                  >
                    {shippingTypeData.map((data) => {
                      return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{t(data.name)}</option>
                    })}
                  </select>
                </div>
              </div>
              }

              <div
                style={{ paddingTop: '0px', paddingRight: '20px' }}
                className='col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12 text-right'
              >
                <button className='clear_all' onClick={clearallShipFilter} style={{fontSize: `${FontChange}px`}}>
                  {t('selectshipment.clearall')}
                </button>
                <button className="blackButton" onClick={props.serchOrderHandle}  style={{maxWidth: '120px', marginTop: '20px', fontSize: `${FontChange}px`}}>{t("Search")}</button>
              </div>
            </div>
          ) : (
            <div className='row'>
              {
                countryCode && countryCode === "VN" ? 
                <>
                <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className='inputBox'>
                      <label style={{fontSize: `${FontChange}px`}}>{t('Province')}</label>
                      <FormSelectbox
                        name={'province'}
                        class={'input'}
                        onSelectChange={onSelectChangeProvince}
                        label={t('Select')}
                        data={provinceData}
                        
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className='inputBox'>
                      <label style={{fontSize: `${FontChange}px`}}>{t('district.label')}</label>
                      <FormSelectbox
                        name={'district'}
                        class={'input'}
                        onSelectChange={onSelectChangeDistrict}
                        label={t('Select')}
                        data={getDistData}
                      />
                    </div>
                  </div> 
                  <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <div className='inputBox'>
                      <label style={{fontSize: `${FontChange}px`}}>{t('Date')}</label>
                      <select
                        ref={inputRefs}
                        name='dateRange'
                        id='date'
                        className='input'
                        onChange={onShipToChange}
                        style={{fontSize: `${FontChange}px`}}
                      >
                        <option disabled selected value='' style={{fontSize: `${FontChange}px`}}>{t('Select')}</option>
                        {getDateRangeMasterDataValue.map((data) => {
                          return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{t(data.name)}</option>
                        })}
                      </select>
                     
                    </div>
                  </div> 
                </> : ''
              }
              
              <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                <div className='inputBox'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.plantname')}</label>
                  <FormSelectbox
                    name={'plantId'}
                    class={'input'}
                    onSelectChange={onSelectFilter}
                    label={t('Select')}
                    data={plantnameDataShip}
                  />
                </div>
              </div>

              <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                <div className='inputBox'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.product')}</label>
                  <select
                    name='productCode'
                    className='input'
                    onChange={onShipToChange}
                    style={{fontSize: `${FontChange}px`}}
                  >
                    <option value='' style={{fontSize: `${FontChange}px`}}>{t('selectshipment.product')}</option>
                    {productShipmentData.map((data) => {
                      if (props.filterarray['productCode'] == data.id) {
                        return (
                          <option selected='selected' value={data.id} style={{fontSize: `${FontChange}px`}}>
                            {data.name}
                          </option>
                        )
                      } else {
                        return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{data.name}</option>
                      }
                    })}
                  </select>
                </div>
              </div>
              {
                 countryCode && countryCode === "VN" ? 
                 <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12'>
                 <div className='inputBox'>
                   {console.log('shiptoShipmentData', shiptoShipmentData)}
                   <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.shipto')}</label>
                 <MultiSelectBoxDelivery  
                 placeholder={t('Select')}
                 setFilterarray={props.setFilterarray}
                 filterarray={props.filterarray}
                 setShipToId={props.setShipToId}
                 name='shipTo' getShipToForVnDataValue = {getShipToForVnDataValue}/>
                 </div>
                 </div>
                 : 
                 <div className='col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12'>
                 <div className='inputBox'>
                   {console.log('shiptoShipmentData', shiptoShipmentData)}
                   <label style={{fontSize: `${FontChange}px`}}>{t('selectshipment.shipto')}</label>
                   <select
                     name='shipTo'
                     className='input'
                     onChange={onShipToChange}
                     style={{fontSize: `${FontChange}px`}}
                   >
                     <option value='' style={{fontSize: `${FontChange}px`}}>{t('selectshipment.shipto')}</option>
                     {shiptoShipmentData.map((data) => {
                       if (localStorage.getItem('CustomerNumber') === data.id) {
                         return (
                           <option selected value={data.id} style={{fontSize: `${FontChange}px`}}>
                             {data.name}
                           </option>
                         )
                       } else {
                         return <option value={data.id} style={{fontSize: `${FontChange}px`}}>{data.name}</option>
                       }
                     })}
                   </select>
 
               
                 </div>
               </div>
              }
          

              <div
                style={{ paddingTop: '20px', paddingRight: '20px' }}
                className='col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12 text-right'
              >
                <button className='clear_all' onClick={clearallShipFilter} style={{fontSize: `${FontChange}px`}}>
                  {t('selectshipment.clearall')}
                </button><br/>
                <button className="blackButton" onClick={props.serchOrderHandle}  style={{maxWidth: '100px', marginTop: '20px',fontSize: `${FontChange}px`}}>{t("Search")}</button>
              </div>
             
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default withTranslation()(SelectShipment)