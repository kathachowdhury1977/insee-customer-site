import React, { useState, useEffect } from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import CartImg from '../../assets/img/placeorderstep.png'
import Item from '../../assets/img/insee.jfif'
import { useSelector } from 'react-redux'
import Loading from '../Loader/Loading'

// import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ProductImg from '../../../src/assets/img/inseeLogo.png'

const styles = (theme) => ({
  root: {
    width: '100%',
    //  marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    th: {
      fontSize: '13px',
    },
    td: {
      fontSize: '13px',
    },
  },
})

function PlaceOrderStep(props) {
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  const classes = styles()
  const orderCreditInfo = useSelector((state) => state.getOrderCreditInfo)
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const { t } = useTranslation()
  var messageNo = ''
  const categoryName = localStorage.getItem('CATEGORY')
  const selectedLangCode = localStorage.getItem('lancode');
  try {
    messageNo =
      orderCreditInfo.getOrderCreditInfo &&
      orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT
        ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.OUTPUT[0]
            .MessageNumber
        : ''
  } catch {
    //alert("Something went wrong. Please try again later.")
  }
  const handleImg = (e) => {
    e.target.src = ProductImg
  }

  const  decimalwithcoma = (num) => 
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  var isBorderCustomer;

  try {
   isBorderCustomer =  
  orderCreditInfo.getOrderCreditInfo !== undefined && orderCreditInfo.getOrderCreditInfo !== null && orderCreditInfo.getOrderCreditInfo !== {} ? 
  orderCreditInfo.getOrderCreditInfo !== {} && orderCreditInfo.getOrderCreditInfo &&
  orderCreditInfo.getOrderCreditInfo.salesOrderResponse
    .PricingItem != null && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem !== undefined  ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse
    .PricingItem[0].Currency : '' : ''
  } catch {
    //alert("Something went wrong. Please try again later.")
  }
 

    console.log(orderCreditInfo, 'isBorderCustomer')

 

  if (
    orderCreditInfo.getOrderCreditInfo !== undefined &&
    orderCreditInfo.getOrderCreditInfo !== {}
  ) {
    return (
      <>
        <div className='card place-order-step-box'>
          <div className='row'>
            <div className='col-12'>
              <span className='circle-ellipse-placeorder'>
                <img className='Vector-placeorder' src={CartImg} alt="placeorder" />
              </span>
              <span className='step-texts' style={{fontSize: `${HeadingFontChange}px`}}>{t('label.place_order')}</span>
            </div>
            <div className='col-12'>
              {orderCreditInfo.getOrderCreditInfo.creditInfoResponse !==
              undefined ? (
                <div className='row mt-3'>
                  <div className='col-6 mt-1'>
                    <span className='Available-Credit-THB-2047' style={{fontSize: `${FontChange}px`}}>
                      {t('Available Credit')}:{' '}
                      <span className='text-style-1'>
                      {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                        {
                          countryCode && countryCode === 'VN' ? 
                          <>
                          <span className='availableCredit'>                        
                          {orderCreditInfo.getOrderCreditInfo &&
                          orderCreditInfo.getOrderCreditInfo
                            .creditInfoResponse &&
                          orderCreditInfo.getOrderCreditInfo.creditInfoResponse
                            ? orderCreditInfo.getOrderCreditInfo.creditInfoResponse.RES_Records[0].CreditLimitUsedAmount.toString().includes(
                              '-'
                            )
                              ? decimalwithcoma(
                                  ('-'+orderCreditInfo.getOrderCreditInfo
                                    .creditInfoResponse.RES_Records[0]
                                    .CreditLimitUsedAmount.substring(0, orderCreditInfo.getOrderCreditInfo
                                      .creditInfoResponse.RES_Records[0]
                                      .CreditLimitUsedAmount.length - 1)) 
                                    - 
                                     (orderCreditInfo.getOrderCreditInfo
                                      .creditInfoResponse.RES_Records[0]
                                      .CreditLimit)
                                )
                              : decimalwithcoma(
                                (orderCreditInfo.getOrderCreditInfo
                                  .creditInfoResponse.RES_Records[0]
                                  .CreditLimitUsedAmount) -  (orderCreditInfo.getOrderCreditInfo
                                    .creditInfoResponse.RES_Records[0]
                                    .CreditLimit)
                              )
                            : 'NA'}
                        </span>{' '}
                        </>
                          :
                          <>
                          <span className='availableCredit'>                        
                          {orderCreditInfo.getOrderCreditInfo &&
                          orderCreditInfo.getOrderCreditInfo
                            .creditInfoResponse &&
                          orderCreditInfo.getOrderCreditInfo.creditInfoResponse
                            ? orderCreditInfo.getOrderCreditInfo.creditInfoResponse.RES_Records[0].CreditLimitAvailable.toString().includes(
                                '-'
                              )
                              ? decimalwithcoma(
                                '-' +orderCreditInfo.getOrderCreditInfo
                                    .creditInfoResponse.RES_Records[0]
                                    .CreditLimitAvailable.slice(0, -1)
                                ) 
                              : decimalwithcoma(
                                  orderCreditInfo.getOrderCreditInfo
                                    .creditInfoResponse.RES_Records[0]
                                    .CreditLimitAvailable
                                )
                            : 'NA'}
                        </span>{' '}
                        </>
                        }
                        
                      </span>{' '}
                    </span>
                  </div>
                  <div className='col-6 text-right mt-1'>
                    <span className='Available-Credit-THB-2047' style={{fontSize: `${FontChange}px`}}>
                      {t('outstanding.outsandingamount')}:{' '}
                      <span className='text-style-1'>
                      {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                        <span className='availableCredit'>
                        {orderCreditInfo.getOrderCreditInfo &&
                          orderCreditInfo.getOrderCreditInfo
                            .creditInfoResponse &&
                          orderCreditInfo.getOrderCreditInfo.creditInfoResponse !== undefined
                            ? orderCreditInfo.getOrderCreditInfo.creditInfoResponse.RES_Records[0].CreditLimitUsedAmount.toString().includes(
                                '-'
                              )
                              ? decimalwithcoma(
                                  orderCreditInfo.getOrderCreditInfo
                                    .creditInfoResponse.RES_Records[0]
                                    .CreditLimitUsedAmount
                                )
                              : decimalwithcoma(
                                  orderCreditInfo.getOrderCreditInfo
                                    .creditInfoResponse.RES_Records[0]
                                    .CreditLimitUsedAmount
                                )
                            : 'NA'}
                          
                        </span>
                      </span>{' '}
                    </span>
                  </div>

                  <Paper className='paperTable'>
                    <Table className='responsiveTable' classes={classes.table}>
                      <TableHead>
                        <TableRow className='tableHaed'>
                          <TableCell style={{fontSize: `${FontChange}px`}}>{t('label.product_name')}</TableCell>
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {t('Productcode')}
                          </TableCell>
                          {categoryName === 'CONWOOD' ? (
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>{t('quantity.label')}</TableCell>
                          ) : (
                            ''
                          )}
                          {categoryName === 'CONWOOD' ? (
                            <TableCell colSpan={2} align='right' style={{fontSize: `${FontChange}px`}}>
                              {t('UnitOfMeasure')}
                            </TableCell>
                          ) : (
                            ''
                          )}
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {t('Price/Unit')}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                           
                          </TableCell>
                          {
                            countryCode && countryCode === 'VN' ? <TableCell align='right'></TableCell> :
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {categoryName === 'CONWOOD'
                              ? t('DiscountUnit')
                              : t('Discount/Unit')} 
                              {/* {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             } */}
                          </TableCell>
                            
                          }
                           {
                           countryCode && countryCode === 'VN' ? <TableCell align='right'></TableCell> :
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {t('Freight/Unit')}
                             {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </TableCell>
                        }

                          {categoryName === 'CONWOOD' ? (
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>{t('WeightUnit')}</TableCell>
                          ) : (
                            ''
                          )}
                          {categoryName === 'CONWOOD' ? (
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                             {t('CashDiscount')}
                              {categoryName === 'CONWOOD' ? '(%)' : ''}
                            </TableCell>
                          ) : (
                            ''
                          )}
                          {categoryName === 'CONWOOD' ? (
                            ' '
                          ) :
                          countryCode && countryCode === 'VN' ? (
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                              {t('Quantity')}
                            </TableCell>
                          ) : 
                          (
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                              {t('Quantity (TON)')}
                            </TableCell>
                          ) }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderCreditInfo.getOrderCreditInfo &&
                        orderCreditInfo.getOrderCreditInfo.salesOrderResponse
                          .PricingItem
                          ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem.map(
                              (order) => {
                                return (
                                  <TableRow>
                                    <TableCell style={{fontSize: `${FontChange}px`}}>
                                      <img
                                        className='image-1'
                                        onError={handleImg}
                                        src={order.productImageUrl}
                                        alt="product"
                                      />{' '}
                                      {categoryName === 'CONWOOD' ? <br /> : ''}
                                      {order.ItemCategory.includes('ZFG') ? (
                                        <span style={{ color: 'red' }}>
                                          Free{' '}
                                        </span>
                                      ) : (
                                        ''
                                      )}

                                      {
                                        selectedLangCode === 'en' || selectedLangCode === null ?
                                        order.productName.split(':')[1] : order.productName.split(':')[0] 
                                      }
                                    
                                    </TableCell>
                                    <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                      {order.MaterialNumber.replace(/^0+/, '')}
                                    </TableCell>
                                    {categoryName === 'CONWOOD' ? (
                                      <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                        {decimalwithcoma(parseFloat(order.Quantity).toFixed(2)) }
                                      </TableCell>
                                    ) : (
                                      ''
                                    )}
                                    {categoryName === 'CONWOOD' ? (
                                      <TableCell align='right' colSpan={2} style={{fontSize: `${FontChange}px`}}>
                                        
                                        {selectedLangCode === 'en' || selectedLangCode === null ? 
                                         order.unitOfMeasure : 
                                          order.unitOfMeasure === "TON" ? "ตัน": 
                                          order.unitOfMeasure === "Each" ? "ชิ้น"  : 
                                          order.unitOfMeasure }
                                       
                                      </TableCell>
                                    ) : (
                                      ''
                                    )}
                                    <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                      {
                                        countryCode && countryCode === 'VN'  ? 
                                        order && order.ItemCategory.includes('ZFG') ? '0' :
                                        decimalwithcoma(parseFloat(order.NetAfterVatRate ? order.NetAfterVatRate : '0').toFixed(2)) 
                                         : decimalwithcoma(parseFloat(order.Amount).toFixed(2))
                                      }
                              
                                    </TableCell>
                                    {
                                      countryCode && countryCode === 'VN' ? <TableCell align='right'></TableCell> :
                                      <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                      {decimalwithcoma(parseFloat(order.DiscountAmount).toFixed(2))}
                                      {categoryName === 'CONWOOD' ? '%' : ''}
                                    </TableCell>
                                    }
                                    {
                                      countryCode && countryCode === 'VN' ? <TableCell align='right'></TableCell> :
                                    <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                      {decimalwithcoma(
                                        parseFloat(order.FreightChargeAmount).toFixed(2)
                                      )}
                                    </TableCell>
                                }

                                    {categoryName === 'CONWOOD' ? (
                                      <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                        {decimalwithcoma(parseFloat(order.QuantityInKg))}
                                      </TableCell>
                                    ) : (
                                      ''
                                    )}
                                    {categoryName === 'CONWOOD' ? (
                                      <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                        {decimalwithcoma(parseFloat(order.CashDiscountAmount).toFixed(2)) }%
                                      </TableCell>
                                    ) : (
                                      ''
                                    )}
                                    {categoryName === 'CONWOOD' ? (
                                      ''
                                    ) : (
                                      <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                                        {decimalwithcoma(parseFloat(order.Quantity).toFixed(3))} {' '}
                                        {
                                           countryCode && countryCode === 'VN' ? 
                                           order && order.ItemCategory.includes('ZFG') ?
                                           t("bag.radio") :
                                           selectedLangCode === 'en' || selectedLangCode === null ?
                                          order.unitOfMeasure :
                                          selectedLangCode === 'vt' ? 
                                          order.unitOfMeasure === "TON" ? "tấn"  :
                                          order.unitOfMeasure === "Each" ? "ชิ้น" :
                                          order.unitOfMeasure:
                                          order.unitOfMeasure === "TON" ? "ตัน" :
                                            order.unitOfMeasure === "Each" ? "ชิ้น" :
                                            order.unitOfMeasure
                                           :''
                                        }
                                        
                                      </TableCell>
                                    )}
                                  </TableRow>
                                )
                              }
                            )
                          : null}
                        {messageNo === '' ? (
                          ' '
                        ) : (
                          <TableRow className='redBackground'>
                            <TableCell
                              colSpan={categoryName === 'CONWOOD' ? 10 : 6}
                              style={{fontSize: `${FontChange}px`}}
                            >
                              {orderCreditInfo.getOrderCreditInfo &&
                              orderCreditInfo.getOrderCreditInfo
                                .salesOrderResponse.OUTPUT
                                ? orderCreditInfo.getOrderCreditInfo
                                    .salesOrderResponse.OUTPUT[0].MessageText
                                : 'Error message'}
                            </TableCell>
                          </TableRow>
                        )}
                        {
                          countryCode && countryCode === 'VN' ? '' :
                          <>
                          <TableRow className='tableRow'>
                          <TableCell
                            colSpan={categoryName === 'CONWOOD' ? 9 : 5}
                            style={{fontSize: `${FontChange}px`}}
                          >
                            {t('Total Price')}
                             {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </TableCell>
                          {
                             countryCode && countryCode === 'VN' ? 
                             <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                             {orderCreditInfo.getOrderCreditInfo &&
                             orderCreditInfo.getOrderCreditInfo
                               .salesOrderResponse.Pricing
                               ? decimalwithcoma(
                                   parseFloat(orderCreditInfo.getOrderCreditInfo
                                     .salesOrderResponse.Pricing
                                     .NetPrice).toFixed(2)
                                 )
                               : '0'}
                           </TableCell>
                             :
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {orderCreditInfo.getOrderCreditInfo &&
                            orderCreditInfo.getOrderCreditInfo
                              .salesOrderResponse.Pricing
                              ? decimalwithcoma(
                                  parseFloat(orderCreditInfo.getOrderCreditInfo
                                    .salesOrderResponse.Pricing
                                    .totalPriceWithoutTax).toFixed(2)
                                )
                              : '0'}
                          </TableCell>
                        }
                        </TableRow>
                          </>

                        }
                        

                        <TableRow className='tableRow'>
                          {
                             countryCode && countryCode === 'VN' ? '' :
                          <>
                          <TableCell
                            colSpan={categoryName === 'CONWOOD' ? 9 : 5}
                            style={{fontSize: `${FontChange}px`}}
                          >
                            {' '}
                            {t('Total Discount')}
                             {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </TableCell>
                          
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {orderCreditInfo.getOrderCreditInfo &&
                            orderCreditInfo.getOrderCreditInfo
                              .salesOrderResponse.Pricing
                              ? decimalwithcoma(
                                 parseFloat( orderCreditInfo.getOrderCreditInfo
                                    .salesOrderResponse.Pricing.totalDiscount).toFixed(2)
                                )
                              : '0'}
                          </TableCell>
                          </>
                          }
                        </TableRow>
                        {categoryName === 'CONWOOD' ? (
                          <TableRow className='tableRow'>
                            <TableCell
                              colSpan={categoryName === 'CONWOOD' ? 9 : 5}
                              style={{fontSize: `${FontChange}px`}}
                            >
                             {t('TotalCashDiscount')}  {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                            </TableCell>
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                              {orderCreditInfo.getOrderCreditInfo &&
                              orderCreditInfo.getOrderCreditInfo
                                .salesOrderResponse.Pricing
                                ? decimalwithcoma(
                                    parseFloat(orderCreditInfo.getOrderCreditInfo
                                      .salesOrderResponse.Pricing
                                      .totalCashDiscount).toFixed(2)
                                  )
                                : '0'}
                            </TableCell>
                          </TableRow>
                        ) : (
                          ''
                        )}
                        {categoryName === 'CONWOOD' ? (
                          <TableRow className='tableRow'>
                            <TableCell
                              colSpan={categoryName === 'CONWOOD' ? 9 : 5}
                              style={{fontSize: `${FontChange}px`}}
                            >
                              {t('TotalWeight')}{' '}
                              {categoryName === 'CONWOOD' ? t('KG') : '' }
                              {/* {orderCreditInfo.getOrderCreditInfo && orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem
                                ? orderCreditInfo.getOrderCreditInfo.salesOrderResponse.PricingItem.map((order, i) => {
                                    if(i < 1) {
                                        return (
                                            <span> ({order.unitOfMeasure})</span>
                                        )
                                    }
                                 
                                    
                                }) : ''
                            } */}
                            </TableCell>
                            <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                              {orderCreditInfo.getOrderCreditInfo &&
                              orderCreditInfo.getOrderCreditInfo
                                .salesOrderResponse.Pricing
                                ? decimalwithcoma(
                                    parseFloat(orderCreditInfo.getOrderCreditInfo
                                      .salesOrderResponse.Pricing
                                      .totalQuantityInKg).toFixed(2)
                                  )
                                : ''}
                            </TableCell>
                          </TableRow>
                        ) : (
                          ''
                        )}
                        <TableRow className='tableRow' style={{fontSize: `${FontChange}px`}}>
                        {
                             countryCode && countryCode === 'VN' ? '' :
                          <>
                          <TableCell
                            colSpan={categoryName === 'CONWOOD' ? 9 : 5}
                            style={{fontSize: `${FontChange}px`}}
                          >
                            {' '}
                            {t('Total Freight')}
                             {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </TableCell>
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {' '}
                            {orderCreditInfo.getOrderCreditInfo &&
                            orderCreditInfo.getOrderCreditInfo
                              .salesOrderResponse.Pricing
                              ? decimalwithcoma(
                                 parseFloat( orderCreditInfo.getOrderCreditInfo
                                    .salesOrderResponse.Pricing.totalFreight).toFixed(2)
                                )
                              : '0'}
                          </TableCell>
                          </>
                          }
                        </TableRow>

                        <TableRow className='tableRow'>
                          {
                             countryCode && countryCode === 'VN' ? '' :
                             <>
                                 <TableCell
                            colSpan={categoryName === 'CONWOOD' ? 9 : 5}
                            style={{fontSize: `${FontChange}px`}}
                          >
                            {t('Total Tax')}
                             {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </TableCell>
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {orderCreditInfo.getOrderCreditInfo &&
                            orderCreditInfo.getOrderCreditInfo
                              .salesOrderResponse.Pricing
                              ? decimalwithcoma(
                                 parseFloat( orderCreditInfo.getOrderCreditInfo
                                    .salesOrderResponse.Pricing.Tax).toFixed(2)
                                )
                              : '0'}
                          </TableCell>
                             </>
                          }
                         
                        </TableRow>
                        <TableRow className='tableRow lastTableRow'>
                          <TableCell
                            colSpan={categoryName === 'CONWOOD' ? 9 : 5}
                            style={{fontSize: `${FontChange}px`}}
                          >
                            {t('Total')}
                             {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${isBorderCustomer})`
                              : isBorderCustomer === 'THB' ? '(บาท)' :
                              isBorderCustomer === 'USD' ? '(ดอลล่าร์)' :  `(${isBorderCustomer})`
                                       
                             }
                          </TableCell>
                          <TableCell align='right' style={{fontSize: `${FontChange}px`}}>
                            {' '}
                            {orderCreditInfo.getOrderCreditInfo &&
                            orderCreditInfo.getOrderCreditInfo
                              .salesOrderResponse.Pricing
                              ? decimalwithcoma(
                                 parseFloat( orderCreditInfo.getOrderCreditInfo
                                    .salesOrderResponse.Pricing.Net_Price).toFixed(2)
                                )
                              : '0'}
                          </TableCell>
                        </TableRow>
                        {
                          countryCode && countryCode === 'VN' ? 
                          <TableRow className='redBackground'>
                          <TableCell
                            colSpan={10}
                            style={{fontSize: `${FontChange}px`}}
                          >
                           {t("The Unit Price is for reference only at SO creation time. Final price will be updated at Billing step.")}
                          </TableCell>
                        </TableRow>
                          : ''
                        }
                    
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              ) : (
                <span style={{ margin: 290,fontSize: `${FontChange}px` }}>
                  Something went wrong. Please try again later.
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }
}
export default withTranslation()(PlaceOrderStep)
