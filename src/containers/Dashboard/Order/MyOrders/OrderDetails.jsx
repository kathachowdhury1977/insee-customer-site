import React, { useEffect, useState } from 'react'
import { orderActions } from '../../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import './MyOrders.scss'
import Header from '../../../../components/Header/Header'
import OrderItemDetails from '../../../../components/OrderItemDetails/OrderItemDetails'
import { Link, useHistory } from 'react-router-dom'
import TotalNetPrice from '../../../../components/TotalNetPrice/TotalNetPrice'
import MyOrdersHeader from '../MyOrders/MyOrdersHeader'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Item from '../../../../assets/img/insee.jfif'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../MyOrders/PrintView.scss";



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
    width: "100%",
  },
  containerTable: {
 //   maxHeight: 1000,
  },
  table: {
    minWidth: 650,
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
    width: '417px',
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




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function OrderDetails(props) {
  const raiseReleaseStatus = useSelector((state) => state)
  const shipToDetails = useSelector((state) => state.getShipToDetails)
  const classes = useStyles();
  const orderdetailsdata =
    props.location.state.orderdetails && props.location.state.orderdetails
  // const [orderDetails, setorderDetails] = useState(props.location && props.location.state.orderdetails);
  const [open, setOpen] = useState(false)
  const [openCancelSOOne, setOpenCancelSOOne] = useState(false)
  const { t } = useTranslation()
  let history = useHistory()
  const dispatch = useDispatch()
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  const selectedLangCode = localStorage.getItem('lancode');
  console.log('shiptodetails ' , shipToDetails)
  console.log(orderdetailsdata, 'orderdetailsdata546546464')

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  
  let shipToCodeNo =
    orderdetailsdata.partnerFunction &&
    orderdetailsdata.partnerFunction.shipToNumber
  
  useEffect(() => {
    dispatch(orderActions.getShipToDetails(shipToCodeNo))
    dispatch(orderActions.getOrderDetail(orderdetailsdata && orderdetailsdata.orderListObject && orderdetailsdata.orderListObject
      .ccrz__OrderId__c, userName.soldTo[0]));
  }, [])

  const orderDeatilsOrderId = useSelector(state => state.orderdetail.orderdetail);

  const isBorderCustomer = orderDeatilsOrderId &&  orderDeatilsOrderId.orderListObject !== undefined ? 
  orderDeatilsOrderId.orderListObject !== {} && orderDeatilsOrderId.orderListObject &&
  orderDeatilsOrderId.orderListObject.Doc_Currency === null ? 'THB' 
  : orderDeatilsOrderId && orderDeatilsOrderId.orderListObject.Doc_Currency : ''

  
  const navigateToRaiseReleaseRequest = () => {
    dispatch(
      orderActions.raiseReleaseRequest(
        userName.soldTo[0],
        props.location.state.orderdetails &&
          props.location.state.orderdetails.header1.ponumber,
        props.location.state.orderdetails &&
          props.location.state.orderdetails.header1.salesOrderNumber
      )
    )
    console.log(raiseReleaseStatus && raiseReleaseStatus)
    setOpen(true)
  }

  const navigateToCancelSO = () => {
    // console.log(userName.soldTo[0], orderDetails && orderDetails.header1.ponumber, orderDetails && orderDetails.header1.salesOrderNumber);
    setOpenCancelSOOne(true)
  }

  const handleClose = () => {
    toast.dark(t('Raise Release Request Success'), {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    setOpen(false)
    setTimeout(() => {
      history.push('/MyOrder')
    }, 1800)
    // history.push('/MyOrder');
  }

  const handleSubmitCancelSO = () => {
    dispatch(
      orderActions.cancelSO(
        userName.soldTo[0],
        props.location.state.orderdetails &&
          props.location.state.orderdetails.orderListObject.ccrz__OrderId__c
      )
    )

    console.log(
      props.location.state.orderdetails &&
        props.location.state.orderdetails.orderListObject.ccrz__OrderId__c
    )
    
    setOpenCancelSOOne(false)
    setTimeout(() => {
      history.push('/MyOrder')
    }, 5000)
  }

  const handleCloseCancelSOOne = () => {
    setOpenCancelSOOne(false)
  }

  const handleImg = (e) => {
    e.target.src =
      'https://www.siamcitycement.com/images/layout/insee_logo_en.png'
  }

  const  decimalwithcoma = (num) => 
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  const releaseRaiseRequest = () => {
    history.push({
      pathname: '/RaiseReleaseRequest',
      state: { orderdetails: orderdetailsdata },
    })
  }

  const changeSoRequest = () => {
    history.push({
      pathname: '/ChangeSO',
      state: { orderdetails: orderdetailsdata },
    })
    
  }
  const productPonumber = orderdetailsdata && orderdetailsdata.header1
  ? orderdetailsdata.header1.ponumber
  : ''

  const productSoNumber = orderdetailsdata.orderListObject
  ? orderdetailsdata.orderListObject
      .ccrz__OrderId__c
  : ''

  const changePaymentMethod = () => {
    dispatch(orderActions.changePaymentMethod(productPonumber, productSoNumber, shipToCodeNo))
  }

  console.log(orderdetailsdata, 'orderdetailsdata258')

  return (
    <>
      <div className='content-wrapper'>
        <Header title="My Order Details" />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className='mainScroll'>
            <div className='myorders-container col-12 mt-2 mb-3'>
              <div className='card mt-0'>
                <div className='row place-order-step-box'>
                  <div className='col-12'>
                    {/* <MyOrdersHeader
                      headingTitle={t('Order Details')}
                      showfilters={false}
                    /> */}
                    <p className='myorder-heading' style={{fontSize: `${HeadingFontChange}px`}}>{t('Order Details')}</p>

                  </div>
                  <div className='col-12' style={{ marginTop: '15px' }}>
                    <div className='row'>
                      <div className='col-12'>
                        <div className='Rectangle-2231 row mr-0 ml-0'>
                          {
                            countryCode && countryCode === 'VN' ? '' :
                            <span className='col pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
                            {t('pono.label')}{' '}
                            {orderdetailsdata && orderdetailsdata.header1
                              ? orderdetailsdata.header1.ponumber
                              : ''}
                          </span>
                          }
                           
                          <span className='col complit pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
                            {t('sostatus.status')}{': '}
                            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Open" ? "พร้อมทำชิปเม้นท์ - Open" : "" : '':
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Open" ? "Mở - Open" : "" : '':
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Open" ? "พร้อมทำชิปเม้นท์ - Open" : "":''
              }
              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Processing" ? "อยู่ระหว่างดำเนินการ - Processing" : "" : '' :
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Processing" ? "Đang xử lý - Processing" : "" : '' :
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Processing" ? "อยู่ระหว่างดำเนินการ - Processing" : "" : ''
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Cancel" ? "ยกเลิก - Cancel" : "" : '' :
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Cancel" ? "Hủy - Cancel" : "" : '' :
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Cancel" ? "ยกเลิก - Cancel" : "" : ''
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Dispatched" ? "รับสินค้าเรียบร้อย - Dispatched" : "" : '' :
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Dispatched" ? "รับสินค้าเรียบร้อย - Dispatched" : "" : '':
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Dispatched" ? "รับสินค้าเรียบร้อย - Dispatched" : "" : ''
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Partial" ? "จัดส่งแล้วบางส่วน - Partial" : "" : '':
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Partial" ? "จัดส่งแล้วบางส่วน - Partial" : "" : '':
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Partial" ? "จัดส่งแล้วบางส่วน - Partial" : "" : ''
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Blocked" ? "ถูกบล๊อก - Blocked" : ""  :'':
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Blocked" ? "Khóa - Blocked" : "" : '' :
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Blocked" ? "ถูกบล๊อก - Blocked" : "" : ''
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Cancelling_Progress" ? "ยกเลิกความคืบหน้า - Cancelling Progress" : "" : '':
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Cancelling_Progress" ? "ยกเลิกความคืบหน้า - Cancelling Progress" : "" : '':
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Cancelling_Progress" ? "ยกเลิกความคืบหน้า - Cancelling Progress" : "" : ''
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Completed" ? "ดำเนินการเรียบร้อย - Completed" : "" : '' :
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Completed" ? "Đã hoàn tất - Completed" : "" : '' :
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Completed" ? "ดำเนินการเรียบร้อย - Completed" : "" : ''
              }

              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Failed" ? "ล้มเหลว- Failed" : "" : '' :
              selectedLangCode && selectedLangCode === 'vt' ?  
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Failed" ? "ล้มเหลว- Failed" : "" : '' :
              orderdetailsdata && orderdetailsdata.header1 ? orderdetailsdata.header1.salesOrderStatus === "Failed" ? "ล้มเหลว- Failed" : "" : ''
              }
                           


                          
                          </span>
                          <span className='col pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
                            {t('SO No.')}:{' '}
                            {orderdetailsdata.orderListObject
                              ? orderdetailsdata.orderListObject
                                  .ccrz__OrderId__c
                              : ''}
                          </span>
                          <span className='col pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
                            {t('SO Date')}:{' '}
                            {orderdetailsdata && orderdetailsdata.header1
                              ? orderdetailsdata.header1.requestDeliveryDate
                              : ''}
                          </span>
                          <span className='col pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
                            {t('Plant')}:{' '}
                            {orderdetailsdata.items.map((item, i) => {
                              if (i < 1) {
                                return <span style={{fontSize: `${SmallFontChanger}px`}}>{item.Plant}</span>
                              }
                            })}
                          </span>
                          <span
                            className='col pl-0 pr-0'
                            style={{ textAlign: 'right',fontSize: `${SmallFontChanger}px` }}
                          >
                            {t('ordertype.label')}:{' '}
                            {
                              orderdetailsdata && orderdetailsdata.header1 ?
                              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
                              orderdetailsdata.header1.salesOrderType === "CREDIT" ? 'Credit - เครดิต' : '' :
                              selectedLangCode && selectedLangCode === 'vt' ?  
                              orderdetailsdata.header1.salesOrderType === "CREDIT" ? 'Credit - Tín dụng' : '' :
                              orderdetailsdata.header1.salesOrderType === "CREDIT" ? 'Credit - เครดิต' : ''
                              : ''
                              }

                            {
                               orderdetailsdata && orderdetailsdata.header1 ?
                              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
                              orderdetailsdata.header1.salesOrderType === "CASH" ? 'Cash - เงินสด' : '' :
                              selectedLangCode && selectedLangCode === 'vt' ?  
                              orderdetailsdata.header1.salesOrderType === "CASH" ? 'Cash - Tiền mặt' : ''  :
                              orderdetailsdata.header1.salesOrderType === "CASH" ? 'Cash - เงินสด' : '' 
                              : ''
                              }
                            {/* {orderdetailsdata && orderdetailsdata.header1 
                              ? orderdetailsdata.header1.salesOrderType  === "CREDIT" ? 'เครดิต - Credit' : 
                              orderdetailsdata.header1.salesOrderType === "CASH" ? 'เงินสด - Cash'  : '-'
                                
                              : 'NA'} */}
                          </span>
                        </div>
                        
                        {orderDeatilsOrderId != [] && orderDeatilsOrderId !== undefined &&  orderDeatilsOrderId !== null
                        
                        ?
                        <Paper className={classes.root}>
                           <TableContainer className={classes.containerTable}>
                           <Table className="tableHaed" stickyHeader aria-label="sticky table">
                        
                          <TableHead>
                            <TableRow>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orderDeatilsOrderId && orderDeatilsOrderId.items ? orderDeatilsOrderId && orderDeatilsOrderId.items.map((row,index) => (
                              <TableRow key={row.name}>

                                <TableCell align="center" className="col-xl-1 col-lg-3 col-md-2 col-sm-3 col-xs-4"><img
                                      onError={handleImg}
                                      
                                      style={{height:50, width:50, maxHeight:50,maxWidth:50, resizeMode:'contain',fontSize: `${SmallFontChanger}px`}}
                                      src={row.MaterialImage}
                                      alt=''
                                    /></TableCell>
                                <TableCell className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}> <b><span className="red-text" >{orderDeatilsOrderId && orderDeatilsOrderId.orderItemListObject? 
                                      orderDeatilsOrderId.orderItemListObject[index].Item_Category__c.includes('ZFG') ? "Free" : '' : ''}</span></b> {' '}
                                      
                                      {
                                        selectedLangCode === 'en' || selectedLangCode === null ?
                                        row.MaterialName ? row.MaterialName.split(':')[1] : '' : row.MaterialName ? row.MaterialName.split(':')[0] : ''
                                      }
                                      </TableCell>
                                <TableCell className="col-xl-1 col-lg-3 col-md-2 col-sm-3 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}>{row.MaterialNumber.replace(/^0+/, '')}</TableCell>
                                {orderDeatilsOrderId.header1.division && orderDeatilsOrderId.header1.division ==='CW' ? 
                                <TableCell className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}><b>{row.UnitOfMeasure}</b> {t('UnitOfMeasure')}</TableCell> :'' }
                                <TableCell className="col-xl-2 col-lg-3 col-md-2 col-sm-3 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}><b>{orderDeatilsOrderId.orderItemListObject
                                        ? decimalwithcoma(parseFloat(orderDeatilsOrderId.orderItemListObject[index].ccrz__Price__c).toFixed(2)): '0'} </b> 
                                        {t('Price/Unit')}{' '}
                                        {selectedLangCode === 'en' || selectedLangCode === null ? 
                                      `(${isBorderCustomer})`
                                      : isBorderCustomer === 'THB' ? '(บาท)' :
                                      isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                                        </TableCell>
                                 <TableCell className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}><b>{orderDeatilsOrderId.orderItemListObject && orderDeatilsOrderId.header1.division ===
                                              'CW' 
                                              ?
                                              decimalwithcoma(parseFloat(orderDeatilsOrderId
                                            .orderItemListObject[index].Discount_Amount__c).toFixed(2))+`%  ${t('Discount/Unit')} (%)`
                                            : 
                                            countryCode && countryCode === 'VN' ? '' :
                                            decimalwithcoma(parseFloat(orderDeatilsOrderId
                                              .orderItemListObject[index].Discount_Amount__c).toFixed(2)) + ` ${t('Discount/Unit')}
                                              ${selectedLangCode === 'en' || selectedLangCode === null ? 
                                              `(${isBorderCustomer})`
                                              : isBorderCustomer === 'THB' ? '(บาท)' :
                                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                                       
                                             }
                                              `
                                              
                                              
                                              }
                                              
                                    {' '}</b>
                                  </TableCell>
                                <TableCell className="col-xl-2 col-lg-3 col-md-2 col-sm-3 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}> 
                                  {
                                     countryCode && countryCode === 'VN' ? '' :
                                    <>
                                  <b>{orderDeatilsOrderId.orderItemListObject
                                        ? orderDeatilsOrderId.orderItemListObject[index].Freight_Charge_Amount__c.toFixed(2): '0'}</b> 
                                        {t('Freight/Unit')}  {selectedLangCode === 'en' || selectedLangCode === null ? 
                                        `(${isBorderCustomer})`
                                        : isBorderCustomer === 'THB' ? '(บาท)' :
                                        isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                                 
                                       }{' '}  </>  }
                                       </TableCell>                                
                                {/* <TableCell></TableCell> */}

                                <TableCell className="col-xl-1 col-lg-3 col-md-2 col-sm-3 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}>
                                {orderDeatilsOrderId.header1.division &&
                                 orderDeatilsOrderId.header1.division ===
                                'CW' ? 
                                  <span>
                                    <b>
                                      {orderDeatilsOrderId.orderItemListObject
                                        ? parseFloat(orderDeatilsOrderId
                                            .orderItemListObject[index]
                                            .Cash_Discount_Amount__c ).toFixed(2) + '%'
                                        : 'NA'}{' '}
                                    </b>
                                   {t('CashDiscount')}(%)
                                  </span>
                                  : null 
                                  }
                                </TableCell>
                                <TableCell className="col-xl-2 col-lg-3 col-md-2 col-sm-3 col-xs-12" style={{fontSize: `${SmallFontChanger}px`}}>
                                {orderDeatilsOrderId.header1.division &&
                                 orderDeatilsOrderId.header1.division ===
                                'CW' ?                                  
                                    <b>
                                      {
                                        row.UnitOfMeasure ===  "Each" || "ชิ้น" ?  decimalwithcoma(parseFloat(row.OrderQuantity).toFixed(0)) : decimalwithcoma(parseFloat(row.OrderQuantity).toFixed(3))
                                      }
                                     {' '}
                                    
                                      {selectedLangCode === 'en' || selectedLangCode === null  ? 
                                        row.UnitOfMeasure : 
                                      row.UnitOfMeasure === "TON" ? "ตัน": 
                                      row.UnitOfMeasure === "Each" ? "ชิ้น"  : 
                                      row.UnitOfMeasure }
                                      
                                    </b>                                

                                :                                
                                <b>
                                  {decimalwithcoma(parseFloat(row.OrderQuantity).toFixed(3))}{' '}
                                  {selectedLangCode === 'en' || selectedLangCode === null ?
                                       row.UnitOfMeasure :
                                      selectedLangCode === 'vt' ? 
                                       row.UnitOfMeasure === "TON" ? "tấn"  :
                                       row.UnitOfMeasure === "Each" ? "ชิ้น" :
                                       row.UnitOfMeasure:
                                       row.UnitOfMeasure === "TON" ? "ตัน" :
                                         row.UnitOfMeasure === "Each" ? "ชิ้น" :
                                         row.UnitOfMeasure
                                          }
                                  {/* {selectedLangCode === 'en' || selectedLangCode === null  ? 
                                        row.UnitOfMeasure : 
                                      row.UnitOfMeasure === "TON" ? "ตัน": 
                                      row.UnitOfMeasure === "Each" ? "ชิ้น"  : 
                                      row.UnitOfMeasure } */}
                                </b>
                            


                              }  
                                </TableCell>
                                <TableCell style={{fontSize: `${SmallFontChanger}px`}}>
                                {orderDeatilsOrderId.header1.division &&
                          orderDeatilsOrderId.header1.division ===
                            'CW' ? 
                                
                              <b>
                                  {orderDeatilsOrderId.orderItemListObject
                                  ? orderDeatilsOrderId.orderItemListObject[index].QuantityInKg: '0'}{' '}
                                {' '}
                                {t('KG')}
                              </b>
                           
                                  : ''
                              }
                                </TableCell>

                              </TableRow>
                            ))
                          : null
                          }
                          </TableBody>
                        </Table>
                      </TableContainer> 
                      </Paper>

                      :

                      null
                      
                        }

                  
                        <div className='Rectangle-108 row mr-0 ml-0'>
                          {
                             countryCode && countryCode === 'VN' ? '' :
                             <>
                             <span className='col-6 lighttext' style={{fontSize: `${SmallFontChanger}px`}}>
                            {t('Total Price')}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </span>
                          <span className='col-6 darktext' style={{fontSize: `${SmallFontChanger}px`}}>
                            {orderdetailsdata.orderListObject
                              ?decimalwithcoma( parseFloat(
                                  orderdetailsdata.orderListObject
                                    .totalPriceWithoutTax
                                )
                                  
                                  .toFixed(2))
                              : 'NA'}
                          </span>
                             </>
                          }
                          
                          {
                              countryCode && countryCode === 'VN' ? '' :
                          <>
                          <span className='col-6 lighttext' style={{fontSize: `${FontChange}px`}}>
                            {t('Total Discount')}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </span>
                          
                          <span className='col-6 darktext' style={{fontSize: `${FontChange}px`}}>
                            {orderdetailsdata.orderListObject
                              ? decimalwithcoma(parseFloat(
                                  orderdetailsdata.orderListObject.totalDiscount
                                )
                                  .toFixed(2))
                              : 'NA'}
                          </span>
                          </>
                          }
                          {orderdetailsdata.header1.division &&
                          orderdetailsdata.header1.division ===
                            'CW' ? (
                            <>
                              <span className='col-6 lighttext' style={{fontSize: `${FontChange}px`}}>
                              {t('TotalCashDiscount')}
                              {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                              </span>
                              <span className='col-6 darktext' style={{fontSize: `${FontChange}px`}}>
                                {orderdetailsdata.orderListObject
                                  ? orderdetailsdata &&
                                  decimalwithcoma( parseFloat( orderdetailsdata.orderListObject
                                      .totalCashDiscountAmount) .toFixed(2))
                                  : '0'}
                              </span>
                            </>
                          ) : (
                            ''
                          )}
                         
                         {orderdetailsdata.header1.division &&
                          orderdetailsdata.header1.division ===
                            'CW' ? (
                            <>
                              <span className='col-6 lighttext' style={{fontSize: `${FontChange}px`}}>
                       
                              {t('TotalWeight')}{orderdetailsdata.header1.division &&
                          orderdetailsdata.header1.division ===
                            'CW' ? t('KG'): '' }
                             
                              </span>
                              <span className='col-6 darktext' style={{fontSize: `${FontChange}px`}}>
                              {orderdetailsdata.orderListObject
                              ? (parseFloat(orderdetailsdata.orderListObject.totalQuantityInKg).toFixed(2))
                              : '0'}
                              </span>
                            </>
                          ) : (
                            ''
                          )}
                          {
                              countryCode && countryCode === 'VN' ? '' :
                          <>
                          <span className='col-6 lighttext' style={{fontSize: `${FontChange}px`}}>
                            {t('Total Freight')}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </span>
                          <span className='col-6 darktext' style={{fontSize: `${FontChange}px`}}>
                            {orderdetailsdata.orderListObject
                              ?decimalwithcoma( parseFloat(orderdetailsdata.orderListObject.totalFreight) .toFixed(2))
                              : 'NA'}
                          </span>
                          </>
                          }
                          {
                          userName.countryCode === "VN" ? '' :
                          <>
                          <span className='col-6 lighttext' style={{fontSize: `${FontChange}px`}}>
                            {t('Total Tax')}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </span>
                          <span className='col-6 darktext' style={{fontSize: `${FontChange}px`}}>
                            {orderdetailsdata.orderListObject
                              ? decimalwithcoma(parseFloat (orderdetailsdata.orderListObject.Tax__c).toFixed(2))
                              : 'NA'}
                          </span>
                          </>
                          }
                        </div>

                        <div className='Rectangle-10887 row mr-0 ml-0'>
                          <span className='col-6 lighttext' style={{fontSize: `${HeadingFontChange}px`}}>
                            {t('Total')}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </span>
                          <span className='col-6 darktext'  style={{fontSize: `${HeadingFontChange}px`}}>
                            {orderdetailsdata.orderListObject
                              ?  decimalwithcoma(parseFloat(orderdetailsdata.orderListObject.Total_After_Tax__c).toFixed(2))
                              : 'NA'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
   
                  <div className='col-sm-12 col-md-12 col-lg-12 mt-3 shiping-myorder-details'>
                    <p className='mb-1'  style={{fontSize: `${FontChange}px`}}>{t('Ship to')}</p>
                    <p className='shipto-detail'  style={{fontSize: `${FontChange}px`}}>
                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.shipToId != "null" ? shipToDetails.getShipToDetails.shipToId.replace(/^0+/, '') : ' '
                        : ' '}{' '}
                      ,
                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.shipToName != "null" ? 
                        selectedLangCode === 'en' || selectedLangCode === null ?
                        shipToDetails.getShipToDetails.shipToName :                        
                        selectedLangCode === 'vt' ? shipToDetails.getShipToDetails.shipToName : 
                        shipToDetails.getShipToDetails.shipToNameInLocal
                        : shipToDetails.getShipToDetails.shipToName : ''
                        
                        }{' '}
                      {
                        userName.countryCode === 'VN'? '':
                        <>
                         {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.address.address != "null" ? shipToDetails.getShipToDetails.address.address : ' '
                        : ' '}
                      {' '}
                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.address.regionId != "null" ? shipToDetails.getShipToDetails.address.regionId : ' '
                        : ' '}
                      {' '}
                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.street != "null" ? shipToDetails.getShipToDetails.address.street : ' '
                        : ' '}{' '}
                      {' '}
                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.address.subDistrictId != "null" ? shipToDetails.getShipToDetails.address.subDistrictId : ' '
                        : ' '}
                      {' '}
                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.address.districtId != "null" ? shipToDetails.getShipToDetails.address.districtId : ' '
                        : ' '}
                      {' '}
                      
                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.address.provinceId != "null" ?
                        selectedLangCode === 'en' || selectedLangCode === null ? shipToDetails.getShipToDetails.address.provinceId : shipToDetails.getShipToDetails.address.provinceInLocalLanguage 
                        : ' '
                        : ' '}{' '}

                      {shipToDetails && shipToDetails.getShipToDetails
                        ? shipToDetails.getShipToDetails.address.postalCode != "null" ?  shipToDetails.getShipToDetails.address.postalCode : ' '
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
                  <div
                    className='col-12'
                    style={{ marginBottom: '10px', marginTop: '-10px' }}
                  >
                    <Divider />
                  </div>
                  <div className='col-sm-3 col-md-3 col-lg-3 shiping-myorder-details'>
                    <p className='mb-1'  style={{fontSize: `${FontChange}px`}}>{t('Shipping Conditions')}</p>
                    <p  style={{fontSize: `${FontChange}px`}}>
                      {
                      orderDeatilsOrderId && orderDeatilsOrderId.header1 && orderDeatilsOrderId.header1
                        ? orderDeatilsOrderId.header1.shippingCondition 
                        : 'NA'}
                    </p>
                  </div>
                  {
                     userName.countryCode === "VN" ? '' :
                     <div className='col-sm-3 col-md-3 col-lg-3 shiping-myorder-details'>
                     <p className='mb-1'  style={{fontSize: `${FontChange}px`}}>{t('Special Shipping Conditions')}</p>
                     <p  style={{fontSize: `${FontChange}px`}}>
                       {orderdetailsdata.header1 && orderdetailsdata.header1
                         ? 
                         
                         orderdetailsdata.header1.division &&
                           orderdetailsdata.header1.division ===
                             'CW' ?
                             orderdetailsdata.header1.specialProcessingID === "No MHE" ? "-" : '-'
                         :
                         selectedLangCode === 'en' || selectedLangCode === null  ? orderdetailsdata.header1.specialProcessingID === "No MHE" ? "No MHE" : 
                         orderdetailsdata.header1.specialProcessingID :  orderdetailsdata.header1.specialProcessingID  === "No MHE" ? "ไม่มีอุปกรณ์ขนถ่าย" : orderdetailsdata.header1.specialProcessingID
                         : 'NA'}
                     </p>
                   </div>
                  }
                 
                  <div className='col-sm-3 col-md-3 col-lg-3 shiping-myorder-details'>
                    <p className='mb-1'  style={{fontSize: `${FontChange}px`}}>{t('Shipping Type')}</p>
                    <p  style={{fontSize: `${FontChange}px`}}>
                      {orderdetailsdata.header1 && orderdetailsdata.header1
                        ? orderdetailsdata.header1.shippingType
                        : 'NA'}
                    </p>
                  </div>
                  {
                    userName.countryCode === "VN" ? 
                   orderDeatilsOrderId && orderDeatilsOrderId.header1.division && orderDeatilsOrderId.header1.rebateSalesOrder === true ? 
                    <div className='col-sm-3 col-md-3 col-lg-3 shiping-myorder-details'>
                    <p  style={{fontSize: `${FontChange}px`}} className='mb-1'>{t('internalnote.label')}</p>
                    <p  style={{fontSize: `${FontChange}px`}}>
                      {orderdetailsdata && orderdetailsdata.header1 && orderdetailsdata.header1
                        ? orderdetailsdata.header1.internalNote
                        : 'NA'}
                    </p>
                  </div> : 

                  <div className='col-sm-3 col-md-3 col-lg-3 shiping-myorder-details'>
                  <p  style={{fontSize: `${FontChange}px`}} className='mb-1'>{t('Remarks')}</p>
                  <p  style={{fontSize: `${FontChange}px`}}>
                    {orderdetailsdata && orderdetailsdata.header1 && orderdetailsdata.header1
                      ? orderdetailsdata.header1.customerNote
                      : 'NA'}
                  </p>
                  </div>
                  :
                  <div className='col-sm-3 col-md-3 col-lg-3 shiping-myorder-details'>
                    <p  style={{fontSize: `${FontChange}px`}} className='mb-1'>{t('Contract Number')}</p>
                    <p  style={{fontSize: `${FontChange}px`}}>
                      {orderdetailsdata.partnerFunction &&
                      orderdetailsdata.partnerFunction
                        ? orderdetailsdata.partnerFunction.contractNumber+ (orderdetailsdata.partnerFunction.contractName ? '-' +orderdetailsdata.partnerFunction.contractName : '') 
                        : 'NA'}
                    </p>
                  </div>
                  }
                  {/* <div className='col-sm-3 col-md-3 col-lg-3 shiping-myorder-details'>
                    <p className='mb-1'>{t('Contract Number')}</p>
                    <p>
                      {orderdetailsdata.partnerFunction &&
                      orderdetailsdata.partnerFunction
                        ? orderdetailsdata.partnerFunction.contractNumber+ (orderdetailsdata.partnerFunction.contractName ? '-' +orderdetailsdata.partnerFunction.contractName : '') 
                        : 'NA'}
                    </p>
                  </div> */}

                  <div className='col-sm-12 col-md-12 col-lg-12 mt-3'>
                    {(props.location.state.orderdetails &&
                      props.location.state.orderdetails.header1
                        .salesOrderStatus === 'Cancel') ||
                    (props.location.state.orderdetails &&
                      props.location.state.orderdetails.header1
                        .salesOrderStatus === 'Cancelling_Progress') ? null : (
                      <div>
                         {
                          userName.countryCode === "VN" ? 
                          <>
                          {
                            orderDeatilsOrderId && orderDeatilsOrderId.header1.rebateSalesOrder === true ?
                            <button onClick={changePaymentMethod} style={{fontSize: `${FontChange}px`}} className='create_btn'>
                            {' '}
                            {t('changepaymentmethod.button')}
                          </button>
                          : ''
                          }
                         
                        {
                          props.location.state.orderdetails &&
                          props.location.state.orderdetails.header1
                            .salesOrderStatus === 'Blocked' ?
                            <button onClick={releaseRaiseRequest} style={{fontSize: `${FontChange}px`}} className='create_btn'>
                            {' '}
                            {t('RAISE RELEASE REQUEST')}
                          </button> : 
                          ''
                        }
                         
                        </>
                          :
                          props.location.state.orderdetails &&
                          props.location.state.orderdetails.header1
                            .salesOrderStatus === 'Blocked' ?
                          <button
                          disabled={props.location.state.orderdetails &&
                            props.location.state.orderdetails.header1.raiseRequestRequestRaised}
                          className='create_btn'
                          type='button'
                          onClick={navigateToRaiseReleaseRequest}
                          style={{fontSize: `${FontChange}px`}}
                        >
                          {t('Release Raise Request')}{' '}
                        </button>:
                         <button
                         disabled
                         className='create_btn'
                         type='button'
                         onClick={navigateToRaiseReleaseRequest}
                         style={{fontSize: `${FontChange}px`}}
                       >
                         {t('Release Raise Request')}{' '}
                       </button>
                        
                        } 

                        {
                          userName.countryCode === "VN" ? 
                          orderDeatilsOrderId && orderDeatilsOrderId.header1.rebateSalesOrder === true ?
                          <button onClick={changeSoRequest} className='create_btn' style={{fontSize: `${FontChange}px`}}>
                          {' '}
                          {t('changeso.button')}
                        </button> : ''
                          :
                          ''
                        }
                        
                        {
                         orderDeatilsOrderId && orderDeatilsOrderId.header1 ? orderDeatilsOrderId && orderDeatilsOrderId.header1.division && orderDeatilsOrderId.header1.division ==='CW' || orderDeatilsOrderId && orderDeatilsOrderId.header1.division && orderDeatilsOrderId.header1.rebateSalesOrder === true ? 
                         '' :  <button
                         style={{textTransform : "inherit"}}
                         className='create_btn'
                         type='button'
                         onClick={navigateToCancelSO}
                         style={{fontSize: `${FontChange}px`}}
                       >
                         {t('Cancel Order')}
                       </button> : null
                        }
                        
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* raise release request start */}
        <div className='dialog-boxes'>
          <Dialog
            onClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={open}
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={handleClose}
            ></DialogTitle>
            <DialogContent>
              <Typography>
                {t('Release Raise Email')}{' '}
                {orderdetailsdata.orderListObject
                  ? orderdetailsdata.orderListObject.ccrz__OrderId__c
                  : 'NA'}
                .
              </Typography>
              <DialogActions>
                <div className='create_link d-flex'>
                  <button className='create pl-5 pr-5' onClick={handleClose}>
                    {t('ok')}
                  </button>
                </div>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
        {/* raise release request end */}

        {/* cancel so first modal start */}
        <div className='dialog-boxes'>
          <Dialog
            onClose={handleCloseCancelSOOne}
            aria-labelledby='customized-dialog-title'
            open={openCancelSOOne}
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={handleCloseCancelSOOne}
            ></DialogTitle>
            <DialogContent>
              <Typography>
                {t('Areyousure')}{' '}
                {orderdetailsdata && orderdetailsdata.header1
                  ? orderdetailsdata.header1.ponumber
                  : 'NA'}
                , SO{' '}
                {orderdetailsdata.orderListObject
                  ? orderdetailsdata.orderListObject.ccrz__OrderId__c
                  : 'NA'}
                .
              </Typography>
              <DialogActions>
                <div className='create_link d-flex'>
                <button
                    className='create pl-5 pr-5'
                    onClick={handleSubmitCancelSO}
                  >
                    {t('pickupform.yes')}
                  </button>

                  <button
                    className='create pl-5 pr-5'
                    onClick={handleCloseCancelSOOne}
                  >
                    {t('pickupform.no')}
                  </button>
                </div>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
        {/* cancel so first modal end */}
      </div>
    </>
  )
}

export default withTranslation()(OrderDetails)
