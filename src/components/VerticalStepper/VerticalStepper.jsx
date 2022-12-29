import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import { orderActions } from '../../_actions'
import Typography from '@material-ui/core/Typography'
import AccordianCheckout from '../Accordian/AccordianCheckout'
import AccordianShipping from '../Accordian/AccordianShipping'
import AccordianPlaceOrder from '../Accordian/AccordianPlaceOrder'
import { withTranslation, useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import 'moment-timezone'

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

function getSteps() {
  let Cart = (
    <span className='shopping_cart_icon'>
      <i className='fa fa-shopping-cart'></i> Cart
    </span>
  )
  let Shipping = (
    <span className='shopping_cart_icon'>
      <i className='fa fa-truck'></i> Shopping
    </span>
  )
  let PlaceOrder = (
    <span className='shopping_cart_icon'>
      <i className='fa fa-desktop'></i> Place Order
    </span>
  )
  return [Cart, Shipping, PlaceOrder]
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AccordianCheckout />
    case 1:
      return <AccordianShipping />
    case 2:
      return <AccordianPlaceOrder />
    default:
      return <AccordianCheckout />
  }
}

export default function VerticalStepper(props) {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()
  const cartdata = useSelector((state) => state.cartdata)
  const placeorderdata = useSelector((state) => state.placeOrder)
  const cartdatas = useSelector((state) => state.getSelectedOrderInCheckout)
  const orderCreditInfo = useSelector((state) => state.getOrderCreditInfo)
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const [open, setOpen] = useState(false)
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  const isLaststep = activeStep === steps.length - 1
  let todayDate = moment().format('DD-MM-YYYY')
  todayDate = todayDate.replace(/-|\s/g, '')

  useEffect(() => {
    dispatch(orderActions.getShipToDetails(userName.soldTo[0]))
  }, [])

  const handleNext = () => {
    console.log(activeStep)
    if (activeStep === 0) {
      localStorage.setItem(
        'matchedSalesArea',
        cartdatas.getSelectedOrderInCheckout &&
          cartdatas.getSelectedOrderInCheckout[0].matchedSalesAreaList
      )
    }
    if (activeStep === 1) {
      placeOrderAndCreditInfo()
    }
    if (activeStep === 2) {
      placeOrder()
    }
    if (isLaststep) {
      setOpen(true)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }
  function placeOrder() {
    const items =
      orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo
        ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem.map(
            (element) => {
              return {
                Batch: '',
                ItemNumberSD: element.SalesDocumentItem,
                ItemRemainingQuantity: element.Quantity.toString(),
                MaterialImage: '',
                MaterialName: element.productName,
                MaterialNumber: element.MaterialNumber,
                OrderQuantity: element.Quantity.toString(),
                ParameterMode: '',
                Plant: localStorage.getItem('PLANTCODE'),
                ReasonForRejection: '',
                UnitOfMeasure: 'TON',
                WeightExtraFreight: '',
              }
            }
          )
        : [
            {
              id: '0',
              name: 'Data is not available',
            },
          ]

    // console.log(items);
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
        customerNote: '',
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
        ponumber: '',
        productCategory: localStorage.getItem('CATEGORY'),
        productSubCategory: localStorage.getItem('SUBCATEGORY'),
        purchaseOrderType: '',
        qualityInspection: '',
        requestDeliveryDate: todayDate,
        matchedSalesAreaList:
          orderCreditInfo.getOrderCreditInfo &&
          orderCreditInfo.getOrderCreditInfo.matchedSalesAreaList,
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
        specialProcessingID: '',
        totalQuantity: localStorage.getItem('total-qty'),
        totalRemainingQuantity: localStorage.getItem('total-qty'),
        truckPlateLicense: '',
        tzone: '',
      },
      items: items,
      partnerFunction: {
        contractNumber: '',
        name1: '',
        name2: '',
        shipToNumber: localStorage.getItem('SHIPTOCODE'),
        soldToParty: userName.soldTo[0],
        title: '',
      },
    }

    console.log(data)
    dispatch(orderActions.placeOrder(data))
    dispatch(orderActions.clearCart(userName.soldTo[0]))
  }

  function placeOrderAndCreditInfo() {
    console.log(cartdatas && cartdatas)

    const cartItems =
      cartdatas.getSelectedOrderInCheckout &&
      cartdatas.getSelectedOrderInCheckout
        ? cartdatas.getSelectedOrderInCheckout.map((element) => {
            var totalqty = 0
            totalqty += element.quantity
            console.log('HERERERERERERERE', totalqty)
            localStorage.setItem('total-qty', totalqty)
            return {
              customerGroup: '',
              customerGroup5: '',
              materialNumber: element.productId,
              matchedSalesAreaList: element.matchedSalesAreaList,
              orderQuantity: element.quantity.toString(),
              plantId: localStorage.getItem('PLANTCODE'),
              salesDistrict: '',
            }
          })
        : [
            {
              id: '0',
              name: 'Data is not available',
            },
          ]

    let userName = localStorage.getItem('userData')
    userName = JSON.parse(userName)
    let orderType = localStorage.getItem('order-type')
    let shippingCondition = localStorage.getItem('shipping-condition')
    let contractno = localStorage.getItem('CONTRACTNUMBER')
    let shiptocode = localStorage.getItem('SHIPTOCODE')
    let shippingType = localStorage.getItem('shipping-type')

    let data = {
      contractNo: '',
      customerAccountNo: userName.soldTo[0],
      items: cartItems,
      paymentTerm: '',
      requestDeliveryDate: todayDate,
      salesOrderType: orderType,
      shipTo: shiptocode,
      shippingCondition: shippingCondition,
      shippingType: shippingType,
      soldToParty: userName.soldTo[0],
    }
    localStorage.setItem('Shipping-Done', 'YES')
    dispatch(
      orderActions.getOrderCreditInfo(
        userName.countryCode,
        localStorage.getItem('CustomerNumber'),
        data
      )
    )
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    console.log(activeStep)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div className='mt-4 mb-2 btn_section'>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.back_button}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    className={classes.contistep}
                  >
                    {activeStep === steps.length - 1
                      ? 'Confirm Order'
                      : activeStep === steps.length - 2
                      ? 'Continue'
                      : 'Enter Shipping Detail'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <div className='dialog-boxes'>
        <Dialog aria-labelledby='customized-dialog-title' open={open}>
          <DialogTitle id='customized-dialog-title'></DialogTitle>
          <DialogContent>
            <Typography>
              Your Order is Complete. 
              {
                countryCode && countryCode === 'VN' ? 'SO Number' : 'PO Reference No'
              }
              {' '}
              {placeorderdata.placeOrder &&
                placeorderdata.placeOrder.poReferenceNumber}
            </Typography>
            <DialogActions>
              <div className='create_link d-flex'>
                <button className='create p-2'>
                  <Link className='text-white' to='/PlaceOrder'>
                    {t('createneworder.button')}
                  </Link>
                </button>
                <button className='create p-2'>
                  <Link className='text-white' to='/MyOrder'>
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
