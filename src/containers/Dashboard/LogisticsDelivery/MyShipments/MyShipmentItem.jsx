import React, { useEffect, useState } from 'react'
import { eventActions } from '../../../../_actions'
import MyShipmentList from '../../../../components/ShipmentManagment/MyShipmentList'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import '../ShipmentManagement/ShipMent.scss'
function MyShipmentItem(props) {
  const { t } = useTranslation()
  // console.log('===== status ====' + props.status)
  let shipmentList = props.filterdata.data && props.filterdata.data.results
  // console.log('shipmentList', shipmentList)
  return (
    <>
      <div className='container-fluid p-0'>
        <div className='row'>
          <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0'>
            {shipmentList && typeof shipmentList !== 'undefined' && shipmentList.length>0 ? (
              shipmentList.map((prod, index) => (
                <MyShipmentList
                  shippingStatus={props.status}
                  shipingCondition={props.shipingCondition}
                  productShipList={prod}
                />
              ))
            ) : (
              <h4 style={{ textAlign: 'center' }}>{t('lable.norecordfound')}</h4>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default withTranslation()(MyShipmentItem)
