import React, { useEffect, useState } from 'react'
// import { eventActions } from "../../_actions";
// import { useDispatch } from "react-redux";
import { withTranslation, useTranslation } from 'react-i18next'
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import './MyorderOrderItem.scss'
// import Item from "../../assets/img/insee.jfif";
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import newImg from '../../assets/img/new.gif'
import { orderActions } from '../../_actions'
import moment from 'moment'
import 'moment-timezone'
function MyorderOrderItem(props) {
  const { t } = useTranslation()
  let history = useHistory()
  const selectedLangCode = localStorage.getItem('lancode');
  const dispatch = useDispatch()
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  const replicateNotReceived = props.replicateNotReceived
  const isBorderCustomer = props.isBorderCustomer

  console.log(selectedLangCode, 'selectedLangCode')
  const [disableButton, setDisableButton] = useState(false)
  const navigateToOrderDetails = () => {
    if (
      props.sostatus === 'Cancelling_Progress' ||
      props.sostatus === 'Cancel' ||
      props.sostatus === 'Processing'
    ) {
      toast.dark(t("sostatusis") + `${' '} ${props.sostatus}`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      history.push({
        pathname: '/MyOrderDetails',
        state: { orderdetails: props.orderdata },
      })
    }
  }

  const showAlert = () => {
    toast.dark('No shipping details.', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }


  // useEffect(() => {
  //   debugger
  //   setTimeout(() => {
  //     replicateNotReceivedRefresg();
  //   }, 3000);
  // }, [replicateNotReceived])

  // const replicateNotReceivedRefresg = () => {
  //   if (props.replicateNotReceived === true) {
  //     dispatch(
  //       orderActions.getAllOrdersList(
  //         userName ? userName.soldTo[0] : 0,
  //         '',
  //         '',
  //         '',
  //         '',
  //         '',
  //         '',
  //         '',
  //         props.searchStatusData ? props.searchStatusData : '',
  //         '',
  //         '',
  //         '',
  //         1,
  //         11,
  //         userName && userName.countryCode === "VN" ? props.tab : false
  //       )
  //     )
  //     return;

  //   }
  //   else {
  //     return
  //   }
  // }

  console.log( props.searchStatusData, ' props.searchStatusData-----')



  const handleImg = (e) => {
    e.target.src =
      'https://www.siamcitycement.com/images/layout/insee_logo_en.png'
  }

  // useEffect(() => {
  // 	if(props.sostatus === "Cancelling_Progress" || props.sostatus === "Cancel" || props.sostatus === "Processing"){
  // 		setDisableButton(true)
  // 	}
  // 	else {
  // 		setDisableButton(false)
  // 	}
  // })

  const decimalwithcoma = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  console.log(props.orderitems && props.orderitems, 'orderItem---')

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  return (
    <>
      <div className='container-fluid mt-2 mb-2'>
        <div className="borderNew">
        <div className='col-12'>
          <div className='Rectangle-2231 row itemsRow'>
            {
              countryCode && countryCode === "VN" ? '' :
                <span className='PO-No-1287586 col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-6 pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
                  {t('pono.label')}:{' '}
                  {props.porefnumber && props.porefnumber
                    ? props.porefnumber
                    : 'NA'}
                </span>
            }

            <span className='SO-Status-Under-progress col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 pl-0 pr-0' style={{fontSize: `${SmallFontChanger}px`}}>
              {t('sostatus.status')}: {' '}
             
              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Open" ? "???????????????????????????????????????????????? - Open" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Open" ? "M??? - Open" : "" :
              props.sostatus === "Open" ? "???????????????????????????????????????????????? - Open" : ""
              }
              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Processing" ? "???????????????????????????????????????????????????????????? - Processing" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Processing" ? "??ang x??? l?? - Processing" : "" :
              props.sostatus === "Processing" ? "???????????????????????????????????????????????????????????? - Processing" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Cancel" ? "?????????????????? - Cancel" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Cancel" ? "H???y - Cancel" : "" :
              props.sostatus === "Cancel" ? "?????????????????? - Cancel" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Dispatched" ? "?????????????????????????????????????????????????????? - Dispatched" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Dispatched" ? "?????????????????????????????????????????????????????? - Dispatched" : "" :
              props.sostatus === "Dispatched" ? "?????????????????????????????????????????????????????? - Dispatched" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Partial" ? "??????????????????????????????????????????????????? - Partial" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Partial" ? "??????????????????????????????????????????????????? - Partial" : "" :
              props.sostatus === "Partial" ? "??????????????????????????????????????????????????? - Partial" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Blocked" ? "???????????????????????? - Blocked" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Blocked" ? "Kh??a - Blocked" : "" :
              props.sostatus === "Blocked" ? "???????????????????????? - Blocked" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Cancelling_Progress" ? "??????????????????????????????????????????????????? - Cancelling Progress" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Cancelling_Progress" ? "??????????????????????????????????????????????????? - Cancelling Progress" : "" :
              props.sostatus === "Cancelling_Progress" ? "??????????????????????????????????????????????????? - Cancelling Progress" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Completed" ? "?????????????????????????????????????????????????????? - Completed" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Completed" ? "???? ho??n t???t - Completed" : "" :
              props.sostatus === "Completed" ? "?????????????????????????????????????????????????????? - Completed" : ""
              }

              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.sostatus === "Failed" ? "?????????????????????- Failed" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.sostatus === "Failed" ? "?????????????????????- Failed" : "" :
              props.sostatus === "Failed" ? "?????????????????????- Failed" : ""
              }



              
              {/* {props.sostatus === "Processing" ? "???????????????????????????????????????????????????????????? - Processing" : ""}
              {props.sostatus === "Cancel" ? "?????????????????? - Cancel" : ""}
              {props.sostatus === "Dispatched" ? "?????????????????????????????????????????????????????? - Dispatched" : ""}
              {props.sostatus === "Partial" ? "??????????????????????????????????????????????????? - Partial" : ""}
              {props.sostatus === "Blocked" ? "???????????????????????? - Blocked" : ""}
              {props.sostatus === "Cancelling_Progress"
                ? "??????????????????????????????????????????????????? - Cancelling Progress"
                : ""}
              {props.sostatus === "Completed"
                ? "?????????????????????????????????????????????????????? - Completed"
                : ""}
              {props.sostatus === "Failed"
                ? "?????????????????????- Failed"
                : ""} */}



            </span>
            <span style={{fontSize: `${SmallFontChanger}px`}} className={ countryCode && countryCode=== "VN" ? 'SO-No-1208768 col-xl-1 col-lg-4 col-md-6 col-sm-6 col-xs-6 pl-0 pr-0' : 'SO-No-1208767 col-xl-1 col-lg-4 col-md-6 col-sm-6 col-xs-6 pl-0 pr-0' }>
              {t('SO No.')}:{' '}
              {props.sonumber && props.sonumber ? props.sonumber : '-'}
            </span>
            <span style={{fontSize: `${SmallFontChanger}px`}} className='SO-Date-12102020 col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-6 pl-2 pr-0'>
              {t('SO Date')}:{' '}
              {props.sodate && props.sodate ? props.sodate : '-'}
            </span>
            <span style={{fontSize: `${SmallFontChanger}px`}} className='Plant-Thap-Kwang-Thailand col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-6 pl-0 pr-0'>
              {t('Plant')}:{' '}
              {props.orderitems.map((item, i) => {
                if (i < 1) {
                  return <span>
                    {item.Plant}
                  </span>
                }
              })}
            </span>
            <span style={{fontSize: `${SmallFontChanger}px`}} className='Order-Type-Credit col-xl-2 col-lg-4 col-md-6 col-sm-6 col-xs-6 pl-0 pr-0'>
              {t('ordertype.label')}:{' '}
              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.ordertype && props.ordertype === "CREDIT" ? 'Credit - ??????????????????' : '' :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.ordertype && props.ordertype === "CREDIT" ? 'Credit - T??n d???ng' : '' :
              props.ordertype && props.ordertype === "CREDIT" ? 'Credit - ??????????????????' : ''
              
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
              props.ordertype && props.ordertype === "CASH" ? 'Cash - ??????????????????' : '' :
              selectedLangCode && selectedLangCode === 'vt' ?  
              props.ordertype && props.ordertype === "CASH" ? 'Cash - Ti???n m???t' : ''  :
              props.ordertype && props.ordertype === "CASH" ? 'Cash - ??????????????????' : '' 
              
              }
          
            </span>
            <span style={{fontSize: `${SmallFontChanger}px`}} className="newIcon">{props.sodate === moment().format('DD/MM/YYYY') ? 
            <img src={newImg}  style={{width: '50px'}} alt="product"/>
            : ''}</span>
          </div>
        </div>

        {props.orderdata && props.orderdata
          ? props.orderdata &&
          props.orderdata.items.map((item, index) => {
            return (
              <div className='col-12'>
                <div className='Rectangle-2232 row'>
                  <span className='col-xl-1 col-lg-1 col-md-4 col-sm-4 col-xs-4'>
                    <img
                      className='image-1'
                      onError={handleImg}
                      src={item.MaterialImage}
                      alt=''
                    />
                  </span>
                  <span className='product_name col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-8'>
                    <span className='freeProduct ' style={{fontSize: `${SmallFontChanger}px`}}>
                      {props.orderdata && props.orderdata.orderItemListObject
                        ? props.orderdata.orderItemListObject[index]
                          .Item_Category__c != 'ZFG1'
                          ? ''
                          : 'Free'
                        : ''}
                    </span>
                    <strong style={{fontSize: `${SmallFontChanger}px`}}>
                      {
                        selectedLangCode === 'en' || selectedLangCode === null ?
                          item.MaterialName && item.MaterialName
                            ? item.MaterialName.split(':')[1] : '' : item.MaterialName && item.MaterialName
                            ? item.MaterialName.split(':')[0] : ''
                      }
                    </strong>

                  </span>
                  <span className='product_id col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6' style={{fontSize: `${SmallFontChanger}px`}}>
                    {item.MaterialNumber.replace(/^0+/, '')}
                  </span>
                  <span className='TON col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6' style={{fontSize: `${SmallFontChanger}px`}}>
                    <strong style={{fontSize: `${SmallFontChanger}px`}}>
                      {
                        item.UnitOfMeasure === "Each" || "????????????" ? decimalwithcoma(parseFloat(item.OrderQuantity).toFixed(3)) : parseFloat(item.OrderQuantity).toFixed(3)
                      }
                      {' '}
                      {selectedLangCode === 'en' || selectedLangCode === null ?
                        item.UnitOfMeasure :
                        selectedLangCode === 'vt' ? 
                        item.UnitOfMeasure === "TON" ? "t???n"  :
                        item.UnitOfMeasure === "Each" ? "????????????" :
                        item.UnitOfMeasure:
                        item.UnitOfMeasure === "TON" ? "?????????" :
                          item.UnitOfMeasure === "Each" ? "????????????" :
                          item.UnitOfMeasure
                            }
                            
                    </strong>
                  </span>
                </div>
              </div>
            )
          })
          : null}


        <div className='col-12'>
          <div className='Rectangle-110 row itemsRow'>
            <span className='Total-Amount-50000 col-4' style={{fontSize: `${SmallFontChanger}px`}}>
              {
                props.replicateNotReceived === true ? '' :
                  <>
                    {t('Total Amount')} :
                    {selectedLangCode === 'en' || selectedLangCode === null ?
                      `(${isBorderCustomer})`
                      : isBorderCustomer === 'THB' ? '(?????????)' :
                        isBorderCustomer === 'USD' ? '(????????????????????????)' : `(${isBorderCustomer})`

                    }
                    {' '}
                    {decimalwithcoma(parseFloat(props.totalamount).toFixed(2))}
                  </>
              }

            </span>
            {props.productCategory && props.productCategory === 'CONWOOD' ? (
              <span className='QTY-40 col-4 mt-0' style={{ paddingBottom: 20,fontSize: `${SmallFontChanger}px` }}>
                {
                  props.replicateNotReceived === true ? '' :
                    <>
                      {t('Total Weight')}: {' '}
                      {props.totalQtyInKg && props.totalQtyInKg
                        ? parseFloat(props.totalQtyInKg).toFixed(3)
                        : '-'}{' '}
                      {t('KG')}
                    </>
                }
              </span>
            ) : (
              <span className='QTY-40 col-4 mt-0' style={{fontSize: `${SmallFontChanger}px`}}>
                {t('QTY')}:{' '}
                {props.totalqty && props.totalqty
                  ? decimalwithcoma(parseFloat(props.totalqty).toFixed(3))
                  : '-'}{' '}
                {selectedLangCode === 'en' || selectedLangCode === null ?
                  props.unit :
                  selectedLangCode === 'vt' ? 
                  props.unit  === "TON" ? "t???n"  :
                  props.unit  === "Each" ? "????????????" :
                  props.unit :
                  props.unit  === "TON" ? "?????????" :
                    props.unit  === "Each" ? "????????????" :
                    props.unit 
                 }

              </span>
            )}

            <span className='col-4 text-right'>
              {
                props.replicateNotReceived === true ? '' :
                  <>
                    {props.sonumber === '-' ? (
                      <span > 
                        <button
                          className='create_btn_order'
                          onClick={showAlert}
                        //disabled={disableButton}
                        style={{fontSize: `${FontChange}px`}}
                        >
                          {t('View Order Details')}
                        </button>
                      </span>
                    ) : (
                      <span>
                        <button
                          className='create_btn_order'
                          onClick={navigateToOrderDetails}
                          style={{fontSize: `${FontChange}px`}}
                        //disabled={disableButton}
                        >
                          {t('View Order Details')}
                        </button>
                      </span>
                    )}
                  </>
              }
            </span>
          </div>
        </div>
        </div>

      </div>
    </>
  )
}

export default withTranslation()(MyorderOrderItem)
