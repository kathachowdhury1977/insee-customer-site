import React, { useEffect } from 'react'
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import '../AccountInformation/AccountInformation.scss'
import { Link } from 'react-router-dom'

function PdpaAgreement(props) {
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
     const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
     const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  return (
    <>
      <div className='user_information'>
        <div className='head'>
          <h5 style={{fontSize: `${HeadingFontChange}px`}}>{props.mainHeading}</h5>
        </div>

        <div className='co-12 mt-3'>
          <div className='row account_title'>
            <div className='col-4'>
              <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t('pdpastatus.label')} </h6>
            </div>

            <div className='col-4'>
              <h6 style={{fontSize: `${SmallFontChanger}px`}}>{t('pdpadate.label')} </h6>
            </div>
          </div>
          <div className='row account_value'>
            <div className='col-4'>
              <h6 style={{fontSize: `${SmallFontChanger}px`}}>{props.pdpConfirmedCustomer && props.pdpConfirmedCustomer.pdpConfirmed}</h6>
            </div>
            <div className='col-4'>
              <h6 style={{fontSize: `${SmallFontChanger}px`}}>22/12/2020</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(PdpaAgreement)
