import React, { useEffect, useState } from 'react'
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import ProductImag from '../../assets/img/insee.jfif'
import '../ShipmentManagment/ShipmentList.scss'
import './CreateShipment.scss'
import IsImgChecked from '../../components/IsImgChecked/IsImgChecked'
import moment from 'moment'
import 'moment-timezone'
function UpdateShipment(props) {
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedLangCode = localStorage.getItem('lancode');
  const [count, setCount] = useState(20)
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName.countryCode
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  function convertUTCToTimezone(utcDt, utcDtFormat, timezone) {debugger
    return moment.utc(utcDt, utcDtFormat).tz(timezone).format('DD-MM-YYYY hh:mm:ss');
  }





  const modifyTimeDate = (curDate) => {debugger
    var weightInTime = convertUTCToTimezone(curDate, null, 'Asia/Bangkok')
    return weightInTime;
}


  console.log('props.item', props.item)
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  return (
    <>
      {props.item && (
        <div className='shipment_product col-12'>
          <div className='row'>
            <div className='ShipmentDetailsImg'>
              <IsImgChecked imageUrl={props.item.productImage} />
            </div>
            <div className="createShipProductName">
              <div className='product'>
                <span className='tqty' style={{fontSize: `${SmallFontChanger}px`}}>{
                
                  selectedLangCode === 'en' || selectedLangCode === null ?
                  props.item.productName.split(':')[1] : props.item.productName.split(':')[0] 
                
                }</span>
                <span className='snumber' style={{fontSize: `${SmallFontChanger}px`}}>
                  {props.item.productId.replace(/^0+/, '')}
                </span>
                
              </div>
            </div>
            {
              countryCode && countryCode === 'VN' ? 
              <div className="createShipPoNo">
              <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
                {t('Shipment Status')}:  
                 {' '+props.item.shipmentStatus}
              </span>
            </div>
              :
              <div className="createShipPoNo">
              <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
                {t('PO No')}:                
                 {props.item.poNumber}
              </span>
              {/* <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
                {
                  props.item.weight_in_Dt ? t("weight_in")+':' : ''
                }
              {' '}
                {props.item.weight_in_Dt &&  props.item.weight_in_Tm ? modifyTimeDate(moment(props.item.weight_in_Dt).format('YYYY-MM-DD')+' ' + [props.item.weight_in_Tm.slice(0, 2), ":", props.item.weight_in_Tm.slice(2, 4), ":", props.item.weight_in_Tm.slice(4, 6)].join('')): ''}  {' '}              
                {}

              </span> */}
            </div>

            }
           
            <div className="createShipSoNo">
              <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
                {t('SO No')}: {props.item.soNo}
              </span>
              {/* <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
              {
                props.item.weight_out_Dt ? t("weight_out")+':' : ''
              }
              {' '}
              {props.item.weight_out_Dt &&  props.item.weight_in_Tm ? modifyTimeDate(moment(props.item.weight_out_Dt).format('YYYY-MM-DD')+' ' + [props.item.weight_out_Tm.slice(0, 2), ":", props.item.weight_out_Tm.slice(2, 4), ":", props.item.weight_out_Tm.slice(4, 6)].join('')): ''}  {' '} 
              
              
              </span> */}
            </div>
            <div className="createShipDoNo">
              <span className='ponumber' style={{fontSize: `${SmallFontChanger}px`}}>
                {t('shipmanagement.donumber')}:{' '}
                {props.item.deliveryNumberSap !== null
                  ? props.item.deliveryNumberSap
                  : ''}
              </span>
            </div>
            <div className="createShipTotalQty">
              <span className='tqty' style={{fontSize: `${SmallFontChanger}px`}}>
                {t('totoalqty.label')}: {parseFloat(props.item.totalQuantity).toFixed(3)}{' '}
                {selectedLangCode === 'en' || selectedLangCode === null ?
                    props.item.unitOfMeasure :
                  selectedLangCode === 'vt' ? 
                    props.item.unitOfMeasure === "TON" ? "tấn"  :
                    props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                    props.item.unitOfMeasure:
                    props.item.unitOfMeasure === "TON" ? "ตัน" :
                      props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                      props.item.unitOfMeasure
                      }
              
              </span>
            </div>
            {/* <div className="createShipRemQty">
              <span className='tqty' style={{fontSize: `${SmallFontChanger}px`}}>
                {t('label.remaining_qty')}: {parseFloat(props.item.remainingQuantity).toFixed(3)}{' '}
                {selectedLangCode === 'en' || selectedLangCode === null ?
                    props.item.unitOfMeasure :
                  selectedLangCode === 'vt' ? 
                    props.item.unitOfMeasure === "TON" ? "tấn"  :
                    props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                    props.item.unitOfMeasure:
                    props.item.unitOfMeasure === "TON" ? "ตัน" :
                      props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                      props.item.unitOfMeasure
                      }
               
              </span>
            </div> */}
            <div className="createShipQty"
              
            >
              <span className='QTY-40' style={{fontSize: `${SmallFontChanger}px`}}>
              {
              props.item.shipmentStatus != 'Check In' && props.item.shipmentStatus != 'Dispatched' && props.item.shipmentStatus != 'In Plant' ?
              props.updateship && userName.countryCode === 'VN' ? (
                <>
                  <div>
                  <input
                  style={{width: 50}}
                  width={'10px'}
                  disabled={props.disabled}
                  type='text'
                  name='selectQty'
                 
                  onChange={(e) => props.handleChange(e, props.item.inseePlusUID)}
                  className='input'
                  defaultValue={props.item.selectedQuantity}
                  
                />
                <span className='float-right'>
                    <i class='fa fa-pencil' aria-hidden='true'></i>
                  </span>
                  </div>
                                 
                </>
                
                ) : 

                <>
                {parseFloat(props.item.selectedQuantity).toFixed(3)}{' '}
                {selectedLangCode === 'en' || selectedLangCode === null ?
                    props.item.unitOfMeasure :
                  selectedLangCode === 'vt' ? 
                    props.item.unitOfMeasure === "TON" ? "tấn"  :
                    props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                    props.item.unitOfMeasure:
                    props.item.unitOfMeasure === "TON" ? "ตัน" :
                      props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                      props.item.unitOfMeasure
                      }
                </> : 

                <>
                {parseFloat(props.item.selectedQuantity).toFixed(3)}{' '}
                {selectedLangCode === 'en' || selectedLangCode === null ?
                    props.item.unitOfMeasure :
                  selectedLangCode === 'vt' ? 
                    props.item.unitOfMeasure === "TON" ? "tấn"  :
                    props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                    props.item.unitOfMeasure:
                    props.item.unitOfMeasure === "TON" ? "ตัน" :
                      props.item.unitOfMeasure === "Each" ? "ชิ้น" :
                      props.item.unitOfMeasure
                      }
                </>

                }
                
                
              
              </span>
              <div style={{color: "red", fontSize: '12px'}}>{props.selectedQtyError}</div>  
            </div>
            
          </div>
        </div>
      )}
    </>
  )
}

export default withTranslation()(UpdateShipment)