import React, { useState, useEffect } from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CartItemProduct from './CartItemProduct'
// import ItemImag from '../../assets/img/insee.jfif'
import CartImg from '../../assets/img/cart-xs.png'
import InseeLogo from '../../assets/img/logo.png'
import './Stepper.scss'

function CartStepPlaceOrder(props) {
  const cartdata = useSelector((state) => state.cartdata)
  const { t } = useTranslation()
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  localStorage.setItem('Shipping-Done', 'NO')
  localStorage.setItem('QuantityEditFlag', 'NO')
  localStorage.setItem('QuantitySaveFlag', 'NO')

  // console.log(cartdata, 'cartdatabbdsbbdsb')

  const catData = () => {
    // debugger
    if (
      cartdata.cartdata !== undefined &&
      cartdata.cartdata.length !== 0 &&
      cartdata.cartdata != null
    ) {
      const plantId = cartdata.cartdata && cartdata.cartdata[0].plantId
      const subCat = cartdata.cartdata && cartdata.cartdata[0].subCategory
      var mainCat = []
      try {
        mainCat =
          cartdata.cartdata && cartdata.cartdata[0].matchedSalesAreaList[0]
            ? cartdata.cartdata[0].matchedSalesAreaList[0]
            : cartdata.cartdata && cartdata.cartdata[0].divison
      } catch {
        mainCat = []
      }

      const shipToCode = cartdata.cartdata && cartdata.cartdata[0].shipToCode

      const mainCatData =
        mainCat && mainCat.includes('CW')
          ? 'CONWOOD'
          : mainCat && mainCat.includes('MT')
          ? 'MORTAR'
          : mainCat && mainCat.includes('CM')
          ? 'CMT'
          : ''
      localStorage.setItem('PLANTCODE', plantId)
      localStorage.setItem('SUBCATEGORY', subCat)
      localStorage.setItem('CATEGORY', mainCatData)
      localStorage.setItem('SHIPTOCODE', shipToCode)
    }
  }

  useEffect(() => {
    catData()
    localStorage.removeItem('shipping-condition')
    localStorage.removeItem('shipping-type')
    localStorage.removeItem('special-shipping-condition')
  })

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  return (
    <>
      <div className='card step-cart'>
        <div className='row'>
          <div className='col-12'>
            <span className='circle-ellipse-cart'>
              <img className='Vector-cart' src={CartImg} alt="cart" />
            </span>
            <span className='step-texts' style={{fontSize: `${HeadingFontChange}px`}}>{t('cart.label')}</span>
          </div>
          <div className='col-12'>
            {cartdata.cartdata
              ? cartdata.cartdata.map((carditem, index) => {
                  return (
                    <CartItemProduct
                      index={index}
                      item={carditem}
                      image={InseeLogo}
                      productImage={carditem.productImage}
                      title={carditem.productName ? carditem.productName : 'NA'}
                      itemId={carditem.productId}
                      quantity={carditem.quantity}
                      inWeight={carditem.unitOfMeasure}
                    />
                  )
                })
              : null}
          </div>
        </div>
      </div>
    </>
  )
}
export default withTranslation()(CartStepPlaceOrder)