import React, { useState, useEffect } from 'react'
import { masterActions, orderActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import './Stepper.scss'
import Loading from '../Loader/Loading'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import PopImg from '../../assets/img/delverypopup.jpg'
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  back_button: {
    backgroundColor: '#000 !important',
    color: '#fff !important',
    marginRight: '8px !important',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}))
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(() => ({
  root: {
    padding: '25px',
    textAlign: 'center',
    width: '100%',
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: '20px',
    display: 'block',
  },
}))(MuiDialogActions)
function ShippingDetailsForm(props) {
  const shipToDetails = useSelector((state) => state.getShipToDetails)
  let shippingDone = localStorage.getItem('Shipping-Done')
  let shipCond = localStorage.getItem('shipping-condition')
  let shiptype = localStorage.getItem('shipping-type')
  let specialShipCond = localStorage.getItem('special-shipping-condition')
  // let shipremark = localStorage.getItem('remark');
  let ordertypes = localStorage.getItem('order-type')
  let porefnumber = localStorage.getItem('porefnumber')
  let selectedShipTo = localStorage.getItem('SHIPTOCODE')
  console.log(shippingDone)
  const event = useSelector((state) => state)
  const shippingCondition = useSelector((state) => state.shippingcondition)
  const ordertype = useSelector((state) => state.ordertype)
  const shippingtype = useSelector((state) => state.shippingtype)
  const selectedLangCode = localStorage.getItem('lancode');
  const spclshippingcondition = useSelector(
    (state) => state.spclshippingcondition
  )
  const spclshippingconditionByCat = useSelector(
    (state) =>
      state.getSpecialShippingConditionConwood
        .getSpecialShippingConditionConwood
  )
  

 

  const [shipCondition, setShipConditions] = useState(
    shippingDone === 'YES' ? shipCond : ''
  )
  const [shipType, setShipTypes] = useState(
    shippingDone === 'YES' ? shiptype : ''
  )
  const [specialShipCondition, setpecialShipConditions] = useState(
    shippingDone === 'YES' ? specialShipCond : ''
  )
  // const [remark, setRemarks] = useState((shippingDone === 'YES') ? shipremark : '');
  const [poRefNumber, setPoRefNumbers] = useState(
    shippingDone === 'YES' ? porefnumber : ''
  )
  const [orderType, setOrderTypes] = useState(
    shippingDone === 'YES' ? ordertypes : ''
  )
  const [disable, setDisable] = useState(true)
  const [remarks, setRemarks] = useState('')
  const [disableShippingType, setDisableShippingType] = useState(true)
  const [specialShippingCond, setSpecialShippingCond] = useState(false)

  const [specialShippingCondDisable, setSpecialShippingCondDisable] =
    useState(false)
  const [shippingTypeDisable, setShippingTypeDisable] = useState(false)


  let isSelectedShippingCondVn  = localStorage.getItem('shipingCondForVn')
  isSelectedShippingCondVn = JSON.parse(isSelectedShippingCondVn)
  let isSelectedShippingTypeVn  = localStorage.getItem('shipingTypeForVn')
  isSelectedShippingTypeVn = JSON.parse(isSelectedShippingTypeVn)



  const [openPopup, setOpenPopup] = useState(false)
  var matchsalesarea = localStorage.getItem('matchedSalesArea')
  var contractNumber = localStorage.getItem('CONTRACTNUMBER')
  console.log(contractNumber)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let countryCode = localStorage.getItem('userData')
  countryCode = JSON.parse(countryCode)
 
   let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)

  useEffect(() => {
    dispatch(orderActions.getShipToDetails(selectedShipTo))
  }, [])

  // const categoryName = useSelector(
  // 	(state) => state.getConwoodCategory.getConwoodCategory
  // );

  console.log('ship tp details ', shipToDetails)

  const categoryName = localStorage.getItem('CATEGORY')
  const subCategoryName = localStorage.getItem('SUBCATEGORY')
  const customerNumberData = countryCode.soldTo[0]
  const shipToNumberData = localStorage.getItem('SHIPTOCODE')
  const handleClose = () => {
    setOpenPopup(false)
  }

  const shipingCondWithBack = localStorage.getItem('shipping-condition')
  const orderTypeValue = localStorage.getItem('order-type')
  const specialShippingCondValue = localStorage.getItem(
    'special-shipping-condition'
  )

  const shipingConBack = () => {
    if (categoryName === 'CONWOOD') {
      if (
        shipingCondWithBack === 'P1' ||
        shipingCondWithBack === 'D1' ||
        shipingCondWithBack === 'D2'
      ) {
        setSpecialShippingCondDisable(false)
        setShippingTypeDisable(false)
      }
      if (shipingCondWithBack === 'P1') {
        setSpecialShippingCondDisable(true)
        setShippingTypeDisable(true)
      }
    } else {
      if (shipingCondWithBack === 'P1') {
        if(countryCode.countryCode === "VN") {
          setShippingTypeDisable(false)
        }
        else {
          setSpecialShippingCondDisable(true)
          setShippingTypeDisable(true)
        }
       
      }

      if (shipingCondWithBack === 'P2') {
        setSpecialShippingCondDisable(false)
        setShippingTypeDisable(true)
      }

      if (shipingCondWithBack === 'D1' || shipingCondWithBack === 'D2') {
        setSpecialShippingCondDisable(true)
        setShippingTypeDisable(false)
      }

      if (shipingCondWithBack === 'D3') {
        setSpecialShippingCondDisable(false)
        setShippingTypeDisable(false)
      }
    }
  }

  const handleChange = (e) => { 
    let shipingcond = e.target.value
    localStorage.removeItem('special-shipping-condition')
    setShipConditions(e.target.value)
    localStorage.setItem('shipping-condition', e.target.value)

    if (shipingcond === 'P1') {
      if(countryCode.countryCode === "VN") {
        let contractnumber =
        contractNumber === null || contractNumber === 'null'
          ? ''
          : contractNumber
      dispatch(
        masterActions.getShippingType(countryCode.countryCode, {
          customerNumber: countryCode.soldTo[0],
          matchedSalesArea: matchsalesarea === 'null' ? [] : [matchsalesarea],
          productCategory: localStorage.getItem('CATEGORY'),
          shipToCode: localStorage.getItem('SHIPTOCODE'),
          shippingCondition: localStorage.getItem('shipping-condition'),
          subCategory: localStorage.getItem('SUBCATEGORY'),
          contractNumber: contractnumber,
        })
      )
        return
      }
      else {
        setSpecialShippingCondDisable(true)
        setShippingTypeDisable(true)
        setpecialShipConditions('')
        setShipTypes('')
        localStorage.setItem('shipping-type', '')
      }
     
    }

    if (shipingcond === 'P2') {
      setSpecialShippingCondDisable(false)
      setShippingTypeDisable(true)
      setShipTypes('')
      localStorage.setItem('shipping-type', '')
      dispatch(
        masterActions.getSpecialShippingCondition(
          countryCode.countryCode,
          shipingcond
        )
      )
    }

    if (shipingcond === 'D1' || shipingcond === 'D2') {
      setSpecialShippingCondDisable(true)
      setShippingTypeDisable(false)
      setpecialShipConditions('')
      setShipTypes('')
      localStorage.setItem('shipping-type', '')
      let contractnumber =
        contractNumber === null || contractNumber === 'null'
          ? ''
          : contractNumber
      dispatch(
        masterActions.getShippingType(countryCode.countryCode, {
          customerNumber: countryCode.soldTo[0],
          matchedSalesArea: matchsalesarea === 'null' ? [] : [matchsalesarea],
          productCategory: localStorage.getItem('CATEGORY'),
          shipToCode: localStorage.getItem('SHIPTOCODE'),
          shippingCondition: localStorage.getItem('shipping-condition'),
          subCategory: localStorage.getItem('SUBCATEGORY'),
          contractNumber: contractnumber,
        })
      )
    }
    if (shipingcond === 'D3') {
      setSpecialShippingCondDisable(false)
      setShippingTypeDisable(false)
      setpecialShipConditions('')
      setShipTypes('')
      localStorage.setItem('shipping-type', '')
      let contractnumber =
        contractNumber === null || contractNumber === 'null'
          ? ''
          : contractNumber
      dispatch(
        masterActions.getSpecialShippingCondition(
          countryCode.countryCode,
          shipingcond
        )
      )
      dispatch(
        masterActions.getShippingType(countryCode.countryCode, {
          customerNumber: countryCode.soldTo[0],
          matchedSalesArea: matchsalesarea === 'null' ? [] : [matchsalesarea],
          productCategory: localStorage.getItem('CATEGORY'),
          shipToCode: localStorage.getItem('SHIPTOCODE'),
          shippingCondition: localStorage.getItem('shipping-condition'),
          subCategory: localStorage.getItem('SUBCATEGORY'),
          contractNumber: contractnumber,
        })
      )
    }

    if (categoryName === 'CONWOOD') {
      if (
        shipingcond === 'P1' ||
        shipingcond === 'D1' ||
        shipingcond === 'D2'
      ) {
        setSpecialShippingCondDisable(false)
        setShippingTypeDisable(false)
        dispatch(
          masterActions.getSpecialShippingConditionConwood(
            countryCode.countryCode,
            categoryName,
            shipingcond
          )
        )
        let contractnumber =
          contractNumber === null || contractNumber === 'null'
            ? ''
            : contractNumber
        dispatch(
          masterActions.getShippingType(countryCode.countryCode, {
            customerNumber: countryCode.soldTo[0],
            matchedSalesArea: matchsalesarea === 'null' ? [] : [matchsalesarea],
            productCategory: categoryName,
            shipToCode: localStorage.getItem('SHIPTOCODE'),
            shippingCondition: shipingcond,
            subCategory: localStorage.getItem('SUBCATEGORY'),
            contractNumber: contractnumber,
          })
        )
        if (shipingcond === 'P1') {
          setSpecialShippingCondDisable(true)
          setShippingTypeDisable(true)
        }
        return
      }
    }
  }

  useEffect(() => {
    shipingConBack()
    dispatch(masterActions.getShippingCondition(countryCode.countryCode, categoryName, shipToNumberData, customerNumberData))
    let mtsaleares = matchsalesarea === 'null' ? '' : matchsalesarea
    let contractnumber =
      contractNumber === null || contractNumber === 'null' ? '' : contractNumber
    dispatch(
      masterActions.getOrderType(
        countryCode.countryCode,
        countryCode.soldTo[0],
        mtsaleares,
        contractnumber
      )
    )
  }, [])

  function setShipingCondition(e) {
    setpecialShipConditions(e.target.value)
    console.log(specialShipCondition)
    localStorage.setItem('special-shipping-condition', e.target.value)
  }

  function setShippingType(e) {
    setShipTypes(e.target.value)
    console.log(shipType)

    if (categoryName === 'CONWOOD') {
      if (shipingCondWithBack === 'D1' || shipingCondWithBack === 'D2') {
        if (e.target.value === 'W1') {
          setOpenPopup(true)
        } else {
          setOpenPopup(false)
        }
        localStorage.setItem('shipping-type', e.target.value)
      }
      return
    } else {
      localStorage.setItem('shipping-type', e.target.value)

      setOpenPopup(false)
    }
  }

  function setPoRefNumber(e) {
    debugger
    setPoRefNumbers(e.target.value)
    console.log(poRefNumber)
    localStorage.setItem('porefnumber', e.target.value)
  }

  function setOrderType(e) {
    setOrderTypes(e.target.value)
    console.log(orderType)
    localStorage.setItem('order-type', e.target.value)
  }

  const noteHandleChange = (event) => {
    debugger
    setRemarks(event.target.value)
    dispatch(masterActions.getRemarks(event.target.value))
  }

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  let category = localStorage.getItem('CATEGORY')

  // + ' #' + shipToDetails && shipToDetails.getShipToDetails.shipToId + ', ' +shipToDetails && shipToDetails.getShipToDetails.address.address
  // let combinedShipTo = shipToDetails && shipToDetails.getShipToDetails.shipToName;

  if (
    shipToDetails != undefined &&
    shippingCondition.shippingcondition != undefined &&
    ordertype.ordertype != undefined
  ) {
    return (
      <>
        <div className='form_section'>
          <div className='row'>
            <div className='col-12'>
              <div className='inputBox'>
                <label style={{fontSize: `${FontChange}px`}}>{t('Ship To')}</label>
                <p className='shipto-detail' style={{fontSize: `${FontChange}px`}}>
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.shipToId != 'null'
                      ? shipToDetails.getShipToDetails.shipToId.replace(
                        /^0+/,
                        ''
                      )
                      : ' '
                    : ' '}{' '}
                  <br />
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.shipToName != 'null'
                      ? 
                      selectedLangCode === 'en' || selectedLangCode === null ?
                      shipToDetails.getShipToDetails.shipToName :
                        selectedLangCode === 'vt' ? 
                        shipToDetails.getShipToDetails.shipToName :
                        shipToDetails.getShipToDetails.shipToNameInLocal
                       
                  
                      
                      : ' '
                    : ' '}{' '}
                  <br />
                  {
                    countryCode.countryCode === 'VN' ? '' :
                    <>
                     {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.address.address != 'null'
                      ? shipToDetails.getShipToDetails.address.address
                      : ' '
                    : ' '}{' '}
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.address.regionId != 'null'
                      ? shipToDetails.getShipToDetails.address.regionId
                      : ' '
                    : ' '}{' '}
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.street != 'null'
                      ? shipToDetails.getShipToDetails.address.street
                      : ' '
                    : ' '}{' '}
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.address.subDistrictId !=
                      'null'
                      ? shipToDetails.getShipToDetails.address.subDistrictId
                      : ' '
                    : ' '}{' '}
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.address.districtId !=
                      'null'
                      ? shipToDetails.getShipToDetails.address.districtId
                      : ' '
                    : ' '}{' '}
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.address.provinceId !=
                      'null'
                      ? selectedLangCode === 'en' || selectedLangCode === null ? shipToDetails.getShipToDetails.address.provinceId : shipToDetails.getShipToDetails.address.provinceInLocalLanguage
                      : ' '
                    : ' '}{' '}
                  {shipToDetails && shipToDetails.getShipToDetails
                    ? shipToDetails.getShipToDetails.address.postalCode !=
                      'null'
                      ? shipToDetails.getShipToDetails.address.postalCode
                      : ' '
                    : ' '}{' '}
                   {shipToDetails && shipToDetails.getShipToDetails
                        ? 
                        
                        shipToDetails.getShipToDetails.address.countryId != "null" ? 
                        selectedLangCode === 'en' || selectedLangCode === null ?
                        shipToDetails.getShipToDetails.address.countryId  === "TH" ? "Thailand" 
                        : shipToDetails.getShipToDetails.address.countryId === "VN" ? 'Vietnam' 
                        :shipToDetails.getShipToDetails.address.countryId === "SL" ? 'Sri lanka' 
                        :shipToDetails.getShipToDetails.address.countryId === "KH" ? 'Comodiya' 
                        :''
                       
                        :
                        shipToDetails.getShipToDetails.address.countryId  === "TH" ? "ประเทศไทย" 
                        : shipToDetails.getShipToDetails.address.countryId === "VN" ? 'เวียดนาม' 
                        :shipToDetails.getShipToDetails.address.countryId === "SL" ? 'ศรีลังกา' 
                        :shipToDetails.getShipToDetails.address.countryId === "KH" ? 'Comodiya' 
                        :'' : '' : ''
                         
                        
                        
                        }
                    </>

                  }
                 
                </p>
              </div>
            </div>
            <div className='col-4'>
              <div className='inputBox'>
                <label style={{fontSize: `${FontChange}px`}}>{t('label.shipping_condition')}<spam style={{color:"red"}}>*</spam></label>
                <select
                  className='input'
                  onChange={handleChange}
                  value={shipingCondWithBack}
                  name={'shipCondition'}
                  required
                  style={{fontSize: `${FontChange}px`}}
                >
                  {
                    countryCode.countryCode === "VN" ? 
                    <>
                    {localStorage.setItem('shipping-condition', isSelectedShippingCondVn.id)}   
                    <option selected disabled value={isSelectedShippingCondVn.id} style={{fontSize: `${FontChange}px`}}>{isSelectedShippingCondVn.name}</option>   
                    </>               
                     : 
                     <>
                     <option value='' selected disabled style={{fontSize: `${FontChange}px`}}>
                    {t('pleaseSelect')}
                  </option>
                  {shippingCondition.shippingcondition
                    ? shippingCondition.shippingcondition.map(
                      (ship_cond, ind) => {
                        if (ship_cond.value != 'Description') {
                          if (subCategoryName === "BIG BAG") {
                            if (ship_cond.key === 'P2') {
                              return (
                                <option value={ship_cond.key} disabled style={{fontSize: `${FontChange}px`}}>
                                  {ship_cond.value}
                                </option>
                              )
                            }
                          }
                          if (categoryName === 'CONWOOD') {
                            if (
                              ship_cond.key === 'P1' ||
                              ship_cond.key === 'D1' ||
                              ship_cond.key === 'D2'
                            ) {
                              return (
                                <option value={ship_cond.key} style={{fontSize: `${FontChange}px`}}>
                                  {ship_cond.value}
                                </option>
                              )
                            } else {
                              return null
                            }
                          } else {
                            return (
                              <option value={ship_cond.key} style={{fontSize: `${FontChange}px`}}>
                                {ship_cond.value}
                              </option>
                            )
                          }
                        }
                      }
                    )
                    : null}
                     </>
                  }
                  
                </select>
              </div>
            </div>

            {category === 'CONWOOD' ? (
              <>
                <div className='col-4'>
                  <div className='inputBox'>
                    <label>{t('shippingtype.label')}<spam style={{color:"red"}}>*</spam></label>

                    <select
                      className='input'
                      name={'shipType'}
                      disabled={shippingTypeDisable}
                      value={shipType}
                      onChange={setShippingType}
                    >
                      <option value='' selected disabled style={{fontSize: `${FontChange}px`}}>
                        {t('pleaseSelect')}
                      </option>

                      {shippingtype.shippingtype &&
                        shippingtype.shippingtype.length != 0
                        ? shippingtype.shippingtype &&
                        shippingtype.shippingtype.Records.map(
                          (ship_type, ind) => {
                            return (
                              <option value={ship_type.ShippingType}>
                                {ship_type.Description}
                              </option>
                            )
                          }
                        )
                        : null}
                    </select>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='inputBox'>
                    <label style={{fontSize: `${FontChange}px`}}>{t('label.special_shipping_condition')}
                    {
                      specialShippingCondDisable ? '' :
                      <spam style={{color:"red"}}>*</spam>
                    }
                    
                    </label>
                    <select
                      className='input'
                      disabled={specialShippingCondDisable}
                      value={
                        specialShippingCondValue
                          ? specialShippingCondValue
                          : specialShipCondition
                      }
                      name={'specialShipCondition'}
                      id='special_condition'
                      onChange={setShipingCondition}
                      style={{fontSize: `${FontChange}px`}}
                    >
                      <option value='' selected disabled style={{fontSize: `${FontChange}px`}}>
                        {t('pleaseSelect')}
                      </option>
                      {spclshippingconditionByCat && spclshippingconditionByCat
                        ? spclshippingconditionByCat &&
                          spclshippingconditionByCat
                          ? spclshippingconditionByCat &&
                          spclshippingconditionByCat.map((ship_cond, ind) => {
                            return (
                              <option value={ship_cond.key} style={{fontSize: `${FontChange}px`}}>
                                {ship_cond.value}
                              </option>
                            )
                          })
                          : null
                        : spclshippingcondition.spclshippingcondition
                          ? spclshippingcondition.spclshippingcondition.map(
                            (ship_cond, ind) => {
                              return (
                                <option value={ship_cond.key} style={{fontSize: `${FontChange}px`}}>
                                  {ship_cond.value}
                                </option>
                              )
                            }
                          )
                          : null}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
              {
                countryCode.countryCode === "VN" ? '' :
                <div className='col-4'>
                  <div className='inputBox'>
                    <label style={{fontSize: `${FontChange}px`}}>{t('label.special_shipping_condition')}
                    {
                      specialShippingCondDisable ? '' :<spam style={{color:"red"}}>*</spam>
                    }
                      
                      </label>
                    <select
                      className='input'
                      disabled={specialShippingCondDisable}
                      value={
                        specialShippingCondValue
                          ? specialShippingCondValue
                          : specialShipCondition
                      }
                      name={'specialShipCondition'}
                      id='special_condition'
                      onChange={setShipingCondition}
                      style={{fontSize: `${FontChange}px`}}
                    >
                      <option value='' selected disabled style={{fontSize: `${FontChange}px`}}>
                        {t('pleaseSelect')}
                      </option>
                      {spclshippingconditionByCat && spclshippingconditionByCat
                        ? spclshippingconditionByCat &&
                          spclshippingconditionByCat
                          ? spclshippingconditionByCat &&
                          spclshippingconditionByCat.map((ship_cond, ind) => {
                            return (
                              <option value={ship_cond.key} style={{fontSize: `${FontChange}px`}}>
                                {ship_cond.value}
                              </option>
                            )
                          })
                          : null
                        : spclshippingcondition.spclshippingcondition
                          ? spclshippingcondition.spclshippingcondition.map(
                            (ship_cond, ind) => {
                              return (
                                <option value={ship_cond.key} style={{fontSize: `${FontChange}px`}}>
                                  {ship_cond.value}
                                </option>
                              )
                            }
                          )
                          : null}
                    </select>
                  </div>
                </div>
              }
                

                <div className='col-4'>
                  <div className='inputBox'>
                    <label style={{fontSize: `${FontChange}px`}}>{t('shippingtype.label')}
                    {
                      shippingTypeDisable ? '' :
                      <spam style={{color:"red"}}>*</spam> 
                    }
                    </label>
                    

                    <select
                      className='input'
                      name={'shipType'}
                      disabled={shippingTypeDisable}
                      value={shipType}
                      onChange={setShippingType}
                      style={{fontSize: `${FontChange}px`}}
                    >
                      {
                        countryCode.countryCode === "VN" ? 
                        <>
                         {localStorage.setItem('shipping-type', isSelectedShippingTypeVn.id)}                 
                        <option selected disabled value={isSelectedShippingTypeVn.id} style={{fontSize: `${FontChange}px`}}>{isSelectedShippingTypeVn.name}</option>                       
                        </>
                         : 
                         <>
                          <option value='' selected disabled style={{fontSize: `${FontChange}px`}}>
                              {t('pleaseSelect')}
                          </option>

                            {shippingtype.shippingtype &&
                              shippingtype.shippingtype.length != 0
                              ? shippingtype.shippingtype &&
                              shippingtype.shippingtype.Records.map(
                                (ship_type, ind) => {
                                  return (
                                    <option value={ship_type.ShippingType} style={{fontSize: `${FontChange}px`}}>
                                      {ship_type.Description}
                                    </option>
                                  )
                                }
                              )
                              : null}
                         </>
                      }
                     
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className='col-4'>
              <div className='inputBox'>
                <label style={{fontSize: `${FontChange}px`}}>{t('ordertype.label')}<spam style={{color:"red"}}>*</spam></label>
                <select
                  className='input'
                  name={'orderType'}
                  value={orderTypeValue}
                  onChange={setOrderType}
                  required
                  style={{fontSize: `${FontChange}px`}}
                >
                  {
                    countryCode.countryCode === "VN" ? 
                    ordertype.ordertype
                      ? ordertype.ordertype.map((order, ind) => {
                        localStorage.setItem('order-type', order.key)
                        return <option selected value={order.key} style={{fontSize: `${FontChange}px`}}>{order.value}</option>
                      })
                      : null
                     : 
                      <>
                     <option value='' selected disabled style={{fontSize: `${FontChange}px`}}>
                    {t('pleaseSelect')}
                  </option>
                    { ordertype.ordertype
                    ? ordertype.ordertype.map((order, ind) => {
                      return <option value={order.key} style={{fontSize: `${FontChange}px`}}>{order.value}</option>
                    })
                    : null}
                    </>
                    
                  }
                  
                </select>
              </div>
            </div>
            {
              countryCode.countryCode === "VN" ? '' :
              <div className='col-4'>
              <div className='inputBox'>
                <label style={{fontSize: `${FontChange}px`}}>{t('Customer PO Reference No.')}</label>
                <input
                  className='input'
                  name={'poRefNumber'}
                  value={poRefNumber}
                  maxlength="22"
                  placeholder={t('Customer PO Reference No.')}
                  onChange={setPoRefNumber}
                  style={{fontSize: `${FontChange}px`}}
                />
              </div>
            </div>
            }
           
            <div className='col-12 mt-2'>
              {category === 'CONWOOD' || countryCode.countryCode === "VN" ? (
                <div className='remarks'>
                  <label style={{fontSize: `${FontChange}px`}}>{t('Remarks')}</label>
                  <textarea
                    id='remarks'
                    className='remarksOrder'
                    value={remarks}
                    onChange={noteHandleChange}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className='dialog-boxesPopup'>
          <Dialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={openPopup}
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={handleClose}
            ></DialogTitle>
            <DialogContent>
              <img src={PopImg} width='100%' />
              <DialogActions>
                <div className='create_link d-flex'>
                  <button className='create pl-5 pr-5' onClick={handleClose} style={{fontSize: `${FontChange}px`}}>
                    OK
                  </button>
                </div>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </>
    )
  } else {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }
}
export default withTranslation()(ShippingDetailsForm)