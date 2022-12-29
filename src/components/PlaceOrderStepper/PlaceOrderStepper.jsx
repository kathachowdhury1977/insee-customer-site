import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import { useHistory } from 'react-router-dom'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CartStepPlaceOrder from './CartStep'
import PlaceOrderStep from './PlaceOrderStep'
import ShippingStep from './ShippingStep'
import CartStep from './CartStep'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment-timezone'
import { orderActions } from '../../_actions'
import { withTranslation, useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StepConnector from '@material-ui/core/StepConnector'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Cart1 from '../../assets/img/cart-xs.png'
import Cart2 from '../../assets/img/shippingstep.png'
import Cart3 from '../../assets/img/placeorderstep.png'
import './PlaceOrderStepper.scss'

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
    width: '437px',
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

// function getSteps() {
//   let Cart = <span className='shopping_cart_icon'> Cart</span>
//   let Shipping = <span className='shopping_cart_icon'> Shipping</span>
//   let PlaceOrder = <span className='shopping_cart_icon'> Place Order</span>
//   return [Cart, Shipping, PlaceOrder]
// }

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <CartStep />
    case 1:
      return <ShippingStep />
    case 2:
      return <PlaceOrderStep />
    default:
      return 'Unknown stepIndex'
  }
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: 'red',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: 'red',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'red',
  },
  completed: {
    backgroundColor: 'red',
  },
})

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <img src={Cart1} />,
    2: <img src={Cart2} />,
    3: <img src={Cart3} />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
}

