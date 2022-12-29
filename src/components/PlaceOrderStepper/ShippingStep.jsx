import React, { useState, useEffect } from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import CartImg from '../../assets/img/shippingstep.png'
import ShippingDetailsForm from './ShippingDetailsForm'
import { orderActions } from '../../_actions'
import { useDispatch,useSelector } from 'react-redux';

function ShippingStep(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  return (
    <>
      <div className='card'>
        <div className='row'>
          <div className='col-12'>
            <span className='circle-ellipse-shipping'>
              <img className='Vector-shipping' src={CartImg} />
            </span>
            <span className='step-texts' style={{fontSize: `${HeadingFontChange}px`}}>{t('Shipping Details')}</span>
          </div>
          <div className='col-12'>
            <ShippingDetailsForm />
          </div>
        </div>
      </div>
    </>
  )
}
export default withTranslation()(ShippingStep)
