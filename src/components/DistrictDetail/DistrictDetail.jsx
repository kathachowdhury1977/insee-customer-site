import React, { useEffect } from 'react'
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import '../ShiptoRetailersPage/ShiptoRetailersPage.scss'

function DistrictDetail(props) {
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  function handleChange(event, name) {
    //setNewvalue(event, name)
    console.log(event, 'event target', name)
  }

  return (
    <>
      <div className='district_page'>
        <div class='container'>
          <div className='row'>
            <div className='col-md-3 district_tile'>
              <p className='dist_head_tit'>{t('Name')}</p>
              <p className='dist_head_val'>{props.name}</p>
            </div>
            <div className='col-md-3 district_tile'>
              <p className='dist_head_tit'>{t('Code')}</p>
              <p className='dist_head_val'>{props.code}</p>
            </div>
            <div className='col-md-3 district_tile'>
              <p className='dist_head_tit'>{t('District')}</p>
              <p className='dist_head_val'>{props.district}</p>
            </div>
            <div className='col-md-3 district_tile'>
              <p className='dist_head_tit'>{t('Province')}</p>
              <p className='dist_head_val'>{props.province}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(DistrictDetail)
