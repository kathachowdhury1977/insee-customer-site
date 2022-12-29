import React, { useEffect,useState } from 'react'
import { orderActions, masterActions } from '../../../../_actions'
import { useDispatch } from 'react-redux'
import Header from '../../../../components/Header/Header'
import { withTranslation, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import './MyOrders.scss'
import MyOrdersHeader from './MyOrdersHeader'
import NormalOrder from './NormalOrder'
import RebateSalesOrder from './RebateSalesOrder'
import { Link } from 'react-router-dom'
import Loading from '../../../../components/Loader/Loading'
function MyOrdersLanding(props) {
  const { t } = useTranslation()
  const [page, setPage] = React.useState(1);
  const [dateRange, setDateRange] = React.useState('')
  const [dateRange2, setDateRange2] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const allOrdersList = useSelector(state => state.getAllOrdersList.getAllOrdersList);
  const isPageLoading = useSelector((state) => state.getAllOrdersList.loading)
  const dispatch = useDispatch()
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  localStorage.removeItem('PLACE-ORDER-FILTER-CHANGED')
  localStorage.removeItem('ORDER-ADDED')
  const [tab, setTab] = useState(false);

console.log(allOrdersList, 'allOrdersList')
  var searchStatusData = useSelector((state) => state.orderByStatusValue.orderByStatusValue);
    var searchbyPoNoData = useSelector((state) => state.searchByNoValue.searchByNoValue);
    var searchByOrderNoData = useSelector((state) => state.searchByOrderNo.searchByOrderNo);

    var shippingConditionValue = useSelector((state) => state.shippingConditionMyOrderValue.shippingConditionMyOrderValue);
    var shippingTypeValue = useSelector((state) => state.shipTypeValueMyOredr.shipTypeValueMyOredr);

    var paginationValue = useSelector((state) => state.paginationValue.paginationValue);
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

    let startIndex = allOrdersList && allOrdersList.startIndex;
    let endIndex = allOrdersList && allOrdersList.endIndex;
  
  useEffect(() => {
    setLoading(true)
    dispatch(
      orderActions.getAllOrdersList(
        userName ? userName.soldTo[0] : 0,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        searchStatusData ? searchStatusData : '',
        '',
        '',
        '',
        1,
        11,
        userName && userName.countryCode === "VN" ? tab : false
      )
    )
    setTimeout(()=>{
      setLoading(false)
    },5000);
  }, [0, tab])

  function handleChange(event, name) {
    //setNewvalue(event, name)
    // console.log(event, "event target", name);
    console.log('dxxx', event)
    setDateRange(event)
  }

  function handleChange2(event, name) {
    //setNewvalue(event, name)
    // console.log(event, "event target", name);
    console.log('dxxx', event)
    setDateRange2(event)
  }

  const handleChangePage = async(event, value) => { 
    await dispatch(masterActions.paginationValue(value));
    if (value === 1) {
        startIndex = 1;
        endIndex = 10
    }
    else {
        startIndex = ((value-1)*10)+1;
        endIndex = value*10;
    }
    setPage(value);
    dispatch(orderActions.getAllOrdersList(
        userName.soldTo[0], 
        dateRange ? dateRange.replace(/-|\s/g, '') : '',
        dateRange2 ? dateRange2.replace(/-|\s/g, ''): '',
        '', '', '', '', '',
         searchStatusData ? searchStatusData : '', 
        shippingConditionValue === undefined ? '' : shippingConditionValue, 
        '', 
        shippingTypeValue === undefined ? '' : shippingTypeValue,  
        startIndex,
        endIndex,
        userName && userName.countryCode === "VN" ? tab : false
        ));
    
  
};

function handlechange(key) {
  if (key === 1) {
    setTab(true);
   
  }
  if (key === 0) {
    setTab(false);
  }
}

console.log(tab, userName, 'tab=---')

  return (
    <>
      <div className='content-wrapper'>
        <Header title={t('nav.myorders')} />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className='mainScroll'>
            <div className='myorders-container col-12 mt-0'>
              <div className='contanier-fluid p-2 pt-0 mt-0'>
                <MyOrdersHeader
                  headingTitle={t('nav.myorders')}
                  showfilters={true}
                  setLoading={setLoading}
                  handleChange={handleChange} handleChange2 ={handleChange2} 
                  tab={tab} 
                  dateRange={dateRange} 
                  dateRange2={dateRange2}
                />

                {userName && userName.countryCode === 'TH' || userName && userName.countryCode === null || userName && userName.countryCode === 'LK'? (
                  <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                      
                      {
                        !isPageLoading ? 
                        allOrdersList && allOrdersList != 420 ? 
                        <>
                        { allOrdersList && allOrdersList.results ?
                         <NormalOrder handleChangePage={handleChangePage}
                         searchStatusData={searchStatusData}
                         page={page}/> :
                        <div className="loading"> <Loading /></div>}
                        </> :
                          <div className="noDataFound">{t('lable.norecordfound')}</div>
                         :
                         <div className="loading"> <Loading /></div>
                       
                      }
                     

                    </div>
                  </div>
                ) : (
                  <Tabs defaultActiveKey={0} onSelect={handlechange}>
                    <TabList>
                      <Tab>{t('normalorder.tab')}</Tab>
                      <Tab>{t('rebatesalesorder.tab')}</Tab>
                    </TabList>
                  
                    <TabPanel>                      
                    <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>  
                    {
                        allOrdersList && allOrdersList != 420 ? 
                        <>                    
                      {
                         allOrdersList && allOrdersList.results ?
                         <NormalOrder handleChangePage={handleChangePage}
                         tab={tab} 
                         searchStatusData={searchStatusData}
                         page={page}/> :
                        <div className="loading"> <Loading /></div> }
                        </> :
                         <div className="noDataFound">{t('lable.norecordfound')}</div>
                       
                      }
                       
                      
                    </div>
                  </div>
                      
                     
                    </TabPanel>
                    <TabPanel>
                    <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                    {
                        allOrdersList && allOrdersList != 420 ? 
                        <>                                  
                      {
                         allOrdersList && allOrdersList.results ?
                         <NormalOrder handleChangePage={handleChangePage} 
                         searchStatusData={searchStatusData}
                         tab={tab} 
                         page={page}/> :
                        <div className="loading"> <Loading /></div> 
                       
                      }
                      
                        </> :
                         <div className="noDataFound">{t('lable.norecordfound')}</div>
                    }
                     

                    </div>
                  </div>
                      <Link className='create_btn' to='/'>
                        {' '}
                        {t('shipmanagement.createpickup_btn')}
                      </Link>
                    </TabPanel>
                  </Tabs>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withTranslation()(MyOrdersLanding)
