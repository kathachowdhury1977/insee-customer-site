import React, { useEffect, useState } from 'react'
import { useLocation, Redirect, useHistory } from 'react-router-dom'
import { eventActions } from '../../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../../components/Header/Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loading from '../../../../components/Loader/Loading'
///import Loader from 'react-loader-spinner'
import { withTranslation, useTranslation } from 'react-i18next'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import '../ShipmentManagement/ShipMent.scss'
import MyShipmentItem from './MyShipmentItem'
import RadioButtonMoreGroup from '../../../../components/RadioButtonGroup/RadioButtonMoreGroup'
import ShipMentHeadingSection from '../../../../components/ShipMentHeadingSection/ShipMentHeadingSection'
import InputSearch from '../../../../components/InputSearch/InputSearch'
import DateRangePicker from '../../../../components/DateRange/DateRangePicker'
import FormSelectbox from '../../../../components/FormSelectbox/FormSelectbox'
import Pagination from '@material-ui/lab/Pagination'
function MyShipments(props) {
  let history = useHistory()
  const location = useLocation()
  const { createpickup, shipConditionValue } = location.state
    ? location.state
    : ''
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const customerId = localStorage.getItem('CustomerNumber')
    ? localStorage.getItem('CustomerNumber')
    : 0
  const countryCode = userName ? userName.countryCode : ''
  const [shipingCondition, setShipingCondition] = useState(0)
  const [selectShipMentStatus, SetSelectShipMentStatus] = useState('all')
  const [page, setPage] = React.useState(1)
  const [status, setstatus] = React.useState('')
  const [shipmentId, setShipmentId] = React.useState('')
  const MyShipmentsState = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState()
  function onSelectChange(event) {}
  ///console.log('shipConditionValue',createpickup);
  const shipingConditionValue = shipingCondition === 0 ? 'PickUp' : 'Delivery'
  useEffect(() => {
    dispatch(
      eventActions.shipmentByFilter(
        shipmentId,
        countryCode,
        customerId,
        shipingConditionValue,
        1,
        status,
        15
      )
    )
  }, [])
  const handleshipingCondition = (k) => {
    ////alert(k);
    setShipingCondition(k)
    const shipingConditionValue = k === 0 ? 'PickUp' : 'Delivery'
    dispatch(
      eventActions.shipmentByFilter(
        shipmentId,
        countryCode,
        customerId,
        shipingConditionValue,
        1,
        status,
        15
      )
    )
    ///dispatch(eventActions.filterMyShipments(countryCode,customerId,shipingConditionValue,1,10000000));
  }
  let startIndex =
    MyShipmentsState.productShipList &&
    MyShipmentsState.productShipList.data.startIndex
  let endIndex =
    MyShipmentsState.productShipList &&
    MyShipmentsState.productShipList.data.endIndex
  const handleChangePage = (event, value) => {
    if (value === 1) {
      startIndex = 1
      endIndex = 15
    } else {
      startIndex = (value - 1) * 15 + 1
      endIndex = value * 15
    }
    ////console.log(startIndex+'==='+endIndex);
    setPage(value)
    const shipingConditionValue = shipingCondition === 0 ? 'PickUp' : 'Delivery'
    dispatch(
      eventActions.shipmentByFilter(
        shipmentId,
        countryCode,
        customerId,
        shipingConditionValue,
        startIndex,
        status,
        endIndex
      )
    )
  }
  const selectShipMentStatusEvent = (val) => {
    if (val != 'all') {
      setstatus(val)
    } else {
      setstatus('')
    }
    dispatch(
      eventActions.shipmentByFilter(
        shipmentId,
        countryCode,
        customerId,
        shipingConditionValue,
        1,
        val,
        15
      )
    )
  }
  const onChangeSearch =  (e) => {debugger
    setShipmentId(e)
    var searchValue = e
     dispatch(
      eventActions.shipmentByFilter(
        searchValue,
        countryCode,
        customerId,
        shipingConditionValue,
        1,
        status,
        15
      )
    )
  }
  useEffect(() => {
    ///dispatch(eventActions.filterMyShipments(countryCode,customerId,shipingConditionValue,1,10000000));
  }, [])
  ////console.log('filterMyShipments',MyShipmentsState.filterMyShipments);

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  return (
    <>
      <div className='content-wrapper'>
        <Header title={t('nav.myshipments')} />
        <div className={"row ipad_css "  + MyNewClass}>
          <div className='mainScroll'>
            <div className='Shipment_managment'>
              <ShipMentHeadingSection title={t('myshipment.heading')} />
              
              <div className='col-12'>
                <div className='col-12 box_sec'>
                  <div className='row'>
                    <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12'>
                      <div className='row'>
                         <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                          <InputSearch
                            placeholder={t('searchbyshipno_po_so_do.label')}
                            onChangeSearch={onChangeSearch}
                          />
                        </div>
                       
                        <div className='col-12'>
                          <RadioButtonMoreGroup
                            selectShipMentStatusEvent={
                              selectShipMentStatusEvent
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12 text-right'>
                      <button
                        style={{fontSize: `${FontChange}px`}}
                        onClick={() => window.location.reload()}
                        className='clear_all'
                      >
                        {t('selectshipment.clearall')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <Tabs
                  activeKey={shipingCondition}
                  onSelect={(k) => handleshipingCondition(k)}
                >
                  <TabList>
                    <Tab style={{fontSize: `${HeadingFontChange}px`}}>{t('myshipment.pickuptab')}</Tab>
                    <Tab style={{fontSize: `${HeadingFontChange}px`}}>{t('myshipment.deliverytab')}</Tab>
                  </TabList>
                  <TabPanel>
                    {MyShipmentsState.shipmentByFilter &&
                    MyShipmentsState.shipmentByFilter.loading ? (
                      <div style={{ textAlign: 'center', paddingTop: '180px' }}>
                        <Loading />
                      </div>
                    ) : (
                      <MyShipmentItem
                        shipingCondition={shipingCondition}
                        status={selectShipMentStatus}
                        filterdata={MyShipmentsState.shipmentByFilter}
                      />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {MyShipmentsState.shipmentByFilter &&
                    MyShipmentsState.shipmentByFilter.loading ? (
                      <div style={{ textAlign: 'center', paddingTop: '180px' }}>
                        <Loading />
                      </div>
                    ) : (
                      <MyShipmentItem
                        shipingCondition={shipingCondition}
                        status={selectShipMentStatus}
                        filterdata={MyShipmentsState.shipmentByFilter}
                      />
                    )}
                  </TabPanel>
                </Tabs>
              </div>
              <div className='row'>
                <div className='col-12 mb-4'>
                  <Pagination
                    count={Math.ceil(
                      MyShipmentsState.shipmentByFilter.data &&
                        MyShipmentsState.shipmentByFilter.data.totalCount / 15
                    )}
                    page={page}
                    onChange={handleChangePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withTranslation()(MyShipments)
