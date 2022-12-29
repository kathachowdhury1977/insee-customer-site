import React, { useEffect, useState } from 'react'
import { orderActions } from '../../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../../components/Header/Header'
import { withTranslation, useTranslation } from 'react-i18next'
import OrderItem from '../../../../components/OrderItem/OrderItem'
import ItemImag from '../../../../assets/img/insee.jfif'
import OrderHeadingSection from '../../../../components/OrderHeadingSection/OrderHeadingSection'
import './PlaceOrder.scss'
import GoToCart from '../../../../components/GoToCart/GoToCart'
import RadioButtonType from '../../../../components/RadioButtonGroup/RadioButtonType'
import RadioButtonCategory from '../../../../components/RadioButtonGroup/RadioButtonCategory'
import FilterDropdown from '../../../../components/OrderHeadingSection/FilterDropdown'
import RadioButtonItem from '../../../../components/RadioButtonGroup/RadioButtonItem'
import Loading from '../../../../components/Loader/Loading'

function PlaceOrder(props) {
  const allProduct = useSelector((state) => state.getallproduct)
  const categoryName = useSelector(
    (state) => state.getConwoodCategory.getConwoodCategory
  )
  const isShipToSelected = useSelector(
    (state) => state.isShipToSelected.isShipToSelected
  )
  const isPlantsSelected = useSelector(
    (state) => state.isPlantsSelected.isPlantsSelected
  )
  const placeOrderFilterSearchClicked = useSelector(
    (state) => state.placeOrderFilterSearchClicked.placeOrderFilterSearchClicked
  )
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName.countryCode
  const [searchcount, setSearchcount] = useState(0)
  const [yesAddToCart, setYesAddToCart] = useState(true)
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

  let category = localStorage.getItem('CATEGORY')
  let subcategory = localStorage.getItem('SUBCATEGORY')
  // console.log('CATEGORY HEREEEEEE=>>>>>> ', category)
  if (category === null) {
    localStorage.setItem('CATEGORY', 'CMT')
  }
  if (subcategory === null) {
    localStorage.setItem('SUBCATEGORY', 'BAG')
  }
  category = localStorage.getItem('CATEGORY')
  subcategory = localStorage.getItem('SUBCATEGORY')

  useEffect(() => {
    localStorage.removeItem('shipping-condition')
    localStorage.removeItem('order-type')
  }, [])
  
  return (
    <>
      <div className='content-wrapper'>
        <Header title={t('Place Order')} />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className='mainScroll'>
            {/* <OrderHeadingSection
              title={t('inseeproduct.label')}
              field='form'
              showcartbutton={true}
            /> */}

            <div class='place_order'>
              <div className='col-12 shadowbox'>
                <div className='row'>
                  <FilterDropdown
                    setYesAddToCart={setYesAddToCart}
                    field='form'
                    searchcount={searchcount}
                    setSearchcount={setSearchcount}
                  />
                </div>
              </div>

              {
              placeOrderFilterSearchClicked === true &&
              isShipToSelected === true &&
              isPlantsSelected === true ? (
                <div className='col-12 bg-white pt-3 pb-3 pl-0 pr-0'>
                  <div className='row'>
                    {allProduct.getallproduct ? (
                      allProduct.getallproduct &&
                      allProduct.getallproduct != null ? (
                        allProduct.getallproduct.map((product) => {
                          return (
                            <OrderItem
                              yesAddToCart={yesAddToCart}
                              setYesAddToCart={setYesAddToCart}
                              searchcount={searchcount}
                              setSearchcount={setSearchcount}
                              class={
                                'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12'
                              }
                              index={product.index}
                              item={product}
                              cartFlag={product.cartFlag}
                              image={product.imageUrl}
                              id={product.productId}
                              title={product.productName}
                              productCode={product.productCode}
                              description={product.productDescription}
                              name={product.name}
                              matchedSalesAreaList={
                                product.matchedSalesAreaList
                              }
                              count={product.selectedQuantity}
                              inweight={t('ton.weighttype')}
                              unitOfMeasure={product.unitOfMeasure}
                              //productCode={product.productCode}
                            />
                          )
                        })
                      ) : ( 
                        <div className='col-md-12 text-center p-5' style={{fontSize: `${FontChange}px`}}>
                         {t('lable.norecordfound')}
                        </div>
                      )
                    ) : (
                      <div className='loading'>
                        {allProduct !== undefined &&
                        allProduct.getallproduct !== undefined ? (
                          <p  style={{fontSize: `${FontChange}px`}}>{t('lable.norecordfound')}</p>
                        ) : (
                          <Loading />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div clasName='col-12'>
                  <p className='pt-2 text-center'  style={{fontSize: `${FontChange}px`}}>
                    {/* Please select Ship-To, Plant and Contract (If applicable) to
                    search for products. */}
                    
                    {
                    countryCode == 'VN' ? 
                    t(
                      'PleaseSelectShipToPlantVN'
                    )
                    :
                    t(
                      'PleaseSelectShipToPlant'
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(PlaceOrder)
