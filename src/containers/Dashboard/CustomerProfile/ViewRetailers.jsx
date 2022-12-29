import React, { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { eventActions, masterActions } from '../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../components/Header/Header'
import { withTranslation, useTranslation } from 'react-i18next'
import InputSearch from '../../../components/InputSearch/InputSearch'
import './CustomerProfile.scss'
import Loading from '../../../components/Loader/Loading'
import ShiptoRetailersPage from '.././../../components/ShiptoRetailersPage/ShiptoRetailersPage'
import DistrictDetail from '../../../components/DistrictDetail/DistrictDetail'
import FormSelectbox from '../../../components/FormSelectbox/FormSelectbox'

function ViewRetailers(props) {
  const [page, setPage] = React.useState(1)
  const customerRetailer = useSelector(
    (state) => state.getRetailerBySoldToNumberUsingGET
  )

  const districtList = useSelector(state => state.getRetailerByDistrict)
  const allDistricts = !!districtList && districtList.districtList && districtList.districtList.list.map(eachList => {
    return { id: eachList.name, ...eachList }
  })
  ///const[district,setDistrict]=useState(district_args);
  ////const[shiptoretailers,setShiptoretailers]=useState(ShiptoRetailersArgs);
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)

  let startIndex = 1
  let endIndex = 11

  const onSelectChange = (district) => {
    !!district && dispatch(
      masterActions.getRetailerBySoldToNumberUsingGET(
        localStorage.getItem('CustomerNumber'),
        startIndex,
        endIndex,
        district
      )
    )
  }

  const onChangeSearch = (searchValue) => {
    !!searchValue ? dispatch(
      masterActions.getRetailerBySoldToNumberUsingGET(
        localStorage.getItem('CustomerNumber'),
        startIndex,
        endIndex,
        '',
        searchValue
      )
    ) : dispatch(
      masterActions.getRetailerBySoldToNumberUsingGET(
        localStorage.getItem('CustomerNumber'),
        startIndex,
        endIndex,
      )
    )
  }


  const handleChangePage = (event, value) => {
    if (value === 1) {
      startIndex = 1
      endIndex = 10
    } else {
      startIndex = (value - 1) * 10 + 1
      endIndex = value * 10
    }
    ////console.log(startIndex+'==='+endIndex);
    setPage(value)
    dispatch(
      masterActions.getRetailerBySoldToNumberUsingGET(
        localStorage.getItem('CustomerNumber'),
        startIndex,
        endIndex
      )
    )
  }

  useEffect(() => {
    dispatch(
      masterActions.getRetailerBySoldToNumberUsingGET(
        localStorage.getItem('CustomerNumber'),
        1,
        11
      )
    )
    dispatch(masterActions.getRetailerByDistrict(localStorage.getItem('CustomerNumber')))
  }, [])

  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

  return (
    <>
      <div className='content-wrapper user_section'>
        <Header title ="View Retailers" />
        <div className={"row ipad_css "  + MyNewClass}>
          <div className='mainScroll'>
            <div class='customer_profile'>
              <div className='main-heading w-100'>
                <div className='row'>
                  <div className='col-xl-6 col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                    <h5>
                      {t('Retailer')} - {localStorage.getItem('CustomerNumber')}
                    </h5>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 text-right'>
                    <InputSearch onChangeSearch={onChangeSearch} placeholder={t("Search")}/>
                  </div>
                  <div className='col-xl-2 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                    <div className='form_section p-0'>
                      <div className='inputBox' style={{ top: '-30px' }}>
                        <FormSelectbox
                          name={'visitmode'}
                          class={'input'}
                          onSelectChange={onSelectChange}
                          label={t('District')}
                          data={allDistricts || 'data'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='mt-3'>
                {customerRetailer && customerRetailer.loading ? (
                  <Loading />
                ) : (
                  ''
                )}
                <div className='ship_retailer_page'>
                  {customerRetailer && customerRetailer.customerRetailer
                    ? customerRetailer.customerRetailer.results.map(
                      (data, key) => (
                        <ShiptoRetailersPage
                          detailsOf='district'
                          title={data.district}
                          idnumber={data.retailerCode}
                        />
                      )
                    )
                    : ''}
                </div>
              </div> */}

              <div className='mt-3' style={{ paddingBottom: '35px' }}>
                {customerRetailer && customerRetailer.loading ? (
                  
                  <div className="loading"> <Loading /></div>               
                 
                  
                ) : (
                  ''
                )}
                {customerRetailer &&
                  customerRetailer.customerRetailer !== undefined
                  ? customerRetailer.customerRetailer.results.map(
                    (dist, key) => (
                      <DistrictDetail
                        name={dist.retailerName}
                        code={dist.retailerCode}
                        district={dist.district}
                        province={dist.province}
                      />
                    )
                  )
                  : ''}
              </div>
              <Pagination
                count={Math.ceil(
                  customerRetailer &&
                    customerRetailer.customerRetailer !== undefined
                    ? customerRetailer.customerRetailer.totalCount / 10
                    : 1 / 10
                )}
                page={page}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(ViewRetailers)
