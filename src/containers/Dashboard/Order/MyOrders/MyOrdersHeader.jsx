import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import React, { useState, useEffect } from 'react'
import { masterActions, orderActions } from '../../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import './MyOrders.scss'
import FormInput from '../../../../components/FormInput/FormInput'
import FormSelectbox from '../../../../components/FormSelectbox/FormSelectbox'
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

function MyOrdersHeader(props) {
  const event = useSelector((state) => state)
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const shipmentStatus = useSelector((state) => state.shipmentstatus)

  const getShipmentStatusVn = useSelector((state) => state.getShipmentStatusVn)
  const shipToMyOrder =  useSelector((state) => state.shiptobycount.shiptobycount)
  // const shipToMyOrder = useSelector(
  //   (state) => state.shipToMyOrder.shipToMyOrder
  // )
  const selectedLangCode = localStorage.getItem('lancode');
  const shippingConditionDropDown = useSelector(
    (state) => state.shippingcondition.shippingcondition
  )
  const shippingType = useSelector((state) => state.shippingtypemyorder)

  const shippingtypeVn = useSelector((state) => state.shippingtype)

  console.log(shippingtypeVn, 'shippingtypeVn--')

  const [searchByStatus, setSearchByStatus] = React.useState('')
  const [shipType, setShipType] = React.useState('')
  //  const [searchByOrder, setSearchByOrder] = React.useState("");
  //const [searchByPoNo, setSearchByPoNo] = React.useState("");
  const [shipTo, setShipTo] = React.useState('')
  // const shiptobycount = useSelector((state) => state.shiptobycount);

  const { t } = useTranslation()
  const dispatch = useDispatch()

  let countryCode = localStorage.getItem('userData')
  countryCode = JSON.parse(countryCode)
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  let custmerNo = userName ? userName.soldTo[0] : 0
  console.log(countryCode.countryCode, 'countryCode---')
const tabSelected = props.tab
  useEffect(() => {
    try {
      
      dispatch(masterActions.getShippingCondition(countryCode.countryCode, '', '', custmerNo))
      if(countryCode.countryCode === 'VN'){
        dispatch(
          masterActions.getShippingType(countryCode.countryCode, ' ', countryCode.soldTo[0],)
        )
        dispatch(masterActions.getShipmentStatusVn(countryCode.countryCode))
       
      }
      else {
        dispatch(masterActions.getShippingTypeMyOrder(countryCode.countryCode,))
        dispatch(masterActions.getShipmentStatus(countryCode.countryCode))
      }
     
      dispatch(masterActions.shiptobyCountryAccount('True', userName.soldTo[0]))
     // dispatch(masterActions.shipToMyOrder(custmerNo))
    } catch (err) {
      console.log('err' + err)
    }
  }, [])

  

  const allOrdersList = useSelector(
    (state) => state.getAllOrdersList.getAllOrdersList
  )
  var searchStatusData = useSelector(
    (state) => state.orderByStatusValue.orderByStatusValue
  )
  var searchbyPoNoData = useSelector(
    (state) => state.searchByNoValue.searchByNoValue
  )
  var searchByOrderNoData = useSelector(
    (state) => state.searchByOrderNo.searchByOrderNo
  )
  var shippingConditionValue = useSelector(
    (state) => state.shippingConditionMyOrderValue.shippingConditionMyOrderValue
  )
  var shippingTypeValue = useSelector(
    (state) => state.shipTypeValueMyOredr.shipTypeValueMyOredr
  )

  var ShipToValue =  useSelector(
    (state) => state.ShipToValueMyOrder.ShipToValueMyOrder
  )
  console.log(ShipToValue, 'ShipToValue--')

  const handleChangeSearchByStatus = async (event) => { debugger
  
      await dispatch(masterActions.orderByStatusValue(event))
    
  }

  const onChangeSearchByNo = async (event) => {
    await dispatch(masterActions.searchByNoValue(event.target.value))
  }

  const onChangeSearchByOrder = async (event) => {
    await dispatch(masterActions.searchByOrderNo(event.target.value))
  }

  const handleShippingCondition = async (event) => {
    if (event != 'Shipping Condition') {
      await dispatch(masterActions.shippingConditionMyOrderValue(event))
    }
  }

  const handleCahngeShipType = async (event) => {
    debugger
    if (event != 'Shipping Condition') {
      await dispatch(masterActions.shipTypeValueMyOredr(event))
    }
  }

  const handleChangeShipTo =  async (event) => {
    debugger
    if (event != 'Shipping Condition') {
      await dispatch(masterActions.ShipToValueMyOrder(event))
    }
  }

  function clearFields() {
    window.location.reload()
  }

  // useEffect(() => { debugger
   
  //   if (searchStatusData) {
  //     props.setLoading(true)
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         countryCode ? countryCode.soldTo[0] : 0,
  //         props.dateRange.replace(/-|\s/g, ''),
  //         props.dateRange2.replace(/-|\s/g, ''),
  //         searchbyPoNoData
  //           ? searchbyPoNoData === undefined
  //             ? ''
  //             : searchbyPoNoData
  //           : searchByOrderNoData === undefined
  //           ? ''
  //           : '',
  //         '',
  //         '',
  //         '',
  //         '',
  //         searchStatusData === undefined ? '' : searchStatusData,
  //         shippingConditionValue === undefined ? '' : shippingConditionValue,
  //         '',
  //         shippingTypeValue === undefined ? '' : shippingTypeValue,
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? tabSelected : false
  //       )
  //     )
  //     setTimeout(()=>{
  //       props.setLoading(false)
  //     },500);
  //   }

  //   if (shippingConditionValue) {
  //     props.setLoading(true)
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         countryCode.soldTo[0],
  //         props.dateRange.replace(/-|\s/g, ''),
  //         props.dateRange2.replace(/-|\s/g, ''),
  //         searchbyPoNoData === undefined ? '' : searchbyPoNoData,
  //         '',
  //         '',
  //         '',
  //         '',
  //         searchStatusData === undefined ? '' : searchStatusData,
  //         shippingConditionValue === undefined ? '' : shippingConditionValue,
  //         '',
  //         shippingTypeValue === undefined ? '' : shippingTypeValue,
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? tabSelected : false
  //       )
  //     )
  //     setTimeout(()=>{
  //       props.setLoading(false)
  //     },500);
  //   }
  //   if (shippingTypeValue) {
  //     props.setLoading(true)
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         countryCode ? countryCode.soldTo[0] : 0,
  //         props.dateRange.replace(/-|\s/g, ''),
  //         props.dateRange2.replace(/-|\s/g, ''),
  //         searchbyPoNoData === undefined ? '' : searchbyPoNoData,
  //         '',
  //         '',
  //         '',
  //         '',
  //         searchStatusData === undefined ? '' : searchStatusData,
  //         shippingConditionValue === undefined ? '' : shippingConditionValue,
  //         '',
  //         shippingTypeValue === undefined ? '' : shippingTypeValue,
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? tabSelected : false
  //       )
  //     )
  //     setTimeout(()=>{
  //       props.setLoading(false)
  //     },500);
  //   }
  //   if (props.dateRange2) {
  //     props.setLoading(true)
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         countryCode ? countryCode.soldTo[0] : 0,
  //         props.dateRange.replace(/-|\s/g, ''),
  //         props.dateRange2.replace(/-|\s/g, ''),
  //         searchbyPoNoData === undefined ? '' : searchbyPoNoData,
  //         '',
  //         '',
  //         '',
  //         '',
  //         searchStatusData === undefined ? '' : searchStatusData,
  //         shippingConditionValue === undefined ? '' : shippingConditionValue,
  //         '',
  //         shippingTypeValue === undefined ? '' : shippingTypeValue,
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? tabSelected : false
  //       )
  //     )
  //     setTimeout(()=>{
  //       props.setLoading(false)
  //     },500);
  //   }
  //   if (searchbyPoNoData) {
  //     props.setLoading(true)
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         countryCode ? countryCode.soldTo[0] : 0,
  //         props.dateRange.replace(/-|\s/g, ''),
  //         props.dateRange2.replace(/-|\s/g, ''),
  //         searchbyPoNoData === undefined ? '' : searchbyPoNoData,
  //         '',
  //         '',
  //         '',
  //         '',
  //         searchStatusData === undefined ? '' : searchStatusData,
  //         shippingConditionValue === undefined ? '' : shippingConditionValue,
  //         '',
  //         shippingTypeValue === undefined ? '' : shippingTypeValue,
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? tabSelected : false
  //       )
  //     )
  //     setTimeout(()=>{
  //       props.setLoading(false)
  //     },500);
  //   }
  //   if (searchByOrderNoData) {
  //     props.setLoading(true)
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         countryCode ? countryCode.soldTo[0] : 0,
  //         props.dateRange.replace(/-|\s/g, ''),
  //         props.dateRange2.replace(/-|\s/g, ''),
  //         searchbyPoNoData
  //           ? searchbyPoNoData === undefined
  //             ? ''
  //             : searchbyPoNoData
  //           : searchByOrderNoData
  //           ? searchByOrderNoData === undefined
  //             ? ''
  //             : searchByOrderNoData
  //           : '',
  //         '',
  //         '',
  //         '',
  //         '',
  //         searchStatusData === undefined ? '' : searchStatusData,
  //         shippingConditionValue === undefined ? '' : shippingConditionValue,
  //         '',
  //         shippingTypeValue === undefined ? '' : shippingTypeValue,
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? tabSelected : false
  //       )
  //     )
  //   }
  //   if (ShipToValue) {
  //     props.setLoading(true)
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         countryCode ? countryCode.soldTo[0] : 0,
  //         props.dateRange.replace(/-|\s/g, ''),
  //         props.dateRange2.replace(/-|\s/g, ''),
  //         searchbyPoNoData
  //           ? searchbyPoNoData === undefined
  //             ? ''
  //             : searchbyPoNoData
  //           : searchByOrderNoData
  //           ? searchByOrderNoData === undefined
  //             ? ''
  //             : searchByOrderNoData
  //           : '',
  //         '',
  //         '',
  //         '',
  //         '',
  //         searchStatusData === undefined ? '' : searchStatusData,
  //         shippingConditionValue === undefined ? '' : shippingConditionValue,
  //         ShipToValue === undefined ? '' : ShipToValue,
  //         shippingTypeValue === undefined ? '' : shippingTypeValue,
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? tabSelected : false
  //       )
  //     )
  //   }
  //   setTimeout(()=>{
  //     props.setLoading(false)
  //   },500);
  // }
  // , [
  //   props.dateRange,
  //   props.dateRange2,
  //   searchStatusData,
  //   shippingConditionValue,
  //   shippingTypeValue,
  //   searchbyPoNoData,
  //   searchByOrderNoData,
  //   ShipToValue,
  //   tabSelected,
  //   0
  // ])

  const serchOrderHandle = () => {
    dispatch(
      orderActions.getAllOrdersList(
        countryCode ? countryCode.soldTo[0] : 0,
        props.dateRange ? props.dateRange.replace(/-|\s/g, '') : '',
        props.dateRange2 ? props.dateRange2.replace(/-|\s/g, '') : '',
        searchbyPoNoData
          ? searchbyPoNoData === undefined
            ? ''
            : searchbyPoNoData
          : searchByOrderNoData
          ? searchByOrderNoData === undefined
            ? ''
            : searchByOrderNoData
          : '',
        '',
        '',
        '',
        '',
        searchStatusData === undefined ? '' : searchStatusData,
        shippingConditionValue === undefined ? '' : shippingConditionValue,
        ShipToValue === undefined ? '' : ShipToValue,
        shippingTypeValue === undefined ? '' : shippingTypeValue,
        1,
        11,
        userName && userName.countryCode === "VN" ? tabSelected : false
      )
    )
  }

  // function onChangeSearchByStatus(event,dropdowntype){
  //     console.log(event.target.value,dropdowntype)
  // }



  // const searchByPoNo =
  //   allOrdersList && allOrdersList.length !== 0
  //     ? allOrdersList.results.map((element) => {
  //         if (element.header1.ponumber != null) {
  //           return {
  //             id: element.header1.ponumber,
  //             name: element.header1.ponumber,
  //           }
  //         }
  //       })
  //     : [
  //         {
  //           id: '0',
  //           name: 'Data is not available',
  //         },
  //       ]

  const shipToMyOrderData =
    shipToMyOrder && shipToMyOrder
      ? shipToMyOrder &&
        shipToMyOrder.map((element) => {
          if (element != null) {
            if(selectedLangCode === 'en' || selectedLangCode === null){
              return {
                id: element.shipToCode,
                name: element.shipToId.replace(/^0+/, '') + '-' + element.shipToName,
              }
            }
            else {
              return {
                id: element.shipToCode,
                name: element.shipToId.replace(/^0+/, '') + '-' + element.shipToNameInLocal,
              }
            }
            // return {
            //   id: element.shipToCode,
            //   name: element.shipToCode.replace(/^0+/, '') + '-' + element.shipToName,
            // }
          }
        })
      : [
          {
            id: '0',
            name: 'Data is not available',
          },
        ]

  // const searchByOreder =
  //   allOrdersList && allOrdersList.length !== 0
  //     ? allOrdersList.results.map((element, index) => {
  //         if (element.orderItemListObject[index] != null && element.orderItemListObject[index] != []){
  //           if(element.orderItemListObject[0].ccrz__Order__r !== null && element.orderItemListObject[0].ccrz__Order__r !== undefined) {
  //           return {
  //             id: element.orderItemListObject[0].ccrz__Order__r
  //               .ccrz__OrderId__c,
  //             name: element.orderItemListObject[0].ccrz__Order__r
  //               .ccrz__OrderId__c,
  //           }
  //         } else {
  //           return {
  //             id: '',
  //             name: '',
  //           }
  //         }
  //       }else{

  //         return {
  //           id: '',
  //           name: '',
  //         }

  //       }
  //       })
      
  //     : [
  //         {
  //           id: '0',
  //           name: 'Data is not available',
  //         },
  //       ]
  

  const shipmentStatusData = 
  countryCode.countryCode === 'VN' ?
  getShipmentStatusVn.getShipmentStatusVn
    ? getShipmentStatusVn.getShipmentStatusVn.map((element) => {
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
      ] : 

      shipmentStatus.shipmentstatus
      ? shipmentStatus.shipmentstatus.map((element) => {
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

  console.log(getShipmentStatusVn, 'shipmentStatusData456987')
  const shippingConditionData = shippingConditionDropDown
    ? shippingConditionDropDown.map((element) => {
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

      

  const shippingTypeData = 
 
  countryCode.countryCode === 'VN' ? 
  shippingtypeVn.shippingtype
  ? shippingtypeVn.shippingtype.map((element) => {
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
  : 
  shippingType.shippingtypemyorder
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

      console.log(shippingTypeData, 'shippingTypeData--')

  // const shipToData = shiptobycount.shiptobycount
  // ? shiptobycount.shiptobycount.map((element) => {
  //   return {
  //     id: element.shipToId,
  //     name: element.shipToId + '-' + element.shipToName,
  //   };
  // })
  // : [
  //   {
  //     id: "0",
  //     name: "Data is not available",
  //   },
  // ];

  const Container = styled.div`
  .MuiFormLabel-root {
     font-size: ${FontChange}px

  }
`;

  return (
    <>
      <div className='form_section myorders-header p-3 pt-0'>
        <div className='row'>
          <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 pr-0 pl-0'>
            <p className='myorder-heading' style={{fontSize: `${HeadingFontChange}px`}}>{props.headingTitle}</p>
          </div>
          <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 pr-0 pl-0 text-right'>
            <span className='text-red' onClick={clearFields} style={{fontSize: `${HeadingFontChange}px`}}>
                {t('RefreshMyPage')}
              </span>
          </div>
        </div>

        {props.showfilters === true ? (
          <div className='row shadowbox'>
            {
              countryCode.countryCode === 'VN' ? '' : 
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
               
              <div className='inputBox'>
              
                <TextField
                  className='autoSearch'
                  id='standard-basic'
                  label={t('Search by PO No.')}
                  onChange={onChangeSearchByNo}
                  disabled={searchByOrderNoData}
                 
                />
            
              </div>
             
            </div>
            }
            
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
              
                <TextField
                  className='autoSearch'
                  id='standard-basic'
                  label={t('Search by Order')}
                  onChange={onChangeSearchByOrder}
                  disabled={searchbyPoNoData}
                />
                
                {/* <FormSelectbox
                                    name={"searchByOrder"}
                                    class={"input p-0"}
                                    onSelectChange={onChangeSearchByOrder}
                                    label={t("Search by Order")}
                                    data={searchByOreder}
                                    disabledValue={searchbyPoNoData}
                                /> */}
              </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <FormInput
                  type={'date'}
                  class={'input'}
                  name={'dateRange'}
                  onChange={props.handleChange}
                  label={t('eventname.label')}
                />
              </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <FormInput
                  type={'date'}
                  class={'input'}
                  name={'dateRange'}
                  onChange={props.handleChange2}
                  label={t('eventname.label')}
                />
              </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
            {/* <div className='inputBox'>
                 
                  <select
                    name='searchByStatus'
                    className='input'
                    onChange={handleChangeSearchByStatus}
                  >
                    <option value=''>{t('Search by Status')}</option>
                    {shipmentStatusData.map((data) => {
                      if (data.id === 'Open') {
                        return (
                          <option selected='selected' value={data.id}>
                            {data.name}
                          </option>
                        )
                      } else {
                        return <option value={data.id}>{data.name}</option>
                      }
                    })}
                  </select>
                </div> */}
              <div className='inputBox'>
                <FormSelectbox
                  name={'searchByStatus'}
                  class={'input p-0'}
                  onSelectChange={handleChangeSearchByStatus}
                  label={t('Search by Status')}
                  data={shipmentStatusData}
                />
              </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <FormSelectbox
                  name={'shipTo'}
                  class={'input p-0'}
                  onSelectChange={handleChangeShipTo}
                  label={t('Ship-To')}
                  data={shipToMyOrderData}
                />
              </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <FormSelectbox
                  name={'shipingCondition'}
                  class={'input p-0'}
                  onSelectChange={handleShippingCondition}
                  label={t('Shipping Condition')}
                  data={shippingConditionData}
                />
              </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <FormSelectbox
                  name={'shipType'}
                  class={'input p-0'}
                  onSelectChange={handleCahngeShipType}
                  label={t('Shipping Type')}
                  data={shippingTypeData}
                />
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className='row'>            
                <div className='col-xl-10 col-lg-10 col-md-9 col-sm-12 col-xs-12 pt-4'>
                  <span className='text-red' onClick={clearFields} style={{fontSize: `${FontChange}px`}}>
                    {t('Clear Search')}
                  </span>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12 text-right">
                    <button className="blackButton" onClick={serchOrderHandle} style={{fontSize: `${FontChange}px`}}>{t("Search")}</button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default withTranslation()(MyOrdersHeader)
