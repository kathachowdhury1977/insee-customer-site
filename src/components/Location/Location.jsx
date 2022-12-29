import React, { useEffect } from 'react'
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import './Location.scss'
import { Link } from 'react-router-dom'

function Location(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const locationInfo = props.locationInfo
  console.log('locationInfo', locationInfo)
  return (
    <>
      <div className='location_information'>
        <h5>{t('Location')}</h5>
        <div className='head'>
          <span>{t('Account Address')}</span>
          <br />
          {locationInfo.addressNumber}
        </div>
        <div className='row mb-3'>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 p-3'>
            <div className='head'>
              <span>{t('Region')}</span>
              <br />
              {locationInfo.accountNameLocal}
            </div>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 p-2'>
            <div className='head'>
              <span>{t('Province')}</span>
              <br />
              {locationInfo.provinceValue}
            </div>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 p-2'>
            <div className='head'>
              <span>{t('District')}</span>
              <br />
              {locationInfo.salesDistrictValue}
            </div>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 p-3'>
            <div className='head'>
              <span>{t('Postal Code')}</span>
              <br />+{locationInfo.postalCodeValue}
            </div>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 p-2'>
            <div className='head'>
              <span>{t('googlemapcordinates.label')}</span>
              <br />
              2315, 5678
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(Location)