export default function PlaceOrderStepper() {
  let history = useHistory()
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = useState(false)
  const [disablebutton, setDisablebutton] = useState(false)
  const cartdata = useSelector((state) => state.cartdata)
  const placeorderdata = useSelector((state) => state.placeOrder)
  const orderCreditInfo = useSelector((state) => state.getOrderCreditInfo)
  const cartdatas = useSelector((state) => state.getSelectedOrderInCheckout)
  const remarksData = useSelector((state) => state.getRemarks.getRemarks)


  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);


  var langCode = localStorage.getItem('lancode') 
  function getSteps() {
    let Cart = <span className='shopping_cart_icon' style={{fontSize: `${FontChange}px`}}>{t('cart.label')}</span>
    let Shipping = (
      <span className='shopping_cart_icon' style={{fontSize: `${FontChange}px`}}>{t('shipping.label')}</span>
    )
    let PlaceOrder = (
      <span className='shopping_cart_icon' style={{fontSize: `${FontChange}px`}}>{t('placeorder.label')}</span>
    )
    return [Cart, Shipping, PlaceOrder]
  }

  const steps = getSteps()
  const isLaststep = activeStep === steps.length - 1
  let todayDate = moment().format('DD-MM-YYYY')
  todayDate = todayDate.replace(/-|\s/g, '')
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  let cartLength = cartdata.cartdata && cartdata.cartdata.length
  const isErrorMsg = useSelector((state) => state.placeOrder.error)
  useEffect(() => {
    
    if (isErrorMsg === 'Given Po number already exist') {
      setOpen(false)
    }
  }, [isErrorMsg])

  // console.log(isErrorMsg, 'isErrorMsg5464646')

  const handleNext = () => {
    try {
      if (activeStep === 0) {
        const quantityEditFlag = localStorage.getItem('QuantityEditFlag')

        if (cartLength > 0) {
          if (quantityEditFlag != 'YES') {
            localStorage.setItem(
              'matchedSalesArea',
              cartdata.cartdata && cartdata.cartdata[0].matchedSalesAreaList[0]
            )
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
          } else {
            toast.error(
              t('qtyNotSave'),
              {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            )
          }
        } else {
          toast.error(
            t('yourCartEmpty'),
            {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          )
        }

        // localStorage.setItem('matchedSalesArea', cartdata.cartdata && cartdata.cartdata[0].matchedSalesAreaList)
      }
      if (activeStep === 1) {
        let shipCondValue = localStorage.getItem('shipping-condition')
        let shippingTypeData = localStorage.getItem('shipping-type')
        let specialshippingConData = localStorage.getItem(
          'special-shipping-condition'
        )
        let productCategory = localStorage.getItem('CATEGORY')

        if (productCategory === 'CONWOOD') {
          if (shipCondValue === 'D1' || shipCondValue === 'D2') {
            if (
              specialshippingConData === null ||
              specialshippingConData === undefined ||
              specialshippingConData === ''
            ) {
              toast.error(t('pleaseSelectSpecialShipingCond'), {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              return
            }

            if (
              shippingTypeData === null ||
              shippingTypeData === undefined ||
              shippingTypeData === ''
            ) {
              toast.error(t('PleaseselectShippingType'), {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              return
            }
          }
          placeOrderAndCreditInfo()
        } else {
          if (
            shipCondValue === 'D1' ||
            shipCondValue === 'D2' ||
            shipCondValue === 'P2' ||
            shipCondValue === 'D3'
          ) {
            if (shipCondValue === 'D1' || shipCondValue === 'D2') {
              if (
                shippingTypeData === null ||
                shippingTypeData === undefined ||
                shippingTypeData === ''
              ) {
                toast.error(t('PleaseselectShippingType'), {
                  position: 'top-right',
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                return
              }
            }
            if (shipCondValue === 'P2') {
              if (
                specialshippingConData === null ||
                specialshippingConData === undefined ||
                specialshippingConData === ''
              ) {
                toast.error(t('pleaseSelectSpecialShipingCond'), {
                  position: 'top-right',
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                return
              }
            }
            if (shipCondValue === 'D3') {
              if (
                specialshippingConData === null ||
                specialshippingConData === undefined ||
                specialshippingConData === ''
              ) {
                toast.error(t('pleaseSelectSpecialShipingCond'), {
                  position: 'top-right',
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                return
              }

              if (
                shippingTypeData === null ||
                shippingTypeData === undefined ||
                shippingTypeData === ''
              ) {
                toast.error(t('PleaseselectShippingType'), {
                  position: 'top-right',
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                return
              }
            }
            placeOrderAndCreditInfo()
          } else {
            placeOrderAndCreditInfo()
          }
        }
      }
      if (activeStep === 2) {
        let messageNo =
          orderCreditInfo.getOrderCreditInfo &&
          orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT
            ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT[0]
                .MessageNumber
            : ''
        let output =
          orderCreditInfo.getOrderCreditInfo &&
          orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT
            ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT
            : null
        let pricingItem =
          orderCreditInfo.getOrderCreditInfo &&
          orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem
            ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem
            : null

        let messageType =
          orderCreditInfo.getOrderCreditInfo &&
          orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT
            ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT[0]
                .MessageType
            : ''

        if (messageNo === '176') {
          setDisablebutton(true)
          toast.error(t('pleaseCheckError'), {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return
        }

        if (messageType === 'E') {
          setDisablebutton(true)
          toast.error(t('pleaseCheckError'), {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return
        }

        if (pricingItem) {
          for (var i = 0; i < pricingItem.length; i++) {
            if (pricingItem[i].ItemCategory !== 'ZFG1') {
              var itemPrice = pricingItem[i].Amount
              if (itemPrice === 0) {
                toast.error(
                  t('priceNotAvailable'),
                  {
                    position: 'top-right',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                )
                return
              }
            }
          }
          // console.log('three')
          setDisablebutton(false)
          placeOrder()
          setOpen(true)
        } else {
          // console.log('three')
          setDisablebutton(false)
          placeOrder()
          setOpen(true)
        }
      }
    } catch {
      toast.error(
        (t('someThingWrong')),
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    }
  }

  const placeOrder = () => {
 
    try {
      let special =
        localStorage.getItem('special-shipping-condition') === null ||
        localStorage.getItem('special-shipping-condition') === undefined
          ? ''
          : localStorage.getItem('special-shipping-condition')

      if (special === 'Standard') {
        special = 'ZS00'
      }

      // console.log(cartdata, 'cartdata++++++++')
      let matchedSalesAreaList =
        orderCreditInfo.getOrderCreditInfo &&
        orderCreditInfo.getOrderCreditInfo.matchedSalesAreaList
          ? orderCreditInfo.getOrderCreditInfo.matchedSalesAreaList
          : []

      const items =
        orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo
          ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem.map(
              (element, index) => {
                if (element.ItemCategory.includes('ZFG')) {
                  return
                } else {
                  var cartDataNew = cartdata.cartdata
                  var qty

                  // for(var i = 0; i <= cartDataNew.length; i++) {
                  //   var MaterialNumber = cartDataNew[i].productId
                  //   if(MaterialNumber === element.MaterialNumber){
                  //      qty = cartDataNew[i].quantity.toString()
                  //   }
                  // }

                  cartdata.cartdata &&
                    cartdata.cartdata.map((item) => {
                      var mNumber = item.productId
                      if (mNumber === element.MaterialNumber) {
                        qty = item.quantity.toString()
                      }
                    })
                  // console.log(cartDataNew, 'cartDataNew---')
                  return {
                    Batch: '',
                    ItemNumberSD: element.SalesDocumentItem,
                    ItemRemainingQuantity: qty,
                    MaterialImage: element.productImageUrl,
                    MaterialName: element.productName,
                    MaterialNumber: element.MaterialNumber,
                    OrderQuantity: qty,
                    ParameterMode: '',
                    Plant: localStorage.getItem('PLANTCODE'),
                    ReasonForRejection: '',
                    UnitOfMeasure: element.unitOfMeasure,
                    WeightExtraFreight: '',
                  }
                }
              }
            )
          : [
              {
                id: '0',
                name: `${t('lable.norecordfound')}`,
              },
            ]

      var itemData = []
      for (var i = 0; i <= items.length; i++) {
        // console.log(items[i], 'items+++++++++')
        if (items[i] !== null && items[i] !== undefined) {
          itemData.push(items[i])
        }
      }

      let data = {
        CalloutStatusObject: {
          sfReferenceID: '',
          statusItem: [
            {
              statusCode: '',
              statusMessage: '',
            },
          ],
        },
        header1: {
          conditionGroup1: '',
          customerNote: remarksData,
          differentQtyFlag: '',
          distributionChannel: '',
          division: '',
          documentDate: todayDate,
          gatewaySMSPattern: '',
          internalNote: '',
          mobileNumber1: '',
          mobileNumber2: '',
          noteFromContract: '',
          paymentTerm: '',
          ponumber: localStorage.getItem('porefnumber'),
          productCategory: localStorage.getItem('CATEGORY'),
          productSubCategory: localStorage.getItem('SUBCATEGORY'),
          purchaseOrderType: '',
          qualityInspection: '',
          requestDeliveryDate: todayDate,
          matchedSalesAreaList: matchedSalesAreaList,
          requestID: '',
          resentSMSFlag: '',
          rmxsalesOrderNumber: '',
          salesOrderNumber: '',
          salesOrderStatus: '',
          salesOrderType: localStorage.getItem('order-type'),
          salesOrganization: '',
          shippingCondition: localStorage.getItem('shipping-condition'),
          shippingType: localStorage.getItem('shipping-type'),
          specialInstruction: '',
          specialProcessingID: special,
          totalQuantity: localStorage.getItem('total-qty'),
          totalRemainingQuantity: localStorage.getItem('total-qty'),
          truckPlateLicense: '',
          tzone: '',
        },
        items: itemData,
        partnerFunction: {
          contractNumber:
            localStorage.getItem('CONTRACTNUMBER') === null ||
            localStorage.getItem('CONTRACTNUMBER') === undefined
              ? ''
              : localStorage.getItem('CONTRACTNUMBER'),
          name1: '',
          name2: '',
          shipToNumber: localStorage.getItem('SHIPTOCODE'),
          soldToParty:localStorage.getItem('CustomerNumber'),
          title: '',
          userId: userName.userId
        },
      }

      // console.log(data)
      dispatch(orderActions.placeOrder(data))
      dispatch(orderActions.clearCart(localStorage.getItem('CustomerNumber')))

      localStorage.removeItem('QuantityEditFlag')
      localStorage.removeItem('QuantitySaveFlag')
      localStorage.removeItem('total-qty')
      localStorage.removeItem('matchedSalesArea')
      localStorage.removeItem('PLACE-ORDER-FILTER-CHANGED')
      localStorage.removeItem('porefnumber')
      localStorage.removeItem('ORDER-ADDED')

      localStorage.removeItem('shipping-condition')
      localStorage.removeItem('shipping-type')
      localStorage.removeItem('order-type')
    } catch {
      alert(t('someThingWrong'))
    }
  }

  const placeOrderAndCreditInfo = () => {
    // console.log(cartdatas && cartdatas)
    let editflag = localStorage.getItem('QuantityEditFlag')
    let saveflag = localStorage.getItem('QuantitySaveFlag')
    let shipCondValue = localStorage.getItem('shipping-condition')
    let orderType = localStorage.getItem('order-type')
    if (shipCondValue != undefined) {
      if (orderType != undefined) {
        if (editflag === 'YES' && saveflag === 'YES') {
          var cartItems =
            cartdatas.getSelectedOrderInCheckout &&
            cartdatas.getSelectedOrderInCheckout
              ? cartdatas.getSelectedOrderInCheckout.map((element) => {
                  var totalqty = 0
                  totalqty += element.quantity
                  localStorage.setItem('total-qty', totalqty)
                  return {
                    customerGroup: '',
                    customerGroup5: '',
                    materialNumber: element.productId,
                    matchedSalesAreaList: element.matchedSalesAreaList
                      ? element.matchedSalesAreaList
                      : [''],
                    orderQuantity: element.quantity.toString(),
                    plantId: localStorage.getItem('PLANTCODE'),
                    salesDistrict: '',
                  }
                })
              : [
                  {
                    id: '0',
                    name: `${t('lable.norecordfound')}`,
                  },
                ]
        } else {
          var cartItems =
            cartdata.cartdata && cartdata.cartdata
              ? cartdata.cartdata.map((element) => {
                  var totalqty = 0
                  totalqty += element.quantity
                  localStorage.setItem('total-qty', totalqty)
                  return {
                    customerGroup: '',
                    customerGroup5: '',
                    materialNumber: element.productId,
                    matchedSalesAreaList: element.matchedSalesAreaList
                      ? element.matchedSalesAreaList
                      : [],
                    orderQuantity: element.quantity.toString(),
                    plantId: localStorage.getItem('PLANTCODE'),
                    salesDistrict: '',
                  }
                })
              : [
                  {
                    id: '0',
                    name: `${t('lable.norecordfound')}`,
                  },
                ]
        }

        let userName = localStorage.getItem('userData')
        userName = JSON.parse(userName)
        let orderType = localStorage.getItem('order-type')
        let shippingCondition = localStorage.getItem('shipping-condition')
        let contractno =
          localStorage.getItem('CONTRACTNUMBER') === null ||
          localStorage.getItem('CONTRACTNUMBER') === undefined
            ? ''
            : localStorage.getItem('CONTRACTNUMBER')
        let shiptocode = localStorage.getItem('SHIPTOCODE')
        let shippingType = localStorage.getItem('shipping-type')

        let special =
          localStorage.getItem('special-shipping-condition') === null ||
          localStorage.getItem('special-shipping-condition') === undefined
            ? ''
            : localStorage.getItem('special-shipping-condition')

        if (special === 'Standard') {
          special = 'ZS00'
        }

        let data = {
          contractNo: contractno,
          customerAccountNo:  localStorage.getItem('CustomerNumber'),
          items: cartItems,
          paymentTerm: '',
          requestDeliveryDate: todayDate,
          salesOrderType: orderType,
          shipTo: shiptocode,
          shippingCondition: shippingCondition,
          shippingType: shippingType,
          soldToParty:localStorage.getItem('CustomerNumber'),
          specialProcessingId: special,
        }
        localStorage.setItem('Shipping-Done', 'YES')
        dispatch(
          orderActions.getOrderCreditInfo(
            userName.countryCode,
            localStorage.getItem('CustomerNumber'),
            data
          )
        )

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      } else {
        toast.error(t('pleaseSelectOrder'), {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      toast.error(t('pleaseSelectShipingCond'), {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  function continueShoping() {
    history.goBack()
  }

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className='ml-4 mr-4 mt-1 mb-3'>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            &nbsp;
            <div className="buttonGroup">
              {activeStep === steps.length - 3 ? (
                <Button
                  onClick={handleBack}
                  className={classes.back_button}
                  onClick={continueShoping}
                  style={{fontSize: `${FontChange}px`}}
                >
                  {t('continueshopping.label')}
                </Button>
              ) : (
                ''
              )}
              <Button
                hidden={activeStep === 0}
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.back_button}
                style={{fontSize: `${FontChange}px`}}
              >
                {t('back.button')}
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                style={{fontSize: `${FontChange}px`}}
                //disabled={disablebutton}
              >
                {activeStep === steps.length - 1
                  ? t('CONFIRM ORDER')
                  : activeStep === steps.length - 2
                  ? t('continue.button')
                  : t('entershippingdetail.label')}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className='dialog-boxes'>
        <Dialog aria-labelledby='customized-dialog-title' open={open}>
          <DialogTitle id='customized-dialog-title'></DialogTitle>
          <DialogContent>
            <Typography style={{fontSize: `${FontChange}px`}}>
              {isErrorMsg && isErrorMsg
                ? langCode === 'th' ? 'ให้หมายเลข Po อยู่แล้ว' : 'Given Po number already exist'
                :
                countryCode && countryCode === 'VN' ?
                 t('yourOrderisCompleteVn') 
                //  + (`${' '}  ${
                //   placeorderdata.placeOrder &&
                //   placeorderdata.placeOrder.poReferenceNumber
                // }
                
                // `)
                 
                 
                 : t('yourOrderisComplete')  + (`${' '}  ${
                  placeorderdata.placeOrder &&
                  placeorderdata.placeOrder.poReferenceNumber
                }`)
                 
                }
            </Typography>
            <DialogActions>
              <div className='create_link d-flex'>
                <button className='create p-2'>
                  <Link className='text-white' to='/PlaceOrder' style={{fontSize: `${FontChange}px`}}>
                    {t('createneworder.button')}
                  </Link>
                </button>
                <button className='create p-2'>
                  <Link className='text-white' to='/MyOrder' style={{fontSize: `${FontChange}px`}}>
                    {t('viewmyorder.button')}
                  </Link>
                </button>
              </div>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
