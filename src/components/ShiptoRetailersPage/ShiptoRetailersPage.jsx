import React, { useEffect } from 'react'
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import './ShiptoRetailersPage.scss'
import { propTypes } from 'react-bootstrap/esm/Image'

function ShiptoRetailersPage(props) {
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  function handleChange(event, name) {
    //setNewvalue(event, name)
    console.log(event, 'event target', name)
  }

  console.log(event, '??????????')
  return (
    <>
      {props.detailsOf === 'district' ? (
        <div className='ship_retailer_detail'>
          <div className='dist_title_sec'>
            <p className='dist_title'>{t('District')}</p>
            <p className='dist_name'>{props.title}</p>
          </div>
          <div className='dist_value_sec'>
            <p className='dist_value_title'>{t('retailers.label')}</p>
            <p className='dist_value'>{props.idnumber}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default withTranslation()(ShiptoRetailersPage)
