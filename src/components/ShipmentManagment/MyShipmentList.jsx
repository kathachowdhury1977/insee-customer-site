import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { withTranslation, useTranslation } from 'react-i18next'
import './ShipmentList.scss'
import ShipmentProduct from './ShipmentProduct'
import ShipmentTotal from './ShipmentTotal'
import { Link } from 'react-router-dom'
import Item from '../../assets/img/insee.jfif'
import IsImgChecked from '../../components/IsImgChecked/IsImgChecked'
import ShipmentStatus from './ShipmentStatus';
import newImg from '../../assets/img/new.gif'
import moment from 'moment'
import 'moment-timezone'
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    borderBottom: '1px solid rgba(196, 196, 196, 0.5)',
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

function MyShipmentList(props) {
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : 'TH'
  const { t } = useTranslation()
  const [shipData, setShipData] = useState(props.productShipList)
  const [open, setOpen] = useState(false)
  ////console.log('shipDatashipDatashipDatashipData',props.productShipList);
  const handleClose = () => {
    setOpen(false)
  }
  const selectedLangCode = localStorage.getItem('lancode');
  let selectedQuantity = 0
  function isEmpty(str) {
    return !str || str.length === 0
  }
  const checkDecimalVal = (val) => {
    let checkDecimalLen = String(val).split('.')
    return checkDecimalLen[1] !== undefined && checkDecimalLen[1].length >= 3
      ? Number(val).toFixed(3)
      : val
  }

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

  return (
    <>
      <div className='container-fluid mt-2 mb-2'>
        <div className='col-12'>
          <div className='Rectangle-2231 row'>
            <span className='PO-No-1287586 col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 pl-0 pr-0 mb-2' style={{fontSize: `${SmallFontChanger}px`}}>
              <span className="item_text" style={{fontSize: `${SmallFontChanger}px`}}>{t('myshipmentlist.heading')}: </span>{shipData.shipmentNumber ? shipData.shipmentNumber.includes('SH')? shipData.shipmentNumber : '' : ''}
            </span>
          
            <span className='SO-No-1208767 col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 pl-0 pr-0 mb-2' style={{fontSize: `${SmallFontChanger}px`}}>
            <span className="item_text" style={{fontSize: `${SmallFontChanger}px`}}> {t('shipmentdetail.shipmentdate')}:</span>{' '}
              {shipData.shipmentCreationDate}
            </span>
            <span className='SO-Date-12102020 col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 pl-0 pr-0 mb-2' style={{fontSize: `${SmallFontChanger}px`}}>
            <span className="item_text" style={{fontSize: `${SmallFontChanger}px`}}>{t('createdelivery.shipto')}: </span>{' '}
              {
                 countryCode && countryCode === 'VN' ? 
                
                 shipData && shipData.shipTos && shipData.shipTos != null && shipData.shipTos != undefined ? shipData.shipTos.map((shipTO) => {
                   return (
                    selectedLangCode === 'en' || selectedLangCode === null ?
                    shipTO.shipToCode && shipTO.shipToCode !=null ? shipTO.shipToCode.replace(/^0+/, '') + ' ' + shipTO.shipToName :'' :
                    shipTO.shipToCode && shipTO.shipToCode !=null ? shipTO.shipToCode.replace(/^0+/, '') + ' ' + shipTO.shipToName :'' 
                   )
                 })
                 :''
                  
                 
                 :
                selectedLangCode === 'en' || selectedLangCode === null ?
                  shipData.shipTo.replace(/^0+/, '') + ' ' + shipData.shipToName
                  :
                  shipData.shipTo.replace(/^0+/, '') + ' ' + shipData.shipToNameInLocal
              }

            </span>
            <span className='Plant-Thap-Kwang-Thailand col-xl-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 pl-0 pr-0 ' style={{fontSize: `${SmallFontChanger}px`}}>
              <span className="item_text" style={{fontSize: `${SmallFontChanger}px`}}>{t('Plant')}:</span>{shipData.plantName}
            </span>
            {
            countryCode && countryCode === 'VN' ? 
                '':
            <span className='Order-Type-Credit col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
              <span className="item_text" style={{fontSize: `${SmallFontChanger}px`}}>{t('shipmanagement.shipmentstatus')}:</span> <ShipmentStatus status={shipData.shippingStatus} />
            </span>
          }
           <span className="newIcon">{shipData.shipmentCreationDate === moment().format('DD/MM/YYYY') ? 
            <img src={newImg}  style={{width: '50px'}}/>
            : ''}</span>
          </div>
        </div>
        <div className='col-12'>
          {shipData &&
            shipData.products.map((prod, key) => {
              selectedQuantity =
                selectedQuantity +
                parseFloat(Number(prod.selectedQuantity).toFixed(2))
              return (
                <>
                  <div className='Rectangle-2232 row'>

                    <span className='product_name productName col-xl-3 col-lg-4 col-md-12 col-sm-6 col-xs-12 pl-0 mb-3'>
                      <span className="productImg">
                        <IsImgChecked imageUrl={prod.productImage} />
                      </span>
                      <span className="ml-2 prod_name" style={{fontSize: `${SmallFontChanger}px`}}>
                        <strong style={{fontSize: `${SmallFontChanger}px`}}>
                          {
                            selectedLangCode === 'en' || selectedLangCode === null ?
                              prod && prod.productName ? prod.productName.split(':')[1] : '' : prod && prod.productName ? prod.productName.split(':')[0] : ''
                          }
                        </strong>
                      </span>
                     
                      <span  className='product_id ml-2 ' style={{fontSize: `${SmallFontChanger}px`}}>
                        <strong style={{fontSize: `${SmallFontChanger}px`}}>{prod.productId ? prod.productId.replace(/^0+/, '') : ''}</strong>
                      </span>
                    </span>
                    {
                    countryCode && countryCode === 'VN' ? 
                    <span className='product_id productId col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-3' style={{lineHeight: "18px",fontSize: `${SmallFontChanger}px`}}>
                    {t('shipmanagement.shipmentstatus')} : <br/>{prod.doStatus}
                  </span>
                      : 
                      <span className='product_id productId col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-3' style={{lineHeight: "18px",fontSize: `${SmallFontChanger}px`}}>
                      {t('label.po_number')} : <br/>{shipData.poNumber[key]}
                    </span>
                    }
                    {/* <span className='product_id productId col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-3' style={{lineHeight: "18px"}}>
                      {t('label.po_number')} : <br/>{shipData.poNumber[key]}
                    </span> */}
                    <span className='product_id productId14 col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-3' style={{lineHeight: "18px",fontSize: `${SmallFontChanger}px`}}>

                      {t('label.so_number')} : <br/>{prod.soNo}

                    </span>
                    <span className='product_id productId14 col-xl-1 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-3' style={{lineHeight: "18px",fontSize: `${SmallFontChanger}px`}}>

                      {t('shipmanagement.donumber')}: <br/>
                      {
                      countryCode && countryCode === 'VN' ?
                      prod.doNumber !== ''
                        ? prod.doNumber
                        : ''
                      :
                      prod.deliveryNumberSap !== ''
                        ? prod.deliveryNumberSap
                        : ''}

                    </span>
                    <span className='product_name productId16 col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3' style={{fontSize: `${SmallFontChanger}px`}}>

                      {t('selectedQuantity')} {checkDecimalVal(parseFloat(prod.selectedQuantity).toFixed(3))}{' '}
                      {selectedLangCode === 'en' || selectedLangCode === null ?
                        prod.unitOfMeasure :
                      selectedLangCode === 'vt' ? 
                        prod.unitOfMeasure === "TON" ? "tấn"  :
                        prod.unitOfMeasure === "Each" ? "ชิ้น" :
                        prod.unitOfMeasure === "Set" ? "ชุด":
                        prod.unitOfMeasure:
                        prod.unitOfMeasure === "TON" ? "ตัน" :
                          prod.unitOfMeasure === "Each" ? "ชิ้น" :
                          prod.unitOfMeasure === "Set" ? "ชุด":
                          prod.unitOfMeasure
                          }
                     


                    </span>
                    {/* <span className='product_name productId12 col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3' style={{fontSize: `${SmallFontChanger}px`}}
                    >

                      {t('label.remaining_qty')}{' '}
                      {checkDecimalVal(parseFloat(prod.remainingQuantity).toFixed(3))}{' '}
                      {selectedLangCode === 'en' || selectedLangCode === null ?
                        prod.unitOfMeasure :
                      selectedLangCode === 'vt' ? 
                        prod.unitOfMeasure === "TON" ? "tấn"  :
                        prod.unitOfMeasure === "Each" ? "ชิ้น" :
                        prod.unitOfMeasure === "Set" ? "ชุด":
                        prod.unitOfMeasure:
                        prod.unitOfMeasure === "TON" ? "ตัน" :
                          prod.unitOfMeasure === "Each" ? "ชิ้น" :
                          prod.unitOfMeasure === "Set" ? "ชุด":
                          prod.unitOfMeasure
                          }

                    </span> */}
                  </div>
                </>
              )
            })}
        </div>
        <div className='col-12'>
          <div className='Rectangle-110 row'>
            <span className='Total-Amount-50000 col-4' style={{fontSize: `${SmallFontChanger}px`}}>
              {t('total.label')} :{' '}
              {checkDecimalVal(selectedQuantity) /*shipData.totalQuantity*/} {t('ton.weighttype')}
            </span>
            {
              <span className='col-4 text-center'>
                <span className='QTY-40'>&nbsp;{/*selectedQuantity TON*/}</span>
              </span>
            }
            <span class='col-4 text-right' >
              {shipData.shippingStatus === 'Processing' ||
                isEmpty(shipData.shipmentNumber) ? (
                <button
                  onClick={() => setOpen(true)}
                  className='create_btn_order'
                  style={{fontSize: `${FontChange}px`}}
                >
                  {t("Shipment Detail")}
                </button>
              ) : props.shipingCondition == 0 ? (
                <Link
                  to={`/ShipmentDetails-Pickup?countryCode=${countryCode}&inseeplusUID=${shipData.inseeplusUID}`}
                >
                  <button className='create_btn_order' style={{fontSize: `${FontChange}px`}}>
                    {t("Shipment Detail")}
                  </button>
                </Link>
              ) : (
                <Link
                  to={`/ShipmentDetails-Delivery?countryCode=${countryCode}&inseeplusUID=${shipData.inseeplusUID}`}
                >
                  <button className='create_btn_order' style={{fontSize: `${FontChange}px`}}>
                    {t('Shipment Detail')}
                  </button>
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className='select_shipment_boxes'>
        <Dialog
          style={{ borderRadius: '15px' }}
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            {t("Shipment Status Processing")}
          </DialogTitle>
          <DialogContent>
            <Typography>
              <p>{t("Shipment creation is process")}</p>
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
export default withTranslation()(MyShipmentList)
