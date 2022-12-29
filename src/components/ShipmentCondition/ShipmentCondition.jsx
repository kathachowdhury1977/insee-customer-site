import React, { useEffect } from 'react';
import moment from 'moment';
///import 'moment-timezone';
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import FormSelectbox from '../FormSelectbox/FormSelectbox'
import FormInput from '../FormInput/FormInput'
// import LinearProgress from '@material-ui/core/LinearProgress';
import MultiRangeSlider from '../../components/MultiRangeSlider/MultiRangeSlider'

import './ShipmentCondition.scss'

function ShipmentCondition(props) {
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  function onSelectChange(event) {
    console.log(event)
  }

  function handleChange(event, name) {
    //setNewvalue(event, name)
    console.log(event, 'event target', name)
  }
  ////console.log('props.getShipmentStatus',props.getShipmentStatus);
  var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const statusDataCount = {}
  function formatDate(date) {
    var day = date.getDate() + ''
    var month = date.getMonth() + 1 + ''
    var year = date.getFullYear() + ''
    var hour = date.getHours() + ''
    var minutes = date.getMinutes() + ''
    var seconds = date.getSeconds() + ''
    return (
      (day <= 9 ? '0' + day : day) +
      '-' +
      (month <= 9 ? '0' + month : month) +
      '-' +
      year +
      ' ' +
      (hour <= 9 ? '0' + hour : hour) +
      ':' +
      (minutes <= 9 ? '0' + minutes : minutes)
    )
  }
  let indexFind =
    props.getShipmentStatus &&
    props.getShipmentStatus.findIndex(
      (x) => x.shipmentStatus === props.shipStatus
    )
    function convertUTCToTimezone(utcDt, utcDtFormat, timezone) {
      return moment.utc(utcDt, utcDtFormat).tz(timezone).format('DD-MM-YYYY HH:mm:ss');
    }

    useEffect(()=> {
        
    })
  console.log('indexFindindexFind',indexFind,'',props.shipStatus);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  return (
    <>
      <div className='shipment-condition'>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-12'>
            <ul class='timeline' id="timelineCom">
              {(props.getShipmentStatus &&
                props.getShipmentStatus !== undefined) ||
              null
                ? props.getShipmentStatus.map((data, index) => {
                    console.log('datadata',data);
                    if (props.ShippingConditions == 'pickup') {
                      if (data.key !== 'Delivered') {
                        return (
                          <li
                          //id={`rajeev${index}`}
                            class={
                              index <= indexFind && props.shipStatus != 'Cancel'
                                ? 'complete'
                                : 'progress-status'
                            }
                          >
                            <div class='timestamp'>
                              <span class='author' style={{fontSize: `${FontChange}px`}}>{t(data.key)}</span>
                            </div>
                            <div class='status'></div>
                            {props.shipStatus != 'Cancel' &&
                            index <= indexFind ? (
                              <div class='status-first'>
                                <span style={{fontSize: `${FontChange}px`}}>
                                  {/* {convertUTCToTimezone(data.shipmentLastUpdatedTime, null, 'Asia/Bangkok')} */}
                                  {moment(data.shipmentLastUpdatedTime).format('DD-MM-YYYY HH:mm:ss')}
                                  {
                                    /*data.shipmentLastUpdatedTime != ''
                                      ? formatDate(
                                          new Date(data.shipmentLastUpdatedTime)
                                        )
                                      : '' new Date(
                                              data.shipmentLastUpdatedTime
                                            ).toLocaleTimeString(
                                              'en-US',
                                              dateOptions
                                            )*/
                                  }
                                </span>
                              </div>
                            ) : (
                              ''
                            )}
                          </li>
                        )
                      }
                    } else {
                      return (
                        <li
                          class={
                            index <= indexFind && props.shipStatus != 'Cancel'
                              ? 'complete'
                              : 'progress-status'
                          }
                        >
                          <div class='timestamp'>
                            <span class='author' style={{fontSize: `${FontChange}px`}}>{t(data.key)}</span>
                          </div>
                          <div class='status'></div>
                          {props.shipStatus != 'Cancel' &&
                          index <= indexFind ? (
                            <div class='status-first'>
                              <span style={{fontSize: `${FontChange}px`}}>
                                {
                                  data.shipmentLastUpdatedTime != ''
                                    ? 
                                      //convertUTCToTimezone(data.shipmentLastUpdatedTime, null, 'Asia/Bangkok')
                                      moment(data.shipmentLastUpdatedTime).format('DD-MM-YYYY HH:mm:ss')
                                    : ''
                                     /*new Date(
                                            data.shipmentLastUpdatedTime
                                          ).toLocaleTimeString(
                                            'en-US',
                                            dateOptions
                                          )*/
                                }
                              </span>
                            </div>
                          ) : (
                            ''
                          )}
                        </li>
                      )
                    }
                  })
                : ''}
            </ul>
          </div>
        </div>
        <div className='card'>
          <div className='row'>
            <div className='col-12'>
              <h6 style={{ textTransform: 'uppercase', fontSize: `${SmallFontChanger}px` }}>
                {t('shipmanagement.donumber')} :
                {props.doNumber &&
                  props.doNumber.map((data) => {
                    if (data !== '' && data !== null) {
                      return <span className='doNumberDisplay' style={{fontSize: `${SmallFontChanger}px`}}>{data}</span>
                    }
                  })}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(ShipmentCondition)
