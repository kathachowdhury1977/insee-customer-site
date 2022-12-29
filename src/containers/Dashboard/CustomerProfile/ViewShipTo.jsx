import React, { useEffect, useState } from 'react'
import { eventActions, masterActions } from '../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../components/Header/Header'
import { withTranslation, useTranslation } from 'react-i18next'
import InputSearch from '../../../components/InputSearch/InputSearch'
import './CustomerProfile.scss'
import ShiptoRetailersPage from '.././../../components/ShiptoRetailersPage/ShiptoRetailersPage'
import DistrictDetail from '../../../components/DistrictDetail/DistrictDetail'
import FormSelectbox from '../../../components/FormSelectbox/FormSelectbox'
import { set } from 'lodash'

function ViewShipTo(props) {
  let userData = localStorage.getItem('userData')
  userData = JSON.parse(userData)
  const getshipToCustomer = useSelector((state) => state.getshipToCustomer)
  const getprovince = useSelector((state) => state.getprovince)
  const districtList = useSelector((state) => state.getdistrict)
  const customersByDistrict = useSelector((state) => state.shipToCustomerByDistrict)
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectedLangCode = localStorage.getItem('lancode');
  let provinceData = !!getprovince && getprovince.getprovince && getprovince.getprovince.map(value => {
    return {
      id: value.provinceCode,
      name: value.province
    }
  })

  let districtData = !!districtList && districtList.getdistrict && districtList.getdistrict.map(value => {
    return {
      id: value.disctrictCode,
      name: value.district
    }
  })

  useEffect(() => {
    !!province && dispatch(masterActions.getDistrict(userData.countryCode, province));
  }, [province])

  useEffect(() => {
    !!district && dispatch(masterActions.shipToCustomerByDistrict(localStorage.getItem('CustomerNumber'), district, province));
  }, [district])

  useEffect(() => {
    dispatch(masterActions.shipToCustomer(localStorage.getItem('CustomerNumber')));
  }, [])

  useEffect(() => {
    !!userData && userData.countryCode &&
      dispatch(masterActions.getProvince(userData.countryCode));
  }, [])

  const onChangeSearch = (searchValue) => {
    !!searchValue ? dispatch(masterActions.shipToCustomer(localStorage.getItem('CustomerNumber'), searchValue)) :
      dispatch(
        masterActions.shipToCustomer(localStorage.getItem('CustomerNumber'))
      )
  }

  const shipTODetails = !!district ? !!customersByDistrict && customersByDistrict.districts : getshipToCustomer &&
    getshipToCustomer.shipToCustomer !== undefined && getshipToCustomer.shipToCustomer
console.log(shipTODetails, 'shipTODetails')

const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  return (
    <>
      <div className='content-wrapper user_section'>
        <Header title = "View ShipTo" />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className='mainScroll'>
            <div class='customer_profile'>
              <div className='main-heading w-100'>
                <div className='row'>
                  <div className='col-xl-6 col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                    <h5>
                      {t('Total Ship To')} -{' '}
                      {parseInt(localStorage.getItem('CustomerNumber'))}
                    </h5>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 text-right' style={{ top: '30px' }}>
                    <InputSearch onChangeSearch={onChangeSearch} placeholder={t("Search")}/>
                  </div>
                  <div className='col-xl-2 col-lg-3 col-md-6 col-sm-12 col-xs-12' >
                    <div className='form_section p-0'>
                      <div className='inputBox'>
                        <FormSelectbox
                          name={'visitmode'}
                          class={'input'}
                          onSelectChange={(e) => setProvince(e)}
                          label={t('Province')}
                          data={provinceData || 'data'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-2 col-lg-3 col-md-6 col-sm-12 col-xs-12' >
                    <div className='form_section p-0'>
                      <div className='inputBox'>
                        <FormSelectbox
                          name={'visitmode'}
                          class={'input'}
                          onSelectChange={(e) => setDistrict(e)}
                          label={t('District')}
                          data={districtData || 'data'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2' style={{ top: '30px' }}>
                    <div className='vm_button_section' >
                      <input type="button" value={t('Reset')} onClick={() => {
                        onChangeSearch('')
                        setDistrict('')
                      }} className='save-btn' style={{
                        padding: '3px 25px', background: ' #FF0000',
                        color: '#fff'
                      }} />

                    </div>
                  </div>

                </div>
              </div>

              <div className='mt-3'>
                <ShiptoRetailersPage
                  title={t('totoalshipto.label')}
                  idnumber='123444555'
                />
              </div>

              <div className='mt-3'>
                {shipTODetails ? shipTODetails.map((dist, key) => (
                  <DistrictDetail
                    name={
                      selectedLangCode === 'en' || selectedLangCode === null ? dist.shipToName : dist.shipToNameInLocal
                      }
                    code={parseInt(dist.shipToCode)}
                    district={dist.address.districtId}
                    province={dist.address.provinceId}
                  />
                ))
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(ViewShipTo)
