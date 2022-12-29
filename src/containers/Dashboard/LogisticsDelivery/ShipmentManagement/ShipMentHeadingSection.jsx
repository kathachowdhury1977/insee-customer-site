import React, { useEffect } from 'react'
import { eventActions } from '../../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import 'react-tabs/style/react-tabs.css'
import './ShipMent.scss'
import InputSearch from '../../../../components/InputSearch/InputSearch'
import BarIcon from '../../../../assets/img/bar.svg'

function ShipMentHeadingSection(props) {
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  console.log(event, '??????????')
  return (
    <>
      <div className='title_head'>
        <div className='row'>
          <div className='col-5'>
            <h4>{props.title}</h4>
          </div>
          <div className='col-7 text-right'>
            <div className='input-right'>
              <InputSearch />
              <img src={BarIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(ShipMentHeadingSection)
