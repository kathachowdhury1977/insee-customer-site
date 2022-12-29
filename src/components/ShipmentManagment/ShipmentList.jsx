import React, { useState, useEffect, useRef } from 'react'
import { eventActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import './ShipmentList.scss'
import Item from '../../assets/img/insee.jfif'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import IsImgChecked from './IsImgChecked'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PlantName from '../../components/PlantName/PlantName'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: 0,
    },
    formControl: {},
  })
)

function ShipmentList(props) {
  const classes = useStyles()
  const selectedLangCode = localStorage.getItem('lancode');
  const prevSelectedProd = useRef()
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const shipmentmanagment = useSelector(
    (state) => state.shipmentmanagment.shipmentmanagment
  )
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const item = props.item
  const navigateToOrderDetails = () => { }

  const showAlert = () => { }
  let countryCode=userName?userName.countryCode:'TH';  
  const [allChecked, setAllChecked] = useState(false)
  const [allCheckedId, setAllCheckedId] = useState('')
  const [isChecked, setIsChecked] = useState([])
  const [isCheckedSippingType, setIsCheckedSippingType] = useState([])
  const [isCheckedAll, setIsCheckedAll] = useState([])
  const [isCheckedAllSelected, setIsCheckedAllSelected] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {

  }, [isCheckedAll])

  // useEffect(() => {
  //   if(props.productSubCategoryValue === 'Bulk CMT' || props.productSubCategoryValue === 'Bulk Mortar') {  
  //     props.selectProduct = []
  //   }
  // }, [])
  const handleAllCheck = (e, shippingType) => {
    debugger
    let allSelectedProdArr = []
    if (e.target.checked) {
      var shipContainer = document.getElementById(
        'shipcontainerid-' + e.target.id
      )
      var shipinTypeSelected= shippingType     
      
      if(countryCode === 'VN'){          
        if(isCheckedSippingType.length > 0){
          if(!isCheckedSippingType.includes(shipinTypeSelected)){
            toast.error(t('Shipping Type should be same'), {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
          else {
            setIsCheckedSippingType([...isCheckedSippingType, shipinTypeSelected])
            if (props.productSubCategoryValue === 'Bulk CMT' || props.productSubCategoryValue === 'Bulk Mortar') {
              if (isCheckedAll.length < 1) {
                setIsCheckedAll([...isCheckedAll, e.target.id]);
              }
              if (isCheckedAll.length > 0) {
                isCheckedAll.indexOf(e.target.id) !== -1 &&
                  isCheckedAll.splice(isCheckedAll.indexOf(e.target.id), 1);
                toast.error(t('Bulk shipment is not able to merge'), {
                  position: 'top-right',
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                return
              }
      
            }
      
            setIsCheckedAll([...isCheckedAll, e.target.id]);
      
            for (let i = 0; i < shipContainer.childNodes[1].childNodes.length; i++) {
              let selectProdObj = {}
              selectProdObj['shipmentId'] = shipContainer.childNodes[1].childNodes[i]
                .getElementsByTagName('input')[0]
                .getAttribute('shipment-id')
              selectProdObj['productId'] = shipContainer.childNodes[1].childNodes[i]
                .getElementsByTagName('input')[0]
                .getAttribute('product-id')
              allSelectedProdArr.push(selectProdObj)
      
              shipContainer.childNodes[1].childNodes[i].getElementsByTagName(
                'input'
              )[0].checked = true
            }
      
      
      
            props.setSelectproductId(
              props.selectProduct.concat(...allSelectedProdArr)
            )
           
          }
         
        }
        else {
          setIsCheckedSippingType([...isCheckedSippingType, shipinTypeSelected])
          if (props.productSubCategoryValue === 'Bulk CMT' || props.productSubCategoryValue === 'Bulk Mortar') {
            if (isCheckedAll.length < 1) {
              setIsCheckedAll([...isCheckedAll, e.target.id]);
            }
            if (isCheckedAll.length > 0) {
              isCheckedAll.indexOf(e.target.id) !== -1 &&
                isCheckedAll.splice(isCheckedAll.indexOf(e.target.id), 1);
              toast.error(t('Bulk shipment is not able to merge'), {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              return
            }
    
          }
    
          setIsCheckedAll([...isCheckedAll, e.target.id]);
    
          for (let i = 0; i < shipContainer.childNodes[1].childNodes.length; i++) {
            let selectProdObj = {}
            selectProdObj['shipmentId'] = shipContainer.childNodes[1].childNodes[i]
              .getElementsByTagName('input')[0]
              .getAttribute('shipment-id')
            selectProdObj['productId'] = shipContainer.childNodes[1].childNodes[i]
              .getElementsByTagName('input')[0]
              .getAttribute('product-id')
            allSelectedProdArr.push(selectProdObj)
    
            shipContainer.childNodes[1].childNodes[i].getElementsByTagName(
              'input'
            )[0].checked = true
          }
    
    
    
          props.setSelectproductId(
            props.selectProduct.concat(...allSelectedProdArr)
          )
        }
       
       
      }
      else {
        if (props.productSubCategoryValue === 'Bulk CMT' || props.productSubCategoryValue === 'Bulk Mortar') {
          if (isCheckedAll.length < 1) {
            setIsCheckedAll([...isCheckedAll, e.target.id]);
          }
          if (isCheckedAll.length > 0) {
            isCheckedAll.indexOf(e.target.id) !== -1 &&
              isCheckedAll.splice(isCheckedAll.indexOf(e.target.id), 1);
            toast.error(t('Bulk shipment is not able to merge'), {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            return
          }
  
        }
  
        setIsCheckedAll([...isCheckedAll, e.target.id]);
  
        for (let i = 0; i < shipContainer.childNodes[1].childNodes.length; i++) {
          let selectProdObj = {}
          selectProdObj['shipmentId'] = shipContainer.childNodes[1].childNodes[i]
            .getElementsByTagName('input')[0]
            .getAttribute('shipment-id')
          selectProdObj['productId'] = shipContainer.childNodes[1].childNodes[i]
            .getElementsByTagName('input')[0]
            .getAttribute('product-id')
          allSelectedProdArr.push(selectProdObj)
  
          shipContainer.childNodes[1].childNodes[i].getElementsByTagName(
            'input'
          )[0].checked = true
        }
  
  
  
        props.setSelectproductId(
          props.selectProduct.concat(...allSelectedProdArr)
        )
      }


      
    } else {
      var shipinTypeSelected= shippingType  
        isCheckedSippingType.indexOf(shipinTypeSelected) !== -1 &&
        isCheckedSippingType.splice(isCheckedSippingType.indexOf(shipinTypeSelected), 1);
      var shipContainer = document.getElementById(
        'shipcontainerid-' + e.target.id
      )
      isCheckedAll.indexOf(e.target.id) !== -1 &&
        isCheckedAll.splice(isCheckedAll.indexOf(e.target.id), 1);
      let removeProductId = []
      ///console.log('tag',shipContainer.childNodes[1].childNodes);
      for (let i = 0; i < shipContainer.childNodes[1].childNodes.length; i++) {
        removeProductId.push(
          shipContainer.childNodes[1].childNodes[i]
            .getElementsByTagName('input')[0]
            .getAttribute('product-id')
        )
        console.log(
          'product-id',
          shipContainer.childNodes[1].childNodes[i]
            .getElementsByTagName('input')[0]
            .getAttribute('product-id')
        )
        ////shipContainer.childNodes[1].childNodes[i]
        shipContainer.childNodes[1].childNodes[i].getElementsByTagName(
          'input'
        )[0].checked = false
      }
      let removeSelectedProd = props.selectProduct.filter(
        (value, index) => removeProductId.indexOf(value.productId) == -1
      )
      props.setSelectproductId(removeSelectedProd)
    }
    ///console.log(isChecked,'allSelectedProdArr',allSelectedProdArr,'',isChecked.concat(...allSelectedProdArr));
  }

console.log(isCheckedAll, 'isCheckedAll')
 
  const handleChange = (event) => {debugger
    let shipmentId = event.target.getAttribute('shipment-id')
    let productId = event.target.getAttribute('product-id')
    let shipinTypeSelected= event.target.getAttribute('shipinType-id')    
    if (event.target.checked) {        
      if(countryCode === 'VN'){        
        if(isCheckedSippingType.length > 0){
          if(!isCheckedSippingType.includes(shipinTypeSelected)){
            toast.error(t('Shipping Type should be same'), {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
          else {
            setIsCheckedSippingType([...isCheckedSippingType, shipinTypeSelected])
            if (props.productSubCategoryValue === 'Bulk CMT' || props.productSubCategoryValue === 'Bulk Mortar') {
              if (props.selectProduct.length > 0) {
                for (var i = 0; props.selectProduct.length; i++) {
                  if (props.selectProduct[i].productId.split('-')[0] != productId.split('-')[0]) {
                    toast.error(t('Bulk shipment is not able to merge'), {
                      position: 'top-right',
                      autoClose: 4000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                    return
                  }
                }
                setIsCheckedAll([...isCheckedAll, productId]);
                setIsChecked([...isChecked, productId]);
                props.setSelectproductId([
                  ...props.selectProduct,
                  { shipmentId: shipmentId, productId: productId },
                ])
              }
            }
            setIsCheckedAll([...isCheckedAll, productId]);
            setIsChecked([...isChecked, productId]);
            props.setSelectproductId([
              ...props.selectProduct,
              { shipmentId: shipmentId, productId: productId },
            ])
            
          }
         
        }
        else {
          setIsCheckedSippingType([...isCheckedSippingType, shipinTypeSelected])
          if (props.productSubCategoryValue === 'Bulk CMT' || props.productSubCategoryValue === 'Bulk Mortar') {
            if (props.selectProduct.length > 0) {
              for (var i = 0; props.selectProduct.length; i++) {
                if (props.selectProduct[i].productId.split('-')[0] != productId.split('-')[0]) {
                  toast.error(t('Bulk shipment is not able to merge'), {
                    position: 'top-right',
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  return
                }
              }
              setIsCheckedAll([...isCheckedAll, productId]);
              setIsChecked([...isChecked, productId]);
              props.setSelectproductId([
                ...props.selectProduct,
                { shipmentId: shipmentId, productId: productId },
              ])
            }
          }
          setIsChecked([...isChecked, productId]);
          setIsCheckedAll([...isCheckedAll, productId]);
          props.setSelectproductId([
            ...props.selectProduct,
            { shipmentId: shipmentId, productId: productId },
          ])
        }
       
       
      }else {
        if (props.productSubCategoryValue === 'Bulk CMT' || props.productSubCategoryValue === 'Bulk Mortar') {
          if (props.selectProduct.length > 0) {
            for (var i = 0; props.selectProduct.length; i++) {
              if (props.selectProduct[i].productId.split('-')[0] != productId.split('-')[0]) {
                toast.error(t('Bulk shipment is not able to merge'), {
                  position: 'top-right',
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                return
              }
            }
            setIsChecked([...isChecked, productId]);
            setIsCheckedAll([...isCheckedAll, productId]);
            props.setSelectproductId([
              ...props.selectProduct,
              { shipmentId: shipmentId, productId: productId },
            ])
          }
        }
        setIsChecked([...isChecked, productId]);
        setIsCheckedAll([...isCheckedAll, productId]);
        props.setSelectproductId([
          ...props.selectProduct,
          { shipmentId: shipmentId, productId: productId },
        ])
      }
      }
      
       else {
        isCheckedSippingType.indexOf(shipinTypeSelected) !== -1 &&
        isCheckedSippingType.splice(isCheckedSippingType.indexOf(shipinTypeSelected), 1);
      isChecked.indexOf(productId) !== -1 &&
        isChecked.splice(isChecked.indexOf(productId), 1);
        isCheckedAll.indexOf(productId) !== -1 &&
        isCheckedAll.splice(isCheckedAll.indexOf(productId), 1);
      
      const prodIndex = props.selectProduct.findIndex(
        (data) => data.productId === productId
      )
      const newSelectedData = [
        ...props.selectProduct.slice(0, prodIndex),
        ...props.selectProduct.slice(prodIndex + 1),
      ]
      props.setSelectproductId(newSelectedData)
    }



  }

  console.log(props.selectProduct, 'selectProduct')

  const checkDecimalVal = (val) => {
    let checkDecimalLen = val != undefined || null ? String(val).split('.') : ''
    return checkDecimalLen[1] !== undefined && checkDecimalLen[1].length >= 3
      ? Number(val).toFixed(3)
      : val
  }

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);


  return (
    <>
      {shipmentmanagment && shipmentmanagment.totalCount > 0 ? (
        shipmentmanagment.results.map((shipmentList) => {
          return (
            <div
              id={`shipcontainerid-${shipmentList.id}`}
              className='container-fluid mt-2 mb-3'
            >
              <div className='col-12'>

                <div
                  className='Rectangle-2231 row'
                  style={{ position: 'relative' }}
                >
                  <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 pl-0 pr-0 pb-0 mb-3'>
                    {
                      countryCode && countryCode === 'VN' ? '' :
                      <>
                      <span className='PO-No-1287586' style={{fontSize: `${SmallFontChanger}px`}}>
                      {t('label.po_number')} {shipmentList.header1.ponumber}
                    </span>
                     <br />
                     </>
                    }
                    
                   
                    <span className='SO-Date-12102020' style={{fontSize: `${SmallFontChanger}px`}}>
                      {t('label.shipping_type')}:{' '}
                      {shipmentList.header1.shippingTypeValue}
                    </span>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 pl-0 pr-0 mb-3'>
                    <span className='SO-No-1208767' style={{fontSize: `${SmallFontChanger}px`}}>
                      {t('label.so_number')} {' '}: {' '}
                      {shipmentList.header1.salesOrderNumber}
                    </span>
                    <br />
                    <span className='Plant-Thap-Kwang-Thailand' style={{fontSize: `${SmallFontChanger}px`}}>
                      {t('Ship To')}:{' '}
                      {shipmentList.partnerFunction.shipToNumber.replace(
                        /^0+/,
                        ''
                      )}{' '}

                      {
                        countryCode && countryCode === 'VN' ? 
                        selectedLangCode === 'en' || selectedLangCode === null ?
                          shipmentList.partnerFunction.shipToName
                          :
                          shipmentList.partnerFunction.shipToName : 
                          selectedLangCode === 'en' || selectedLangCode === null ?
                          shipmentList.partnerFunction.shipToName
                          :
                          shipmentList.partnerFunction.name2
                        
                        }
                    </span>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-11 col-sm-11 col-xs-11 pl-0 pr-0 mb-3'>
                    <span className='Order-Type-Credit' style={{fontSize: `${SmallFontChanger}px`}}>
                      {t('Plant')}:{' '}
                      {
                         shipmentList.items[0] !== undefined
                         ? shipmentList.items[0].Plant
                         : ''
                      }
                      {/* <PlantName
                        plantCode={
                          shipmentList.items[0] !== undefined
                            ? shipmentList.items[0].Plant
                            : ''
                        }
                      /> */}
                    </span>
                    <span className='Order-Type-Credit totalRemainingQuantity' style={{fontSize: `${SmallFontChanger}px`}}>
                      {t('totalRemainingQuantity')}:{' '}<br />
                      {parseFloat(shipmentList.header1.totalRemainingQuantity).toFixed(3)}

                    </span>
                    <br />
                    <span className='Order-Type-Credit' style={{fontSize: `${SmallFontChanger}px`}}>
                      {t('Status')}: {' '}
                      {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Open" ? "พร้อมทำชิปเม้นท์ - Open" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Open" ? "Mở - Open" : "" :
             shipmentList.header1.salesOrderStatus === "Open" ? "พร้อมทำชิปเม้นท์ - Open" : ""
              }
              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Processing" ? "อยู่ระหว่างดำเนินการ - Processing" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Processing" ? "Đang xử lý - Processing" : "" :
             shipmentList.header1.salesOrderStatus === "Processing" ? "อยู่ระหว่างดำเนินการ - Processing" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Cancel" ? "ยกเลิก - Cancel" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Cancel" ? "Hủy - Cancel" : "" :
             shipmentList.header1.salesOrderStatus === "Cancel" ? "ยกเลิก - Cancel" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Dispatched" ? "รับสินค้าเรียบร้อย - Dispatched" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Dispatched" ? "รับสินค้าเรียบร้อย - Dispatched" : "" :
             shipmentList.header1.salesOrderStatus === "Dispatched" ? "รับสินค้าเรียบร้อย - Dispatched" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Partial" ? "จัดส่งแล้วบางส่วน - Partial" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Partial" ? "จัดส่งแล้วบางส่วน - Partial" : "" :
             shipmentList.header1.salesOrderStatus === "Partial" ? "จัดส่งแล้วบางส่วน - Partial" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Blocked" ? "ถูกบล๊อก - Blocked" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Blocked" ? "Khóa - Blocked" : "" :
             shipmentList.header1.salesOrderStatus === "Blocked" ? "ถูกบล๊อก - Blocked" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Cancelling_Progress" ? "ยกเลิกความคืบหน้า - Cancelling Progress" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Cancelling_Progress" ? "ยกเลิกความคืบหน้า - Cancelling Progress" : "" :
             shipmentList.header1.salesOrderStatus === "Cancelling_Progress" ? "ยกเลิกความคืบหน้า - Cancelling Progress" : ""
              }

            {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Completed" ? "ดำเนินการเรียบร้อย - Completed" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Completed" ? "Đã hoàn tất - Completed" : "" :
             shipmentList.header1.salesOrderStatus === "Completed" ? "ดำเนินการเรียบร้อย - Completed" : ""
              }

              {
              selectedLangCode && selectedLangCode === 'th' || selectedLangCode && selectedLangCode === null ?
             shipmentList.header1.salesOrderStatus === "Failed" ? "ล้มเหลว- Failed" : "" :
              selectedLangCode && selectedLangCode === 'vt' ?  
             shipmentList.header1.salesOrderStatus === "Failed" ? "ล้มเหลว- Failed" : "" :
             shipmentList.header1.salesOrderStatus === "Failed" ? "ล้มเหลว- Failed" : ""
              }
                      

                    </span>
                  </div>
                  <div className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1'>
                    <span className='Order-Type-Credit text-right'>
                      <div>
                        <input

                          checked={isCheckedAll &&
                            isCheckedAll.indexOf(shipmentList.id) != -1}
                          id={shipmentList.id}
                          class='checkbox-custom'
                          name='checkall'
                          type='checkbox'
                          shipinType-id={shipmentList.header1.shippingType}
                          onChange={e => handleAllCheck(e,shipmentList.header1.shippingType)}
                        />
                        <label
                          for={shipmentList.id}
                          class='checkbox-custom-label'
                        ></label>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                {shipmentList
                  ? shipmentList.items

                    .sort((a, b) => a.MaterialNumber > b.MaterialNumber ? 1 : -1)
                    .map((itemList, index) => {
                      //checkImage(itemList.MaterialImage);
                      let findShipMentId = props.selectProduct.find(
                        (ship) => ship.productId == itemList.soLineNo
                      )
                      if (
                        findShipMentId !== undefined &&
                        findShipMentId.shipmentId == shipmentList.id &&
                        findShipMentId.productId == itemList.soLineNo
                      ) {
                        return (
                          <div className='Rectangle-2232 row'>
                            <span className='col-xl-1 col-xl-1 col-md-2 col-sm-2 col-xs-2'>
                              <IsImgChecked imageUrl={itemList.MaterialImage} />
                            </span>
                            <span className='product_name col-xl-4 col-xl-4 col-md-10 col-sm-10 col-xs-10' style={{fontSize: `${SmallFontChanger}px`}}>
                              <span style={{fontSize: `${SmallFontChanger}px`}}>
                                <strong style={{fontSize: `${SmallFontChanger}px`}}>
                                  {
                                    selectedLangCode === 'en' || selectedLangCode === null ?
                                      itemList.MaterialName.split(':')[1] : itemList.MaterialName.split(':')[0]
                                  }
                                </strong>
                              </span>
                              <br />
                              <span className='product_id' style={{fontSize: `${SmallFontChanger}px`}}>
                                {itemList.MaterialNumber.replace(/^0+/, '')}
                              </span>
                            </span>

                            <span className='product_name col-xl-3 col-xl-3 col-md-6 col-sm-12 col-xs-12'>
                              <strong style={{fontSize: `${SmallFontChanger}px`}}>
                                {t('totoalqty.label')}{' '}
                                {checkDecimalVal(parseFloat(itemList.OrderQuantity).toFixed(3))}{' '}
                                {selectedLangCode === 'en' || selectedLangCode === null ?
                                  itemList.UnitOfMeasure :
                                  selectedLangCode === 'vt' ? 
                                  itemList.UnitOfMeasure === "TON" ? "tấn"  :
                                  itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                  itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                  itemList.UnitOfMeasure:
                                  itemList.UnitOfMeasure === "TON" ? "ตัน" :
                                    itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                    itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                    itemList.UnitOfMeasure
                                      }
                              

                              </strong>
                            </span>
                            <span className='product_name col-xl-3 col-xl-3 col-md-5 col-sm-11 col-xs-11 pr-0 pr-0'>
                              <strong style={{fontSize: `${SmallFontChanger}px`}}>
                                {t('label.remaining_qty')}{' '}
                                {checkDecimalVal(
                                  parseFloat(itemList.ItemRemainingQuantity).toFixed(3)
                                )}{' '}
                                {selectedLangCode === 'en' || selectedLangCode === null ?
                                  itemList.UnitOfMeasure :
                                  selectedLangCode === 'vt' ? 
                                  itemList.UnitOfMeasure === "TON" ? "tấn"  :
                                  itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                  itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                  itemList.UnitOfMeasure:
                                  itemList.UnitOfMeasure === "TON" ? "ตัน" :
                                    itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                    itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                    itemList.UnitOfMeasure
                                      }
                              </strong>
                            </span>
                            <span className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-12 text-right'>
                              <div>
                                <input
                                  checked='checked'
                                  onChange={handleChange}
                                  shipment-id={shipmentList.id}
                                  product-id={itemList.soLineNo}
                                  shipinType-id={shipmentList.header1.shippingType}
                                  id={`checkbox-${itemList.soLineNo}`}
                                  class='checkbox-custom'
                                  name={itemList.soLineNo}
                                  value={shipmentList.id}
                                  type='checkbox'
                                />
                                <label
                                  // style={{ left: '18%' }}
                                  for={`checkbox-${itemList.soLineNo}`}
                                  class='checkbox-custom-label'
                                ></label>
                              </div>
                            </span>
                          </div>
                        )
                      } else {
                        return (
                          <>
                            {
                              itemList.ItemRemainingQuantity === "0.0" ? '' :
                                <div className='Rectangle-2232 row'>
                                  <span className='col-xl-1 col-lg-1 col-md-2 col-sm-2 col-xs-2'>
                                    <IsImgChecked imageUrl={itemList.MaterialImage} />
                                  </span>
                                  <span className='product_name col-xl-4 col-lg-4 col-md-10 col-sm-10 col-xs-10' style={{fontSize: `${SmallFontChanger}px`}}>
                                    <span style={{fontSize: `${SmallFontChanger}px`}}>
                                      <strong style={{fontSize: `${SmallFontChanger}px`}}>
                                        {
                                          selectedLangCode === 'en' || selectedLangCode === null ?
                                            itemList.MaterialName.split(':')[1] : itemList.MaterialName.split(':')[0]
                                        }
                                      </strong>
                                    </span>
                                    <br />
                                    <span className='product_id' style={{fontSize: `${SmallFontChanger}px`}}>
                                      {itemList.MaterialNumber.replace(/^0+/, '')}
                                    </span>
                                  </span>

                                  <span className='product_name col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                                    <strong style={{fontSize: `${SmallFontChanger}px`}}>
                                      {t('totoalqty.label')}{' '}
                                      {checkDecimalVal(parseFloat(itemList.OrderQuantity).toFixed(3))}{' '}

                                      {selectedLangCode === 'en' || selectedLangCode === null ?
                                  itemList.UnitOfMeasure :
                                  selectedLangCode === 'vt' ? 
                                  itemList.UnitOfMeasure === "TON" ? "tấn"  :
                                  itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                  itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                  itemList.UnitOfMeasure:
                                  itemList.UnitOfMeasure === "TON" ? "ตัน" :
                                    itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                    itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                    itemList.UnitOfMeasure
                                      }
                                    </strong>
                                  </span>
                                  <span className='product_name col-xl-3 col-lg-3 col-md-5 col-sm-11 col-xs-11 pr-0'>
                                    <strong style={{fontSize: `${SmallFontChanger}px`}}>
                                      {t('label.remaining_qty')}{' '}
                                      {checkDecimalVal(
                                        parseFloat(itemList.ItemRemainingQuantity).toFixed(3)
                                      )}{' '}
                                     {selectedLangCode === 'en' || selectedLangCode === null ?
                                  itemList.UnitOfMeasure :
                                  selectedLangCode === 'vt' ? 
                                  itemList.UnitOfMeasure === "TON" ? "tấn"  :
                                  itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                  itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                  itemList.UnitOfMeasure:
                                  itemList.UnitOfMeasure === "TON" ? "ตัน" :
                                    itemList.UnitOfMeasure === "Each" ? "ชิ้น" :
                                    itemList.UnitOfMeasure === "Set" ? "ชุด" :
                                    itemList.UnitOfMeasure
                                      }
                                    </strong>
                                  </span>
                                  <span className='col-xl-1 col-lg-1 col-md-1 col-sm-12 col-xs-12 text-right'>
                                    <div>
                                      <input
                                        checked={
                                          isChecked &&
                                          isChecked.indexOf(itemList.soLineNo) != -1
                                        }
                                        onChange={handleChange}
                                        shipment-id={shipmentList.id}
                                        product-id={itemList.soLineNo}
                                        shipinType-id={shipmentList.header1.shippingType}
                                        id={`checkbox-${itemList.soLineNo}`}
                                        class='checkbox-custom'
                                        name={itemList.soLineNo}
                                        value={shipmentList.id}
                                        type='checkbox'
                                      />

                                      <label
                                        //  style={{ left: '18%' }}
                                        for={`checkbox-${itemList.soLineNo}`}
                                        class='checkbox-custom-label'
                                      ></label>
                                    </div>
                                  </span>
                                </div>
                            }

                          </>
                        )
                      }
                    })
                  : null}
              </div>
              <div className='col-12'>
                <div className='Rectangle-110 row'>
                  <span className='Total-Amount-50000 col-6' style={{fontSize: `${SmallFontChanger}px`}}>
                    {t('totoalqty.label')}
                  </span>

                  <span
                    style={{ position: 'relative' }}
                    className='col-6 text-right'
                  >
                    <span
                      style={{ position: 'absolute', right: '0' }}
                      className='QTY-40'
                      style={{fontSize: `${SmallFontChanger}px`}}
                    >
                      {checkDecimalVal(shipmentList.header1.totalQuantity)} {t("TON")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
          {t('lable.norecordfound')}
        </h3>
      )}
    </>
  )
}
export default withTranslation()(ShipmentList)