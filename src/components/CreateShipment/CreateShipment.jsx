import React, { useEffect, useState } from 'react'
import { eventActions } from '../../_actions'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import ProductImag from '../../assets/img/insee.jfif'
import '../ShipmentManagment/ShipmentList.scss'
import './CreateShipment.scss'
import { number } from 'joi'
import IsImgChecked from '../../components/IsImgChecked/IsImgChecked'

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

function CreateShipment(props) {
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [updatequentity, setUpdatequentity] = useState({})
  const [errquentity, setErrQuentity] = useState({})
  const [erropen, setErropen] = useState(false)
  const [removeProd, setRemoveProd] = useState({})
  const [disabled, setDisabled] = useState({})
  const [changeval, setChangeVal] = useState(false)
  const [count, setCount] = useState(20)
  const selectedLangCode = localStorage.getItem('lancode');
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''

 

  const confirmRemoveProd = (productId, itemKey) => {
    setErropen(true)
    setRemoveProd({ product_id: productId, item_key: itemKey })
  }
  const confirmRemove = () => {
    setErropen(false)
    props.removeQty(removeProd)
  }
  const handleClose = () => {
    setErropen(false)
  }
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }
  const editQty = (productId, itemKey) => {
    ///alert(productId,'===',itemKey);
    const newValues = {
      ...disabled,
      [productId]: '',
    }
    setDisabled(newValues)
  }
  ///console.log('disabled',disabled);
  const saveQty = (index) => {}
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  const handleChange = (e) => {
    let name = e.target.name
    let checkDecimalLen = e.target.value.split('.')
    console.log('checkDecimalLen', checkDecimalLen[1])
    ///let value=(e.target.value - Math.floor(e.target.value));
    let value =
      checkDecimalLen[1] !== undefined && checkDecimalLen[1].length >= 3
        ? Number(e.target.value).toFixed(3)
        : e.target.value
    ///console.log('typeoftypeof',isNumber(value),'value',value);
    setChangeVal(true)
    if (value == '') {
      const newValues = {
        ...updatequentity,
        [name]: value,
      }
      setUpdatequentity(newValues)
    } else if (
      parseFloat(value) <= parseFloat(e.target.getAttribute('remainqty')) &&
      isNumber(value)
    ) {
      const newValues = {
        ...updatequentity,
        [name]: value,
      }
      setUpdatequentity(newValues)
    } else {
      const errorValue = {
        ...errquentity,
        [name]: 'Value should be less than remaining quantity',
      }
      setErrQuentity(errorValue)
    }
  }
  let selectedProd =
    props.items !== undefined
      ? props.items.map((item, index) => {
          item['selectedQty'] = item.ItemRemainingQuantity
          return item
        })
      : []
  ///console.log('updatequentity',selectedProd);

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);

  return (
    <>
      {selectedProd.map((item, index) => {
        if (
          props.productIds.indexOf(item.soLineNo) != -1 &&
          item.ItemRemainingQuantity > 0
        ) {
          return (
            <div className='shipment_product selected_quantity_section col-12'>
              <div className='row selectProductForPicupDelevery'>
                <div className='prod-img ShipmentDetailsImg'>
                  <IsImgChecked imageUrl={item.MaterialImage} />
                </div>
                <div className='prod-name'>
                  <div className='product'>
                    <h4 className='product-name' style={{fontSize: `${SmallFontChanger}px`}}>
                      
                    {
                      selectedLangCode === 'en' || selectedLangCode === null ?
                      item.MaterialName.split(':')[1] : item.MaterialName.split(':')[0] 
                    }
                     </h4>
                    <h5 className='pro_number' style={{fontSize: `${SmallFontChanger}px`}}>
                      {item.MaterialNumber.replace(/^0+/, '')}
                    </h5>
                  </div>
                </div>
                {
                  countryCode && countryCode === 'VN' ? '' :
                  <div className='prod-ponumber'>
                  <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
                   {t('PO No')}:{' '} {props.ponumber.replace(/^0+/, '')}
                  </span>
                   </div>
                }
                
                <div className='prod-ponumber'>
                  <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
                    {t('SO No')}:{' '} {props.salesOrderNumber.replace(/^0+/, '')}
                  </span>
                </div>
                <div className='prod-totalQty'>
                  <span className='tqty' style={{fontSize: `${SmallFontChanger}px`}}>
                    {t('Total Qty.')}:{' '} {Number(item.OrderQuantity).toFixed(3)} {' '}
                    {selectedLangCode === 'en' || selectedLangCode === null ?
                      item.UnitOfMeasure :
                    selectedLangCode === 'vt' ? 
                      item.UnitOfMeasure === "TON" ? "tấn"  :
                      item.UnitOfMeasure === "Each" ? "ชิ้น" :
                      item.UnitOfMeasure === "Set" ? "ชุด":
                      item.UnitOfMeasure:
                      item.UnitOfMeasure === "TON" ? "ตัน" :
                        item.UnitOfMeasure === "Each" ? "ชิ้น" :
                       item.UnitOfMeasure === "Set" ? "ชุด" :
                        item.UnitOfMeasure
                        }
                   
                  </span>
                </div>
                <div className='prod-RemainingQty'>
                  <span className='tqty' style={{fontSize: `${SmallFontChanger}px`}}>
                    {t('remaningqty.label')}:{' '}
                    {Number(item.ItemRemainingQuantity).toFixed(3)}{' '}
                    {selectedLangCode === 'en' || selectedLangCode === null ?
                      item.UnitOfMeasure :
                    selectedLangCode === 'vt' ? 
                      item.UnitOfMeasure === "TON" ? "tấn"  :
                      item.UnitOfMeasure === "Each" ? "ชิ้น" :
                      item.UnitOfMeasure === "Set" ? "ชุด":
                      item.UnitOfMeasure:
                      item.UnitOfMeasure === "TON" ? "ตัน" :
                        item.UnitOfMeasure === "Each" ? "ชิ้น" :
                       item.UnitOfMeasure === "Set" ? "ชุด" :
                        item.UnitOfMeasure
                        }
                    
                   
                  </span>
                </div>
                <div className='prod-InputQty'>
                  <span className='input_qty'>
                    <input
                      className='selectedQty'
                      totalQty={item.OrderQuantity}
                      type='text'
                      remainQty={item.ItemRemainingQuantity}
                      id={props.prod_id}
                      name={`selectedQuantity-${props.prod_id}-${index}`}
                      style={{fontSize: `${SmallFontChanger}px`}}
                      value={
                        changeval
                          ? updatequentity[
                              `selectedQuantity-${props.prod_id}-${index}`
                            ]
                          :Number(item.ItemRemainingQuantity).toFixed(3)
                      }
                      onChange={handleChange}
                      placeholder='0.00'
                    />{' '}
                   {selectedLangCode === 'en' || selectedLangCode === null ?
                      item.UnitOfMeasure :
                    selectedLangCode === 'vt' ? 
                      item.UnitOfMeasure === "TON" ? "tấn"  :
                      item.UnitOfMeasure === "Each" ? "ชิ้น" :
                      item.UnitOfMeasure === "Set" ? "ชุด":
                      item.UnitOfMeasure:
                      item.UnitOfMeasure === "TON" ? "ตัน" :
                        item.UnitOfMeasure === "Each" ? "ชิ้น" :
                       item.UnitOfMeasure === "Set" ? "ชุด" :
                        item.UnitOfMeasure
                        }
                  </span>
                </div>
                <div className='prodRbutton text-right pl-0'>
                  <div
                    style={{ position: 'relative' }}
                    className='button_section'
                  >
                    {/*<button onClick={()=>editQty(props.prod_id,index)}>Edit QTY.</button>
              <button onClick={saveQty}>Save</button>*/}
                    <button
                      style={{
                        position: 'absolute',
                        right: '16px',
                        width: '100%',
                        fontSize: `${SmallFontChanger}px`
                      }}
                      
                      onClick={() => confirmRemoveProd(props.prod_id, index)}
                    >
                      {t('Remove')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      })}
      <Dialog
        style={{ borderRadius: '15px' }}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={erropen}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Error
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove this product</Typography>
          <DialogActions>
            <div className='create_link d-flex'>
              <button className='create pl-5 pr-5' onClick={handleClose}>
                No
              </button>
              <button className='create pl-5 pr-5' onClick={confirmRemove}>
                Yes
              </button>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default withTranslation()(CreateShipment)
